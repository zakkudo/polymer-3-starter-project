import 'polymer-ui-router/uirouter-router';
import Immutable from 'immutable';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import Route from 'lib/components/Route';
import {fromJS} from 'immutable';

/**
 * Used by the `z-router` internally to control what properties are sent
 * to individual page components.
 * @module lib/components/MissingRoute
 * @customElement
 * @polymer
 */
export default class MissingRoute extends Route {
    /**
     * @property {String} is - The HTML tag representing the component.
     */
    static get is() {
        return 'z-missing-route';
    }

    _transitioned(transition) {
        const to = transition.to();

        delete to.resolve;
        to.error = fromJS({
            message: 'The path was not found',
            code: '404',
        });
        debugger;

        super._transitioned(transition);
    }
}

customElements.define(MissingRoute.is, MissingRoute);

