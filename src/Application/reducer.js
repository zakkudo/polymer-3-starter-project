import actions from './actions';

const defaultState = {
    'name': 'Polymer 3/Redux Demo Application',
};

function buildTitle(applicationName, component) {
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
 * Application reducer.
 * @redux
 * @reduxReducer
 * @private
 */
export default function reducer(state = defaultState, action) {
    const copy = Object.assign({}, state);
    const pageComponent = copy.pageComponent || {};
    const pageReducer = pageComponent.reducer;

    switch (action.type) {
        case actions.SET_ROUTER_MATCH:
            debugger;
            return Object.assign(copy, {
                routerMatch: action.match,
            });
        case actions.SET_PAGE_RESOLVE:
            return Object.assign(copy, {pageResolve: action.resolve});
        case actions.SET_PAGE_TITLE:
            Object.assign(copy, {
                pageTitle: action.title,
                title: [state.name, action.title].filter((t) => t).join(' | '),
            });

            return copy;
        case actions.SET_PAGE_COMPONENT:
            copy.pageComponent = action.component;

            if (action.component && action.component.reducer) {
                copy.page = {};
            } else {
                delete copy.page;
            }

            copy.title = buildTitle(state.name, copy.pageComponent);
            delete copy.pageTitle;

            return copy;
    }

    if (pageReducer) {
        copy.page = pageReducer(copy.page, action);

        return copy;
    }

    return copy;
}
