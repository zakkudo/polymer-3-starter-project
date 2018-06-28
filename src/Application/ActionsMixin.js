import ReduxMixin from './ReduxMixin';
import actions from './actions';

/**
 * Add Application Actions to a polymer class
 * @module Application/ActionsMixin
 * @mixes Parent
 */
export default (Parent, saga, ...leftover) => {
    /**
     * @mixin
     */
    return class ActionsMixin extends ReduxMixin(Parent, saga, ...leftover) {
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
