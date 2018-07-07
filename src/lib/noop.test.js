import noop from './noop';

describe('lib/noop', () => {
    it('returns undefined with no arguments', () => {
        expect(noop()).toEqual(undefined);
    });

    it('returns undefined with arguments', () => {
        expect(noop('one', 'two')).toEqual(undefined);
    });
});
