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
     * @reduxActionCreator SEARCH_REQUEST
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
     * Sets the search results to the store for display
     * @redux
     * @reduxActionCreator SET_RESULTS
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
