/**
 * @enum
 * @module Application/pages/SearchPage/actions
 */
export default {
    /** Requests a search for groceries */
    REQUEST_SEARCH: 'PAGE/REQUEST_SEARCH',
    /** Debugging method to show the failed payload */
    SEARCH_REQUEST_FAILED: 'PAGE/SEARCH_REQUEST_FAILED',
    /** Debugging method to show the success payload */
    SEARCH_REQUEST_SUCCEEDED: 'PAGE/SEARCH_REQUEST_SUCEEDED',
    /** Sets the updated results once the search request finished */
    SET_RESULTS: 'PAGE/SET_RESULTS',
};
