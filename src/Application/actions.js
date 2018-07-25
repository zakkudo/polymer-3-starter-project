import Actions from 'lib/Actions';


/**
 * Possible global actions for the application. These do not include page
 * actions.
 * @redux
 * @reduxActionScope APPLICATION
 * @module Application/actions
 */
export default new Actions({
    /**
     * The payload will be on the <code>request</code> property.
     * @redux
     * @reduxActionCreator
     * @reduxActionType REQUEST_PAGE_RESOLVE
     * @param {Immutable.Map} match - The current route match information
     * @return {Redux.Action} The generated action
     * @instance
    */
    setRouterMatch(match) {
        return {
            type: 'SET_ROUTER_MATCH',
            match,
        };
    },
    requestPageLocalization(locale) {
        return {
            type: 'REQUEST_PAGE_LOCALIZATION',
            locale,
        };
    },
    setPageLocalization(locale, localization) {
        return {
            type: 'SET_PAGE_LOCALIZATION',
            locale,
            localization,
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
    setPageRoutes(routes) {
        return {
            type: 'SET_PAGE_ROUTES',
            routes,
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
