import routes from './routes';

describe('Application/routes', () => {
    it('loads with no errors', () => {
        expect(routes.map(({pattern, component}) => {
            if (typeof component === 'function') {
                //We don't care so much about the promise resolution other than
                //if an actual exception is raised by this function call
                component();
            }

            return {pattern};
        })).toEqual([{
            pattern: '/',
        }, {
            pattern: '/users/:id',
        }, {
            pattern: '/about',
        }, {
            pattern: '/fail',
        }, {
            pattern: '/forbidden',
        }]);
    });
});
