import Actions from 'lib/Actions';

/**
 * Possible global actions for the application. These do not include page
 * actions.
 * @enum
 * @module Application/actions
 */
export default new Actions({
    /** Requests page resolve side effects to execute. */
    requestPageResolve(request) {
        return {
            type: 'REQUEST_PAGE_RESOLVE',
            request,
        };
    },
    /** Debugging action to show a request succeeded and with what payload. */
    pageResolveRequestSucceeded(response) {
        return {
            type: 'PAGE_RESOLVE_REQUEST_SUCCEEDED',
            response,
        };
    },
    /** Debugging action to show a request failed and with what payload. */
    pageResolveRequestFailed(reason) {
        return {
            type: 'PAGE_RESOLVE_REQUEST_FAILED',
            reason,
        };
    },
    /** Sets The updated resolve used for the inital page data. */
    setPageResolve(resolve) {
        return {
            type: 'SET_PAGE_RESOLVE',
            resolve,
        };
    },
    /** Sets the page component used for display of the resolve data. */
    setPageComponent(component) {
        return {
            type: 'SET_PAGE_COMPONENT',
            component,
        };
    },
});
