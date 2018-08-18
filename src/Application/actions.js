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
     * @reduxActionCreator REQUEST_PAGE_RESOLVE
     * @param {Immutable.Map} match - The current route match information
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
     * @reduxActionCreator REQUEST_PAGE_RESOLVE
     * @param {Function} request - A method that should return a Promise
     * @instance
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
     * @reduxActionCreator SET_PAGE_RESOLVE
     * @param {Immutable.Map} resolve - The resolved data for the page to use on initial load
     * @instance
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
     * @reduxActionCreator SET_PAGE_COMPONENT
     * @param {PolymerElement} component - The component to use for page display
     * @instance
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
     * @reduxActionCreator SET_PAGE_TITLE
     * @param {String} title - The new title for the page.  It will be joined with the application title.
     * @instance
    */
    setPageTitle(title) {
        return {
            type: 'SET_PAGE_TITLE',
            title,
        };
    },
}, 'APPLICATION');
