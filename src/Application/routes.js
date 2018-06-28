function importPage(name) {
    return () => {
        return import(/* webpackChunkName: "[request]" */ `./pages/${name}`).then((C) => C.default);
    }
}

export default [
    {name: 'home', url: '/', component: importPage('SearchPage')},
    {name: 'about', url: '/about', component: importPage('AboutPage')},
    {name: 'fail', url: '/fail', component: () => Promise.reject('This page failed to load because of some internal exception in the javascript but was handled gracefully')},
    {name: 'forbidden', url: '/forbidden', component: () => Promise.reject({
        code: '403',
        message: 'Custom message to show why this page failed in more detail'
    })},
];
