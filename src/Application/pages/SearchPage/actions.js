import Actions from 'lib/Actions';

/**
 * @module Application/pages/SearchPage/actions
 */
export default new Actions({
    /** Requests a search for groceries */
    requestSearch(query) {
        return {
            type: 'REQUEST_SEARCH',
            query,
        };
    },
    /** Debugging method to show the success payload */
    searchRequestSucceeded(response) {
        return {
            type: 'SEARCH_REQUEST_SUCCEEDED',
            response,
        };
    },
    /** Debugging method to show the failed payload */
    searchRequestFailed(reason) {
        return {
            type: 'SEARCH_REQUEST_FAILED',
            reason,
        };
    },
    /** Sets the updated results once the search request finished */
    setResults(results) {
        return {
            type: 'SET_RESULTS',
            results,
        };
    },
});
