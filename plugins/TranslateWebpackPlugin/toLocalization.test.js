const toLocalization = require('./toLocalization');

describe('toLocalization', () => {
    it('create key and value when contains translation', () => {
        expect(toLocalization(`a __('b') c`)).toEqual({b: `__('b')`});
    });

    it('adds nothing when no translation', () => {
        expect(toLocalization(`a c`)).toEqual({});
    });

    it('create key and value when contains shorthand translation', () => {
        expect(toLocalization('a __`b` c')).toEqual({b: '__`b`'});
    });
});
