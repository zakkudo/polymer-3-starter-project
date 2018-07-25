const readCharacter = require('./readCharacter');

module.exports = function findEnd(text, index, stack) {
    const length = text.length;

    for (let i = index; i < length && stack.length; i += 1) {
        readCharacter(text, index, stack);
    }

    return index;
}

