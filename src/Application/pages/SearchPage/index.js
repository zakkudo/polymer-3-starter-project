import ActionsMixin from 'lib/mixins/ActionsMixin';
import api from 'lib/api';
import actions from './actions';
import reducer from './reducer';
import saga from './saga';
import store from 'application/store';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';

/**
 * @module Application/pages/SearchPage
 * @customElement
 * @polymer
 */
export default class SearchPage extends ActionsMixin(PolymerElement, {actions, saga, store}) {
    /**
     * @property {Object} properties - Public Properties.
     * @property {Immutable.List} properties.results - The search results of
     * the api call
     */
    static get properties() {
        return {
            'results': {
                statePath: (state) => state.page.results || fromJS([]),
            },
        };
    }

    /**
     * The default page title
     */
    static get title() {
        return 'Search';
    }

    /**
     * The page reducer.
     */
    static get reducer() {
        return reducer;
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-search-page';
    }

    /**
     * @private
     */
    _handleClick(e) {
        e.preventDefault();
        e.stopPropagation();

        this.dispatch(SearchPage.actions.requestSearch());
    }

    /**
     * The resovle object that should be loaded
     * before showing the page.
     */
    static get resolve() {
        return {
            message: 'Resolving Users...',
            localization: './.locales',
            data: {
                users: () => new Promise((resolve, reject) => {
                    setTimeout(() => { // Make the loading time more exciting!
                        api.backend.users.query().then((response) => {
                            resolve(response.join(', '));
                        }).catch(reject);
                    }, 1000);
                }),
            },
        };
    }

    /**
     * @private
     */
    _handleActiveChange(e) {
        const setResults = SearchPage.actions.setResults;
        const active = e.detail.active;
        const results = this.results.setIn([e.model.index, 'active'], active);

        this.dispatchEvent(new CustomEvent('title-change', {
            detail: {
                title: 'search with active options',
            },
        }));

        e.preventDefault();
        e.stopPropagation();

        this.dispatch(setResults(results));
    }

    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
          <style>
          :host {
          display: block;
              background-color: #eee;
              border: 1em solid green;
          }
          </style>
          <h2>Welcome to home! You can search for groceries here.</h2>

          <a href="#" on-click="_handleClick">Search!</a>
          <div>
              <h2>Groceries</h2>
              <template is="dom-if" if={{results.size}}>
                  <ul>
                      <template
                        is="dom-repeat"
                        items="[[_toArrayFromImmutable(results)]]"
                        as="item">
                      <li>
                          <z-toggle
                            active="[[_getFromImmutable(item, 'active')]]"
                            on-active-change="_handleActiveChange">
                            [[_getFromImmutable(item, 'key')]]
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

