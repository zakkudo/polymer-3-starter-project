export default function importPage(name) {
    return () => {
        return import(/* webpackChunkName: "[request]" */ `./pages/${name}`).then((C) => C.default);
    }
}
