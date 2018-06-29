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

        const {Component, message, response} = chain;

        yield put(setPageComponent(Component));
        yield put(setPageResolve(fromJS({
            loading: false,
            message,
            response,
        })));
        yield put(pageResolveRequestSucceeded(response));
    } catch (reason) {
        yield put(setPageResolve(fromJS({
            loading: false,
            error: reason,
        })));
        yield put(pageResolveRequestFailed(reason));
    }
}

/**
 * @private
 */
export default function* rootSaga() {
    yield takeEvery(actions.REQUEST_PAGE_RESOLVE, resolve);
}
