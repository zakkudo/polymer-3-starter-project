import actions from './actions';

const defaultState = {
    'name': 'Polymer 3/Redux Demo Application',
};

/**
 * Application reducer.
 * @private
 */
export default function reducer(state = defaultState, action) {
    const copy = Object.assign({}, state);
    const pageComponent = copy.pageComponent || {};
    const pageReducer = pageComponent.reducer;

    switch (action.type) {
        case actions.SET_PAGE_RESOLVE:
            return Object.assign(copy, {pageResolve: action.resolve});
        case actions.SET_PAGE_COMPONENT:
            copy.pageComponent = action.component;
            if (action.component && action.component.reducer) {
                copy.page = {};
            } else {
                delete copy.page;
            }
            return copy;
    }

    if (pageReducer) {
        copy.page = pageReducer(copy.page, action);

        return copy;
    }

    return copy;
}
