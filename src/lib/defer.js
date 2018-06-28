/**
 * Creates a deferred object
 * @return {Object} Returns an object with the deferred promise, the resolve
 * method and the reject method as when received when initializing a new
 * Promise.
 */
export default function defer() {
    let resolve;
    let reject;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    return {promise, resolve, reject};
}
