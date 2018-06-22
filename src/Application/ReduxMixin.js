import {createStore, applyMiddleware} from 'redux';
import ImmutableMixin from 'lib/ImmutableMixin';
import PolymerRedux from 'polymer-redux';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware(),
    store = createStore(reducer, applyMiddleware(sagaMiddleware)),
    ReduxMixin = PolymerRedux(store),
    instances = new Map();

function cancel(key) {
    if (instances.has(key)) {
        instances.get(key).cancel();
        instances.delete(key);
    }
}

export default (Parent, saga) => {
    return class SagaMixin extends ImmutableMixin(ReduxMixin(Parent)) {
        connectedCallback() {
            super.connectedCallback();
            if (saga) {
                cancel(this);
                instances.set(this, sagaMiddleware.run(saga));
            }
        }

        disconnectedCallback() {
            super.disconnectedCallback();
            if (instances.has(this)) {
                cancel(this);
            }
        }
    }
}
