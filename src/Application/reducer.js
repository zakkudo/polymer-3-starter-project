import actions from './actions';
import prefixRoutes from 'lib/prefixRoutes';
import routes from './routes';
import {fromJS} from 'immutable';

/**
 * @private
 */
const defaultState = {
    name: 'Polymer 3/Redux Demo Application',
    routes,
};

/**
 * @private
 * @param {Immutable.List} parents - The set of routes to inject sub-routes for
 * @param {Immutable.Map} childrenByParent - A lookup of child roots for a specific parent
 * @return {ImmutableList} A flattened list where the childen are injected before the parent
 */
function flattenPageRoutes(parents, childrenByParent) {
    return parents.reduce((accumulator, r) => {
        const children = childrenByParent.get(r);

        if (children) {
            return accumulator.concat(flattenPageRoutes(children, childrenByParent)).push(r);
        }

        return accumulator.push(r);
    }, fromJS({}));
}

/**
 * @private
 * @param {String} applicationName - The name to use for the application
 * @param {PolymerElement} component - A component to look for static title information
 * @return {String} The title string
 */
function buildStaticTitle(applicationName, component) {
    const parts = [];

    if (applicationName) {
        parts.push(applicationName);
    }

    if (component && component.title) {
        parts.push(component.title);
    }

    return parts.join(' | ');
}

/**
 * @private
 * @param {Object} state - The redux state
 * @param {Immutable.List} pageRoutes - The page outes to apply
 * @return {Object} The updated state with the new route data
 * Once set, it's assumed the routes are perminent.  The pageRoutesByParentRoute variable
 * is used to create a loading order for the routes as well as keep references
 * consistent for shallow different checking.
 */
function setPageRoutes(state, pageRoutes) {
    const routerMatch = state.routerMatch || fromJS({});
    const matchedRoute = routerMatch.get('route') || fromJS({});
    const prefix = matchedRoute.get('pattern');
    const pageRoutesByParentRoute = state.pageRoutesByParentRoute || fromJS({});

    // Once set, it's assumed the routes are perminent
    if (!pageRoutesByParentRoute.has(matchedRoute) && prefix) {
        const prefixedRoutes = prefixRoutes(prefix, pageRoutes);
        const nextPageRoutesByParentRoute = pageRoutesByParentRoute.set(
            matchedRoute,
            prefixedRoutes
        );
        const nextRoutes = flattenPageRoutes(routes, pageRoutesByParentRoute);

        return Object.assign(state, {
            pageRoutesByParentRoute: nextPageRoutesByParentRoute,
            routes: nextRoutes,
        });
    }

    return state;
}

/**
 * @private
 * @param {Object} state - The redux state
 * @param {PolymerElement} component - A polymer component to set
 * @return {Object} The updated redux state
 */
function setComponent(state, component) {
    state.pageComponent = component || null;

    if (component && component.reducer) {
        state.page = {};
    } else {
        delete state.page;
    }

    state.title = buildStaticTitle(state.name, state.pageComponent);
    delete state.pageTitle;

    return state;
}

/**
 * Application reducer.
 * @redux
 * @reduxReducer
 * @private
 * @param {Object} state - The current redux state
 * @param {Redux.Action} action - A redux action
 * @return {Object} The updated redux state
 */
export default function reducer(state = defaultState, action) {
    const copy = Object.assign({}, state);
    const pageComponent = copy.pageComponent || {};
    const pageReducer = pageComponent.reducer;

    switch (action.type) {
        case actions.SET_ROUTER_MATCH:
            return Object.assign(copy, {
                routerMatch: action.match,
            });
        case actions.SET_PAGE_ROUTES:
            return setPageRoutes(state, action.routes);
        case actions.SET_PAGE_RESOLVE:
            return Object.assign(copy, {pageResolve: action.resolve});
        case actions.SET_PAGE_TITLE:
            Object.assign(copy, {
                pageTitle: action.title,
                title: [state.name, action.title].filter((t) => t).join(' | '),
            });

            return copy;
        case actions.SET_PAGE_COMPONENT:
            return setComponent(copy, action.component);
    }

    if (pageReducer) {
        copy.page = pageReducer(copy.page, action);

        return copy;
    }

    return copy;
}
