const translationStartPatterns = new Set([
    `__('`,
    '__("',
    '__(`',
    '__`',
    `__n('`,
    '__n("',
    '__n(`',
    '__n`',
]);

module.exports = function isLocalizaationStart(text, state) {
    const head = state.stack[0];

    return translationStartPatterns.has(head);
}
