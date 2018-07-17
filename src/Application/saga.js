import {takeEvery, call, put} from 'redux-saga/effects';
import actions from './actions';
import {fromJS} from 'immutable';
import Application from '.';

/**
 * @private
 * @param {Object} action - A redux action
 */
export function* resolve(action) {
    const {
        request,
    } = action;
    const {
        setPageResolve,
        setPageComponent,
        pageResolveRequestSucceeded,
        pageResolveRequestFailed,
    } = Application.actions;

    try {
        let chain = yield call(request);

        while (chain.next) {
            const {next, message} = chain;

            yield put(setPageResolve(fromJS({
                loading: true,
                message,
            })));

            chain = yield next;
        }

        const {Component = null, message = null, response = null} = chain;

        yield put(pageResolveRequestSucceeded({Component, response}));
        yield put(setPageComponent(Component));
        if (response) {
            yield put(setPageResolve(fromJS({
                loading: false,
                message,
                response,
            })));
        }
    } catch (reason) {
        yield put(pageResolveRequestFailed(reason));
        yield put(setPageComponent(null));
        yield put(setPageResolve(fromJS({
            loading: false,
            error: reason,
        })));
    }
}

/**
 * @private
 */
export default function* rootSaga() {
    yield takeEvery(actions.REQUEST_PAGE_RESOLVE, resolve);
}
