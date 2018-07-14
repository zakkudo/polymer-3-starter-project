import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import 'lib/components/Route';
import HttpError from 'lib/errors/HttpError';
import Immutable from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
import equal from 'lib/equal';
import resolveComponent from 'lib/resolveComponent';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';



/*
    window.history.pushState({}, null, '/new_path');
    window.dispatchEvent(new CustomEvent('location-changed'));
TODO
*/

/**
 * A router button which customizable label
 * @module lib/components/Router
 * @customElement
 * @polymer
 *
 */
export default class Router extends ImmutableMixin(PolymerElement) {
    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
            <app-location route="{{_location}}"></app-location>
            location [[location]]
            <template is="dom-repeat" items="{{_toJSFromImmutable(routes)}}" as="r">
                <app-route
                    route="{{route}}"
                    pattern="[[r.pattern]]"
                    data="{{_data}}"
                    tail="{{_tail}}">
                </app-route>
            </template>

            TODO
            <z-route
                component="[[component]]"
                error-message-component="[[errorMessageComponent]]"
                match="[[match]]"
                resolve="[[resolve]]"
                title="[[title]]"
                on-title-change="_handleTitleChange">
            </z-route>
        `;
    }

    /**
     * @property {Object} properties - Public Properties.
     * @property {Boolean} properties.active - The active state of the router
     * button.
     */
    static get properties() {
        return {
            component: PolymerElement,
            errorMessageComponent: PolymerElement,
            match: Immutable.Map,
            resolve: Immutable.Map,
            routes: Immutable.List,
            title: String,
        };
    }

    /**
     * @private
     */
    static get observers() {
        return [
            '_locationChanged(_location)',
            '_in(match, params)',
            '_out(_tail, _data)',
            '_routesChanged(routes)',
        ];
    }

    _routesChanged(routes) {
        this.routesByPattern = Immutable.Map(routes.map((r) => [r.get('pattern'), r]));
    }

    /**
     * @private
     * @param {Object} _location - The current location information
     */
    _locationChanged(_location) {
        this.location = fromJS(_location);
        this.route = this.location.toJS();
    }

    /**
     * @private
     */
    _in(match) {
        const {tail, prefix, params = {}, path} = match.toJS();
        const _tail = this._tail || {};
        const _data = this._data || {};
        const routesByPattern = this.routesByPattern || fromJS({});
        const activeRoute = routesByPattern.get(prefix);

        if (this._activeRoute !== activeRoute) {
            this._activeRoute = activeRoute;
            this.requestResolve();
        }

        if (tail !== _tail.path || prefix !== _tail.prefix || !equal(params, _data)) {
            this.setProperties({
                _tail: {
                    path: tail,
                    prefix,
                    __queryParams: _tail.__queryParams,
                },
                _data: params,
            });
        }

        if (path !== this._location.path) {
            this._location = Object.assign({}, this._location, {
                path,
                prefix: '',
            });
        }
    }

    /**
     * @private
     */
    _out(_tail = {}, _data = {}) {
        if (_tail.path !== undefined) {
            const match = fromJS({
                path: this._location.path,
                tail: _tail.path,
                prefix: _tail.prefix,
                params: _data,
            });

            this.dispatchEvent(new CustomEvent('match-change', {
                detail: {match},
            }));
        }
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-router';
    }

    /**
     * @private
     */
    requestResolve() {
        const activeRoute = this._activeRoute;

        if (!activeRoute) {
            debugger;
            return Promise.reject(new HttpError(404, 'Not Found', this.match.location));
        }

        const component = activeRoute.get('component');

        if (!component) {
            debugger;
            return Promise.reject(new HttpError(-1, 'Route has no component!', this.match.location));
        }

        this.dispatchEvent(new CustomEvent('request-resolve', {
            detail: {
                request() {
                    return resolveComponent(component);
                },
            },
        }));
    }
}

customElements.define(Router.is, Router);
