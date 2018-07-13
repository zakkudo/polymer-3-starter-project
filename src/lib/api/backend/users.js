import api from 'lib/api';

/*
 * Used for manipulating backend users.
 * @namespace
 * @property api.backend.users
 * @module lib/api
 */
export default {
    /*
     * Queries a list of users
     * @module lib/api
     * @property {Object} api.backend.users.query
     */
    query: ['/api', {
        transformResponse(response) {
            debugger;
            return response.results.map((r) => {
                return `${r.name.first} ${r.name.last}`;
            });
        }
    }],
    /*
     * Convenience function to fetch the first 10 users
     * @property {Function} api.backend.users.queryFirstTenusers
     */
    queryFirstTenUsers() {
        return api.backend.users.query({params: {results: 10}});
    },
};
