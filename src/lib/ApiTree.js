import fetch from 'lib/fetch';
import {fromJS} from 'immutable';


/**
 * Generates a function that calls fetch with predefined
 * default options to a selected url.
 * @param {Object} self - The root of the tree
 * @param {Array} args - The arguments that will be passed to fetch mostly as-is
 * @param {String} args.url - The url to access
 * @param {Object} args.options - An options object similar to what would be passed to fetch
 * @return {Function} A function with callable options to do an api call
 * @private
 */
function generateFetchMethod(self, [pathname, endpointOptions]) {
    return (overrideOptions = {}) => {
        const baseOptions = self.options.toJS();
        const options = Object.assign(
            baseOptions,
            endpointOptions,
            overrideOptions
        );
        const url = `${self.baseUrl}${pathname}`;

        return fetch(url, options);
    };
}

/**
 * Parses configuration data into a usable api tree. The api tree
 * has convenience methods for doing pre-defined api actions.
 * @param {Object} self - The root of the tree
 * @param {Object} data - The api configuration
 * @return {Object} The parsed api tree
 * @private
 */
function parse(self, data) {
    // Assume is fetch configuration definition
    if (Array.isArray(data)) {
        return generateFetchMethod(self, data);
        // If it's a function, bind ot the base object for convenience functions
    } else if (typeof data === 'function') {
        return data.bind(self);
        // Otherwise we pass through
    } else if (Object(data) === data) {
        return Object.keys(data).reduce((accumulator, k) => {
            return Object.assign(accumulator, {
                [k]: parse(self, data[k]),
            });
        }, {});
        // Assume this is deeper in the tree
    } else {
        return data;
    }
}

/**
 * Converts a configuration into an easy to use api tree.
 * @module lib/ApiTree
 */
export default class ApiTree {
    /**
     * @param {String} baseUrl - The url to concat with all paths
     * @param {*} tree - The configuration tree for the apis
     * @param {Object} options - Options that will be the default base init for fetch operations.
     * Other inits are layered on top of this.
    */
    constructor(baseUrl, tree, options = {}) {
        this.baseUrl = baseUrl || '';
        this.options = fromJS(options);
        Object.assign(this, parse(this, tree));
    }
}
