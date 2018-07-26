import ImmutableMixin from 'lib/mixins/ImmutableMixin';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import importPage from 'application/importPage';

/**
 * @module Application/pages/UsersPage
 * @customElement
 * @polymer
 */
export default class UsersPage extends ImmutableMixin(PolymerElement) {
    /**
     * The default page title
     */
    static get title() {
        return 'User List';
    }

    /**
     * subroutes
     */
    static get routes() {
        return [
            {pattern: '/:id', exact: true, component: importPage('UserPage')},
        ];
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-users-page';
    }

    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
            <h2>This page displays a list of users.</h2>
      `;
    }
}

customElements.define(UsersPage.is, UsersPage);

