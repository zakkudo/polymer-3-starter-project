import QueryString from 'lib/QueryString';
import UrlError from 'lib/errors/UrlError';

/**
 * Helper class to interpolate params into the url and
 * to attach the remained ero the end of the url as query params.
 */
export default class Url {
    /**
     * @param {String} url - The url pattern
     * @param {Object} params - Params to interpolate or append to the url when stringify.
     */
    constructor(url, params = {}) {
        this.params = params;
        this.url = url;
    }

    /**
     * Stringifies the current url settings
     * @return {String} The string form of the url
     */
    toString() {
        const pattern = /\/(:[^/]+)/g;
        const query = new QueryString(this.params);

        const url = this.url.replace(pattern, (m, match) => {
            const key = match.substring(1);
            const param = query[key];

            if (query.hasOwnProperty(key) && param !== undefined) {
                delete query[key];

                return String(`/${param}`);
            }

            throw new UrlError(`No replacement exists for ${match} in the params`, this.url);
        });

        const queryAsString = String(query);

        if (url.includes('?') && queryAsString.length) {
            throw new UrlError('Trying to add duplicate query param when already exists', this.url);
        }

        return `${url}${queryAsString}`;
    }
}
