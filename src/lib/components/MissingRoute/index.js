import 'polymer-ui-router/uirouter-router';
import Route from 'lib/components/Route';
import {fromJS} from 'immutable';

/**
 * Used by the `z-router` internally to control what properties are sent
 * to individual page components. Extends Route.
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

    /**
     * @private
     * @param {UIRouter.Transition} transition - A transition as
     * described on the ui-router documentation
     */
    _transitioned(transition) {
        const to = transition.to();

        delete to.resolve;
        to.error = fromJS({
            message: 'The path was not found',
            code: '404',
        });

        super._transitioned(transition);
    }
}

customElements.define(MissingRoute.is, MissingRoute);

