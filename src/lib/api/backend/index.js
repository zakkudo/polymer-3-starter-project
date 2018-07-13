import ApiTree from 'lib/ApiTree';
import users from './users';

/**
 * Apis for interacting with the backend
 * @module lib/api
 */
export default new ApiTree('https://randomuser.me', {
    users,
}, {
    headers: {
        'Content-Type': 'application/json',
    },
});
