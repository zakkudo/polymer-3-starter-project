import Immutable from 'immutable';

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
            return instance.first()
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
    }
}
