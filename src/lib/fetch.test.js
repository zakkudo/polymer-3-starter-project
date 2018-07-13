import fetch from './fetch.js';
import {fromJS} from 'immutable';

let fetchMock;

/**
 * @private
 */
class Helper {
    /**
     * @private
     */
    static assert(response, asserts) {
        if (asserts.hasOwnProperty('calls')) {
            expect(fetchMock.calls.all().map((c) => fromJS(c.args).toJS())).toEqual(asserts.calls);
        }

        if (asserts.hasOwnProperty('response')) {
            expect(response).toEqual(asserts.response);
        }
    }
}

function toArgs(call) {
    return fromJS(call.args).toJS();
}

describe('lib/fetch', () => {
    beforeEach(() => {
        fetchMock = spyOn(window, 'fetch');
        fetchMock.and.returnValue(Promise.resolve({
            json: () => Promise.resolve('test json response'),
            text: () => Promise.resolve('test text response'),
        }));
    });

    it('returns response using text as fallback loader', () => {
        return fetch('test url').then((response) => {
            Helper.assert(response, {
                response: 'test text response',
                calls: [['test url', {}]],
            });
        });
    });

    it('passes in the fetch init', () => {
        return fetch('test url', {test: 'fetch init'}).then((response) => {
            Helper.assert(response, {
                response: 'test text response',
                calls: [['test url', {test: 'fetch init'}]],
            });
        });
    });

    it('returns response using text as fallback loader', () => {
        fetchMock.and.returnValue(Promise.reject(new Error('test error')));

        return fetch('test url').catch((reason) => {
            Helper.assert(reason, {
                response: new Error('test error'),
                calls: [['test url', {}]],
            });
        });
    });

    it(`parses the json when it's a json header`, () => {
        return fetch('test url', {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            Helper.assert(response, {
                response: 'test json response',
                alls: [['test url', {headers: {'Content-Type': 'application/json'}}]],
            });
        });
    });

    it(`parses the text when it's a text header`, () => {
        return fetch('test url', {
            headers: {
                'Content-Type': 'text/plain',
            },
        }).then((response) => {
            Helper.assert(response, {
                response: 'test text response',
                calls: [['test url', {headers: {'Content-Type': 'text/plain'}}]],
            });
        });
    });

    it(`serializes the body for plain/text`, () => {
        return fetch('test url', {
            headers: {
                'Content-Type': 'text/plain',
            },
            body: {
                test: 'value',
            },
        }).then((response) => {
            Helper.assert(response, {
                response: 'test text response',
                calls: [['test url', {
                    'headers': {
                        'Content-Type': 'text/plain',
                    },
                    'body': '{"test":"value"}',
                }]],
            });
        });
    });

    it(`serializes the body for application/json`, () => {
        return fetch('test url', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                test: 'value',
            },
        }).then((response) => {
            Helper.assert(response, {
                response: 'test json response',
                calls: [['test url', {
                    'headers': {
                        'Content-Type': 'application/json',
                    },
                    'body': '{"test":"value"}',
                }]],
            });
        });
    });

    it('transforms the response', () => {
        const transformResponse = jasmine.createSpy()
            .and.returnValue('test transformed response');

        return fetch('test url', {
            transformResponse,
        }).then((response) => {
            expect(response).toEqual('test transformed response');
            expect(transformResponse.calls.all().map(toArgs)).toEqual([[
                'test text response',
                'test url',
                {},
            ]]);
        });
    });

    it('chains the transforms to the response', () => {
        const firstTransformResponse = jasmine.createSpy()
            .and.returnValue('test first transformed response');

        const secondTransformResponse = jasmine.createSpy()
            .and.returnValue('test second transformed response');

        return fetch('test url', {
            transformResponse: [
                firstTransformResponse,
                secondTransformResponse,
            ],
        }).then((response) => {
            expect(response).toEqual('test second transformed response');
            expect(firstTransformResponse.calls.all().map(toArgs)).toEqual([[
                'test text response',
                'test url',
                {},
            ]]);

            expect(secondTransformResponse.calls.all().map(toArgs)).toEqual([[
                'test first transformed response',
                'test url',
                {},
            ]]);
        });
    });

    it('transforms the request', () => {
        const transformRequest = jasmine.createSpy()
            .and.returnValue({test: 'test transformed request'});

        return fetch('test url', {
            transformRequest,
        }).then((request) => {
            expect(request).toEqual('test text response');
            expect(fetchMock.calls.all().map(toArgs)).toEqual([[
                'test url',
                {'test': 'test transformed request'},
            ]]);
            expect(transformRequest.calls.all().map(toArgs)).toEqual([[{
            }]]);
        });
    });

    it('chains the transforms to the request', () => {
        const firstTransformRequest = jasmine.createSpy()
            .and.returnValue({test: 'test first transformed request'});

        const secondTransformRequest = jasmine.createSpy()
            .and.returnValue({test: 'test second transformed request'});

        return fetch('test url', {
            transformRequest: [
                firstTransformRequest,
                secondTransformRequest,
            ],
        }).then((request) => {
            expect(request).toEqual('test text response');
            expect(fetchMock.calls.all().map(toArgs)).toEqual([[
                'test url',
                {'test': 'test second transformed request'},
            ]]);

            expect(firstTransformRequest.calls.all().map(toArgs)).toEqual([[
                {},
            ]]);

            expect(secondTransformRequest.calls.all().map(toArgs)).toEqual([[
                {test: 'test first transformed request'},
            ]]);
        });
    });

    it('adds params to the url', () => {
        return fetch('test url', {
            params: {
                'test': 'param',
            },
        }).then((response) => {
            expect(fetchMock.calls.all().map(toArgs)).toEqual([[
                'test url?test=param',
                {},
            ]]);
        });
    });

    it('throws an exception when there are params but the base url already has params', () => {
        return fetch('test url?', {
            params: {
                'test': 'param',
            },
        }).catch((reason) => {
            expect(reason).toEqual(new Error('Duplicate ? in URI'));
        });
    });
});
