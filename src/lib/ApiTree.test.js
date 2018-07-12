import ApiTree from 'lib/ApiTree';
import fetch from 'lib/fetch';

fdescribe('lib/ApiTree', () => {
    beforeEach(() => {
        fetch.and.returnValue(Promise.resolve('test response'));
    });

    it('generates implied get', () => {
        const api = new ApiTree({
            get: ['/test/path'],
        });

        return api.get().then((response) => {
            expect(response).toEqual('test response');
        });
    });
});
