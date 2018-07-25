const readCharacter = require('./readCharacter');
const isLocalizationFunctionStart = require('./isLocalizationFunctionStart');
const getLocalizationFunctionInformation = require('./getLocalizationFunctionInformation');

/**
 * Grabs the localization strings from a file.
 * Hard codes what the function names will be...
 * @param {String} text - The source code
 * @return {Array<String>} The strings
 */
module.exports = function toLocalization(text) {
    const localization = {};
    let results = null;
    const state = {
        index: 0,
        stack: [],
        lineNumber: 0,
    };

    while (readCharacter(text, state)) {
        const head = stack[0];

        if (isLocalizationFunctionStart(text, state)) {
            const information = getLocalizationFunctionInformation(text, state);

            if (information) {
                state.index += state.fn.length;
                localization[information.key] = information;
            }
        }
    }

    return localization;
}

