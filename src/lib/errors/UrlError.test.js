import UrlError from 'lib/errors/UrlError';

describe('lib/errors/UrlError', () => {
    it('throws the error with the properties attached', () => {
        const error = new UrlError(
            'test message',
            'test url'
        );

        expect(String(error)).toEqual('UrlError: test message <test url>');
    });
});

