import HttpError from 'lib/errors/HttpError';
import Immutable from 'immutable';
import QueryString from 'lib/QueryString';
import {fromJS} from 'immutable';

/**
 * Fetch config
 * @namepspace Fetch
 * @typedef Fetch
 * @see {@link https://developer.mozilla.org/docs/Web/API/Fetch_API}
 */

/**
 * Fetch Init
 * @memberof Fetch
 * @typedef {Object} Init
 * @property {boolean} init.method - *GET, POST, PUT, DELETE, etc.
 * @property {boolean} init.mode - no-cors, cors, *same-origin
 * @property {boolean} init.cache - default, no-cache, reload, force-cache, only-if-cached
 * @property {boolean} init.credentials - include, same-origin, *omit
 * @property {boolean} init.headers - "application/json; charset=utf-8".
 * @property {boolean} init.redirect - manual, *follow, error
 * @property {boolean} init.referrer - no-referrer, *client
 * @property {boolean} init.body - JSON.stringify(data), // body data type must match "Content-Type" header
 * @property {boolean} init.params - Query params to be appended to the url. The url must not already have params.
 * @property {boolean} init.transformRequest - Transforms for the request body.  When not supplied, it by default json serializes the contents if not a simple string.
 * @property {boolean} init.transformResponse - Transform the response.
 */

function stringifyBody(init) {
    if (init.hasOwnProperty('body') && typeof init.body !== 'string') {
        init.body = JSON.stringify(init.body);
    }

    return init;
}

function contentTypeIsApplicationJson(init) {
    const contentType = init.getIn(['headers', 'Content-Type']) || '';

    return contentType.startsWith('application/json');
}

function toFetchInit(init) {
    let transformRequest = ensureImmutableList(init.get('transformRequest'));
    const blacklisted = new Set(['transformRequest', 'transformResponse', 'params']);

    if (!transformRequest.size) {
        transformRequest = transformRequest.unshift(stringifyBody);
    }

    return fromJS(transformRequest.reduce(
        (accumulator, fn) => fn(accumulator),
        init.filter((value, key) => !blacklisted.has(key)).toJS()
    ));
}

function ensureImmutableList(data) {
    if (!data) {
        return fromJS([]);
    } else if (data instanceof Immutable.List === false) {
        return fromJS([data]);
    }

    return data;
}

function constructUrl(url, init) {
    const params = init.get('params');

    if (params && params.size) {
        const serialized = new QueryString(params.toJS());

        if (url.includes('?')) {
            throw new Error('Duplicate ? in URI');
        }

        return `${url}${serialized}`;
    }

    return url;
}

/**
 * @private
 */
function applyCustomOptions(url, init) {
    const _init = fromJS(init);

    return [
        constructUrl(url, _init),
        toFetchInit(_init),
        ensureImmutableList(_init.get('transformResponse')),
    ];
}

function throwHttpErrors(response) {
    return (payload) => {
        if (!response.ok) {
            const {status, statusText, headers, url} = response;

            throw new HttpError(status, statusText, url, headers, payload);
        }

        return payload;
    };
}

/**
 * A convenience wrapper for native fetch.
 * @param {String} url - The prefered url
 * @param {Fetch.Init} init - Options modifying the network call, mostly analogous to fetch
 * @return {Promise} A promise that resolves to the response
 * @module lib/fetch
 */
export default function fetch(url, init = {}) {
    return new Promise((resolve, reject) => {
         const [_url, _init, transformResponse] = applyCustomOptions(url, init);

        window.fetch(_url, _init.toJS()).then((response) => {
            if (contentTypeIsApplicationJson(_init)) {
                return response.json().then(throwHttpErrors(response));
            }

            return response.text().then(throwHttpErrors(response));
        }).then((response) => {
            return transformResponse.reduce(
                (accumulator, fn) => fn(accumulator, _url, _init.toJS()),
                response
            );
        }).then(resolve).catch(reject);
    });
}
