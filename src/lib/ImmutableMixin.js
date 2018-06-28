/**
 * A PolyerElement Mixin that adds methods for reading from an immutable type
 * in the template.
 * @param {Class} Parent - The class suppliment.
 * @module lib/ImmutableMixin
 * @return {Class} The wrapped class
 */
export default (Parent) => {
    return class ImmutableMixin extends Parent {
        _getFromImmutable(instance, key) {
            return instance.get(key);
        }
        _getInImmutable(instance, searchKeyPath) {
            return instance.getIn(searchKeyPath);
        }
        _hasFromImmutable(instance, key) {
            return instance.has(key);
        }
        _hasInImmutable(instance, searchKeyPath) {
            return instance.hasIn(searchKeyPath);
        }
        _firstFromImmutable(instance) {
            return instance.first();
        }
        _lastFromImmutable(instance) {
            return instance.last();
        }
        _toArrayFromImmutable(instance) {
            return instance.toArray();
        }
        _toObjectFromImmutable(instance) {
            return instance.toObject();
        }
        _toJSFromImmutable(instance) {
            return instance.toJS();
        }
    };
};
