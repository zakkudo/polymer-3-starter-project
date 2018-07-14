import Url from 'lib/Url';
import UrlError from 'lib/errors/UrlError';

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
            new UrlError(
                'No replacement exists for :id in the params',
                'http://backend/v1/users/:id/detail'
            )
        );
    });

    it('parses an inline query string', () => {
        const url = new Url('http://backend/v1/users?limit=20');

        expect(url.params).toEqual({limit: 20});
    });

    it('throws an exception when there are params and an inline query string', () => {
        expect(() => String(new Url('http://backend/v1/users?limit=20', {offset: 5}))).toThrow(
            new UrlError(
                'Trying to add duplicate query param when already exists',
                'http://backend/v1/users?limit=20'
            )
        );
    });

    it('throws an exception when query string added after initialization', () => {
        const url = new Url('http://backend/v1/users', {offset: 5});
        url.url = url.url + '?invalid=true';

        expect(() => String(url)).toThrow(
            new UrlError(
                'Trying to add duplicate query param when already exists',
                'http://backend/v1/users?invalid=true'
            )
        );
    });
});
