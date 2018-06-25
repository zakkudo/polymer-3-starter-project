import actions from './actions';

const defaultState = {
    'name': 'Polymer 3/Redux Demo Application',
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case actions.SET_RESOLVE:
            return Object.assign({}, state, {resolve: action.resolve});
    }

    return state;
};
