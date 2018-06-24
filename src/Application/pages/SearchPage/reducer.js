import actions from './actions';

const defaultState = {
    'name': 'Polymer 3/Redux Demo Application',
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case actions.SET_RESULTS:
            return Object.assign({}, state, {'results': action.results});
            break;
    }

    return state;
};
