const getLocalizationStrings = require('./getLocalizationStrings');

describe('getLocalizationStrings', () => {
    describe('__', () => {
        it('finds not translatable strings when the string is empty', () => {
            expect(getLocalizationStrings('')).toEqual([]);
        });

        it('has text, but no translatable strings', () => {
            expect(getLocalizationStrings('test text')).toEqual([]);
        });

        it('has single quote translatable string', () => {
            expect(getLocalizationStrings(`__('test text')`)).toEqual([{
                match: `__('test text')`,
                lineNumber: 0,
            }]);
        });

        it('has single quote translatable string', () => {
            expect(getLocalizationStrings(`[[__('test text')]]`)).toEqual([{
                match: `__('test text')`,
                lineNumber: 0,
            }]);
        });

        it('has single quote translatable string on third line', () => {
            expect(getLocalizationStrings(`\n\n[[__('test text')]]`)).toEqual([{
                match: `__('test text')`,
                lineNumber: 2,
            }]);
        });

        it('has double quote translatable string', () => {
            expect(getLocalizationStrings(`__("test text")`)).toEqual([{
                match: `__("test text")`,
                lineNumber: 0,
            }]);
        });

        it('has tild quote translatable string', () => {
            expect(getLocalizationStrings('__(`test text`)')).toEqual([{
                match: '__(`test text`)',
                lineNumber: 0,
            }]);
        });

        it('makes no assumptions if the string is already quoted', () => {
            expect(getLocalizationStrings('"`__(`test text`)"')).toEqual([{
                match: '__(`test text`)',
                lineNumber: 0,
            }]);
        });

        it('no closing quote fails gracefully', () => {
            expect(getLocalizationStrings('`__(`test text')).toEqual([]);
        });

        it('no closing parenthesis fails gracefully', () => {
            expect(getLocalizationStrings('`__(`test text`')).toEqual([]);
        });

        it('has tild shorthand quote translatable string', () => {
            expect(getLocalizationStrings('__`test text`')).toEqual([{
                match: '__`test text`',
                lineNumber: 0,
            }]);
        });

        it('has single quote translatable string with surrounding text', () => {
            expect(getLocalizationStrings(`sourrounding __('test text') text`)).toEqual([{
                match: `__('test text')`,
                lineNumber: 0,
            }]);
        });

        it('finds multiple translatable strings', () => {
            expect(getLocalizationStrings(
                `sourrounding __('test text') text [[__('other translatable')]]`
            )).toEqual([{
                match: `__('test text')`,
                lineNumber: 0,
            }, {
                match: `__('other translatable')`,
                lineNumber: 0,
            }]);
        });
    });

    describe('__n', () => {
        it('finds not translatable strings when the string is empty', () => {
            expect(getLocalizationStrings('')).toEqual([]);
        });

        it('has text, but no translatable strings', () => {
            expect(getLocalizationStrings('test text')).toEqual([]);
        });

        it('has single quote translatable string', () => {
            expect(getLocalizationStrings(`__n('test text')`)).toEqual([{
                match: `__n('test text')`,
                lineNumber: 0,
            }]);
        });

        it('has single quote translatable string', () => {
            expect(getLocalizationStrings(`[[__n('test text')]]`)).toEqual([{
                match: `__n('test text')`,
                lineNumber: 0,
            }]);
        });

        it('has double quote translatable string', () => {
            expect(getLocalizationStrings(`__n("test text")`)).toEqual([{
                match: `__n("test text")`,
                lineNumber: 0,
            }]);
        });

        it('has tild quote translatable string', () => {
            expect(getLocalizationStrings('__n(`test text`)')).toEqual([{
                match: '__n(`test text`)',
                lineNumber: 0
            }]);
        });

        it('has tild shorthand quote translatable string', () => {
            expect(getLocalizationStrings('__n`test text`')).toEqual([{
                match: '__n`test text`',
                lineNumber: 0,
            }]);
        });

        it('has single quote translatable string with surrounding text', () => {
            expect(getLocalizationStrings(`sourrounding __n('test text') text`)).toEqual([{
                match: `__n('test text')`,
                lineNumber: 0,
            }]);
        });

        it('finds multiple translatable strings', () => {
            expect(getLocalizationStrings(
                `sourrounding __n('test text') text [[__n('other translatable')]]`
            )).toEqual([{
                match: `__n('test text')`,
                lineNumber: 0,
            }, {
                match: `__n('other translatable')`,
                lineNumber: 0,
            }]);
        });
    });
});
