const quoteCharacters = new Set([
    "'",
    '"',
    "`"
]);

function isQuote(character) {
    return quoteCharacters.has(character);
}

const BACKSLASH = '\\';

const escapeCharacters = new Set([
    BACKSLASH,
    `'`,
    '"',
    "`",
    undefined,
    null
]);

function startsWith(haystack, index, needle) {
    return haystack.substring(index, index + needle.length) === needle;
}

function push(stack, value) {
    const copy = [value].concat(stack);

    return {stack: copy, head: copy[0]};
}

function pop(stack, value) {
    const copy = stack.slice(1);

    return {stack: copy, head: stack[0]};
}

function isTranslationFunctionStart(text, {index}) {
    ['__(', '__n(', '__`', '__n`']
}

function continueToQuoteStart(text, state) {
    let stack = null;

    if (isQuote(state.stack[0])) {
        throw new SyntaxError('syntax error, already a quote');
    }

    while ((state = readCharacter(text, state)) !== null) {
        if (isQuote(state.stack[0])) {
            break;
        }
    }

    return state;
}

function continueUntilStackLengthIs(text, state, length) {
    if (!isQuote(state.stack[0])) {
        throw new SyntaxError('you can\t close a quote that doesn\'t exist');
    }

    while ((state = readCharacter(text, state)) !== null) {
        if (state.stack.length < length) {
            break;
        }
    }

    return state;
}

function parseTranslationFunction(text, {index, stack, lineNumber}) {
    const functionStart = {index, stack, lineNumber};
    index += 1;
    const keyStart = continueToQuoteStart(text, {index, stack, lineNumber});

    if (!keyStart || keyStart.stack.length < stack.length) {
        throw new SyntaxError('translation function contains no string!');
    }

    const keyEnd = continueUntilStackLengthIs(text, {index, stack, lineNumber}, keyStart.stack.length - 1);
    const functionEnd = continueUntilStackLengthIs(text, {index, stack, lineNumber}, keyStart.stack.length - 2);

    return {
        key: text.substring(keyStart.index, keyEnd.index),
        fn: text.substring(functionStart.index, functionEnd.index),
        index,
        lineNumber,
        stack
    };
}

module.exports = function readCharacter(text, {index, stack, lineNumber}) {
    const character = text.charAt(i);
    const previousCharacter = text.charAt(i - 1);
    let head = stack[0];
    const escaped = escapeCharacters.has(head);

    if (character === '') {
        if (stack.length) {
            throw new Error('text end with unclosed stack items', stack);
        }

        return null;
    }

    if (head === BACKSLASH) {
        stack = pop(stack);
        index += 1;

        return {index, stack, lineNumber};
    }

    switch (character) {
        case '_':
            if (!escaped) {
                if (isTranslationFunctionStart(text, index)) {
                    const {key, fn} = parseTranslationFunction(text, {index, stack, lineNumber});
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
        case '\n':
            if (head === '/*') {
                ({head, stack} = pop(stack));
                index += 2;
            } else {
                index += 1;
            }
            lineNumber += 1;
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
        case BACKSLASH:
            if (head !== BACKSLASH) {
                ({head, stack} = push(stack, BACKSLASH));
            }
            index += 1;
            break;
        default:
            index += 1;
            break;
    }

    return {index, stack, lineNumber};
}
