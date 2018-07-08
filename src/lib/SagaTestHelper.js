import {fromJS} from 'immutable';
import NotImplementedError from 'lib/errors/NotImplementedError';

function toJS(data) {
    return fromJS(data).toJS();
}

function cleanup({value, done}) {
    if (!value && done) {
        return {done};
    }

    if (Object(value) !== value) {
        return value;
    }

    if (value.CALL) {
        return toJS({
            CALL: {
                args: value.CALL.args,
            },
        });
    } else if (value.PUT) {
        return toJS({
            PUT: {
                action: value.PUT.action,
            },
        });
    }

    throw new NotImplementedError();
}

export default class SagaTestHelper {
    static run(generator, steps) {
        const results = [];
        let iterator;

        if (steps) {
            steps.forEach((s) => {
                if (s instanceof Error) {
                    iterator = generator.throw(s);
                } else {
                    iterator = generator.next(s);
                }
                results.push(iterator);
            });
        }

        // Auto runs to the end
        while (!iterator.done) {
            iterator = generator.next();
            results.push(iterator);
        }

        return results;
    }

    static assert(results, expected) {
        const actual = results.map(cleanup);

        expect(actual).toEqual(expected);
    }
}

