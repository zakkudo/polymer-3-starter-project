import ActionsMixin from './ActionsMixin';
import createStore from 'lib/createStore';
import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {call, takeEvery, put} from 'redux-saga/effects';

const actions = {
    setValue() {
    },
    SET_VALUE: 'SET_VALUE',
};

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
class TestComponent extends ActionsMixin(PolymerElement, {store, saga, actions}) {
    /**
     * @private
     */
    static get template() {
        return html``;
    }
}

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

describe('lib/ActionsMixin', () => {
    afterEach(() => {
        const state = store.getState();

        Object.keys(state).forEach((k) => {
            delete state[k];
        });
    });

    it('creates the actions property', () => {
        expect(TestComponent.actions).toEqual(actions);
    });
});
