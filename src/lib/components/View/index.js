import 'polymer-ui-router/uirouter-uiview';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * Used to stamp a component to a specific location based on the
 * `z-router` configuration.
 * @module lib/components/View
 * @customElement
 * @polymer
 */
export default class View extends PolymerElement {
    /**
     * @property {DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`<uirouter-uiview></uirouter-uiview>`;
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-view';
    }

    /**
     * @property {Object} properties - Public Properties.
     * @property {String} properties.name - Name used to allow routes to request specific coomponents for the view.
     * @property {String} properties.component - Fallback component to display in the view.
     */
    static get properties() {
        return {
            name: String,
            component: String,
        };
    }
}

customElements.define(View.is, View);
