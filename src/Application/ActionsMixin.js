import ReduxMixin from './ReduxMixin';
import actions from './actions';

export default (Parent, saga, ...leftover) => {
    return class ActionsMixin extends ReduxMixin(Parent, saga, ...leftover) {
        static get actions() {
            return {
                requestSearch(query) {
                    return {
                        type: actions.REQUEST_SEARCH,
                        query
                    };
                },
                searchRequestSucceeded(response) {
                    return {
                        type: actions.SEARCH_REQUEST_SUCCEEDED,
                        response
                    };
                },
                searchRequestFailed(reason) {
                    return {
                        type: actions.SEARCH_REQUEST_FAILED,
                        reason
                    };
                },
                setResults(results) {
                    return {
                        type: actions.SET_RESULTS,
                        results
                    };
                }
            };
        }
    }
}
