const JSON5 = require('json5');
const path = require('path');
const fs = require('fs');
const toLocalization = require('./toLocalization');
const hasTranslation = require('./hasTranslation');
const scrubLocalization = require('./scrubLocalization');
const glob = require('glob');
const y18n = require('y18n');

const sourceFiles = {};
const translatables = {};

const defaultLocaleGenerationDirectory = path.resolve('./.locale-gen');
const defaultLocaleGenerationFilename = path.resolve(defaultLocaleGenerationDirectory, 'default.json');

const instance = y18n({
    updateFiles: true, //If it doesn't write the file, it also don't update the cache
    directory: defaultLocaleGenerationDirectory,
    locale: 'default',
});

function toString(meta) {
    const keys = Object.keys(meta);
    const length = keys.length;

    return keys.reduce((serialized, k, i) => {
        const hasMore = i < length - 1;
        const indent = '    ';
        const note = (meta[k].note === 'unused' || meta[k].note === 'new') ? `${indent}// ${meta[k].note.toUpperCase()}\n` : '';

        return `${serialized}${note}${indent}"${k}": ${JSON.stringify(meta[k].data)}${hasMore ? ',' : ''}\n`;
    }, '{\n') + '}';
}

module.exports = class TranslateWebpackPlugin {
    constructor(options) {
        this.options = options;
    }

    applyUpdates(targetDirectory = './locales') {
        const options = this.options;
        const languages = options.languages;
        const d = instance.cache.default;
        const scrubbed = scrubLocalization(d);

        languages.forEach((l) => {
            let data;
            const filename = `${targetDirectory}/${l}.json`;

            if (fs.existsSync(filename)) {
                data = JSON5.parse(fs.readFileSync(filename));
            } else {
                    data = {}
            }

            const meta = Object.keys(data).reduce((accumulator, k) => {
                if (hasTranslation(data[k])) {
                    return Object.assign(accumulator, {
                        [k]: {
                            note: (d[k]) ? 'existing' : 'unused',
                            data: data[k]
                        }
                    });
                }

                return accumulator;
            }, {});

            Object.keys(scrubbed).forEach((k) => {
                if (!meta.hasOwnProperty(k)) {
                    meta[k] = {
                        note: 'new',
                        data: scrubbed[k]
                    };
                }
            });

            fs.writeFileSync(filename, toString(meta));
        });
    }

    localeGen(matches) {
        const {__, __n} = instance;

        try {
            fs.unlinkSync(defaultLocaleGenerationFilename);
        } catch (e) {
        }

        instance.cache.default = {};

        matches.forEach((m) => {
            const contents = String(fs.readFileSync(m));

            sourceFiles[m] = contents;
            translatables[m] = toLocalization(contents);

            translatables[m].forEach((t) => {
                try {
                    eval(t.match);
                } catch(e) {
                    console.log(e);
                }
            });
        });

        this.applyUpdates();
    }

    writeToTargets() {
        /*TODO
        const target = this.options.target;

        if (target) {
            const files = glob(target);

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
            const watcher = compiler.watchFileSystem.watcher;
            const modifiedFiles = Object.keys(watcher.mtimes);

            if (!modifiedFiles.length) {
                if (options.debug) {
                    console.log('initializing localizations of', options.files);
                }
                this.localeGen(glob.sync(options.files));
            } else {
                if (options.debug) {
                    console.log('updating localizations of', modifiedFiles);
                }
                this.localeGen(modifiedFiles);
            }

            this.writeToTargets();
        });
    }
}
