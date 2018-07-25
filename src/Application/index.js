import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/polymer/lib/elements/dom-repeat';
import 'lib/components/Link';
import 'lib/components/LoadingCurtain';
import 'lib/components/Router';
import 'lib/components/Toggle';
import ActionsMixin from 'lib/ActionsMixin';
import ErrorPage from 'application/pages/ErrorPage';
import Immutable from 'immutable';
import actions from './actions';
import localization from 'lib/localization';
import saga from './saga';
import store from './store';
import {fromJS} from 'immutable';
import {html, PolymerElement} from '@polymer/polymer/polymer-element';

/**
 * Demo Application
 * @module Application
 * @customElement
 * @polymer
 * @appliesMixin lib/ActionsMixin
 */
export default class Application extends ActionsMixin(PolymerElement, {actions, store, saga}) {
    /**
     * @property {Object} properties - Public Properties.
     * @property {Immutable.List} properties.routes - The router configuration for the application
     * @property {Polymer.PolymerElement} properties.pageComponent - The current page to show.
     * @property {Function} properties.pageResolve - The current page resolve, passing data to the pageComponent.
     */
    static get properties() {
        return {
            'routes': {
                type: Immutable.List,
                statePath: (state) => state.routes,
            },
            'pageComponent': {
                type: PolymerElement,
                statePath: (state) => state.pageComponent,
            },
            'pageResolve': {
                type: Immutable.Map,
                statePath: (state) => state.pageResolve || fromJS({loading: true}),
            },
            'routerMatch': {
                type: Immutable.Map,
                statePath: (state) => state.routerMatch,
            },
            'errorPageComponent': {
                value: () => ErrorPage,
            },
            'locale': {
                type: String,
                value: () => {
                    return navigator.language;
                },
            },
            'title': {
                type: String,
                statePath: (state) => {
                    if (document.title !== state.title && state.title !== undefined) {
                        document.title = state.title;
                    }

                    return state.title;
                },
            },
        };
    }

    /**
     * @private
     * @param {CustomEvent} e - An html event
     */
    _handleRequestPageResolve(e) {
        const {requestPageResolve} = Application.actions;
        const {request} = e.detail;

        this.dispatch(requestPageResolve(request));
    }

    /**
     * @private
     * @param {CustomEvent} e - An html event
     */
    _handleRouterMatchChange(e) {
        const {setRouterMatch} = Application.actions;

        this.dispatch(setRouterMatch(e.detail.match));
    }

    /**
     * @private
     * @param {CustomEvent} e - An html event
     */
    _handlePageTitleChange(e) {
        const {setPageTitle} = Application.actions;

        this.dispatch(setPageTitle(e.detail.title));
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-application';
    }

    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
            <z-loading-curtain
                message="[[_getFromImmutable(pageResolve, 'message')]]"
                is-loading="[[_getFromImmutable(pageResolve, 'loading')]]">
            </z-loading-curtain>

            <h1>Polymer with Webpack example</h1>

            <ul>
            <li>
                <z-link to="/">UI Home</z-link>
            </li>
            <li>
                <z-link to="/" reload>UI Home with forced reload</z-link>
            </li>
            <li>
                <z-link to="/users">Users list</z-link>
            </li>
            <li>
                <z-link to="/users/zach">Load specific user</z-link>
            </li>
            <li>
                <z-link to="/about">UI About</z-link>
            </li>
            <li>
                <z-link to="/forbidden">Forbidden Page</z-link>
            </li>
            <li>
                <z-link to="/fail">Internal Error Page</z-link>
            </li>
            </ul>
            <z-router
                match="[[routerMatch]]"
                on-match-change="_handleRouterMatchChange"
                resolve="[[pageResolve]]"
                on-request-resolve="_handleRequestPageResolve"
                component="[[pageComponent]]"
                error-message-component="[[errorPageComponent]]"
                title="[[pageTitle]]"
                on-title-change="_handlePageTitleChange"
                routes="[[routes]]"></z-router>


            Your browser language is [[locale]]
        `;
    }
}

customElements.define(Application.is, Application);

