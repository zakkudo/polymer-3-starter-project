import ReduxMixin from './ReduxMixin';
import actions from './actions';

/**
 * Add Application action creators to a polymer class.  It also connects the
 * component to the Redux store as well as manage any passed saga
 * scripts.
 * @module Application/ActionsMixin
 * @polymer
 * @mixinFunction
 * @param {Polymer.PolymerElement} Parent - The class to mix into
 * @param {Function} saga - The saga to start with connection of the element
 * to the DOM. It will be stopped when disconnected.
 * @return {Polymer.PolymerElement} The wrapped class
 */
export default (Parent, saga) => {
    /**
     * @polymer
     * @mixinClass
     */
    return class ActionsMixin extends ReduxMixin(Parent, saga) {
        /**
         * @property {Object} properties - Public Properties.
         * @property {Function} properties.requestPageResolve - Requests a
         * side effect that will handle the page resolve.
         * @property {Immutable.Map} properties.pageResolveRequestSucceeded -
         * Debugging action to show a request succeeded and with what payload.
         * @property {Immutable.Map} properties.pageResolveRequestFailed -
         * Debugging action to show a request failed and with what reason.
         * @property {Immutable.Map} properties.setPageResolve - Set the
         * resolve data, used to control page loading state and what data is
         * passed to the initial page component.
         * @property {Polymer.PolymerElement} properties.setPageComponent - Set the
         * page displayed for the current route.
         */
        static get actions() {
            return actions;
        }
    };
};
