import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/polymer/lib/elements/dom-repeat';
import 'lib/components/Toggle';
import ActionsMixin from './ActionsMixin';
import actions from './actions';
import saga from './saga';
import {fromJS, List} from 'immutable';
import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import 'lib/components/Router';
import routes from './routes';


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
            <a href="#" on-click="_handleClick">Search!</a>
            <div>
                <h2>Results</h2>
                <template is="dom-if" if={{results.size}}>
                    <ul>
                        <template is="dom-repeat" items="[[_toArrayFromImmutable(results)]]" as="item">
                            <li>
                                <z-toggle
                                    active="[[_getFromImmutable(item, 'active')]]"
                                    on-active-change="_handleActiveChange">[[_getFromImmutable(item, 'key')]]</z-toggle>
                            </li>
                        </template>
                    </ul>
                </template>

            </div>
            <z-router routes="[[routes]]"></z-router>
        `;
    }

    _handleActiveRouteChange(e) {
        debugger;
    }

    _handleClick(e) {
        this.dispatch(Application.actions.requestSearch());
    }

    _stringify(data) {
        return JSON.stringify(data);
    }

    _handleActiveChange(e) {
        const setResults = Application.actions.setResults,
            active = e.detail.active,
            results = this.results.setIn([e.model.index, 'active'], active);

        this.dispatch(setResults(results));
    }
}

customElements.define('z-application', Application);

