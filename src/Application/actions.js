/**
 * An enumeration of available actions for the application.
 * @module Application/actions
 * @enum
 */
export default {
    /** Delegated page resolved succeeded (For debugging only) */
    PAGE_RESOLVE_REQUEST_SUCCEEDED: 'APPLICATION/PAGE_RESOLVE_REQUEST_SUCCEEDED',
    /** Delegated page resolved succeeded (For debugging only) */
    PAGE_RESOLVE_REQUEST_FAILED: 'APPLICATION/PAGE_RESOLVE_REQUEST_FAILED',
    /** Requests page resolve side effects to execute. */
    REQUEST_PAGE_RESOLVE: 'APPLICATION/REQUEST_PAGE_RESOLVE',
    /** Sets The updated resolve used for the inital page data. */
    SET_PAGE_RESOLVE: 'APPLICATION/SET_PAGE_RESOLVE',
    /** Sets the page component used for display of the resolve data. */
    SET_PAGE_COMPONENT: 'APPLICATION/SET_PAGE_COMPONENT',
};
