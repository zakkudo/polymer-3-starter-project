import actions from './actions';

const defaultState = {
    'name': 'Polymer 3/Redux Demo Application',
};

export default function reducer(state = defaultState, action) {
    const copy = Object.assign({}, state);

    switch (action.type) {
        case actions.SET_PAGE_RESOLVE:
            return Object.assign(copy, {pageResolve: action.resolve});
        case actions.SET_PAGE_REDUCER:
            return Object.assign(copy, {pageReducer: action.reducer});
    }

    if (copy.pageReducer) {
        copy.page = copy.pageReducer(copy.page, action);

        return copy;
    } else if (!copy.pageReducer && copy.page) {
        delete copy.page;
    }

    return copy;
}
