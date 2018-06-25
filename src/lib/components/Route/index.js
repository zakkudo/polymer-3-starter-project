import 'polymer-ui-router/uirouter-router';
import Immutable from 'immutable';
import {fromJS} from 'immutable';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';


/**
 * description
 * @customElement
 * @polymer
 *
 */
class Route extends PolymerElement {
    /**
     * description
     */
    static get is() {
        return 'z-route';
    }

    static get template() {
        return html`<div>TEST ROUTE</div>`;
    }

    static get properties() {
        return {
            component: {
                type: String,
            },
            resolve: {
                type: Immutable.map,
            },
        };
    }

    static get observers() {
        return [
            '_transitioned(uiRouterTransition)',
        ];
    }

    _transitioned(transition) {
        const to = transition.to();
        const component = to.contents;
        const resolve = to.resolve || fromJS({});

        debugger;

        if (component !== this._component) {
            const element = document.createElement(component);
            this._component = component;
            this.innerHTML = '';
            this.shadowRoot.appendChild(element);

            debugger;
            resolve.keySeq().forEach((k) => {
                debugger;
                element.set(k, resolve.get(k));
            });
        }
    }
}

customElements.define(Route.is, Route);

