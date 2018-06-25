import ReduxMixin from './ReduxMixin';
import actions from './actions';

export default (Parent, saga, ...leftover) => {
    return class ActionsMixin extends ReduxMixin(Parent, saga, ...leftover) {
        static get actions() {
            return {
                requestResolve(request, message='loading...') {
                    return {
                        type: actions.REQUEST_RESOLVE,
                        request,
                        message,
                    };
                },
                resolveRequestSucceeded(response) {
                    return {
                        type: actions.RESOLVE_REQUEST_SUCCEEDED,
                        response,
                    };
                },
                resolveRequestFailed(reason) {
                    return {
                        type: actions.RESOLVE_REQUEST_FAILED,
                        reason,
                    };
                },
                setResolve(resolve) {
                    return {
                        type: actions.SET_RESOLVE,
                        resolve,
                    };
                },
            };
        }
    };
};
