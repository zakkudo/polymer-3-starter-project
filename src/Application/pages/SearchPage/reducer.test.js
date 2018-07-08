import reducer from './reducer';
import actions from './actions';

describe('Application/pages/SearchPage/reducer', () => {
    it('sets the results', () => {
        const state = reducer({}, actions.setResults('test results'));

        expect(state).toEqual({results: 'test results'});
    });

    it('does nothing', () => {
        const state = reducer({}, {type: 'INVALID_ACTION'});

        expect(state).toEqual({});
    });
});
