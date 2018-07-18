import Actions from 'lib/Actions';


/**
 * Possible global actions for the application. These do not include page
 * actions.
 * @redux
 * @reduxActionScope APPLICATION
 * @module Application/actions
 */
export default new Actions({
    setPageRoutes(routes) {
        debugger;
        return {
            type: 'SET_PAGE_ROUTES',
            routes,
        };
    },
    setPageTranslation(translation) {
        return {
            type: 'SET_PAGE_TRANSLATION',
            translation,
        };
    },
    /**
     * The payload will be on the <code>request</code> property.
     * @redux
     * @reduxActionCreator
     * @reduxActionType REQUEST_PAGE_RESOLVE
     * @instance
    */
    setRouterMatch(match) {
        return {
            type: 'SET_ROUTER_MATCH',
            match,
        };
    },
    /**
     * The payload will be on the <code>request</code> property.
     * @redux
     * @reduxActionCreator
     * @reduxActionType REQUEST_PAGE_RESOLVE
     * @instance
     * @param {Function} request - A method that should return a Promise
     * @return {Redux.Action} The generated action
    */
    requestPageResolve(request) {
        return {
            type: 'REQUEST_PAGE_RESOLVE',
            request,
        };
    },
    /**
     * Debugging action to show a request succeeded and with what payload.
     * The payload will be on the <code>response</code> property.
     * @redux
     * @reduxActionCreator
     * @reduxActionType PAGE_RESOLVE_REQUEST_SUCCEEDED
     * @instance
     * @param {Immutable.Map} response - The raw response of the executed action
     * @return {Redux.Action} The generated action
    */
    pageResolveRequestSucceeded(response) {
        return {
            type: 'PAGE_RESOLVE_REQUEST_SUCCEEDED',
            response,
        };
    },
    /**
     * Debugging action to show a request failed and with what payload.
     * The payload will be on the <code>response</code> property.
     * @redux
     * @reduxActionCreator
     * @reduxActionType PAGE_RESOLVE_REQUEST_FAILED
     * @instance
     * @param {Error} reason - The reason the request failed
     * @return {Redux.Action} The generated action
    */
    pageResolveRequestFailed(reason) {
        return {
            type: 'PAGE_RESOLVE_REQUEST_FAILED',
            reason,
        };
    },
    /**
     * Sets The updated resolve used for the inital page data.
     * The payload will be on the <code>response</code> property.
     * @redux
     * @reduxActionCreator
     * @reduxActionType SET_PAGE_RESOLVE
     * @instance
     * @param {Immutable.Map} resolve - The resolved data for the page to use on initial load
     * @return {Redux.Action} The generated action
    */
    setPageResolve(resolve) {
        return {
            type: 'SET_PAGE_RESOLVE',
            resolve,
        };
    },
    /**
     * Sets the page component used for display of the resolve data.
     * @redux
     * @reduxActionCreator
     * @reduxActionType SET_PAGE_COMPONENT
     * @instance
     * @param {PolymerElement} component - The component to use for page display
     * @return {Redux.Action} The generated action
    */
    setPageComponent(component) {
        return {
            type: 'SET_PAGE_COMPONENT',
            component,
        };
    },
    /**
     * Dynamically set the page title
     * @redux
     * @reduxActionCreator
     * @reduxActionType SET_PAGE_TITLE
     * @instance
     * @param {String} title - The new title for the page.  It will be joined with the application title.
     * @return {Redux.Action} The generated action
    */
    setPageTitle(title) {
        return {
            type: 'SET_PAGE_TITLE',
            title,
        };
    },
}, 'APPLICATION');
