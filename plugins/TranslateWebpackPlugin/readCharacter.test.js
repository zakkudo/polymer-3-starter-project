const readCharacter = require('./readCharacter');

fdescribe('plugins/readCharacter', () => {
    it('test', () => {
        let state = {index: 0, stack: [], lineNumber: 0}
        const test = 'abc';
        const actual = [];

        while ((state = readCharacter(text, state)) !== null) {
            actual.push(state);
        }

        expect(actual).toEqual([]);
    });
});
