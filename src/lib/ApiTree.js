import fetch from 'lib/fetch';
import {fromJS} from 'immutable';

/**
 * Converts a configuration into an easy to use api tree.
 * @module lib/ApiTree
 */
export default class ApiTree {
    constructor(tree, options = {}) {
        this._setOptions(options);
        Object.assign(this, this._parse(tree));
    }

    /**
     * Overwrite the default base options of the api tree.
     * @param {Object} options - The new options
     */
    _setOptions(options) {
        this._options = fromJS(options);
    }

    /**
     * Generates a function that calls fetch with predefined
     * default options to a selected url.
     * @param {Array} args - The arguments that will be passed to fetch mostly as-is
     * @param {String} args.url - The url to access
     * @param {Object} args.options - An options object similar to what would be passed to fetch
     * @return {Function} A function with callable options to do an api call
     */
    _generateFetchMethod([url, options]) {
        return (overrideOptions = {}) => {
            const finalOptions = Object.assign(this._options.toJS(), options, overrideOptions);

            return fetch(url, finalOptions);
        };
    }

    /**
     * Parses configuration data into a usable api tree. The api tree
     * has convenience methods for doing pre-defined api actions.
     * @param {Object} data - The api configuration
     * @return {Object} The parsed api tree
     */
    _parse(data) {
        // Assume is fetch configuration definition
        if (Array.isArray(data)) {
            return this._generateFetchMethod(data);
        // Assume this is deeper in the tree
        } else if (Object(data) === data) {
            return Object.keys(data).reduce((accumulator, k) => {
                return Object.assign(accumulator, {
                    [k]: this._parse(data[k]),
                });
            }, {});
        // If it's a function, bind ot the base object for convenience functions
        } else if (typeof data === 'function') {
            return data.bind(this);
        // Otherwise we pass through
        } else {
            return data;
        }
    }
}
