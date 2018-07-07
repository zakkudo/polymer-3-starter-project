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
class TestComponentWithTitle extends PolymerElement {
    /**
     * @private
     */
    static get title() {
        return 'test title';
    }
}

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
        const state = reducer({
            name: 'test application',
            pageTitle: 'test page title', // This should be cleared on new page load
        }, actions.setPageComponent(TestComponent));

        expect(state).toEqual({
            name: 'test application',
            pageComponent: TestComponent,
            title: 'test application',
        });
    });

    it('uses the component reducer when available', () => {
        const state = reducer({
            name: 'test application',
            pageComponent: TestComponentWithReducer,
            pageTitle: 'test page title', // This should not be removed if the page doesn't change
        }, {
            'type': 'PAGE_TEST',
        });

        expect(state).toEqual({
            pageComponent: TestComponentWithReducer,
            page: {pageTest: true},
            name: 'test application',
            pageTitle: 'test page title',
        });
    });

    it('auto generates page object when setting component with reducer', () => {
        const state = reducer({}, actions.setPageComponent(TestComponentWithReducer));

        expect(state).toEqual({
            pageComponent: TestComponentWithReducer,
            page: {},
            title: '',
        });
    });

    it('removes the page object and pageTitle if there is no page component', () => {
        const state = reducer({
            page: {},
            pageTitle: 'test page title', // This should be cleared on new page load
        }, actions.setPageComponent(null));

        expect(state).toEqual({
            pageComponent: null,
            title: '',
        });
    });

    it('has no title when there is no app name or page title', () => {
        const state = reducer({
            page: {},
            pageTitle: 'test page title',
        }, actions.setPageComponent(TestComponent));

        expect(state).toEqual({
            pageComponent: TestComponent,
            title: '',
        });
    });

    it('concatinates the application and page title', () => {
        const state = reducer({
            page: {},
            name: 'test application title',
            pageTitle: 'test page title',
        }, actions.setPageComponent(TestComponentWithTitle));

        expect(state).toEqual({
            name: 'test application title',
            pageComponent: TestComponentWithTitle,
            title: 'test application title | test title',
        });
    });

    it('sets only page title', () => {
        const state = reducer({
            page: {},
            pageTitle: 'test page title',
        }, actions.setPageComponent(TestComponentWithTitle));

        expect(state).toEqual({
            pageComponent: TestComponentWithTitle,
            title: 'test title',
        });
    });

    it('setting the dynamic page title updates the title', () => {
        const state = reducer({
            page: {data: 'test data'},
            name: 'test application title',
            pageComponent: TestComponentWithTitle,
            pageTitle: 'test page title',
        }, actions.setPageTitle('test dynamic page title'));

        expect(state).toEqual({
            page: {data: 'test data'},
            name: 'test application title',
            pageComponent: TestComponentWithTitle,
            title: 'test application title | test dynamic page title',
            pageTitle: 'test dynamic page title',
        });
    });

    it('setting the dynamic page title when no application name', () => {
        const state = reducer({
            page: {data: 'test data'},
            pageComponent: TestComponentWithTitle,
            pageTitle: 'test page title',
        }, actions.setPageTitle('test dynamic page title'));

        expect(state).toEqual({
            page: {data: 'test data'},
            pageComponent: TestComponentWithTitle,
            title: 'test dynamic page title',
            pageTitle: 'test dynamic page title',
        });
    });

    it('setting the empty dynamic page title when application title', () => {
        const state = reducer({
            page: {data: 'test data'},
            name: 'test application title',
            pageComponent: TestComponentWithTitle,
            pageTitle: 'test page title',
        }, actions.setPageTitle(null));

        expect(state).toEqual({
            page: {data: 'test data'},
            name: 'test application title',
            pageComponent: TestComponentWithTitle,
            title: 'test application title',
            pageTitle: null,
        });
    });

    it('sets a blank string when the dynamic page title is null and no application title', () => {
        const state = reducer({
            page: {data: 'test data'},
            pageComponent: TestComponentWithTitle,
            pageTitle: 'test page title',
        }, actions.setPageTitle(null));

        expect(state).toEqual({
            page: {data: 'test data'},
            pageComponent: TestComponentWithTitle,
            title: '',
            pageTitle: null,
        });
    });

    it('applies the page resolve', () => {
        const state = reducer({
            page: {data: 'test data'},
            pageComponent: TestComponentWithTitle,
        }, actions.setPageResolve('test resolve'));

        expect(state).toEqual({
            page: {data: 'test data'},
            pageComponent: TestComponentWithTitle,
            pageResolve: 'test resolve',
        });
    });
});
