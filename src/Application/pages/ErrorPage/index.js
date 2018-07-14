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
     * Converts an erorr status to a string
     * @param {String} status - An http error status
     * @return {String} A text representation of the status
     */
    errorByCode(status) {
        return {
            '-1': 'Internal Error',
            '400': 'Bad Request',
            '401': 'Unauthorized',
            '403': 'Forbidden',
            '404': 'Not Found',
            '500': 'Internal Server Error',
        }[status];
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

    static get properties() {
        return {
            error: Error,
        };
    }

    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
          <h2>Error: [[error.status]] [[error.statusText]]</h2>
          <p>[[error.response]]</p>
        `;
    }
}

customElements.define(ErrorPage.is, ErrorPage);

