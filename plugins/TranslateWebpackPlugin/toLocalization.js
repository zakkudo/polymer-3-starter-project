const readCharacter = require('./readCharacter');

/**
 * Grabs the localization strings from a file.
 * Hard codes what the function names will be...
 * @param {String} text - The source code
 * @return {Array<String>} The strings
 */
module.exports = function toLocalization(text) {
    const localization = {};
    let results = null;
    let state = {
        index: 0,
        stack: [],
        lineNumber: 0,
    };

    while ((state = readCharacter(text, state)) !== null) {
        if (state.localization) {
            const {key, fn} = state.localization;

            localization[key] = fn;
        }
    }

    return localization;
}

