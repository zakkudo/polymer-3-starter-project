import actions from './actions';

const defaultState = {
    'name': 'Polymer 3/Redux Demo Application',
};

export default function reducer(state = defaultState, action) {
    const copy = Object.assign({}, state);

    switch (action.type) {
        case actions.SET_PAGE_RESOLVE:
            return Object.assign(copy, {pageResolve: action.resolve});
        case actions.SET_PAGE_COMPONENT:
            return Object.assign(copy, {pageComponent: action.component});
    }

    if (copy.pageComponent && copy.pageComponent.reducer) {
        copy.page = copy.pageReducer(copy.pageComponent.reducer, action);

        return copy;
    } else if ((!copy.pageComponent || !copy.pageComponent.reducer) && copy.page) {
        delete copy.page;
    }

    return copy;
}
