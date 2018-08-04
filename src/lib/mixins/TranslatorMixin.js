import Translator from 'lib/Translator';

/**
 * @polymer
 * @mixinFunction
 * @appliesMixin lib/TranslatorMixin
 */
export default (Parent) => {
    return class TranslatorMixin extends Parent {
        __(text, ...args) {
            return Translator.__(text, ...args);
        }

        __n(text, ...args) {
            return Translator.__n(text, ...args);
        }
    };
};
