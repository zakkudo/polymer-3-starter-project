import {takeEvery, call, put} from 'redux-saga/effects';
import actions from './actions';
import {fromJS} from 'immutable';
import Application from '.';

function* resolve(action) {
    const {
        request,
        message
    } = action;
    const {
        setResolve,
        resolveRequestSucceeded,
        resolveRequestFailed,
    } = Application.actions;
    const hasResolve = Boolean(resolve);

    yield put(setResolve(fromJS({
        loading: hasResolve,
        message,
    })));

    if (hasResolve) {
        try {
            const response = yield call(request);
            const body = fromJS(response);

            yield put(resolveRequestSucceeded(body));
            yield put(setResolve(fromJS({
                loading: false,
                message,
                response: body,
            })));
        } catch (error) {
            const reason = fromJS(error);

            yield put(resolveRequestFailed(reason));
            yield put(setResolve(fromJS({
                loading: false,
                message,
                reason,
            })));
        }
    }
}

export default function* rootSaga() {
    yield takeEvery(actions.REQUEST_RESOLVE, resolve);
}
