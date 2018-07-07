import ImmutableMixin from 'lib/ImmutableMixin';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * A generic page that can be used for showing
 * various error types.
 * @module Application/pages/ErrorPage
 * @customElement
 * @polymer
 */
export default class ErrorPage extends ImmutableMixin(PolymerElement) {
    /**
     * Converts an erorr code to a string
     * @param {String} code - An http error code
     * @return {String} A text representation of the code
     */
    errorByCode(code) {
        return {
            '-1': 'Internal Error',
            '400': 'Bad Request',
            '401': 'Unauthorized',
            '403': 'Forbidden',
            '404': 'Not Found',
            '500': 'Internal Server Error',
        }[code];
    }

    /**
     * The default page title
     */
    static get title() {
        return 'Oops! You weren\'t supposed to see this...';
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-error-page';
    }

    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
          <h2>Error: [[code]] [[errorByCode(code)]]</h2>
          <p>[[message]]</p>
        `;
    }
}

customElements.define(ErrorPage.is, ErrorPage);

