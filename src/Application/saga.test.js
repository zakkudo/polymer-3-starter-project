import Helper from 'lib/SagaTestHelper';
import HttpError from 'lib/errors/HttpError';
import actions from './actions';
import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {requestResolve} from './saga';

class TestApplicationSagaFallbackComponent extends PolymerElement {
    static get template() {
        return html``;
    }

    static get is() {
        return 'z-test-application-saga-fallback-component';
    }
}

customElements.define(
    TestApplicationSagaFallbackComponent.is,
    TestApplicationSagaFallbackComponent
);

describe('Application/saga', () => {
    describe('resolve', () => {
        it('succeeds even with no next', () => {
            const request = jasmine.createSpy().and.returnValue(Promise.resolve('test resolve'));
            const results = Helper.run(requestResolve(actions.requestPageResolve(request)), [
                undefined,
                {'Component': {'resolve': {'message': 'test message'}}},
            ]);

            Helper.assert(results, [{
                CALL: {
                    args: [],
                },
            }, {
                PUT: {
                    action: {
                        type: '@APPLICATION/PAGE_RESOLVE_REQUEST_SUCCEEDED',
                        response: {
                            Component: {
                                resolve: {
                                    message: 'test message',
                                },
                            },
                            response: null,
                        },
                    },
                },
            }, {
                PUT: {
                    action: {
                        type: '@APPLICATION/SET_PAGE_COMPONENT',
                        component: {'resolve': {'message': 'test message'}},
                    },
                },
            }, {
                done: true,
            }]);
        });

        it('succeeds even with next', () => {
            const request = jasmine.createSpy().and.returnValue(Promise.resolve('test resolve'));
            const results = Helper.run(requestResolve(actions.requestPageResolve(request)), [
                undefined,
                {
                    next: 'next',
                    message: 'test first message',
                },
                undefined,
                {
                    message: 'test next message',
                    Component: 'test component',
                    response: 'test response',
                },
            ]);

            Helper.assert(results, [{
                CALL: {
                    args: [],
                },
            }, {
                PUT: {
                    action: {
                        type: '@APPLICATION/SET_PAGE_RESOLVE',
                        resolve: {
                            loading: true,
                            message: 'test first message',
                        },
                    },
                },
            },
            'next',
            {
                PUT: {
                    action: {
                        type: '@APPLICATION/PAGE_RESOLVE_REQUEST_SUCCEEDED',
                        response: {
                            Component: 'test component',
                            response: 'test response',
                        },
                    },
                },
            }, {
                PUT: {
                    action: {
                        type: '@APPLICATION/SET_PAGE_COMPONENT',
                        component: 'test component',
                    },
                },
            }, {
                PUT: {
                    action: {
                        type: '@APPLICATION/SET_PAGE_RESOLVE',
                        resolve: {
                            loading: false,
                            message: 'test next message',
                            response: 'test response',
                        },
                    },
                },
            }, {
                done: true,
            }]);
        });

        it('errors gracefully', () => {
            const request = jasmine.createSpy().and.returnValue(Promise.resolve('test resolve'));
            const results = Helper.run(requestResolve(actions.requestPageResolve(request)), [
                undefined,
                new HttpError(
                    'test status',
                    'test status text'
                ),
            ]);

            Helper.assert(results, [{
                CALL: {
                    args: [],
                },
            }, {
                PUT: {
                    action: {
                        type: '@APPLICATION/PAGE_RESOLVE_REQUEST_FAILED',
                        reason: new HttpError(
                            'test status',
                            'test status text'
                        ),
                    },
                },
            }, {
                PUT: {
                    action: {
                        type: '@APPLICATION/SET_PAGE_COMPONENT',
                        component: null,
                    },
                },
            }, {
                PUT: {
                    action: {
                        type: '@APPLICATION/SET_PAGE_RESOLVE',
                        resolve: {
                            loading: false,
                            error: new HttpError(
                                'test status',
                                'test status text'
                            ),
                        },
                    },
                },
            }, {
                done: true,
            }]);
        });
    });
});
