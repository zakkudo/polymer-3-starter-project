import ReduxMixin from './ReduxMixin';
import actions from './actions';

export default (Parent, saga, ...leftover) => {
    return class ActionsMixin extends ReduxMixin(Parent, saga, ...leftover) {
        static get actions() {
            return {
                requestPageResolve(request, message='loading...') {
                    return {
                        type: actions.REQUEST_PAGE_RESOLVE,
                        request,
                        message,
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
                setPageReducer(reducer) {
                    return {
                        type: actions.SET_PAGE_REDUCER,
                        reducer,
                    };
                },
            };
        }
    };
};
