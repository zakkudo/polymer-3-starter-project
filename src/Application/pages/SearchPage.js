import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

export default class SearchPage extends PolymerElement {
  constructor() {
      super();
      debugger;
  }

  static get template() { 
      return html`
          <style>
          :host {
              background-color: blue;
              border: 1m solid green;
          }
          </style>
          TEST SEARCH PAGE
      `;
  }
}

// Register the x-custom element with the browser
customElements.define('z-search-page', SearchPage);

