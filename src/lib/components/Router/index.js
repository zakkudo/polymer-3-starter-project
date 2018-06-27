import '@polymer/polymer/lib/elements/dom-if.js';
import 'lib/components/Route';
import 'polymer-ui-router/uirouter-router';
import Immutable from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';
import {pushStateLocationPlugin} from '@uirouter/core';

/**
 * Creates a deferred object
 * @return {Object} Things
 */
function defer() {
    let resolve;
    let reject;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });

    return {promise, resolve, reject};
}

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
                    on-uirouter-enter="_handleStart"
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
     * @property {Immutable.Map} properties.pageResolve - The resolve configuration to pass ot the page.
     * @property {Immutable.List} properties.routes - The routes configuration to match up components to urls.
     * @property {Immutable.List} properties.locationPlugin - Control if hash tags or html5 urls are used.
     */
    static get properties() {
        return {
            pageResolve: {
                type: Immutable.Map,
            },
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
            '_pageResolveChanged(pageResolve, pageComponent)',
        ];
    }

    /**
     * @private
     */
    _pageResolveChanged(pageResolve, Component) {
        if (this.transition) {
            this.transition.to().contentsClass = Component;
            this.transition.to().resolve = pageResolve.get('response');
        }
    }

    /**
     * @private
     */
    _routesChanged(routes) {
        this._routes = routes.map((r) => {
            return r.merge({
                component: 'z-route',
                contents: r.get('component'),
            });
        });
    }

    /**
     * @private
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
     */
    _getResolveInformation(component) {
        const resolve = component.resolve || {};
        const data = resolve.data || {};
        const message = resolve.message;

        return {data, message};
    }

    _resolveObject(data) {
        const keys = Object.keys(data);

        return Promise.all(keys.map((k) => data[k]())).then((response) => {
            return keys.reduce((accumulator, k, index) => {
                return Object.assign(accumulator, {[k]: response[index]});
            }, {});
        });
    }

    /**
     * @private
     */
    _generateRequestFromTransition(transition) {
        const deferred = defer();

        const resolve = () => {
            const next = this._requestComponentFromTransition(transition).then((Component) => {
                const {data, message} = this._getResolveInformation(Component);
                const next = this._resolveObject(data).then((response) => {
                    setTimeout(() => {
                        deferred.resolve(response);
                    });

                    return {
                        message,
                        Component,
                        response,
                    };
                });

                setTimeout(() => {
                    next.catch(deferred.reject);
                });

                return {
                    message,
                    Component,
                    next,
                };
            });

            setTimeout(() => {
                next.catch(deferred.reject);
            });

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
     */
    _handleFinish(e) {
        const transition = e.detail.transition;

        this.dispatchEvent(new CustomEvent('route-change-finish', {detail: {transition}}));
        delete this.transition;
    }
}

customElements.define(Router.is, Router);
