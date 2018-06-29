/**
 * Errors propogated so that error pages an expect data in a standard
 * format.
 * @module lib/components/Router/RouterError
 * @memberof module:/lib/components/Router
 */
export default class RouterError extends Error {
    /**
     * @private
     */
    constructor(message, fileName, lineNumber, code) {
        super(message, fileName, lineNumber);

        if (code) {
            this.code = code;
        }
    }
}
