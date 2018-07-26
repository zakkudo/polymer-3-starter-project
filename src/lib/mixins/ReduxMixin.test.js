import ReduxMixin from './ReduxMixin';
import ImmutableMixin from './ImmutableMixin';
import createStore from 'lib/createStore';

/**
 * @private
 */
class Base {}

/**
 * @private
 */
function reducer(state = {}, action) {
    switch (action.type) {
        case 'SET_VALUE':
            return Object.assign({}, state, {value: action.value});
        default:
            return state;
    }
}

const ImmutableMixed = ImmutableMixin(Base);

describe('lib/ReduxMixin', () => {
    it('inherits ImmutableMixin and has a working store', () => {
        const store = createStore(reducer);
        const Mixed = ReduxMixin(Base, {store});

        Object.getOwnPropertyNames(ImmutableMixed.prototype).forEach((name) => {
            const mixed = new Mixed();

            expect(mixed instanceof Object.getPrototypeOf(ImmutableMixed)).toBe(true);
        });

        store.dispatch({type: 'SET_VALUE', value: 'test value'});
        expect(store.getState()).toEqual({value: 'test value'});
    });
});
