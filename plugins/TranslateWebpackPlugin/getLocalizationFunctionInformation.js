
module.exports = function getTranslationFunctionInformation(text, state) {
    const quote = head.slice(-1);
    const keyStart = state.index + head.length - 1;
    const keyEnd = findEnd(text, keyStart, [quote]);

    const fnStart = index;
    const fnEnd = findEnd(text, pattern.lastIndex, [quote, ')']);

    return {
        key: text.substring(keyStart, keyEnd),
        fn: text.substring(fnStart, fnEnd),
        lineNumber: state.lineNumber,
    };
}

