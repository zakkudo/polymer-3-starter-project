import * as localization from 'lib/localization';

/**
 * @polymer
 * @mixinFunction
 * @appliesMixin lib/LocalizeMixin
 */
export default (Parent) => {
    return class LocalizeMixin extends Parent {
        __(text, ...args) {
            return localization.__(text, ...args);
        }

        __n(text, ...args) {
            return localization.__n(text, ...args);
        }
    };
};
