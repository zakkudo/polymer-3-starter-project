/**
 * Errors propogated so that error pages an expect data in a standard
 * format.
 * @memberOf module:lib/components/Router/RouterError
 */
export default class RouterError extends Error {
    /**
     * @param {String} message - The error message
     * @param {String} [fileName] - The error filename.
     * @param {String} [lineNumber] = The error line number.
     * @param {String} [code] - An http error code or -1
     */
    constructor(message, fileName, lineNumber, code) {
        super(message, fileName, lineNumber);

        if (code) {
            this.code = code;
        }
    }
}
