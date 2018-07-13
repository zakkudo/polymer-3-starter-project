import {fromJS} from 'immutable';

/**
 * @private
 */
function removeImmutable(call) {
    return fromJS(call.args).toJS();
}

export default class MockTestHelper {
    static getCallArguments(mock) {
        return mock.calls.all().map(removeImmutable);
    }
}

