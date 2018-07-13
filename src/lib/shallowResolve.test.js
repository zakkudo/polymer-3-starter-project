import shallowResolve from './shallowResolve';
import NotImplementedError from 'lib/errors/NotImplementedError';

describe('lib/shallowResolve', () => {
    it('resolves all of the sub-requests into an object', () => {
        const promise = shallowResolve({
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
        const promise = shallowResolve({
            users: () => Promise.reject(`Couldn't resolve users`),
            type: () => Promise.resolve('storage'),
            attributes: () => Promise.resolve({
                readonly: true,
            }),
        });

        return promise.catch((reason) => {
            expect(String(reason)).toEqual(
                `Couldn't resolve users`
            );
        });
    });

    it('throws a NotImplementedError when receiving an array', () => {
        return expect(() => {
            shallowResolve([]);
        }).toThrow(new NotImplementedError(
            'Array functionality is not implemented yet for shallowResolve'
        ));
    });
});
