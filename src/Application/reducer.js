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
            return Object.assign(copy, {pageComponent: action.component});
    }

    if (pageReducer) {
        copy.page = pageReducer(copy.page, action);

        return copy;
    } else if ((!pageReducer) && copy.page) {
        delete copy.page;
    }

    return copy;
}
