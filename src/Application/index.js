import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import actions from './actions';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/polymer/lib/elements/dom-if';
import {fromJS, List} from 'immutable';
import ActionsMixin from './ActionsMixin';
import saga from './saga';
import 'lib/components/Toggle';

export default class Application extends ActionsMixin(PolymerElement, saga) {
    static get properties() {
        return {
            'results': {
                //Hook for redux state
                statePath: (state) => {
                    return state.results || fromJS([]);
                }
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
            [[Immutable.get]]
                        <li>
                            <z-toggle active="[[_getFromImmutable(item, 'active')]]" on-active-change="_handleActiveChange">[[_getFromImmutable(item, 'key')]]</z-toggle>
                        </li>
                    </template>
                </ul>
            </template>
            </div>
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

