module.exports = function hasTranslation(data) {
    if (!data) {
        return false;
    }

    return Object.keys(data).some((k) => {
        if (typeof data[k] === 'string') {
            return Boolean(data[k].length);
        } else {
            return hasTranslation(data[k]);
        }
    });
}
