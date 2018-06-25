import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/polymer/lib/elements/dom-repeat';
import 'lib/components/Router';
import 'lib/components/Toggle';
import 'lib/components/View';
import ActionsMixin from './ActionsMixin';
import routes from './routes';
import saga from './saga';
import {fromJS} from 'immutable';
import Immutable from 'immutable';
import {html, PolymerElement} from '@polymer/polymer/polymer-element';


export default class Application extends ActionsMixin(PolymerElement, saga) {
    static get properties() {
        return {
            'routes': {
                type: Immutable.List,
                value: fromJS(routes),
            },
            'pageReducer': {
                type: Function,
                statePath: (state) => {
                    return state.pageReducer;
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
        const message = e.detail.message;

        this.dispatch(requestPageResolve(request, message));
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
            .loading-curtain {
                font-size: 100px;
                display: inline-block;
                transform: rotate(10deg);
                background-color: rgba(255, 255, 255, .7);
            }
            </style>
            <h1>Polymer with Webpack example</h1>
            <z-router
                routes="[[routes]]"
                page-resolve="[[pageResolve]]"
                on-page-reducer-change="_handlePageReducerChange"
                on-request-page-resolve="_handleRequestPageResolve"></z-router>

            <template is="dom-if" if="[[_getFromImmutable(pageResolve, 'loading')]]">
                <div class="loading-curtain">
                    LOADING.... [spinner]
                </div>
            </template>

            <z-view></z-view>
        `;
    }
}

customElements.define(Application.is, Application);

