import {fromJS} from 'immutable';

function toJS(data) {
    return fromJS(data).toJS();
}

function cleanup({value, done}) {
    if (!value && done) {
        return {done};
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

    return toJS(value);
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
        expect(results.map(cleanup)).toEqual(expected);
    }
}

