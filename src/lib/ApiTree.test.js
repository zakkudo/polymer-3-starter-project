import ApiTree from 'lib/ApiTree';
import fetch from 'lib/fetch';
import Helper from 'lib/MockTestHelper';

describe('lib/ApiTree', () => {
    beforeEach(() => {
        fetch.calls.reset();
        fetch.and.returnValue(Promise.resolve('test response'));
    });

    it('generates implied get', () => {
        const api = new ApiTree('https://backend/v1', {
            get: ['/test/path'],
        });

        expect(JSON.parse(JSON.stringify(api))).toEqual({
            baseUrl: 'https://backend/v1',
            options: {},
        });

        return api.get({'params': {id: '1234'}}).then((response) => {
            expect(Helper.getCallArguments(fetch)).toEqual([[
                'https://backend/v1/test/path',
                {params: {id: '1234'}},
            ]]);
            expect(response).toEqual('test response');
        });
    });

    it('generates deep implied get', () => {
        const api = new ApiTree('https://backend/v1', {
            get: ['/test/path'],
        });

        expect(JSON.parse(JSON.stringify(api))).toEqual({
            baseUrl: 'https://backend/v1',
            options: {},
        });

        return api.get({'params': {id: '1234'}}).then((response) => {
            expect(Helper.getCallArguments(fetch)).toEqual([[
                'https://backend/v1/test/path',
                {params: {id: '1234'}},
            ]]);
            expect(response).toEqual('test response');
        });
    });
});
