import '@polymer/polymer/lib/elements/dom-if.js';
import 'lib/components/MissingRoute';
import 'lib/components/Route';
import 'polymer-ui-router/uirouter-router';
import Immutable from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
import defer from 'lib/defer';
import shallowResolveObject from 'lib/shallowResolveObject';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';
import {pushStateLocationPlugin} from '@uirouter/core';

/**
 * Defines sets of components to display for a specific url pattern.
 * This component is mean to be used with `z-view`.
 * @module lib/components/Router
 * @customElement
 * @polymer
 *
 */
export default class Router extends ImmutableMixin(PolymerElement) {
    /**
     * @property {DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
            <template is="dom-if" if="[[_routes.size]]">
                <uirouter-router
                    location-plugin="[[locationPlugin]]"
                    on-uirouter-before="_handleStart"
                    on-uirouter-leave="_handleFinish"
                    states="[[_toJSFromImmutable(_routes)]]"
                    auto-start></uirouter-router>
            </template>
        `;
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-router';
    }

    /**
     * @property {Object} properties - Public Properties.
     * @property {Immutable.Map} properties.pageResolve - The resolve
     * configuration to pass ot the page.
     * @property {Immutable.List} properties.routes - The routes configuration
     * to match up components to urls.
     * @property {Immutable.List} properties.locationPlugin - Control if hash
     * tags or html5 urls are used.
     */
    static get properties() {
        return {
            pageResolve: {
                type: Immutable.Map,
            },
            errorMessageComponent: String,
            pageComponent: String,
            routes: {
                type: Immutable.List,
                value: () => fromJS([]),
            },
            locationPlugin: {
                type: Object,
                value: () => pushStateLocationPlugin,
            },
        };
    }

    /**
     * @private
     */
    static get observers() {
        return [
            '_routesChanged(routes)',
            '_pageResolveChanged(pageResolve, pageComponent, errorMessageComponent)',
        ];
    }

    /**
     * @private
     * @param {Immutable.Map} pageResolve - The resolved data to be injected
     * into the initial page load
     * @param {PolymerElement} Component - A polymer component representing
     * the page to render. It should implement `is`.
     */
    _pageResolveChanged(pageResolve, Component) {
        if (this.transition) {
            const to = this.transition.to();
            const response = pageResolve.get('response');
            const error = pageResolve.get('error');

            delete to.resolve;
            delete to.error;

            to.contentsClass = Component;
            to.errorMessageComponent = this.errorMessageComponent;
            to.resolve = response;
            to.error = error || to.staticError;
        }
    }

    /**
     * @private
     * @param {Array} routes - A list of routes to configure pages to urls
     */
    _routesChanged(routes) {
        this._routes = routes || fromJS([]);

        this._routes = this._routes.map((r) => {
            return r.merge({
                component: 'z-route',
                contents: r.get('component'),
            });
        });


        if (this.errorMessageComponent) {
            this._routes = this._routes.push(fromJS({
                name: '404',
                url: '/{path:.*}',
                error: {
                    'code': '404',
                    'message': 'BOOM',
                },
                component: 'z-missing-route',
                contents: this.errorMessageComponent,
            }));
        }
    }

    /**
     * @private
     * @param {UiRouterTransition} transition - A transition as
     * described on the ui-router documentation
     * @return {Promise} A page component may laod asynchronously,
     * because of code splitting, making a promise necessary.  The Promise
     * will resolve either resolve to a PolymerElement or a String.
     */
    _requestComponentFromTransition(transition) {
        const to = transition.to();

        switch (typeof to.contents) {
            case 'function':
                if (to.contents instanceof PolymerElement) {
                    return Promise.resolve(to.contents);
                }
                return to.contents();
            case 'string':
                return Promise.resolve(customElements.get(to.contents));
        }

        return Promise.resolve(to.contents);
    }

    /**
     * @private
     * @param {PolymerElement} component - A polymer component to get resolve
     * information from
     * @return {Object} An object containing an object with function values
     * that return promises and a loading message.
     */
    _getResolveInformation(component) {
        const resolve = component.resolve || {};
        const data = resolve.data || {};
        const message = resolve.message;

        return {data, message};
    }

    /**
     * @private
     * @param {UiRouterTransition} transition - A transition as
     * described on the ui-router documentation
     * @return {Object} An object contining a defered promise and a resolve
     * function that will cause it to resolve.
     */
    _generateRequestFromTransition(transition) {
        const deferred = defer();
        const options = transition.options();
        const reload = options.reload;
        const from = transition.from();
        const to = transition.to();

        /**
         * @private
         * @param {String} message - A loading message.
         * @param {Object} deferred - A deferred object.
         * @return {Function} A function for handling the error
         * @throws {Object} The error in resolve format.
         */
        function handleError(message, deferred) {
            return (reason) => {
                let message = null;
                let code = null;

                if (reason instanceof Error) {
                    message = String(reason.message);
                    code = '-1';
                } else if (typeof reason === 'string') {
                    message = reason;
                    code = '-1';
                } else if (Object(reason) === reason) {
                    message = reason.message;
                    code = reason.code;
                }

                setTimeout(() => {
                    deferred.resolve(reason);
                });

                deferred.resolve({error: {message, code}});

                throw {
                    message,
                    code,
                };
            };
        }

        const resolve = () => {
            if (reload === false &&
                from === to &&
                to.resolve &&
                to.contentsClass) {
                setTimeout(() => {
                    deferred.resolve(to.resolve);
                });

                return Promise.resolve({
                    message: to.message,
                    Component: to.contentsClass,
                    response: to.resolve,
                });
            }

            const next = this._requestComponentFromTransition(transition).then((Component) => {
                const {data, message} = this._getResolveInformation(Component);
                const next = shallowResolveObject(data).then((_response) => {
                    const response = fromJS(_response);

                    setTimeout(() => {
                        deferred.resolve(response);
                    });

                    return {
                        message,
                        Component,
                        response,
                    };
                }).catch(handleError(message, deferred));

                return {
                    message,
                    Component,
                    next,
                };
            }).catch(handleError(null, deferred));

            return {
                message: null,
                next,
            };
        };

        return {
            resolve,
            deferred,
        };
    }

    /**
     * @private
     * @param {CustomEvent} e - Javascript Event
     */
    _handleStart(e) {
        const transition = e.detail.transition;
        const {
            resolve,
            deferred,
        } = this._generateRequestFromTransition(transition);

        e.detail.transition.addResolvable({
            token: 'resolve',
            deps: [],
            resolveFn: () => deferred.promise,
        });

        this.dispatchEvent(new CustomEvent('request-page-resolve', {
            detail: {resolve},
        }));
        this.transition = transition;
    }

    /**
     * @private
     * @param {CustomEvent} e - A javascript event
     */
    _handleFinish(e) {
        const transition = e.detail.transition;

        this.dispatchEvent(new CustomEvent('route-change-finish', {detail: {transition}}));
        delete this.transition;
    }
}

customElements.define(Router.is, Router);
