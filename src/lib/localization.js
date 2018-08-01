import y18n from 'y18n';

const instance = y18n({
    updateFiles: false,
    locale: 'default',
});

instance.cache['default'] = {};

export function setLocalization(locale, localization) {
    instance.cache[locale] = Object.assign({}, localization);
}

export function mergeLocalization(locale, localization) {
    instance.cache[locale] = Object.assign({}, instance.cache[locale], localization);
}

export function setLocale(locale) {
    instance.setLocale(locale);
}

export function getLocale() {
    return instance.getLocale();
}

export function __(...args) {
    return instance.__(...args);
}

export function __n(...args) {
    return instance.__n(...args);
}
