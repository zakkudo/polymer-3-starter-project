const toLocalization = require('./toLocalization');

describe('toLocalization', () => {
    it('create key and value when contains translation', () => {
        expect(toLocalization(`a __('b') c`)).toEqual({b: {fn: `__('b')`, lineNumber: 0, index: 9}});
    });

    it('adds nothing when no translation', () => {
        expect(toLocalization(`a c`)).toEqual({});
    });

    it('create key and value when contains shorthand translation', () => {
        expect(toLocalization('a __`b` c')).toEqual({b: {fn: '__`b`', lineNumber: 0, index: 7 }});
    });
});
