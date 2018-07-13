import ApiTree from 'lib/ApiTree';
import users from './users';

/**
 * Apis for interacting with the backend
 * @name lib/api
 * @memberof module:lib/api
 * @property {Object} api.backend - Backend api helpers
 */
export default new ApiTree('https://randomuser.me', {
    users,
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});
