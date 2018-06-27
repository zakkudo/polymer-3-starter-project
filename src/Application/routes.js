function importPage(name) {
    return () => {
        return import(/* webpackChunkName: "[request]" */ `./pages/${name}`).then((C) => C.default);
    }
}

export default [
    {name: 'home', url: '/', component: importPage('SearchPage')},
    {name: 'about', url: '/about', component: importPage('AboutPage')},
];
