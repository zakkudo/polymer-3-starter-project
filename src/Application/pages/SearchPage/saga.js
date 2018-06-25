import {takeEvery, call, put} from 'redux-saga/effects'
import actions from './actions';
import {fromJS} from 'immutable';
import Page from '.';

function* search(query) {
    const {
        searchRequestSucceeded,
        searchRequestFailed,
        setResults,
    } = Page.actions;

    try {
        debugger;
        const response = yield call(fetch, '/search.json');
        const body = fromJS(yield call([response, 'json']));

        debugger;
        yield put(searchRequestSucceeded(body));
        debugger;
        yield put(setResults(body.get('hits')));

    } catch (reason) {
        debugger;
        yield put(searchRequestFailed(fromJS(reason)));
    }
}

export default function* rootSaga() {
    yield takeEvery(actions.REQUEST_SEARCH, search);
}
