import ReduxMixin from './ReduxMixin';
import actions from './actions';

export default (Parent, saga, ...leftover) => {
    return class ActionsMixin extends ReduxMixin(Parent, saga, ...leftover) {
        static get actions() {
            return {
            };
        }
    }
}
