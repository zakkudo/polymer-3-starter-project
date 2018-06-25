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
            'resolve': {
                type: Immutable.Map,
                statePath: (state) => {
                    return state.resolve;
                },
            },
        };
    }

    _handleRequestResolve(e) {
        const {requestResolve} = Application.actions;
        const request = e.detail.resolve;
        const message = e.detail.message;

        this.dispatch(requestResolve(request, message));
    }

    static get is() {
        return 'z-application';
    }

    static get template() {
        return html`
            <h1>Polymer with Webpack example</h1>
            <z-router
                routes="[[routes]]"
                resolve="[[resolve]]"
                on-request-resolve="_handleRequestResolve"></z-router>

            <z-view></z-view>
        `;
    }
}

customElements.define(Application.is, Application);

