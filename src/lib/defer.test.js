import defer from './defer';

describe('lib/defer', () => {
    it('resolves the promise to the value passed to resolve', () => {
        const deferred = defer();
        const promise = deferred.promise;

        deferred.resolve('test resolve');

        return promise.then((response) => {
            expect(response).toBe('test resolve');
        });
    });

    it('rejects the promise to the value passed to reject', () => {
        const deferred = defer();
        const promise = deferred.promise;

        deferred.reject('test reject');

        return promise.catch((reason) => expect(reason).toBe('test reject'));
    });

    it('does not resolve or catch with no interaction', () => {
        const thenFunc = jasmine.createSpy('then');
        const catchFunc = jasmine.createSpy('catch');
        const deferred = defer();
        const promise = deferred.promise;

        promise.then(thenFunc).catch(catchFunc);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                expect(thenFunc).not.toHaveBeenCalled();
                expect(catchFunc).not.toHaveBeenCalled();
                resolve();
            });
        });
    });
});
