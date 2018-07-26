import ImmutableMixin from 'lib/mixins/ImmutableMixin';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * @module Application/pages/UserPage
 * @customElement
 * @polymer
 */
export default class UserPage extends ImmutableMixin(PolymerElement) {
    /**
     * The default page title
     */
    static get title() {
        return 'User Detail';
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-user-page';
    }

    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
            <h2>This is the user page for [[_getInImmutable(resolve, "response", "match", "params", "id")]]</h2>
      `;
    }
}

customElements.define(UserPage.is, UserPage);

