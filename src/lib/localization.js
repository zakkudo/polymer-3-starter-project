import {__ as singular, __n as plural} from 'y18n';
import y18n from 'y18n';

const instance = y18n({
    updateFiles: false,
    locale: 'en',
});

instance.cache['en'] = {};

export function __(...args) {
    return instance.__(...args);
}

export function __n(...args) {
    return instance.__n(...args);
}
