import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/polymer/lib/elements/dom-repeat';
import 'lib/components/Router';
import 'lib/components/Toggle';
import 'lib/components/View';
import ActionsMixin from './ActionsMixin';
import actions from './actions';
import routes from './routes';
import saga from './saga';
import {fromJS, List} from 'immutable';
import {html, PolymerElement} from '@polymer/polymer/polymer-element';


export default class Application extends ActionsMixin(PolymerElement, saga) {
    static get properties() {
        return {
            'results': {
                //Hook for redux state
                statePath: (state) => {
                    return state.results || fromJS([]);
                }
            },
            'routes': {
                value: fromJS(routes)
            },
            'active': {
                value: fromJS({})
            }
        };
    }

    static get template() {
        return html`
            <h1>Polymer with Webpack example</h1>
            <z-router routes="[[routes]]"></z-router> TODO get the current componen so we can write the route
            <z-view></z-view>
        `;
    }

    _handleClick(e) {
        this.dispatch(Application.actions.requestSearch());
    }

    _handleActiveChange(e) {
        const setResults = Application.actions.setResults,
            active = e.detail.active,
            results = this.results.setIn([e.model.index, 'active'], active);

        this.dispatch(setResults(results));
    }
}

customElements.define('z-application', Application);

