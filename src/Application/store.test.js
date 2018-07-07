import store from './store';

describe('Application/store', () => {
    it('returns a redux store with middleware attached', () => {
        expect(typeof store).toEqual('object');
        expect(typeof store.middleware).toEqual('object');
        expect(typeof store.middleware.saga).toEqual('function');
    });
});
