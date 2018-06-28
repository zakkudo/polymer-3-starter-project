import 'polymer-ui-router/uirouter-sref';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * Wrapper for link that uses pushState instead of writing to the url
 * which reduces flicker and improves the user experience.
 * @module lib/components/Link
 * @customElement
 * @polymer
 */
export default class Link extends PolymerElement {
    /**
     * @property {DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
            <uirouter-sref state="[[state]]" reload="[[reload]]">
                <slot></slot>
            </uirouter-sref>
        `;
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-link';
    }

    /**
     * @property {Object} properties - Public Properties.
     * @property {String} properties.state - Alias for the url you want to
     * transition to
     * @property {Boolean} properties.reload - Force the state to refresh
     * regardless if it is already loaded
     */
    static get properties() {
        return {
            state: String,
            reload: Boolean,
        };
    }
}

customElements.define(Link.is, Link);
