import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/polymer/lib/elements/dom-repeat';
import 'application/pages/ErrorPage';
import 'lib/components/Link';
import 'lib/components/Router';
import 'lib/components/Toggle';
import 'lib/components/View';
import ActionsMixin from './ActionsMixin';
import Immutable from 'immutable';
import routes from './routes';
import saga from './saga';
import {fromJS} from 'immutable';
import {html, PolymerElement} from '@polymer/polymer/polymer-element';


/**
 * Demo Application
 * @module Application
 * @customElement
 * @polymer
 */
export default class Application extends ActionsMixin(PolymerElement, saga) {
    /**
     * @property {Object} properties - Public Properties.
     * @property {Immutable.List} properties.routes - The router configuration
     * for the application
     * @property {Polymer.PolymerElement} properties.pageComponent - The current page
     * to show.
     * @property {Function} properties.pageResolve - The current page resolve,
     * passing data to the pageComponent.
     */
    static get properties() {
        return {
            'routes': {
                type: Immutable.List,
                value: fromJS(routes),
            },
            'pageComponent': {
                type: Object,
                statePath: (state) => {
                    return state.pageComponent;
                },
            },
            'pageResolve': {
                type: Immutable.Map,
                statePath: (state) => {
                    return state.pageResolve;
                },
            },
        };
    }

    _handleRequestPageResolve(e) {
        const {requestPageResolve} = Application.actions;
        const request = e.detail.resolve;

        this.dispatch(requestPageResolve(request));
    }

    static get is() {
        return 'z-application';
    }

    _handlePageReducerChange(e) {
        const {setPageReducer} = Application.actions;

        this.dispatch(setPageReducer(e.detail.reducer));
    }

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
                <z-link state="home">UI Home</z-link>
            </li>
            <li>
                <z-link state="home" reload>UI Home with forced reload</z-link>
            </li>
            <li>
                <z-link state="about">UI About</z-link>
            </li>
            <li>
                <z-link state="forbidden">Forbidden Page</z-link>
            </li>
            <li>
                <z-link state="fail">Internal Error Page</z-link>
            </li>
            </ul>
            <z-router
                routes="[[routes]]"
                page-component="[[pageComponent]]"
                error-message-component="z-error-page"
                page-resolve="[[pageResolve]]"
                on-request-page-resolve="_handleRequestPageResolve"></z-router>

            <template is="dom-if" if="[[_getFromImmutable(pageResolve, 'loading')]]">
                <div class="loading-curtain">
                    [[_getFromImmutable(pageResolve, 'message')]].... [spinner]
                </div>
            </template>

            <z-view></z-view>
        `;
    }
}

customElements.define(Application.is, Application);

