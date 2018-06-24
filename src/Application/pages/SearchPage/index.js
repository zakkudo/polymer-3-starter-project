import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import ActionsMixin from './ActionsMixin';
import reducer from './reducer';

export default class SearchPage extends ActionsMixin(PolymerElement) {
  static get reducer() {
      return reducer;
  }

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
      `;
  }
}

// Register the x-custom element with the browser
customElements.define('z-search-page', SearchPage);

