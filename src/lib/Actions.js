/**
 * Helper class to generate enum of action types that are
 * property namespaced for a set of action generators.
 * @example
 *    const actions = new Actions({
 *    });
 *
 *    actions.setValue(3);
 *    actions.SET_VALUE
 * @module lib/Actions
 */
export default class Actions {
    constructor(actionCreators, namespace='') {
        Object.keys(actionCreators).forEach((k) => {
            const actionCreator = actionCreators[k];
            const type = actionCreator().type;
            const nameSpacedType = namespace ? `@${namespace}/${type}` : type;

            this[k] = function(...args) {
                const action = actionCreator(...args);

                if (namespace) {
                    action.type = nameSpacedType;
                }

                return action;
            };

            this[type] = nameSpacedType;
        });
    }
}
