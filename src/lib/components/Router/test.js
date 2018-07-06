import '.';
import '@polymer/polymer/lib/elements/dom-bind.js';
import Helper from 'lib/PolymerTestHelper';
import RouterError from 'lib/errors/RouterError';
import Immutable from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
import defer from 'lib/defer';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';

/**
 * @private
 */
afterEach(() => {
    document.body.innerHTML = '';
});

/**
 * @private
 */
export default class Dummy extends ImmutableMixin(PolymerElement) {
    /**
     * @private
     */
    static get template() {
        return html``;
    }

    /**
     * @private
     */
    static get is() {
        return 'z-dummy';
    }

    /**
     * @private
     */
    static get properties() {
        return {};
    }

    /**
     * @private
     */
    static get resolve() {
        return {
            message: 'Test Loading Message...',
            data: {
                test: () => Promise.resolve('test resolve value'),
            },
        };
    }
}

customElements.define(Dummy.is, Dummy);

describe('lib/components/Router', () => {
    it('renders the component with resolve props when routes match', () => {
        const deferred = defer();
        const template = html`
            <z-router
                routes="[[routes]]"
                error-message-component="[[errorMessageComponent]]"
                on-request-page-resolve="_handleRequestPageResolve"></z-router>
        `;
        const routes = fromJS([{
            name: 'home',
            url: '/',
            component: () => Promise.resolve(Dummy),
        }]);
        const _handleRequestPageResolve = jasmine.createSpy().and.callFake((request) => {
            const {message, next} = request.detail.resolve();
            const steps = [{message}];

            next.then(({Component, message, next}) => {
                steps.push({Component, message});

                next.then(({Component, message, response}) => {
                    steps.push({Component, message, response: response.toJS()});

                    expect(response instanceof Immutable.Map).toBe(true);

                    expect(steps).toEqual([{
                        message: null,
                    }, {
                        message: 'Test Loading Message...',
                        Component: Dummy,
                    }, {
                        message: 'Test Loading Message...',
                        Component: Dummy,
                        response: {
                            'test': 'test resolve value',
                        },
                    }]);

                    deferred.resolve({Component, message, response});
                }).catch(deferred.reject);
            }).catch(deferred.reject);
        });

        const root = Helper.createElement(template, {
            routes,
            _handleRequestPageResolve,
            pageComponent: 'z-dummy',
            errorMessageComponent: 'z-dummy',
        });

        document.body.appendChild(root);

        return deferred.promise;
    });

    xit('renders the missing page component when no routes match', () => {
        const deferred = defer();
        const template = html`
            <z-router
                routes="[[routes]]"
                error-message-component="[[errorMessageComponent]]"
                on-request-page-resolve="_handleRequestPageResolve"></z-router>
        `;
        const routes = fromJS([{
            name: 'home',
            url: '/',
            component: () => Promise.resolve(Dummy),
        }]);

        const _handleRequestPageResolve = jasmine.createSpy().and.callFake((request) => {
            const {message, next} = request.detail.resolve();
            const steps = [{message}];

            next.then(({Component, message, next}) => {
                steps.push({Component, message});

                next.then(({Component, message, response}) => {
                    steps.push({Component, message, response: response.toJS()});

                    expect(response instanceof Immutable.Map).toBe(true);

                    expect(steps).toEqual([{
                        message: null,
                    }, {
                        message: 'Test Loading Message...',
                        Component: Dummy,
                    }, {
                        message: 'Test Loading Message...',
                        Component: Dummy,
                        response: {
                            'test': 'test resolve value',
                        },
                    }]);

                    deferred.resolve({Component, message, response});
                }).catch(deferred.reject);
            }).catch(deferred.reject);
        });

        const root = Helper.createElement(template, {
            routes,
            _handleRequestPageResolve,
            pageComponent: 'z-dummy',
            errorMessageComponent: 'z-dummy',
        });

        document.body.appendChild(root);

        return deferred.promise;
    });

    xit('shows an error page when an there is a rejection', () => {
        const deferred = defer();
        const template = html`
            <z-router
                routes="[[routes]]"
                error-message-component="[[errorMessageComponent]]"
                on-request-page-resolve="_handleRequestPageResolve"></z-router>
        `;
        const routes = fromJS([{
            name: 'home',
            url: '/',
            component: () => Promise.reject(new Error('test error')),
        }]);

        const _handleRequestPageResolve = jasmine.createSpy().and.callFake((request) => {
            const {next} = request.detail.resolve();

            next.then(() => {
                deferred.reject('An exception should be thrown');
            }).catch(() => {});

            next.catch((reason) => {
                const expected = new RouterError('test error', null, null, -1);

                expect(reason).toEqual(expected);
                deferred.resolve();
            });
        });

        const root = Helper.createElement(template, {
            routes,
            _handleRequestPageResolve,
            pageComponent: 'z-dummy',
            errorMessageComponent: 'z-dummy',
        });

        document.body.appendChild(root);

        return deferred.promise;
    });
});
