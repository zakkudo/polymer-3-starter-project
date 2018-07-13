export default class UrlError extends Error {
    constructor(message, url) {
        super(`${message} <${url}>`);
        this.url = url;
    }

    toString() {
        return `UrlError: ${this.message}`;
    }
}
