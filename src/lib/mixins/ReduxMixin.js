import ImmutableMixin from './ImmutableMixin';
import PolymerRedux from 'polymer-redux';

/**
 * @polymer
 * @mixinFunction
 * @appliesMixin lib/ImmutableMixin
 * @appliesMixin PolymerReduxMixin
 */
export default (Parent, {store}) => {
    const Mixin = PolymerRedux(store);

    return class ReduxMixin extends ImmutableMixin(Mixin(Parent)) {};
};
