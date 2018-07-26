const isLocalizationFunctionStart = require('./isLocalizationFunctionStart');
const startsWith = require('./startsWith');

const quoteCharacters = new Set([
    "'",
    '"',
    "`"
]);

function isQuote(character) {
    return quoteCharacters.has(character);
}

const escapeCharacters = new Set([
    `'`,
    '"',
    "`",
    "/*",
    "//"
]);

function isEscapeCharacter(character) {
    return escapeCharacters.has(character);
}

const whiteSpaceCharacters = new Set([
    ' ',
    '   ',
]);

function isWhiteSpace(character) {
    return whiteSpaceCharacters.has(character);
}


function push(stack, value) {
    const copy = [value].concat(stack);

    return {stack: copy, head: copy[0]};
}

function pop(stack, value) {
    const copy = stack.slice(1);

    return {stack: copy, head: copy[0]};
}

function continueToQuoteStart(text, state) {
    let stack = null;

    if (isQuote(state.stack[0])) {
        throw new SyntaxError('syntax error, already a quote');
    }

    while ((state = readCharacter(text, state)) !== null) {
        const character = text.charAt(state.index);

        if (isQuote(state.stack[0])) {
            break;
        }

        if (!isQuote(character) && !isWhiteSpace(character)) {
            throw new SyntaxError('localization key must be a literal');
        }
    }

    return state;
}

function continueUntilStackLengthIs(text, state, length) {
    while ((state = readCharacter(text, state)) !== null) {
        if (state.stack.length <= length) {
            break;
        }
    }

    return state;
}

function parseLocalizationFunction(text, {index, stack, lineNumber}) {
    const functionStart = {index, stack, lineNumber};

    index += 1;

    if (text.charAt(index + 1) === '(') {
        index += 1;
    }

    const keyStart = continueToQuoteStart(text, {index, stack, lineNumber});
    const keyEnd = continueUntilStackLengthIs(text, {...keyStart}, keyStart.stack.length - 1);

    if (keyStart.index === keyEnd.index - 1) {
        throw new SyntaxError('empty localization key');
    }

    const functionEnd = (keyEnd.stack[0] === '(') ? continueUntilStackLengthIs(text, {...keyEnd}, keyEnd.stack.length - 1) : keyEnd;

    return {
        ...functionEnd,
        key: text.substring(keyStart.index, keyEnd.index - 1),
        fn: text.substring(functionStart.index, functionEnd.index),
    };
}

function readCharacter(text, {index, stack, lineNumber}) {
    const character = text.charAt(index);
    const previousCharacter = text.charAt(index - 1);
    let head = stack[0];
    const escaped = isEscapeCharacter(head);
    let localization;


    if (character === '') {
        if (stack.length) {
            throw new SyntaxError('text ended with unclosed stack items', stack);
        }

        return null;
    }

    switch (character) {
        case '_':
            if (!escaped) {
                if (isLocalizationFunctionStart(text, {index})) {
                    ({
                        index,
                        stack,
                        lineNumber,
                        ...localization
                    } = parseLocalizationFunction(text, {index, stack, lineNumber}));
                } else {
                    index += 1;
                }
            }
            break;
        case '*':
            if (head === '/*' && startsWith(text, index, '*/')) {
                ({head, stack} = pop(stack));
                index += 2;
            } else {
                index += 1;
            }
            break;
        case '/':
            const testString = text.substring(index, index + 2);

            if (!escaped && testString === '//') {
                ({head, stack} = push(stack, testString));
                index += 2;
            } else if (!escaped && testString === '/*') {
                ({head, stack} = push(stack, testString));
                index += 2;
            } else {
                index += 1;
            }

            break;
        case '`':
        case '"':
        case `'`:
            if (head === character) {
                ({head, stack} = pop(stack));
                index += 1;
            } else if (!escaped) {
                ({head, stack} = push(stack, character));
                index += 1;
            } else {
                index += 1;
            }
            break;
        case '(':
            if (!escaped) {
                ({head, stack} = push(stack, character));
            }
            index += 1;
            break;
        case ')':
            if (!escaped) {
                if (head === '(') {
                    ({head, stack} = pop(stack));
                } else {
                    throw new SyntaxError('missing matching opening brace');
                }
            }
            index += 1;
            break;
        case '\n':
            if (head === '//') {
                ({head, stack} = pop(stack));
            }
            index += 1;
            lineNumber += 1;
            break;
        default:
            index += 1;
            break;
    }

    if (localization) {
        return {index, stack, lineNumber, localization};
    }

    return {index, stack, lineNumber};
}
module.exports = readCharacter;
