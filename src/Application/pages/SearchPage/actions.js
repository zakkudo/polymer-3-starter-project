import Actions from 'lib/Actions';

/**
 * The available asearch page actions
 * @redux
 * @reduxActionScope PAGE
 * @module Application/pages/SearchPage/actions
 */
export default new Actions({
    /**
     * Requests a search for groceries
     * @redux
     * @reduxActionCreator
     * @reduxActionType SEARCH_REQUEST
     * @instance
     * @param {Function} query - Search configuration controlly the results
     * @return {Redux.Action} The generated action
    */
    requestSearch(query) {
        return {
            type: 'REQUEST_SEARCH',
            query,
        };
    },
    /**
     * Debugging action to show a request succeeded and with what payload.
     * The payload will be on the <code>response</code> property.
     * @redux
     * @reduxActionCreator
     * @reduxActionType SEARCH_REQUEST_SUCCEEDED
     * @instance
     * @param {Immutable.Map} response - The raw response of the executed action
     * @return {Redux.Action} The generated action
    */
    searchRequestSucceeded(response) {
        return {
            type: 'SEARCH_REQUEST_SUCCEEDED',
            response,
        };
    },
    /**
     * Debugging action to show a request failed and with what payload.
     * The payload will be on the <code>response</code> property.
     * @redux
     * @reduxActionCreator
     * @reduxActionType SEARCH_REQUEST_FAILED
     * @instance
     * @param {Error} reason - The reason the request failed
     * @return {Redux.Action} The generated action
    */
    searchRequestFailed(reason) {
        return {
            type: 'SEARCH_REQUEST_FAILED',
            reason,
        };
    },
    /**
     * Sets the search results to the store for display
     * @redux
     * @reduxActionCreator
     * @reduxActionType SET_RESULTS
     * @instance
     * @param {Immutable.List} results - The search results
     * @return {Redux.Action} The generated action
    */
    setResults(results) {
        return {
            type: 'SET_RESULTS',
            results,
        };
    },
}, 'PAGE');
