import RouterError from './RouterError';

describe('lib/RouterError', () => {
    it('constructs an error with the custom message', () => {
        const error = new RouterError(
            'test message',
            'test file name', 5,
            'test code',
            'test-component'
        );

        expect(error.message).toEqual('test message');
        expect(error.code).toEqual('test code');
        expect(error.fallbackComponent).toEqual('test-component');
        expect(String(error)).toEqual('RouterError: test code test message');
    });

    it('fallsback to error code -1 when not supplied', () => {
        const error = new RouterError(
            'test message',
            'test file name', 5
        );

        expect(error.message).toEqual('test message');
        expect(error.code).toEqual('-1');
        expect(String(error)).toEqual('RouterError: -1 test message');
    });
});
