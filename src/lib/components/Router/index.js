import '@polymer/app-route/app-location';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import 'lib/components/Route';
import HttpError from 'lib/errors/HttpError';
import Immutable from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
import resolveComponent from 'lib/resolveComponent';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';

/**
 * @private
 */
function cleanUrl(url) {
    return url.split('?')[0].split('#')[0];
}

const notFoundRoute = fromJS({
    pattern: '/:missing', component: () => {
        return Promise.reject(new HttpError(404, 'Not Found'));
    },
});

/**
 * A router button which customizable label
 * @module lib/components/Router
 * @customElement
 * @polymer
 *
 */
export default class Router extends ImmutableMixin(PolymerElement) {
    constructor() {
        super();
        this._handleLocationChanged = this._handleLocationChanged.bind(this);
    }

    _handleLocationChanged(e) {
        const detail = e.detail || {};
        const reload = detail.reload;

        if (reload) {
            e.preventDefault();
            e.stopPropagation();
            delete this._activeRoute;
            this._out(this._location, this.routes);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('location-changed', this._handleLocationChanged);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('location-changed', this._handleLocationChanged);
    }

    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
            <app-location route="{{_location}}"></app-location>
            <template is="dom-repeat" items="{{_toJSFromImmutable(_routes)}}" as="r">
            </template>

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
            '_in(match)',
            '_out(_location, routes)',
        ];
    }

    /**
     * @private
     * @param {Object} _location - The current location information
     */
    _locationChanged(_location, routes) {
        this.setProperties({
            location: fromJS(_location),
        });
    }

    _calculateActiveRoute(_location, routes) {
        if (_location && routes) {
            let params;
            const route = (routes || fromJS([])).find((r) => {
                const keys = [];
                const pattern = r.get('pattern').replace(/:[^/]+/g, (match) => {
                    keys.push(match.substring(1));

                    return '([^/]+)';
                }) + (r.get('exact') ? '$' : '');

                const results = new RegExp(pattern).exec(cleanUrl(_location.path));

                if (results) {
                    const values = results.slice(1);
                    const pairs = keys.map((k, index) => [k, values[index]]);

                    params = pairs.reduce((a, p) => Object.assign(a, {[p[0]]: p[1]}), {});

                    return true;
                }

                return false;
            });

            return fromJS({
                path: _location.path,
                params: params || {},
                route: route || notFoundRoute,
            });
        }
    }

    /**
     * @private
     */
    _in(match) {
        if (match) {
            const route = match.get('route');

            if (route !== this._activeRoute) {
                this._activeRoute = route;

                setTimeout(() => {
                    this.requestResolve();
                });
            }
        }
    }

    /**
     * @private
     */
    _out(_location, routes) {
        const match = this._calculateActiveRoute(_location, routes);

        this.dispatchEvent(new CustomEvent('match-change', {
            detail: {match},
        }));
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
        const match = this.match;

        if (match) {
            this.dispatchEvent(new CustomEvent('request-resolve', {
                detail: {
                    request() {
                        const component = match.getIn(['route', 'component']);

                        if (!component) {
                            return Promise.reject(new HttpError(-1, 'Route has no component!', match.location));
                        }

                        return resolveComponent(component, match);
                    },
                },
            }));
        }
    }
}

customElements.define(Router.is, Router);
