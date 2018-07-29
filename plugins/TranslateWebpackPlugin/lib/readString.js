const readCharacter = require('./readCharacter');

function readCharacterWithErrorHandling(text, state) {
    let currentState = Object.assign({}, state);
    let nextState;

    while (nextState === undefined) {
        try {
            nextState = readCharacter(text, currentState);
        } catch (e) {
            currentState.stack = currentState.stack.slice(1);
        }
    }

    return nextState;
}

/**
 * Grabs the localization strings from a file.
 * Hard codes what the function names will be...
 * @param {String} text - The source code
 * @return {Array<String>} The strings
 */
module.exports = function readString(text) {
    const localization = {};
    let results = null;
    let state = {
        index: 0,
        stack: [],
        lineNumber: 0,
    };
    let previousIndex = 0;

    while ((state = readCharacterWithErrorHandling(text, state)) !== null) {
        if (state.index === previousIndex) {
            throw new Error(`infinite loop detected\n\n${JSON.stringify(state, null, 4)}\n\n Problem starts here -> ${text.slice(state.index)}`);
        }

        if (state.localization) {
            const {key, fn} = state.localization;
            const {index, lineNumber} = state;

            localization[key] = {fn, lineNumber, index};
        }

        previousIndex = state.index;
    }

    return localization;
}

