import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

export default class Link extends PolymerElement {
    /**
     * @private
     */
    constructor() {
        super();
    }

    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
            <a href="#" on-click="_handleClick" title="[[title]]"><slot></slot></a>
        `;
    }


    /**
     * @property {Object} properties - Public Properties.
     * @property {Boolean} properties.active - The active state of the link
     * button.
     */
    static get properties() {
        return {
            to: String,
            reload: Boolean,
        };
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-link';
    }

    /**
     * @private
     * @param {Native.CustomEvent} e - Dispatched event when the component is
     * clicked.
     */
    _handleClick(e) {
        e.stopPropagation();
        e.preventDefault();

        if (this.to) {
            window.history.pushState({}, null, this.to);

            if (this.reload) {
                window.dispatchEvent(new CustomEvent('location-changed', {
                    detail: {
                        reload: true,
                    },
                }));
            } else {
                window.dispatchEvent(new CustomEvent('location-changed'));
            }
        }
    }
}


customElements.define(Link.is, Link);
