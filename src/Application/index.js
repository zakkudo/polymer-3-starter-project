import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/polymer/lib/elements/dom-repeat';
import 'lib/components/Link';
import 'lib/components/Router';
import 'lib/components/Toggle';
import ActionsMixin from 'lib/ActionsMixin';
import ErrorPage from 'application/pages/ErrorPage';
import Immutable from 'immutable';
import actions from './actions';
import saga from './saga';
import store from './store';
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
                statePath: (state) => state.pageResolve,
            },
            'routerMatch': {
                type: Immutable.Map,
                statePath: (state) => state.routerMatch,
            },
            'errorPageComponent': {
                value: () => ErrorPage,
            },
            'title': {
                type: String,
                statePath: (state) => {
                    if (document.title !== state.title) {
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
            <style>
            @keyframes spin {
                from {transform:rotate(0deg);}
                to {transform:rotate(360deg);}
            }

            .loading-curtain {
                animation: spin 2s infinite linear;
                position: absolute;
                font-size: 100px;
                display: inline-block;
                transform: rotate(10deg);
                background-color: rgba(255, 255, 255, .7);
            }
            </style>
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

            <template
                is="dom-if"
                if="[[_getFromImmutable(pageResolve, 'loading')]]">
                <div class="loading-curtain">
                    [[_getFromImmutable(pageResolve, 'message')]].... [spinner]
                </div>
            </template>
        `;
    }
}

customElements.define(Application.is, Application);

