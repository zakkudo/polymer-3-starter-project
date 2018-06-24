import {takeEvery, call, put} from 'redux-saga/effects'
import actions from './actions';
import {fromJS} from 'immutable';
import Application from '.';

function* search(query) {
    const {
        searchRequestSucceeded, 
        searchRequestFailed, 
        setResults
    } = Application.actions;

    try {
        const response = yield call(fetch, './search.json');
        const body = fromJS(yield call([response, 'json']));

        yield put(searchRequestSucceeded(body));
        yield put(setResults(body.get('hits')));

    } catch (reason) {
        yield put(searchRequestFailed(fromJS(reason)));
    }
}

export default function* rootSaga() {
    yield takeEvery(actions.REQUEST_SEARCH, search);
}
