/**
 * A convenience function to shallow resolve an object into usable data.
 * @module lib/shallowResolveObject
 * @param {Object} data - A object who's values are functions that return
 * promises.
 * @return {Promise} Resolves to an object with the same keys, but with the
 * promises resolved.
 */
export default function shallowResolveObject(data) {
    debugger;
    const keys = Object.keys(data);

    return Promise.all(keys.map((k) => data[k]())).then((response) => {
    debugger;
        return keys.reduce((accumulator, k, index) => {
    debugger;
            return Object.assign(accumulator, {[k]: response[index]});
        }, {});
    });
}

