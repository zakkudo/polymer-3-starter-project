import Translator from '@zakkudo/translator';

const translator = new Translator();

export default translator;

export function __(singular, ...leftover) {
    return translator.__(singular, ...leftover);
}

export function __n(singular, plural, quantity, ...leftover) {
    return translator.__n(singular, plural, quantity, ...leftover);
}
