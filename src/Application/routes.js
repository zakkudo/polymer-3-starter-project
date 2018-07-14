import HttpError from 'lib/errors/HttpError';

function importPage(name) {
    return () => {
        return import(/* webpackChunkName: "[request]" */ `./pages/${name}`).then((C) => C.default);
    }
}

/**
 * Routes for the application
 * @private
 */
export default [
    {pattern: '/', component: importPage('SearchPage')},
    {pattern: '/about', component: importPage('AboutPage')},
    {pattern: '/fail', component: () => Promise.reject(new Error('This page failed to load because of some internal exception in the javascript but was handled gracefully'))},
    {pattern: '/forbidden', component: () => Promise.reject(new HttpError(
        403,
        'Forbidden',
        '',
        {},
        'Custom message to show why this page failed in more detail'
    ))},
];
