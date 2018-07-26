import Actions from './Actions';

describe('lib/Actions', () => {
    it('generates the type name when passed only a action creator', () => {
        const actions = new Actions({
            setValue(value) {
                return {
                    type: 'SET_VALUE',
                    value,
                };
            },
        });

        expect(actions.SET_VALUE).toEqual('SET_VALUE');
        expect(actions.setValue(3)).toEqual({
            type: 'SET_VALUE',
            value: 3,
        });
    });

    it('applies the application namespace to the action type', () => {
        const actions = new Actions({
            setValue(value) {
                return {
                    type: 'SET_VALUE',
                    value,
                };
            },
        }, 'application');

        expect(actions.SET_VALUE).toEqual('@application/SET_VALUE');
        expect(actions.setValue(3)).toEqual({
            type: '@application/SET_VALUE',
            value: 3,
        });
    });

    it('the changed action type applied to the action creator', () => {
        const actions = new Actions({
            setValue(value) {
                return {
                    type: 'SET_VALUE',
                    value,
                };
            },
        }, 'application');

        actions.SET_VALUE = 'OVERRIDDEN_VALUE';

        expect(actions.SET_VALUE).toEqual('OVERRIDDEN_VALUE');
        expect(actions.setValue(3)).toEqual({
            type: 'OVERRIDDEN_VALUE',
            value: 3,
        });
    });

    it('adds missing async action creators', () => {
        const actions = new Actions({
            setValue(value) {
                return {
                    type: 'SET_VALUE',
                    value,
                };
            },
            requestValue(request) {
                return {
                    type: 'REQUEST_VALUE',
                    request,
                };
            },
        }, 'application');

        expect(actions.REQUEST_VALUE).toEqual('@application/REQUEST_VALUE');
        expect(actions.setValue(3)).toEqual({
            type: '@application/SET_VALUE',
            value: 3,
        });
        expect(actions.requestValue(3)).toEqual({
            type: '@application/REQUEST_VALUE',
            request: 3,
        });
        expect(actions.valueRequestSucceeded('test success')).toEqual({
            type: '@application/VALUE_REQUEST_SUCCEEDED',
            response: 'test success',
        });

        expect(actions.valueRequestFailed('test failure')).toEqual({
            type: '@application/VALUE_REQUEST_FAILED',
            reason: 'test failure',
        });
    });

    it('doesn\'t override existing async action creators', () => {
        const actions = new Actions({
            setValue(value) {
                return {
                    type: 'SET_VALUE',
                    value,
                };
            },
            requestValue(request) {
                return {
                    type: 'REQUEST_VALUE',
                    request,
                };
            },
            valueRequestSucceeded(response) {
                return {
                    type: 'VALUE_REQUEST_SUCCEEDED_OVERRIDE',
                    override: response,
                };
            },
            valueRequestFailed(reason) {
                return {
                    type: 'VALUE_REQUEST_FAILED_OVERRIDE',
                    override: reason,
                };
            },
        }, 'application');

        expect(actions.REQUEST_VALUE).toEqual('@application/REQUEST_VALUE');
        expect(actions.setValue(3)).toEqual({
            type: '@application/SET_VALUE',
            value: 3,
        });
        expect(actions.requestValue(3)).toEqual({
            type: '@application/REQUEST_VALUE',
            request: 3,
        });
        expect(actions.valueRequestSucceeded('test success')).toEqual({
            type: '@application/VALUE_REQUEST_SUCCEEDED_OVERRIDE',
            override: 'test success',
        });

        expect(actions.VALUE_REQUEST_SUCCEEDED).toEqual(
            '@application/VALUE_REQUEST_SUCCEEDED_OVERRIDE'
        );

        expect(actions.valueRequestFailed('test failure')).toEqual({
            type: '@application/VALUE_REQUEST_FAILED_OVERRIDE',
            override: 'test failure',
        });

        expect(actions.VALUE_REQUEST_FAILED).toEqual(
            '@application/VALUE_REQUEST_FAILED_OVERRIDE'
        );
    });
});
