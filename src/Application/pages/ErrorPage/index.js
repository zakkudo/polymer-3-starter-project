import ImmutableMixin from 'lib/ImmutableMixin';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

 /**
   * description
   * @customElement
   * @polymer
   *
   */
export default class ErrorPage extends ImmutableMixin(PolymerElement) {
    errorByCode(code) {
        return  {
            '-1': 'Internal Error',
            '400': 'Bad Request',
            '401': 'Unauthorized',
            '403': 'Forbidden',
            '404': 'Not Found',
            '500': 'Internal Server Error',
        }[code];
    }

    /**
     * description
     */
    static get is() {
        return 'z-error-page';
    }

    /**
     * description
     * @param {Object} e The element to be made awesome.
     */
    static get template() {
        return html`
          <h2>Error: [[code]] [[errorByCode(code)]]</h2>
          <p>[[message]]</p>
        `;
    }
}

customElements.define(ErrorPage.is, ErrorPage);

