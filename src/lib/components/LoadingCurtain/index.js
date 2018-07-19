import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * A loading-curtain button which customizable label
 * @module lib/components/LoadingCurtain
 * @customElement
 * @polymer
 *
 */
export default class LoadingCurtain extends PolymerElement {
    /**
     * @property {Native.DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html`
            <style>
                @keyframes spin {
                    from {transform:rotate(0deg);}
                    to {transform:rotate(360deg);}
                }

                :host {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    transition: opacity .5s linear .1s, .1s visibility .5s;
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: rgba(255, 255, 255, .7);
                    opacity: 0;
                    visibility: hidden;
                }


                :host([is-loading]) {
                    transition: opacity .5s linear .1s, .5s visibility .1s;
                    visibility: visible;
                    opacity: 1;
                }

                :host > .container {
                    animation: spin 2s infinite linear;
                    font-size: 20px;
                    transform: rotate(10deg);
                }
            </style>

            <div class="container">
                [[message]] ... [spinner]
            </div>
      `;
    }

    /**
     * @property {Object} properties - Public Properties.
     * @property {Boolean} properties.active - The active state of the loading-curtain
     * button.
     */
    static get properties() {
        return {
            message: {
                type: String,
                value: () => 'Loading...',
            },
            isLoading: {
                type: Boolean,
                reflectToAttribute: true,
            },
        };
    }

    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-loading-curtain';
    }
}

customElements.define(LoadingCurtain.is, LoadingCurtain);
