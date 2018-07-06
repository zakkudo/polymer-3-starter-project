import '.';
import '@polymer/polymer/lib/elements/dom-bind.js';
import Helper from 'lib/PolymerTestHelper';
import Immutable from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
import defer from 'lib/defer';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';

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
    it('renders the component with resolve props', () => {
        const deferred = defer();
        const template = html`
            <z-router
                routes="[[routes]]"
                errorMessageComponent="[[errorMessageComponent]]"
                on-request-page-resolve="_handleRequestPageResolve"></z-router>
        `;
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
            routes: fromJS([{
                name: 'home',
                url: '/{path:.*}',
                component: () => Promise.resolve(Dummy),
            }]),
            _handleRequestPageResolve,
            pageComponent: 'z-dummy',
            errorMessageComponent: 'z-dummy',
        });

        document.body.appendChild(root);

        return deferred.promise;
    });
});
