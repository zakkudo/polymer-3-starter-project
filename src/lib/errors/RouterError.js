/**
 * Errors propogated so that error pages an expect data in a standard
 * format.
 * @module lib/errors/RouterError
 */
export default class RouterError extends Error {
    /**
     * @private
     */
    constructor(message, fileName, lineNumber, code, fallbackComponent) {
        super(message, fileName, lineNumber);

        if (fallbackComponent) {
            this.fallbackComponent = fallbackComponent;
        }

        this.code = String(code || '-1');
    }

    /**
     * @private
     */
    toString() {
        return `RouterError: ${this.code} ${this.message}`;
    }
}
