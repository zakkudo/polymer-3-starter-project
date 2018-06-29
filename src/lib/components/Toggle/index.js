import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * A toggle button which customizable label
 * @module lib/components/Toggle
 * @customElement
 * @polymer
 *
 */
export default class Toggle extends PolymerElement {
    /**
     * @private
     */
    constructor() {
        super();
        this.addEventListener('click', this._handleClick, true);
    }

    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
          <style>
          :host {
              border: 1px solid gray;
              border-radius: 3px;
              color: var(--default-fg);
              background-color: var(--default-bg);
              user-select: none;
              -webkit-user-select: none;
              cursor: default;
              padding: 3px;
              min-width: 10em;
              margin: 3px;
              display: inline-block;
          }

          :host([active]) {
              background-color: var(--primary-fg);
              color: var(--primary-bg);
          }
          </style>
          <span class="icon">✓</span>
          <slot></slot>
      `;
    }

    /**
     * @property {Object} properties - Public Properties.
     * @property {Boolean} properties.active - The active state of the toggle
     * button.
     */
    static get properties() {
        return {
            active: {
                type: Boolean,
                reflectToAttribute: true,
            },
        };
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-toggle';
    }

    /**
     * @private
     * @param {Native.CustomEvent} e - Dispatched event when the component is
     * clicked.
     */
    _handleClick(e) {
        const active = !this.active;

        e.stopPropagation();
        e.preventDefault();

        /**
         * An active change request to raise the new active state.
         * @event module:lib/components/Toggle~active-change
         * @type {Object}
         * @property {boolean} active - The new active state.
         */
        this.dispatchEvent(new CustomEvent('active-change', {
            detail: {active},
        }));
    }
}

customElements.define(Toggle.is, Toggle);
