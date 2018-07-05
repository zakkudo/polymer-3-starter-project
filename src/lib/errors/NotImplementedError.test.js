import NotImplementedError from './NotImplementedError';

describe('lib/NotImplementedError', () => {
    it('constructs an error with the custom message', () => {
        const error = new NotImplementedError('test message');

        expect(error.message).toEqual('test message');
        expect(String(error)).toEqual('Error: test message');
    });
});
