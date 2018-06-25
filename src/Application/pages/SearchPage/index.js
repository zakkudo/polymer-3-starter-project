import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';
import ActionsMixin from './ActionsMixin';
import reducer from './reducer';
import saga from './saga';

 /**
   * description
   * @customElement
   * @polymer
   *
   */
export default class SearchPage extends ActionsMixin(PolymerElement, saga) {
    /**
     * description
     */
    static get properties() {
        return {
            'results': {
                statePath: (state) => {
                    const page = state.page || {};

                    return page.results || fromJS([]);
                },
            },
        };
    }

    /**
     * description
     */
    static get reducer() {
        return reducer;
    }

    /**
     * description
     */
    static get is() {
        return 'z-search-page';
    }

    /**
     * description
     * @param {Object} e The element to be made awesome.
     */
    _handleClick(e) {
        e.preventDefault();
        e.stopPropagation();

        this.dispatch(SearchPage.actions.requestSearch());
    }

    /**
     * description
     */
    static get resolve() {
        return {
            message: 'Authenticating...',
            data: {
                users: () => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve('John Doe');
                        }, 1000);
                    });
                },
            },
        };
    }

    _handleActiveChange(e) {
        const setResults = SearchPage.actions.setResults;
        const active = e.detail.active;
        const results = this.results.setIn([e.model.index, 'active'], active);

        e.preventDefault();
        e.stopPropagation();

        this.dispatch(setResults(results));
    }

    /**
     * description
     * @param {Object} e The element to be made awesome.
     */
    static get template() {
        return html`
          <style>
          :host {
              background-color: blue;
              border: 1m solid green;
          }
          </style>

          <a href="#" on-click="_handleClick">Search!</a>
          <div>
              <h2>Results</h2>
              <template is="dom-if" if={{results.size}}>
                  <ul>
                      <template
                        is="dom-repeat"
                        items="[[_toArrayFromImmutable(results)]]"
                        as="item">
                      <li>
                          <z-toggle
                            active="[[_getFromImmutable(item, 'active')]]"
                            on-active-change="_handleActiveChange">[[_getFromImmutable(item, 'key')]]
                          </z-toggle>
                      </li>
                      </template>
                  </ul>
              </template>
          </div>

            <p>
              Resolved users: [[users]]
              </p>
      `;
    }
}

customElements.define(SearchPage.is, SearchPage);
