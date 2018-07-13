import HttpError from 'lib/errors/HttpError';

describe('lib/errors/HttpError', () => {
    it('throws the error with the properties attached', () => {
        const error = new HttpError(
            'test status',
            'test status text',
            'test url',
            'test headers',
            'test response'
        );

        expect(String(error)).toEqual('HttpError: test status test status text <test url>');
        expect(error.response).toEqual('test response');
    });
});
