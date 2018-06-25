import 'polymer-ui-router/uirouter-router';
import '@polymer/polymer/lib/elements/dom-if.js';
import 'lib/components/Route';
import Immutable from 'immutable';
import {fromJS} from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {pushStateLocationPlugin} from '@uirouter/core';


/**
 * description
 * @customElement
 * @polymer
 *
 */
export default class Router extends ImmutableMixin(PolymerElement) {
    /**
     * description
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
     * description
     */
    static get is() {
        return 'z-router';
    }

    /**
     * description
     */
    static get properties() {
        return {
            resolve: {
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

    static get observers() {
        return [
            '_routesChanged(routes)',
            '_resolveChanged(resolve)',
        ];
    }

    _resolveChanged(resolve) {
        if (this.transition) {
            this.transition.to().resolve = resolve.get('response');
        }
    }

    _routesChanged(routes) {
        this._routes = routes.map((r) => {
            return r.merge({
                component: 'z-route',
                contents: r.get('component'),
            });
        });
    }

    _getComponentFromTransition(transition) {
        const to = transition.to();

        return customElements.get(to.contents);
    }

    _getResolveInformation(component) {
        const resolve = component.resolve || {};
        const data = resolve.data || {};
        const message = resolve.message;

        return {data, message};
    }

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
     * description
     */
    _handleStart(e) {
        const transition = e.detail.transition;
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

        this.dispatchEvent(new CustomEvent('request-resolve', {detail: {resolve, message}}));
        this.transition = transition;
    }

    /**
     * description
     */
    _handleFinish(e) {
        const transition = e.detail.transition;

        this.dispatchEvent(new CustomEvent('route-change-finish', {detail: {transition}}));
        delete this.transition;
    }
}

customElements.define(Router.is, Router);
