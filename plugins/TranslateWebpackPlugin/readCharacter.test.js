const readCharacter = require('./readCharacter');

describe('plugins/readCharacter', () => {
    it('reads letters with no special meaning', () => {
        let state = {index: 0, stack: [], lineNumber: 0}
        const text = 'abc';
        const actual = [];

        while ((state = readCharacter(text, state)) !== null) {
            actual.push(state);
        }

        expect(actual).toEqual([{
            index: 1,
            stack: [],
            lineNumber: 0
        }, {
            index: 2,
            stack: [],
            lineNumber: 0
        }, {
            index: 3,
            stack: [],
            lineNumber: 0
        }]);
    });

    it('reads a string', () => {
        let state = {index: 0, stack: [], lineNumber: 0}
        const text = 'a"b"c';
        const actual = [];

        while ((state = readCharacter(text, state)) !== null) {
            actual.push(state);
        }

        expect(actual).toEqual([{
            index: 1,
            stack: [],
            lineNumber: 0
        }, {
            index: 2,
            stack: ['"'],
            lineNumber: 0
        }, {
            index: 3,
            stack: ['"'],
            lineNumber: 0
        }, {
            index: 4,
            stack: [],
            lineNumber: 0
        }, {
            index: 5,
            stack: [],
            lineNumber: 0
        }]);
    });

    it('reads a string surrounded in parenthesis', () => {
        let state = {index: 0, stack: [], lineNumber: 0}
        const text = 'a("b")c';
        const actual = [];

        while ((state = readCharacter(text, state)) !== null) {
            actual.push(state);
        }

        expect(actual).toEqual([{
            index: 1,
            stack: [],
            lineNumber: 0
        }, {
            index: 2,
            stack: ['('],
            lineNumber: 0
        }, {
            index: 3,
            stack: ['"', '('],
            lineNumber: 0
        }, {
            index: 4,
            stack: ['"', '('],
            lineNumber: 0
        }, {
            index: 5,
            stack: ['('],
            lineNumber: 0
        }, {
            index: 6,
            stack: [],
            lineNumber: 0
        }, {
            index: 7,
            stack: [],
            lineNumber: 0
        }]);
    });

    it('doesn\'t add quoted parenthesis to the stack', () => {
        let state = {index: 0, stack: [], lineNumber: 0}
        const text = 'a"(b)"c';
        const actual = [];

        while ((state = readCharacter(text, state)) !== null) {
            actual.push(state);
        }

        expect(actual).toEqual([{
            index: 1,
            stack: [],
            lineNumber: 0
        }, {
            index: 2,
            stack: ['"'],
            lineNumber: 0
        }, {
            index: 3,
            stack: ['"'],
            lineNumber: 0
        }, {
            index: 4,
            stack: ['"'],
            lineNumber: 0
        }, {
            index: 5,
            stack: ['"'],
            lineNumber: 0
        }, {
            index: 6,
            stack: [],
            lineNumber: 0
        }, {
            index: 7,
            stack: [],
            lineNumber: 0
        }]);
    });

    it('doesn\'t add commented quotes', () => {
        let state = {index: 0, stack: [], lineNumber: 0}
        const text = '//"\n""';
        const actual = [];

        while ((state = readCharacter(text, state)) !== null) {
            actual.push(state);
        }

        expect(actual).toEqual([{
            index: 2,
            stack: ['//'],
            lineNumber: 0
        }, {
            index: 3,
            stack: ['//'],
            lineNumber: 0
        }, {
            index: 4,
            stack: [],
            lineNumber: 1
        }, {
            index: 5,
            stack: ['"'],
            lineNumber: 1
        }, {
            index: 6,
            stack: [],
            lineNumber: 1
        }]);
    });

    it('multiline comments comment quotes', () => {
        let state = {index: 0, stack: [], lineNumber: 0}
        const text = '/*"\n*/""';
        const actual = [];

        while ((state = readCharacter(text, state)) !== null) {
            actual.push(state);
        }

        expect(actual).toEqual([{
            index: 2,
            stack: ['/*'],
            lineNumber: 0
        }, {
            index: 3,
            stack: ['/*'],
            lineNumber: 0
        }, {
            index: 4,
            stack: ['/*'],
            lineNumber: 1
        }, {
            index: 6,
            stack: [],
            lineNumber: 1
        }, {
            index: 7,
            stack: ['"'],
            lineNumber: 1
        }, {
            index: 8,
            stack: [],
            lineNumber: 1
        }]);
    });

    it('parses basic translation function', () => {
        let state = {index: 0, stack: [], lineNumber: 0}
        const text = '__("a")b';
        const actual = [];

        while ((state = readCharacter(text, state)) !== null) {
            actual.push(state);
        }

        expect(actual).toEqual([{
            index: 7,
            stack: [],
            lineNumber: 0,
            localization: {
                key: 'a',
                fn: '__("a")',
            }
        }, {
            index: 8,
            stack: [],
            lineNumber: 0,
        }]);
    });

    it('parses template translation function', () => {
        let state = {index: 0, stack: [], lineNumber: 0}
        const text = '__`a`b';
        const actual = [];

        while ((state = readCharacter(text, state)) !== null) {
            actual.push(state);
        }

        expect(actual).toEqual([{
            index: 5,
            stack: [],
            lineNumber: 0,
            localization: {
                key: 'a',
                fn: '__`a`',
            }
        }, {
            index: 6,
            stack: [],
            lineNumber: 0,
        }]);
    });
});
