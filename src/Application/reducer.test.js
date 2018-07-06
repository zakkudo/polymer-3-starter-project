import reducer from './reducer';
import actions from './actions';
import {PolymerElement} from '@polymer/polymer/polymer-element';

/**
 * @private
 */
class TestComponent extends PolymerElement {}

/**
 * @private
 */
class TestComponentWithReducer extends PolymerElement {
    /**
     * @private
     */
    static reducer(state, action) {
        switch (action.type) {
            case 'PAGE_TEST':
                return Object.assign({}, state, {pageTest: true});
        }

        return state;
    }
}

describe('application/reducer', () => {
    it('set the page', () => {
        const state = reducer({}, actions.setPageComponent(TestComponent));

        expect(state).toEqual({
            pageComponent: TestComponent,
        });
    });

    it('uses the component reducer when available', () => {
        const state = reducer({
            pageComponent: TestComponentWithReducer,
        }, {
            'type': 'PAGE_TEST',
        });

        expect(state).toEqual({
            pageComponent: TestComponentWithReducer,
            page: {pageTest: true},
        });
    });

    it('removes the page object if there is no page component', () => {
        const state = reducer({page: {}}, actions.setPageComponent(null));

        expect(state).toEqual({
            pageComponent: null,
        });
    });
});
