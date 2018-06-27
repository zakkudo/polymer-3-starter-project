import {takeEvery, call, put} from 'redux-saga/effects';
import actions from './actions';
import {fromJS} from 'immutable';
import Application from '.';

function* resolve(action) {
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
    } catch (reason) {
        yield put(setPageResolve(fromJS({
            loading: false,
            error: reason,
        })));
    }
}

export default function* rootSaga() {
    yield takeEvery(actions.REQUEST_PAGE_RESOLVE, resolve);
}
