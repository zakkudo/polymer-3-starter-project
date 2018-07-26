import SagaMixin from './SagaMixin';

/**
 * Add Application action creators to a polymer class.  It also connects the
 * component to the Redux store as well as manage any passed saga scripts.
 * @module Application/ActionsMixin
 * @polymer
 * @mixinFunction
 * @appliesMixin SagaMixin
 * @param {Polymer.PolymerElement} Parent - The class to mix into
 * @param {Function} saga - The saga to start with connection of the element to the DOM.
 * It will be stopped when disconnected.
 * @return {Polymer.PolymerElement} The wrapped class
 */
export default (Parent, {actions, saga, store}) => {
    /**
     * @polymer
     * @mixinClass
     */
    return class ActionsMixin extends SagaMixin(Parent, {store, saga}) {
        static get actions() {
            return actions;
        }
    };
};
