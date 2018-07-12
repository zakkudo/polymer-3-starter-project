import {fromJS} from 'immutable';
import QueryString from 'lib/QueryString';
import Immutable from 'immutable';

/**
 * A convenience wrapper around native fetch. We might not actually
 * be using fetch for all you know...
 * @module lib/fetch
 * @param {String} url - A url to do the transaction
 * @param {FetchInit} [init] - Options to configure the type of transaction
 */
    /*OPTIONS
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
        "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data), // body data type must match "Content-Type" header


    var myInit = { method: 'GET',
        headers: {
            'Content-Type': 'image/jpeg'
        },
        mode: 'cors',
        cache: 'default' };
    */

function stringifyBody(init) {
    if (init.has('body') && typeof init.get('body') !== 'string') {
        return init.set('body', JSON.stringify(init.get('body').toJS()));
    }

    return init;
}

function contentTypeIsApplicationJson(init) {
    const contentType = init.getIn(['headers', 'Content-Type']) || '';

    return contentType.startsWith('application/json');
}

function toFetchInit(init = fromJS({})) {
    let transformRequest = ensureImmutableList(init.get('transformRequest'));
    const blacklisted = new Set(['transformRequest', 'transformResponse', 'params']);

    if (!transformRequest.size) {
        transformRequest = transformRequest.unshift(stringifyBody);
    }

    return transformRequest.reduce(
        (accumulator, fn) => fn(accumulator),
        init.filter((value, key) => !blacklisted.has(key))
    );
}

function ensureImmutableList(data) {
    if (data === null) {
        return null;
    } else if (data === undefined) {
        return fromJS([]);
    } else if (Array.isArray(data)) {
        return fromJS(data);
    } else if (data instanceof Immutable.List === false) {
        return fromJS([data]);
    }

    return data;
}

function constructUrl(url, init) {
    const params = init.get('params');

    if (params && params.size) {
        const serialized = new QueryString(params.toJS);

        if (url.contains('?')) {
            throw new UrlFormtError('Url cannot already contain a query string while ' +
                            'query string is being passed to the fetch config.');
        }

        return `${url}${serialized}`;
    }

    return url;
}

export default function fetch(url, init = fromJS({})) {
    const transformResponse = ensureImmutableList(init.get('transformResponse'));
    const fetchArgs = [constructUrl(url, init), toFetchInit(init)];

    return new Promise((resolve, reject) => {
        window.fetch(...fetchArgs).then((response) => {
            if (contentTypeIsApplicationJson(init)) {
                return response.json();
            }

            return response.text();
        }).then((response) => {
            return transformResponse.reduce(
                (accumulator, fn) => fn(accumulator, fetchArgs),
                response
            );
        }).then(resolve).catch(reject);
    });
}
