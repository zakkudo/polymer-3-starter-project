import 'polymer-ui-router/uirouter-router';
import 'polymer-ui-router/uirouter-uiview';
import Immutable from 'immutable';
import {fromJS} from 'immutable';
import ImmutableMixin from 'lib/ImmutableMixin';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {pushStateLocationPlugin} from '@uirouter/core';

debugger;
export default class Router extends ImmutableMixin(PolymerElement) {
  static get template() { 
      return html`
          <uirouter-router location-plugin="[[locationPlugin]]" states="[[_toJSFromImmutable(routes)]]" auto-start></uirouter-router>
          <uirouter-uiview></uirouter-uiview>
      `;
  }

  static get properties() {
    return {
      routes: {
            type: Immutable.List,
            value: () => fromJS([])
      },
      locationPlugin: {
          type: Object,
          value: () => pushStateLocationPlugin
      }
    }
  }

}

customElements.define('z-router', Router);
