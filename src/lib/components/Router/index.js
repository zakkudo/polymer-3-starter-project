import '@polymer/app-route/app-location';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import 'lib/components/Route';
import HttpError from 'lib/errors/HttpError';
import Immutable from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
import matchRoute from 'lib/matchRoute';
import resolveComponent from 'lib/resolveComponent';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';

/**
 * @private
 * @param {Immutable.Map} match1 - The first match
 * @param {Immutable.Map} match2 - The second match
 * @return {Boolean} True if they have the same route reference
 */
function matchChanged(match1, match2) {
    if (match1 && !match2) return true;
    if (match2 && !match1) return true;
    if (!match1 && !match2) return false;

    return match1.get('route') !== match2.get('route');
}

const notFoundRoute = fromJS({
    pattern: '/',
    component: () => {
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

    /**
     * @private
     */
    _handleLocationChanged(e) {
        const detail = e.detail || {};
        const reload = detail.reload;

        if (reload) {
            e.preventDefault();
            e.stopPropagation();
            delete this._activeRoute;
            this._out(this._location, this.routes, true);
        }
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('location-changed', this._handleLocationChanged);

        setTimeout(() => {
            this.requestResolve();
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('location-changed', this._handleLocationChanged);
    }

    _handleTitleChange(e) {
        const detail = e.detail || {};

        this.dispatchEvent(new CustomEvent('title-change', {detail}));
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

    /**
     * @private
     */
    _in(match) {
        if (match) {
            const route = match.get('route');

            if (route !== this._activeRoute) {
                this._activeRoute = route;

                this.requestResolve();
            }
        }
    }

    /**
     * @private
     */
    _out(_location, routes, reload = false) {
        const match = matchRoute(_location.path, routes, notFoundRoute);

        if (matchChanged(match, this.match) || reload) {
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
        const match = this.match;

        if (match) {
            this.dispatchEvent(new CustomEvent('request-resolve', {
                detail: {
                    request() {
                        const component = match.getIn(['route', 'component']);

                        if (!component) {
                            return Promise.reject(new HttpError(
                                -1,
                                'Route has no component!',
                                match.location
                            ));
                        }

                        return resolveComponent(component, match);
                    },
                },
            }));
        }
    }
}

customElements.define(Router.is, Router);
