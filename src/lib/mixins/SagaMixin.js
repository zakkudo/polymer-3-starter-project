import ReduxMixin from './ReduxMixin';

const instances = new Map();

/**
 * @private
 * @param {String} key - Key for the saga
 */
function cancel(key) {
    if (instances.has(key)) {
        instances.get(key).cancel();
        instances.delete(key);
    }
}

/**
 * Add Redux connectivity to a PolymerElement
 * @module Application/ReduxMixin
 * @polymer
 * @mixinFunction
 * @appliesMixin lib/ReduxMixin
 * @param {Polymer.PolymerElement} Parent - The class to augment
 * @param {Function} saga - A saga function to manage.
 * @return {Polymer.PolymerElement} The augmented class.
 */
export default (Parent, {store, saga}) => {
    return class SagaMixin extends ReduxMixin(Parent, {store}) {
        /**
         * @private
         */
        connectedCallback() {
            const middleware = (store.middleware || {}).saga;

            super.connectedCallback();

            if (middleware && saga) {
                cancel(this);
                instances.set(this, middleware.run(saga));
            }
        }

        /**
         * @private
         */
        disconnectedCallback() {
            super.disconnectedCallback();
            if (instances.has(this)) {
                cancel(this);
            }
        }
    };
};
