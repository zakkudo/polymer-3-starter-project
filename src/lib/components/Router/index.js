import '@polymer/polymer/lib/elements/dom-if.js';
import 'lib/components/Route';
import 'polymer-ui-router/uirouter-router';
import Immutable from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
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
                    on-uirouter-start="_handleStart"
                    on-uirouter-finish="_handleFinish"
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
            '_pageResolveChanged(pageResolve)',
        ];
    }

    /**
     * @private
     */
    _pageResolveChanged(pageResolve) {
        if (this.transition) {
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
    _getComponentFromTransition(transition) {
        const to = transition.to();

        return customElements.get(to.contents);
    }

    /**
     * @private
     */
    _getResolveInformation(component) {
        debugger;
        const resolve = component.resolve || {};
        const data = resolve.data || {};
        const message = resolve.message;

        return {data, message};
    }

    /**
     * @private
     */
    _generateRequestFromTransition(transition) {
        let _resolve;
        let _reject;
        const component = this._getComponentFromTransition(transition);
        const {data, message} = this._getResolveInformation(component);

        const promise = new Promise((resolve, reject) => {
            _resolve = resolve;
            _reject = reject;
        });

        function resolve() {
            const keys = Object.keys(data);

            return Promise.all(keys.map((k) => {
                return data[k]();
            })).then((response) => {
                const payload = keys.reduce((accumulator, k, index) => {
                    return Object.assign(accumulator, {[k]: response[index]});
                }, {});

                setTimeout(() => {
                    _resolve(payload);
                });

                return payload;
            }).catch((reason) => {
                setTimeout(() => {
                    _reject(reason);
                });

                throw reason;
            });
        }

        return {
            resolve,
            promise,
            message,
        };
    }

    /**
     * @private
     */
    _handleStart(e) {
        const transition = e.detail.transition;
        const component = this._getComponentFromTransition(transition);
        const {
            resolve,
            promise,
            message,
        } = this._generateRequestFromTransition(transition);

        e.detail.transition.addResolvable({
            token: 'resolve',
            deps: [],
            resolveFn: () => promise,
        });

        this.dispatchEvent(new CustomEvent('page-reducer-change', {detail: {reducer: component.reducer}}));
        this.dispatchEvent(new CustomEvent('request-page-resolve', {detail: {resolve, message}}));
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
