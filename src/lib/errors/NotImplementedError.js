/**
 * An error used for future code branches that
 * are not implemented yet.
 * @module lib/errors/NotImplementedError
 */
export default class NotImplementedError extends Error {
    /**
     * @return {String} The error as a human readable string
     */
    toString() {
        return `NotImplementedError: ${this.message}`;
    }
}
