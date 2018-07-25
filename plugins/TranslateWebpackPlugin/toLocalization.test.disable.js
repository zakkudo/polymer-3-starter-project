const toLocalization = require('./toLocalization');

describe('toLocalization', () => {
    describe('__', () => {
        it('finds not translatable strings when the string is empty', () => {
            expect(toLocalization('')).toEqual([]);
        });

        it('has text, but no translatable strings', () => {
            expect(toLocalization('test text')).toEqual([]);
        });

        it('has single quote translatable string', () => {
            expect(toLocalization(`__('test text')`)).toEqual([{
                match: `__('test text')`,
                lineNumber: 0,
            }]);
        });

        it('has single quote translatable string', () => {
            expect(toLocalization(`[[__('test text')]]`)).toEqual([{
                match: `__('test text')`,
                lineNumber: 0,
            }]);
        });

        it('has single quote translatable string on third line', () => {
            expect(toLocalization(`\n\n[[__('test text')]]`)).toEqual([{
                match: `__('test text')`,
                lineNumber: 2,
            }]);
        });

        it('has double quote translatable string', () => {
            expect(toLocalization(`__("test text")`)).toEqual([{
                match: `__("test text")`,
                lineNumber: 0,
            }]);
        });

        it('has tild quote translatable string', () => {
            expect(toLocalization('__(`test text`)')).toEqual([{
                match: '__(`test text`)',
                lineNumber: 0,
            }]);
        });

        it('makes no assumptions if the string is already quoted', () => {
            expect(toLocalization('"`__(`test text`)"')).toEqual([{
                match: '__(`test text`)',
                lineNumber: 0,
            }]);
        });

        it('no closing quote fails gracefully', () => {
            expect(toLocalization('`__(`test text')).toEqual([]);
        });

        it('no closing parenthesis fails gracefully', () => {
            expect(toLocalization('`__(`test text`')).toEqual([]);
        });

        it('has tild shorthand quote translatable string', () => {
            expect(toLocalization('__`test text`')).toEqual([{
                match: '__`test text`',
                lineNumber: 0,
            }]);
        });

        it('has single quote translatable string with surrounding text', () => {
            expect(toLocalization(`sourrounding __('test text') text`)).toEqual([{
                match: `__('test text')`,
                lineNumber: 0,
            }]);
        });

        it('finds multiple translatable strings', () => {
            expect(toLocalization(
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
            expect(toLocalization('')).toEqual([]);
        });

        it('has text, but no translatable strings', () => {
            expect(toLocalization('test text')).toEqual([]);
        });

        it('has single quote translatable string', () => {
            expect(toLocalization(`__n('test text')`)).toEqual([{
                match: `__n('test text')`,
                lineNumber: 0,
            }]);
        });

        it('has single quote translatable string', () => {
            expect(toLocalization(`[[__n('test text')]]`)).toEqual([{
                match: `__n('test text')`,
                lineNumber: 0,
            }]);
        });

        it('has double quote translatable string', () => {
            expect(toLocalization(`__n("test text")`)).toEqual([{
                match: `__n("test text")`,
                lineNumber: 0,
            }]);
        });

        it('has tild quote translatable string', () => {
            expect(toLocalization('__n(`test text`)')).toEqual([{
                match: '__n(`test text`)',
                lineNumber: 0
            }]);
        });

        it('has tild shorthand quote translatable string', () => {
            expect(toLocalization('__n`test text`')).toEqual([{
                match: '__n`test text`',
                lineNumber: 0,
            }]);
        });

        it('has single quote translatable string with surrounding text', () => {
            expect(toLocalization(`sourrounding __n('test text') text`)).toEqual([{
                match: `__n('test text')`,
                lineNumber: 0,
            }]);
        });

        it('finds multiple translatable strings', () => {
            expect(toLocalization(
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
