import Helper from 'lib/PolymerTestHelper';
import SagaMixin from './SagaMixin';
import createStore from 'lib/createStore';
import defer from 'lib/defer';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {call, takeEvery, put} from 'redux-saga/effects';

/**
 * @private
 * @param {Object} action - The redux action
 */
function* request(action) {
    try {
        const response = yield call(action.request);
        yield put({type: 'SET_VALUE', value: response});
        yield put({type: 'VALUE_REQUEST_SUCCEEDED', response});
    } catch (reason) {
        yield put({type: 'VALUE_REQUEST_FAILED', reason});
    }
}

/**
 * @private
 */
function* saga() {
    yield takeEvery('REQUEST_VALUE', request);
}

const store = createStore(reducer);

/**
 * @private
 */
class TestSagaComponent extends SagaMixin(PolymerElement, {store, saga}) {
    /**
     * @private
     */
    static get template() {
        return html``;
    }
}

customElements.define('test-saga-component', TestSagaComponent);

/**
 * @private
 */
class TestComponent extends SagaMixin(PolymerElement, {store}) {
    /**
     * @private
     */
    static get template() {
        return html``;
    }
}

customElements.define('test-component', TestComponent);

/**
 * @private
 * @param {Object} state - The initial redux state
 * @param {Object} action - A redux action to update the state
 * @return {Object} The updated redux state
 */
function reducer(state = {}, action) {
    switch (action.type) {
        case 'VALUE_REQUEST_SUCCEEDED':
            return Object.assign({}, state, {success: true, response: action.response});
        case 'VALUE_REQUEST_FAILED':
            return Object.assign({}, state, {failed: true, reason: action.reason});
        case 'REQUEST_VALUE':
            return Object.assign({}, state, {requested: true});
        case 'SET_VALUE':
            return Object.assign({}, state, {value: action.value});
        default:
            return state;
    }
}

describe('lib/SagaMixin', () => {
    afterEach(() => {
        const state = store.getState();

        Object.keys(state).forEach((k) => {
            delete state[k];
        });
    });

    it('successfully completes the saga', () => {
        const root = Helper.createElement(html`<test-saga-component/>`, {});
        const deferred = defer();

        root.connectedCallback();

        store.dispatch({type: 'REQUEST_VALUE', request() {
            deferred.resolve('test value');

            return deferred.promise;
        }});

        return deferred.promise.then(() => {
            root.disconnectedCallback();
            expect(store.getState()).toEqual({
                requested: true,
                value: 'test value',
                success: true,
                response: 'test value',
            });
        });
    });

    it('fails completing the saga', () => {
        const root = Helper.createElement(html`<test-saga-component/>`, {});
        const deferred = defer();

        root.connectedCallback();

        store.dispatch({type: 'REQUEST_VALUE', request() {
            deferred.reject(new Error('test error'));

            return deferred.promise;
        }});

        return deferred.promise.catch(() => {
            root.disconnectedCallback();
            expect(store.getState()).toEqual({
                requested: true,
                reason: new Error('test error'),
                failed: true,
            });
        });
    });

    it('does nothing for components without registered sagas', () => {
        const root = Helper.createElement(html`<test-component/>`, {});
        const request = jasmine.createSpy();

        root.connectedCallback();

        store.dispatch({type: 'REQUEST_VALUE', request});

        expect(request.calls.all()).toEqual([]);
    });
});
