/**
 * A PolyerElement Mixin that adds methods for reading from an immutable type
 * in the template.
 * @param {Class} Parent - The class suppliment.
 * @fires ImmutableMixin#FISH
 * @polymer
 * @mixinFunction
 * @module lib/ImmutableMixin
 * @return {Class} The wrapped class
 */
export default function ImmutableMixin(Parent) {
    return class ImmutableMixin extends Parent {
        /**
         * Get a value usign a key from an immutable Map
         * @param {Immutable.Map} instance - A map to fetch the value from
         * @param {String} key - A key to use to get the value
         * @return {*} The value stored at the key or undefined
         */
        _getFromImmutable(instance, key) {
            return instance.get(key);
        }
        /**
         * Get a value using a key path from an immutable Map
         * @param {Immutable.Map} instance - A map to fetch the value from
         * @param {String} searchKeyPath - A key path to use to get the value
         * @return {*} The value stored at the key or undefined
         */
        _getInImmutable(instance, ...searchKeyPath) {
            return instance.getIn(searchKeyPath, searchKeyPath);
        }
        /**
         * Checks if a key exists in an immutable Map
         * @param {Immutable.Map} instance - A map to fetch the value from
         * @param {String} key - A key to use to check for existance
         * @return {Boolean} True if the key exists
         */
        _hasFromImmutable(instance, key) {
            return instance.has(key);
        }
        /**
         * Checks if a key path exists in an immutable Map
         * @param {Immutable.Map} instance - A map to fetch the value from
         * @param {String} searchKeyPath - A key path to use to check for
         * existance
         * @return {Boolean} True if the key exists
         */
        _hasInImmutable(instance, ...searchKeyPath) {
            return instance.hasIn(searchKeyPath);
        }
        /**
         * Gets the first value from an immutable List
         * @param {Immutable.List} instance - A list to fetch the value from
         * @return {*} The first value in the list
         */
        _firstFromImmutable(instance) {
            return instance.first();
        }
        /**
         * Gets the last value from an immutable List
         * @param {Immutable.List} instance - A list to fetch the value from
         * @return {*} The last value in the list
         */
        _lastFromImmutable(instance) {
            return instance.last();
        }
        /**
         * Shallow converts an immutable List to a javascript Array
         * @param {Immutable.List} instance - A list to convert to an array
         * @return {Array} The Immutable.List shallowly converted to a
         * javscript Array
         */
        _toArrayFromImmutable(instance) {
            return instance.toArray();
        }
        /**
         * Shallow converts an immutable Map to a javscript object
         * @param {Immutable.List} instance - A map to convert to an object
         * @return {Object} The Immutable.Object shallowly converted to a
         * javscript Object
         */
        _toObjectFromImmutable(instance) {
            return instance.toObject();
        }
        /**
         * Deep converts an immutable object to javascript
         * @param {Immutable.Instance} instance - An immutable instance to
         * deep convert to javascript
         * @return {*} A deeply converted collection in native javscript.
         */
        _toJSFromImmutable(instance) {
            return instance.toJS();
        }
    };
}
