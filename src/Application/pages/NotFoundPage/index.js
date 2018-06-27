import ImmutableMixin from 'lib/ImmutableMixin';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

 /**
   * description
   * @customElement
   * @polymer
   *
   */
export default class NotFoundPage extends ImmutableMixin(PolymerElement) {
    /**
     * description
     */
    static get is() {
        return 'z-not-found-page';
    }

    /**
     * description
     * @param {Object} e The element to be made awesome.
     */
    static get template() {
        return html`
          <h2>Woops! [[_getFromImmutable(params, 'url')]] doesn't exist!</h2>

        <p>Please check your url and try again.</P.
      `;
    }
}

customElements.define(NotFoundPage.is, NotFoundPage);

