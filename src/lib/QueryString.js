/**
 * @private
 */
function decodeKey(key) {
    return decodeURIComponent(key);
}

/**
 * @private
 */
function encodeKey(key) {
    return encodeURIComponent(key);
}

/**
 * @private
 */
function decodeValue(value) {
    const decoded = decodeURIComponent(value);

    try {
        return JSON.parse(decoded);
    } catch (e) {
        return decoded;
    }
}

/**
 * @private
 */
function encodePair([key, value]) {
    return [encodeKey(key), encodeValue(value)];
}

/**
 * @private
 */
function isValidPair([key, value]) {
    return value !== undefined;
}

/**
 * @private
 */
function decodePair([key, value]) {
    return [decodeKey(key), decodeValue(value)];
}

/**
 * @private
 * @param {String} value - The value to serialize
 */
function encodeValue(value) {
    if (typeof value === 'string') {
        return encodeURIComponent(value);
    } else if (value === undefined) {
        return undefined;
    }

    return encodeURIComponent(JSON.stringify(value));
}

/**
 * @private
 * @param {String} data - The data to parse
 * @return {Object} The parsed data
 */
function parseString(data) {
    return data.replace(/^\?/, '')
        .split(/[;&]/g)
        .map((p) => p.split('='))
        .filter(isValidPair)
        .map(decodePair);
}

function getType(data) {
    if (Object(data) === data && data.toString) {
        return Object.prototype.toString.call(data).slice(8, -1);
    }

    return typeof data;
}

/**
 * @private
 * @param {*} data - The data to parse
 * @return {Object} The parsed data
 */
function parse(data) {
    if (data === undefined) {
        return {};
    } if (typeof data === 'string') {
        const parts = parseString(data);

        return parts.reduce((accumulator, [key, value]) => {
            if (!accumulator.hasOwnProperty(key)) {
                accumulator[key] = value;
            } else if (Array.isArray(accumulator[key])) {
                accumulator[key].push(value);
            } else {
                accumulator[key] = [accumulator[key], value];
            }

            return accumulator;
        }, {});
    } else if (Array.isArray(data)) {
        throw new TypeError(`${getType(data)} isn't an accepted constructor type`);
    } else if (data instanceof QueryString || Object(data) === data) {
        return data;
    }

    throw new TypeError(`${getType(data)} isn't an accepted constructor type`);
}

/**
 * A class for interacting with query strings that prefers
 * automatic json serialization for complex objects
 * @module lib/QueryString
 */
export default class QueryString {
    /**
     * @param {*} data - A String will be parsed, an object will be copied, a QueryString instance will be copied.
    */
    constructor(data) {
        Object.assign(this, parse(data));
    }

    /**
     * Converts the object into it's serialized query string representation
     * that can be used in a url.
     * @return {String} The serialized representation of the QueryString
    */
    toString() {
        const keys = Object.keys(this);
        const pairs = keys.reduce((accumulator, k) => {
            const value = this[k];

            if (Array.isArray(value)) {
                return accumulator.concat(value.map((v) => [k, v]));
            }

            return accumulator.concat([[k, value]]);
        }, []).map(encodePair).filter(isValidPair);
        const serialized = pairs.map((p) => p.join('=')).join('&');

        if (serialized.length) {
            return `?${serialized}`;
        }

        return '';
    }
}
