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
            expect(fetchMock.calls.all().map((c) => c.args)).toEqual(asserts.calls);
        }

        if (asserts.hasOwnProperty('response')) {
            expect(response).toEqual(asserts.response);
        }
    }
}

fdescribe('lib/fetch', () => {
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
        return fetch('test url', fromJS({
            headers: {
                'Content-Type': 'application/json',
            },
        })).then((response) => {
            Helper.assert(response, {
                response: 'test json response',
                alls: [['test url', {headers: {'Content-Type': 'application/json'}}]],
            });
        });
    });

    it(`parses the text when it's a text header`, () => {
        return fetch('test url', fromJS({
            headers: {
                'Content-Type': 'text/plain',
            },
        })).then((response) => {
            Helper.assert(response, {
                response: 'test text response',
                calls: [['test url', {headers: {'Content-Type': 'text/plain'}}]],
            });
        });
    });

    it(`serializes the body for plain/text`, () => {
        return fetch('test url', fromJS({
            headers: {
                'Content-Type': 'text/plain',
            },
            body: {
                test: 'value',
            },
        })).then((response) => {
            Helper.assert(response, {
                response: 'test text response',
                calls: [['test url', {
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    'body': '{"test":"value"}',
                }]],
            });
        });
    });

    it(`serializes the body for application/json`, () => {
        return fetch('test url', fromJS({
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                test: 'value',
            },
        })).then((response) => {
            Helper.assert(response, {
                response: 'test json response',
                calls: [['test url', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    'body': '{"test":"value"}',
                }]],
            });
        });
    });
});
