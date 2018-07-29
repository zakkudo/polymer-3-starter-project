

module.exports = function isSubPath(path, subPath) {
    return subPath.startsWith(path) &&
        (path.length === subPath.length || subPath.charAt(path.length) === '/');
}
