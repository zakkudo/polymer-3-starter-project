import actions from './actions';

export default function reducer(state = {}, action) {
    debugger;
    switch (action.type) {
        case actions.SET_RESULTS:
            return Object.assign({}, state, {'results': action.results});
            break;
    }

    return state;
};
