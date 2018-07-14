import NotImplementedError from 'lib/errors/NotImplementedError';
/**
 * A convenience function to shallow resolve an object into usable data.
 * @module lib/shallowResolve
 * @param {Object|Array} data - A object who's values are functions that return
 * promises.
 * @return {Promise} Resolves to an object with the same keys, but with the
 * promises resolved.
 */
export default function shallowResolve(data, context) {
    if (Array.isArray(data)) {
        throw new NotImplementedError(
            'Array functionality is not implemented yet for shallowResolve'
        );
    }

    const keys = Object.keys(data);

    return Promise.all(keys.map((k) => data[k](context))).then((response) => {
        return keys.reduce((accumulator, k, index) => {
            return Object.assign(accumulator, {[k]: response[index]});
        }, {});
    });
}

