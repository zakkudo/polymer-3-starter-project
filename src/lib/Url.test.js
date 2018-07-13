import Url from 'lib/Url';

class Helper {
    static assert(url, asserts) {
        if (asserts.hasOwnProperty('asObject')) {
            expect(JSON.parse(JSON.stringify(url))).toEqual(asserts.asObject);
        }

        if (asserts.hasOwnProperty('asString')) {
            expect(String(url)).toEqual(asserts.asString);
        }
    }
}

describe('lib/Url', () => {
    it('stringifies the url with no options', () => {
        const url = new Url('http://backend/v1');

        Helper.assert(url, {
            asObject: {
                url: 'http://backend/v1',
                params: {},
            },
            asString: 'http://backend/v1',
        });
    });

    it('stringifies the url with params', () => {
        const url = new Url('http://backend/v1', {
            'testString': 'value1',
        });

        Helper.assert(url, {
            asObject: {
                url: 'http://backend/v1',
                params: {
                    'testString': 'value1',
                },
            },
            asString: 'http://backend/v1?testString=value1',
        });
    });

    it('stringifies the url with replacmeent patterns and with params', () => {
        const url = new Url('http://backend/v1/users/:id/detail', {
            'testString': 'value1',
            'id': '1234',
        });

        Helper.assert(url, {
            asObject: {
                url: 'http://backend/v1/users/:id/detail',
                params: {
                    'testString': 'value1',
                    'id': '1234',
                },
            },
            asString: 'http://backend/v1/users/1234/detail?testString=value1',
        });
    });

    it('stringifies the url with multiple replacmeent patterns and with params', () => {
        const url = new Url('http://backend/v1/users/:userId/roles/:roleId', {
            'testString': 'value1',
            'userId': '1234',
            'roleId': '5678',
        });

        Helper.assert(url, {
            asObject: {
                url: 'http://backend/v1/users/:userId/roles/:roleId',
                params: {
                    'testString': 'value1',
                    'userId': '1234',
                    'roleId': '5678',
                },
            },
            asString: 'http://backend/v1/users/1234/roles/5678?testString=value1',
        });
    });

    it('throws an exception when there is a replacement pattern but no matching param', () => {
        expect(() => String(new Url('http://backend/v1/users/:id/detail', {}))).toThrow(
            new Error(
                'No replacement exists for :id in the params <http://backend/v1/users/:id/detail>'
            )
        );
    });
});
