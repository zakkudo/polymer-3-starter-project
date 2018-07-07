import routes from './routes';

describe('Application/routes', () => {
    it('loads with no errors', () => {
        expect(routes.map(({name, url, component}) => {
            if (typeof component === 'function') {
                //We don't care so much about the promise resolution other than
                //if an actual exception is raised by this function call
                component();
            }

            return {name, url};
        })).toEqual([{
            name: 'home',
            url: '/',
        }, {
            name: 'about',
            url: '/about',
        }, {
            name: 'fail',
            url: '/fail',
        }, {
            name: 'forbidden',
            url: '/forbidden',
        }]);
    });
});
