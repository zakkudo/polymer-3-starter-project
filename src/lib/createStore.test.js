import createStore from './createStore';
import passthrough from 'lib/passthrough';

describe('lib/createStore', () => {
    it('returns a redux store with middleware attached', () => {
        const store = createStore(passthrough);

        expect(typeof store).toEqual('object');
        expect(typeof store.middleware).toEqual('object');
        expect(typeof store.middleware.saga).toEqual('function');
    });
});
