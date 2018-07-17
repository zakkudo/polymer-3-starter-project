import {fromJS} from 'immutable';

/*
        return fromJS({
            path: _location.path,
            params: params || {},
            route: route || notFoundRoute,
        });
        */

/**
 * @private
 * Removes any suffix to the url in the form of a query string or hash string
 * @param {String} path - The url path to clean
 * @return {String} The cleaned url
 */
function cleanPath(path) {
    return path.split('?')[0].split('#')[0];
}

/**
 * @private
 * @param {String} path - A url path
 * @param {Immutable.List} routes - A list of routes
 * @return {Immutable.Map|null} The route if there is a match, or null
 */
function search(path, routes) {
    let params = {};
    let route = null;

    routes.some((r) => {
        const keys = [];
        const pattern = r.get('pattern').replace(/:[^/]+/g, (match) => {
            keys.push(match.substring(1));

            return '([^/]+)';
        }) + (r.get('exact') ? '$' : '');
        const results = new RegExp(pattern).exec(cleanPath(path));

        if (results) {
            const values = results.slice(1);
            const pairs = keys.map((k, index) => [k, values[index]]);

            route = r;
            params = pairs.reduce((a, p) => Object.assign(a, {[p[0]]: p[1]}), {});

            return true;
        }

        return false;
    });

    if (route) {
        return {
            route,
            params,
        };
    }

    return null;
}

/**
 * Returns one of the routes if the pattern in the route matches the current path.
 * If non match and a fallback route is provided, that is returned.
 * @param {String} path - A url path (like users/:id)
 * @param {Immutable.List} routes - A list of routes to match against
 * @param {Immutable.Map} [fallback] - A fallback route to be used if no others match. Aka, your 404 route.
 * @return {Immutable.Map} The route whose pattern matches the path
 */
export default function matchRoute(path, routes = fromJS([]), fallback = null) {
    const match = search(path, routes) || {};

    if (path && match) {
        const {route, params} = match;

        return fromJS({
            path,
            params,
            route,
        });
    } else if (path && fallback) {
        return fromJS({
            path,
            params: {},
            route: fallback,
        });
    }

    return null;
}

