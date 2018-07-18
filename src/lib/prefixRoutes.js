/**
 * Adds prefixes to each of the routes to make them subroutes
 * @param {String} prefix - The prefix to pretend to each route
 * @param {Immutable.List} routes - A list of routes to add a prefix to
 * @return {Immutable.List} The new list of routes with the new prefix
 * @module lib/prefixRoutes
 */
export default function prefixRoutes(prefix, routes) {
    if (prefix.endsWith('/')) {
        throw new Error('Prefix pattern must not end with a slash', prefix);
    }
    return routes.map((r) => {
        const pattern = r.get('pattern');

        if (!pattern.startsWith('/')) {
            throw new Error('Pattern must start with a slash', pattern);
        }

        return r.set('pattern', `${prefix}${pattern}`);
    });
}
