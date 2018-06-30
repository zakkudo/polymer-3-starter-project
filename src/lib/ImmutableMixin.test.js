import ImmutableMixin from './ImmutableMixin';
import {fromJS} from 'immutable';
import Immutable from 'immutable';

class Helper {
    static createMixin() {
        class Parent {}
        const Mixin = ImmutableMixin(Parent);

        return new Mixin();
    }
}

describe('lib/ImmutableMixin', () => {
    describe('_getFromImmutable', () => {
        it('gets the value using a simple key', () => {
            const mixin = Helper.createMixin();
            const data = fromJS({'test key': 'test value'});

            expect(mixin._getFromImmutable(data, 'test key')).toBe('test value');
        });
    });

    describe('_getInImmutable', () => {
        it('gets the value using a simple key', () => {
            const mixin = Helper.createMixin();
            const data = fromJS({
                'users': {
                    'test user': {
                        'name': 'Test Name',
                    },
                },
            });

            expect(mixin._getInImmutable(data, [
                'users',
                'test user',
                'name',
            ])).toBe('Test Name');
        });
    });

    describe('_hasFromImmutable', () => {
        it('returns true when the key exists', () => {
            const mixin = Helper.createMixin();
            const data = fromJS({'test key': 'test value'});

            expect(mixin._hasFromImmutable(data, 'test key')).toBe(true);
        });

        it('returns false when the tree doesn\'t exist', () => {
            const mixin = Helper.createMixin();
            const data = fromJS({'test key': 'test value'});

            expect(mixin._hasFromImmutable(data, 'invalid key')).toBe(false);
        });
    });

    describe('_hasInImmutable', () => {
        it('returns true when the key exists', () => {
            const mixin = Helper.createMixin();
            const data = fromJS({
                'users': {
                    'test user': {
                        'name': 'Test Name',
                    },
                },
            });

            expect(mixin._hasInImmutable(data, [
                'users',
                'test user',
                'name',
            ])).toBe(true);
        });

        it('returns false when the tree doesn\'t exist', () => {
            const mixin = Helper.createMixin();
            const data = fromJS({
                'users': {
                    'test user': {
                        'name': 'Test Name',
                    },
                },
            });

            expect(mixin._hasInImmutable(data, 'invalid key')).toBe(false);
        });
    });

    describe('_firstFromImmutable', () => {
        it('returns the first element of the list', () => {
            const mixin = Helper.createMixin();
            const data = fromJS(['first', 'second', 'third']);

            expect(mixin._firstFromImmutable(data)).toBe('first');
        });
    });

    describe('_lastFromImmutable', () => {
        it('returns the last element of the list', () => {
            const mixin = Helper.createMixin();
            const data = fromJS(['last', 'second', 'third']);

            expect(mixin._lastFromImmutable(data)).toBe('third');
        });
    });

    describe('_toArrayFromImmutable', () => {
        it('shallowly converts the list to an array', () => {
            const mixin = Helper.createMixin();
            const data = fromJS([{}]);

            expect(Array.isArray(mixin._toArrayFromImmutable(data))).toBe(true);
            expect(mixin._toArrayFromImmutable(data)[0] instanceof Immutable.Map).toBe(true);
        });
    });

    describe('_toObjectFromImmutable', () => {
        it('shallowly converts the list to an array', () => {
            const mixin = Helper.createMixin();
            const data = fromJS({'test key': {}});

            expect(mixin._toObjectFromImmutable(data)['test key'] instanceof Immutable.Map).toBe(true);
        });
    });

    describe('_toJSFromImmutable', () => {
        it('deeply convers the object ot javascript primitives', () => {
            const mixin = Helper.createMixin();
            const data = fromJS({'test key': {}});

            expect(mixin._toJSFromImmutable(data)).toEqual({'test key': {}});
        });
    });
});
