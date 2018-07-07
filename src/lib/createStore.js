import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

/**
 * Helper function to create a redux store in the
 * format expected by this application.
 * @param {Function} reducer - A redux reducer
 * @return {Object} A redux store
 */
export default function createStore(reducer) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const sagaMiddleware = createSagaMiddleware();
    const store = _createStore(reducer,
        composeEnhancers(applyMiddleware(sagaMiddleware)));

    // Make the middlware travel with the store.  A bit silly that this isn't done for us....
    store.middleware = {
        saga: sagaMiddleware,
    };

    return store;
}
