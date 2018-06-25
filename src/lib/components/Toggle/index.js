import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// Define the element's API using an ES2015 class
export default class Toggle extends PolymerElement {
    constructor() {
        super();
        this.addEventListener('click', this._handleClick, true);
    }

    // Define optional shadow DOM template
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

    // Declare properties for the element's public API
    static get properties() {
        return {
            active: {
                type: Boolean,
                reflectToAttribute: true,
            },
        };
    }

    static get is() {
        return 'z-toggle';
    }

    _handleClick(e) {
        const active = !this.active;

        e.stopPropagation();
        e.preventDefault();

        this.dispatchEvent(new CustomEvent('active-change', {
            detail: {active},
        }));
    }
}

// Register the x-custom element with the browser
customElements.define(Toggle.is, Toggle);
