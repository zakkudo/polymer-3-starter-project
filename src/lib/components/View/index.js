import 'polymer-ui-router/uirouter-uiview';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

export default class View extends PolymerElement {
    static get template() {
        return html`<uirouter-uiview></uirouter-uiview>`;
    }

    static get is() {
        return 'z-view';
    }

    static get properties() {
        return {
            name: String,
            comonent: String,
        };
    }
}

customElements.define(View.is, View);
