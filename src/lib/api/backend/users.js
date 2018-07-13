import api from 'lib/api';

/**
 * Used for manipulating backend users.
 * @namespace api
 * @property api.backend.users
 * @module lib/api
 */
export default {
    /**
     * Queries a list of users
     * @property {Function} api.backend.users.query
     */
    query: ['/api'],
    /**
     * Convenience function to fetch the first 10 users
     * @property {Function} api.backend.users.queryFirstTenusers
     */
    queryFirstTenUsers() {
        return api.backend.users.query({params: {results: 10}});
    },
};
