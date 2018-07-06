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
});
