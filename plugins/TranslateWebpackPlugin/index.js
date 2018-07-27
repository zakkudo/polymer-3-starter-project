const JSON5 = require('json5');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const y18n = require('y18n');
const hasTranslation = require('./lib/hasTranslation');
const scrubLocalization = require('./lib/scrubLocalization');
const toLocalization = require('./lib/toLocalization');

const translatables = {};

const defaultLocaleGenerationDirectory = path.resolve('./.locale-gen');
const defaultLocaleGenerationFilename = path.resolve(defaultLocaleGenerationDirectory, 'template.json');

const instance = y18n({
    updateFiles: true, //If it doesn't write the file, it also don't update the cache
    directory: defaultLocaleGenerationDirectory,
    locale: 'template',
});

function calculateFiles(compiler, options) {
    const watcher = compiler.watchFileSystem.watcher;
    const modifiedWatchedFiles = Object.keys(watcher.mtimes);
    const allFiles = glob.sync(options.files);

    if (!modifiedWatchedFiles.length) {
        return allFiles;
    }

    return allFiles.filter((f) => {
        return modifiedFiles.has(f);
    });
}

function serializeLocalizationWithMetaData(localizationWithMetadata) {
    const keys = Object.keys(localizationWithMetadata);
    const length = keys.length;

    return keys.reduce((serialized, k, i) => {
        const hasMore = i < length - 1;
        const indent = '    ';
        const note = localizationWithMetadata[k].note;
        const formattedNote = note ? `${indent}// ${note.toUpperCase()}\n` : '';
        const files = localizationWithMetadata[k].files;
        const formattedFiles = files.length ? `${indent}// ` + files.join(`\n${indent}// `) + '\n' : '';

        return `${serialized}${formattedNote}${formattedFiles}${indent}"${k}": ${JSON.stringify(localizationWithMetadata[k].data)}${hasMore ? ',' : ''}\n`;
    }, '{\n') + '}';
}

module.exports = class TranslateWebpackPlugin {
    constructor(options) {
        this.options = options;
        this.sourceByFilename = new Map();
        this.localizationByFilename = new Map();
        this.filesByKey = new Map();
    }

    getDirectory() {
        const options = this.options || {};

        return options.directory || './locales';
    }

    readLocalization(language) {
        const directory = this.getDirectory();
        const filename = `${directory}/${language}.json`;
        let data;

        if (fs.existsSync(filename)) {
            data = JSON5.parse(fs.readFileSync(filename));
        } else {
            data = {}
        }

        return data;
    }

    writeLocalizationWithMetadata(language, localization) {
        const directory = this.getDirectory();
        const filename = `${directory}/${language}.json`;
        const serialized = serializeLocalizationWithMetaData(localization);

        fs.writeFileSync(filename, serialized);
    }

    updateLocalization(localization) {
        const directory = this.getDirectory();
        const template = scrubLocalization(instance.cache.template);
        const filesByKey = this.filesByKey;
        const keys = [
            ...new Set(Object.keys(localization).concat(Object.keys(template)))
        ].sort();
        const fallbackFiles = new Set();

        return keys.reduce((accumulator, k) => {
            const files = [...(filesByKey.get(k) || fallbackFiles)].sort();

            if (!template.hasOwnProperty(k) && localization.hasOwnProperty(k) && hasTranslation(localization[k])) {
                return Object.assign({}, accumulator, {
                    [k]: {
                        note: 'unused',
                        files,
                        data: localization[k]
                    }
                });
            } else if (template.hasOwnProperty(k) && !localization.hasOwnProperty(k)) {
                return Object.assign({}, accumulator, {
                    [k]: {
                        note: 'new',
                        files,
                        data: template[k]
                    }
                });
            } else if (template.hasOwnProperty(k) && localization.hasOwnProperty(k)) {
                return Object.assign({}, accumulator, {
                    [k]: {
                        files,
                        data: localization[k]
                    }
                });
            }

            return accumulator;
        }, {});
    }

    generateLocaleFiles() {
        const options = this.options || {};
        const directory = this.getDirectory();
        const languages = options.languages || [];

        languages.forEach((l) => {
            const localization = this.readLocalization(l);
            const localizationWithMetadata = this.updateLocalization(localization);

            this.writeLocalizationWithMetadata(l, localizationWithMetadata);
        });
    }

    clear() {
        try {
            fs.unlinkSync(defaultLocaleGenerationFilename);
        } catch (e) {
        }

        instance.cache.template = {};
    }

    parseSourceFiles(files) {
        const filesByKey = this.filesByKey = new Map();
        const {__, __n} = instance;

        this.clear();

        files.forEach((m) => {
            const contents = String(fs.readFileSync(m));
            const localization = toLocalization(contents);
            const localizationByFilename = this.localizationByFilename;
            const sourceByFilename = this.sourceByFilename;

            if (localization) {
                const keys = Object.keys(localization);

                Object.values(localization).forEach((v) => {
                    try {
                        eval(v.fn);
                    } catch(e) {
                        console.log(e);
                    }
                });

                keys.forEach((k) => {
                    const {lineNumber} = localization[k];

                    if (!filesByKey.has(k)) {
                        filesByKey.set(k, new Set());
                    }

                    filesByKey.get(k).add(`${m}:${lineNumber}`);
                });

                sourceByFilename.set(m, contents);

                localizationByFilename.set(m, new Set(keys));
            }
        });
    }

    writeToTargets() {
        const target = this.options.target;

        const files = glob(target);

        /*TODO
        if (target) {

            file.forEach((f) => {
                const localization = calculateTranslationsApplicableToPath(f);

                fs.writeFileSync(path.resolve(target, 'locales', `${locale}.json`), localization);
            });
        }
        */
    }

    apply(compiler) {
        compiler.hooks.watchRun.tap("TranslateWebpackPlugin", (compiler) => {
            const options = this.options;
            const files = calculateFiles(compiler, options);

            if (options.debug) {
                console.log('initializing localizations of', files);
            }

            if (files.length) {
                this.parseSourceFiles(files);
                this.generateLocaleFiles();
                this.writeToTargets();
            }
        });
    }
}
