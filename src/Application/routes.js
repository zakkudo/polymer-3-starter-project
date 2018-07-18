import HttpError from 'lib/errors/HttpError';
import importPage from 'application/importPage';

/**
 * Routes for the application
 * @private
 */
export default [
    {pattern: '/', exact: true, component: importPage('SearchPage')},
    {pattern: '/users', component: importPage('UsersPage')}, //This is exact false so it can add its own subroutes
    {pattern: '/about', exact: true, component: importPage('AboutPage')},
    {pattern: '/fail', exact: true, component: () => Promise.reject(new Error('This page failed to load because of some internal exception in the javascript but was handled gracefully'))},
    {pattern: '/forbidden', exact: true, component: () => Promise.reject(new HttpError(
        403,
        'Forbidden',
        '',
        {},
        'Custom message to show why this page failed in more detail'
    ))},
];
