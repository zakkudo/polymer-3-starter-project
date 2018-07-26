const hasTranslation = require('./hasTranslation');

describe('hasTranslation', () => {
    it('returns true for empty object', () => {
        expect(hasTranslation({})).toBe(false);
    });

    it('returns false for empty value', () => {
        expect(hasTranslation({a: ''})).toBe(false);
    });

    it('returns true for value', () => {
        expect(hasTranslation({a: 'b'})).toBe(true);
    });
});
