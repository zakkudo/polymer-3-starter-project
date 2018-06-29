import ReduxMixin from './ReduxMixin';
import actions from './actions';

/**
 * Add Application action creators to a polymer class.  It also connects the
 * component to the Redux store as well as manage any passed saga
 * scripts.
 * @module Application/ActionsMixin
 * @polymer
 * @mixinFunction
 * @param {PolymerElement} Parent - The class to mix into
 * @param {Function} saga - The saga to start with connection of the element
 * to the DOM. It will be stopped when disconnected.
 * @return {PolymerElement} The wrapped class
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
         * @property {PolymerElement} properties.setPageComponent - Set the
         * page displayed for the current route.
         */
        static get actions() {
            return {
                requestPageResolve(request) {
                    return {
                        type: actions.REQUEST_PAGE_RESOLVE,
                        request,
                    };
                },
                pageResolveRequestSucceeded(response) {
                    return {
                        type: actions.PAGE_RESOLVE_REQUEST_SUCCEEDED,
                        response,
                    };
                },
                pageResolveRequestFailed(reason) {
                    return {
                        type: actions.PAGE_RESOLVE_REQUEST_FAILED,
                        reason,
                    };
                },
                setPageResolve(resolve) {
                    return {
                        type: actions.SET_PAGE_RESOLVE,
                        resolve,
                    };
                },
                setPageComponent(component) {
                    return {
                        type: actions.SET_PAGE_COMPONENT,
                        component,
                    };
                },
            };
        }
    };
};
