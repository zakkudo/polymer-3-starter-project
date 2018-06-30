import shallowResolveObject from './shallowResolveObject';

describe('lib/shallowResolveObject', () => {
    it('resovles all of the sub-requests into an object', () => {
        const promise = shallowResolveObject({
            users: () => Promise.resolve([
                'test user 1',
                'test user 2',
                'test user 3',
            ]),
            type: () => Promise.resolve('storage'),
            attributes: () => Promise.resolve({
                readonly: true,
            }),
        });

        return promise.then((payload) => {
            expect(payload).toEqual({
                users: [
                    'test user 1',
                    'test user 2',
                    'test user 3',
                ],
                type: 'storage',
                attributes: {
                    readonly: true,
                },
            });
        });
    });

    it('fails the resolve if one of the functions rejects', () => {
        const promise = shallowResolveObject({
            users: () => Promise.reject(`Couldn't resolve users`),
            type: () => Promise.resolve('storage'),
            attributes: () => Promise.resolve({
                readonly: true,
            }),
        });

        return promise.catch((reason) => {
            expect(reason).toEqual(`Couldn't resolve users`);
        });
    });
});
