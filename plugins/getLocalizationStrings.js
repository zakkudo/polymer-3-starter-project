function findTranslationEnd(text, index, stack) {
    let previousCharacter = null;
    const length = text.length;

    for (let i = index; i < length; i += 1) {
        const firstInStack = stack[0];
        const character = text.charAt(i);

        if (firstInStack === BACKSLASH) {
            stack.unshift();
        } else {
            switch (character) {
                case '`':
                case '"':
                case `'`:
                    if (firstInStack === character) {
                        stack.shift();
                    } else if (nextCharacterIsStackable(firstInStack)) {
                        stack.unshift(character);
                    }
                    break;
                case '(':
                    if (nextCharacterIsStackable(firstInStack)) {
                        stack.unshift(character);
                    }
                    break;
                case ')':
                    if (nextCharacterIsStackable(firstInStack)) {
                        if (firstInStack === '(') {
                            stack.shift();
                        } else {
                            throw new SyntaxError('missing matching opening brace');
                        }
                    }
                    break;
                case BACKSLASH:
                    if (firstInStack === BACKSLASH) {
                        stack.unshift(BACKSLASH);
                    }
                    break;
                default:
                    break;
            }
        }

        previousCharacter = character;

        if (!stack.length) {
            return i + 1;
        }
    }

    return null;
}

function isWhiteSpace(character) {
    return character === ' ' || character === '\t' || character === null || character === undefined;
}

function isQuote(character) {
    return [`'`, '"', "`"].some((c) => c === character);
}

const quote = new Set();
const BACKSLASH = '\\';

function isBoundary(character) {
    return isWhiteSpace(character) || ['.', '[', '{', '('].some((c) => c === character);
}

function nextCharacterIsStackable(previousCharacter) {
    return [
        BACKSLASH,
        `'`,
        '"',
        "`",
        undefined,
        null,
    ].every((c) => c !== previousCharacter);
}
    /*

function isPluralTranslationStart(text, index) {
    slice(i, `__n('`.length)
    slice(i, `__n("`.length)
    slice(i, '__n`'.length)
}
*/

function toStack(startText) {
    const quote = startText.slice(-1);

    if (startText.slice(-2, -1) === '(') {
        return `(${quote}`.split('').reverse();
    }

    return quote.split('');
}

function getLineNumber(text, index) {
    let lineNumber = 0;

    for (let i = 0; i < index; i += 1) {
        if (text.charAt(i) === '\n') {
            lineNumber += 1;
        }
    }

    return lineNumber;
}

/**
 * Grabs the localization strings from a file.
 * Hard codes what the function names will be...
 * @param {String} text - The source code
 * @return {Array<String>} The strings
 */
module.exports = function getLocalizationStrings(text) {
    debugger;
    const startPatterns = [
        `__\\(\\s*'`,
        '__\\(\\s*"',
        '__\\(\\s*`',
        '__`',
        `__n\\(\\s*'`,
        '__n\\(\\s*"',
        '__n\\(\\s*`',
        '__n`',
    ];
    const pattern = new RegExp(`${startPatterns.join('|')}`, 'gm');
    const strings = [];
    let results = null;

    while ((results = pattern.exec(text)) !== null) {
        try {
            const stack = toStack(results[0]);
            const end = findTranslationEnd(text, pattern.lastIndex, stack);
            const match = text.substring(results.index, end);

            if (end !== null && match) {
                const lineNumber = getLineNumber(text, results.index);

                strings.push({match, lineNumber});
            }
        } catch (e) {
            console.log('invalid string');
        }
    }

    return strings;
}

