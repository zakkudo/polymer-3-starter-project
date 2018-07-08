import {search} from './saga';
import Helper from 'lib/SagaTestHelper';

describe('Application/pages/SearchPage/saga', () => {
    describe('search', () => {
        it('succeeds', () => {
            const results = Helper.run(search(), [
                undefined,
                {json: () => Promise.resolve()},
                {hits: 'test response'},
            ]);

            Helper.assert(results, [{
                CALL: {
                    args: ['/search.json'],
                },
            }, {
                CALL: {
                    args: [],
                },
            }, {
                PUT: {
                    action: {
                        type: 'SEARCH_REQUEST_SUCCEEDED',
                        response: {
                            hits: 'test response',
                        },
                    },
                },
            }, {
                PUT: {
                    action: {
                        type: 'SET_RESULTS',
                        results: 'test response',
                    },
                },
            }, {
                done: true,
            }]);
        });

        it('fails', () => {
            const results = Helper.run(search(), [
                undefined,
                new Error('test failure'),
            ]);

            Helper.assert(results, [{
                CALL: {
                    args: ['/search.json'],
                },
            }, {
                PUT: {
                    action: {
                        type: 'SEARCH_REQUEST_FAILED',
                        reason: new Error('test failure'),
                    },
                },
            }, {
                done: true,
            }]);
        });
    });
});
