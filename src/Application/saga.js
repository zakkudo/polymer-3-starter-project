import actions from './actions';
import {fromJS} from 'immutable';
import {takeEvery, call, put} from 'redux-saga/effects';

/**
 * @private
 * @param {Object} action - A redux action
 * @param {Immutable.Map} match - The router match info
 */
export function* resolve(action, match) {
    const {
        request,
    } = action;
    const {
        setPageResolve,
        setPageRoutes,
        setPageComponent,
        pageResolveRequestSucceeded,
        pageResolveRequestFailed,
    } = actions;

    debugger;
    try {
        let chain = yield call(request);

        while (chain.next) {
            const {next, message} = chain;
    debugger;

            yield put(setPageResolve(fromJS({
                loading: true,
                message,
            })));

    debugger;
            chain = yield next;
        }

        const {Component = null, message = null, response = null} = chain;
    debugger;
        yield put(pageResolveRequestSucceeded({Component, response}));

        // Leaves the page store until the component is removed
    debugger;
        yield put(setPageComponent(null));
        // Sets the new page store and then loads the component
    debugger;
        yield put(setPageComponent(Component));

        if (response) {
    debugger;
            yield put(setPageResolve(fromJS({
                loading: false,
                message,
                response,
            })));
        }

        if (Component.routes) {
            yield put(setPageRoutes(fromJS(Component.routes)));
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
