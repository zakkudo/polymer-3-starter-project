import y18n from 'y18n';

const instance = y18n({
    updateFiles: false,
    locale: 'default',
});

instance.cache['default'] = {};

export function setLocalization(language, localization) {
    instance.cache[language] = localization.toJS();
}

export function setLocale(language) {
    instance.setLocale(language);
}

export function __(...args) {
    return instance.__(...args);
}

export function __n(...args) {
    return instance.__n(...args);
}
