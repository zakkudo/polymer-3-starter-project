import {takeEvery, call, put} from 'redux-saga/effects';
import actions from './actions';
import {fromJS} from 'immutable';
import Application from '.';

function* resolve(action) {
    const {
        request,
        message,
    } = action;
    const {
        setPageResolve,
        pageResolveRequestSucceeded,
        pageResolveRequestFailed,
    } = Application.actions;
    const hasPageResolve = Boolean(request);

    yield put(setPageResolve(fromJS({
        loading: hasPageResolve,
        message,
    })));

    if (hasPageResolve) {
        try {
            const response = yield call(request);
            const body = fromJS(response);

            yield put(pageResolveRequestSucceeded(body));
            yield put(setPageResolve(fromJS({
                loading: false,
                message,
                response: body,
            })));
        } catch (error) {
            const reason = fromJS(error);

            yield put(pageResolveRequestFailed(reason));
            yield put(setPageResolve(fromJS({
                loading: false,
                message,
                reason,
            })));
        }
    }
}

export default function* rootSaga() {
    yield takeEvery(actions.REQUEST_PAGE_RESOLVE, resolve);
}
