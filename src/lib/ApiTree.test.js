import ApiTree from 'lib/ApiTree';
import fetch from 'lib/fetch';

describe('lib/ApiTree', () => {
    beforeEach(() => {
        fetch.calls.reset();
        fetch.and.returnValue(Promise.resolve('test response'));
    });

    it('generates implied get', () => {
        const api = new ApiTree('https://backend/v1', {
            get: ['/test/path'],
        });

        // TODO
        return api.get().then((response) => {
            expect(response).toEqual('test response');
        });
    });
});
