import 'polymer-ui-router/uirouter-router';
import Immutable from 'immutable';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {fromJS} from 'immutable';


/**
 * Used by the `z-router` internally to control what properties are sent
 * to individual page components.
 * @module lib/components/Route
 * @customElement
 * @polymer
 */
export default class Route extends PolymerElement {
    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-route';
    }

    /**
     * @property {DocumentFragment} template - Template used for
     * rendering the contents of the component.
     */
    static get template() {
        return html``;
    }

    /**
     * @property {Object} properties - Public Properties.
     * @property {String} properties.component - The component to render.
     * @property {Immutable.Map} properties.resolve - Data to pass as
     * properties to the component.
     */
    static get properties() {
        return {
            component: {
                type: String,
            },
            resolve: {
                type: Immutable.Map,
            },
        };
    }

    /**
     * @private
     */
    static get observers() {
        return [
            '_transitioned(uiRouterTransition)',
            '_paramsChanged(uiRouterParams)',
        ];
    }

    /**
     * @private
     * @param {Object} params - The url parameters
     */
    _paramsChanged(params) {
        const element = this.shadowRoot.firstChild;

        if (element) {
            element.set('params', fromJS(this.uiRouterParams));
        }
    }

    /**
     * @private
     * @param {UIRouter.Transition} transition - A transition as
     * described on the ui-router documentation
     */
    _transitioned(transition) {
        const to = transition.to();
        const component = to.contentsClass;
        const errorMessageComponent = to.errorMessageComponent;
        const resolve = to.resolve;
        const error = to.error;

        if (error && errorMessageComponent) {
            const element = document.createElement(errorMessageComponent);

            this.innerHTML = '';
            this.shadowRoot.appendChild(element);

            error.keySeq().forEach((k) => {
                element.set(k, error.get(k));
            });
        } else if (component !== this._component) {
            this._component = component;

            if (component && resolve) {
                const element = document.createElement(component.is);

                this.innerHTML = '';
                this.shadowRoot.appendChild(element);

                resolve.keySeq().forEach((k) => {
                    element.set(k, resolve.get(k));
                });
            }
        }
    }
}

customElements.define(Route.is, Route);

