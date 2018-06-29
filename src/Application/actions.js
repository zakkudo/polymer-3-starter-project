/**
 * An enumeration of available actions for the application.
 * @enum
 * @module Application/actions
 */
export default {
    /** Debugging action to show a request succeeded and with what payload. */
    PAGE_RESOLVE_REQUEST_SUCCEEDED: 'APPLICATION/PAGE_RESOLVE_REQUEST_SUCCEEDED',
    /** Debugging action to show a request failed and with what payload. */
    PAGE_RESOLVE_REQUEST_FAILED: 'APPLICATION/PAGE_RESOLVE_REQUEST_FAILED',
    /** Requests page resolve side effects to execute. */
    REQUEST_PAGE_RESOLVE: 'APPLICATION/REQUEST_PAGE_RESOLVE',
    /** Sets The updated resolve used for the inital page data. */
    SET_PAGE_RESOLVE: 'APPLICATION/SET_PAGE_RESOLVE',
    /** Sets the page component used for display of the resolve data. */
    SET_PAGE_COMPONENT: 'APPLICATION/SET_PAGE_COMPONENT',
};
