import passthrough from './passthrough';

describe('lib/passthrough', () => {
    it('returns undefined with no arguments', () => {
        expect(passthrough()).toEqual(undefined);
    });

    it('returns the first argument with arguments', () => {
        expect(passthrough('one', 'two')).toEqual('one');
    });
});
