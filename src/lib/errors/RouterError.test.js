import RouterError from './RouterError';

describe('lib/RouterError', () => {
    it('constructs an error with the custom message', () => {
        const error = new RouterError(
            'test message',
            'test file name', 5,
            'test code'
        );

        expect(error.message).toEqual('test message');
        expect(error.code).toEqual('test code');
        expect(String(error)).toEqual('Error test code: test message');
    });

    it('fallsback to error code -1 when not supplied', () => {
        const error = new RouterError(
            'test message',
            'test file name', 5
        );

        expect(error.message).toEqual('test message');
        expect(error.code).toEqual('-1');
        expect(String(error)).toEqual('Error -1: test message');
    });
});
