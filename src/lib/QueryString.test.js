import QueryString from 'lib/QueryString';
import UrlError from 'lib/errors/UrlError';

describe('lib/QueryString', () => {
    it('parsing an object', () => {
        const query = new QueryString({
            testString: 'test value',
            testNumber: 1,
            testBoolean: false,
            testJSON: {'test': 'value'},
            testUndefined: undefined,
            testDuplicateKeys: ['test value 1', 'test value 2'],
            testNull: null,
        });

        expect(String(query)).toEqual(
            '?' +
            'testString=test%20value&' +
            'testNumber=1&' +
            'testBoolean=false&' +
            'testJSON=%7B%22test%22%3A%22value%22%7D&' +
            'testDuplicateKeys=test%20value%201&' +
            'testDuplicateKeys=test%20value%202&' +
            'testNull=null'
        );

        expect(JSON.stringify(query)).toEqual(
            '{' +
                '"testString":"test value",' +
                '"testNumber":1,' +
                '"testBoolean":false,' +
                '"testJSON":{"test":"value"},' +
                '"testDuplicateKeys":["test value 1","test value 2"],' +
                '"testNull":null' +
            '}'
        );
    });

    it('parsing a string with leading ?', () => {
        const query = new QueryString(
            '?' +
            'testString=test%20value&' +
            'testNumber=1&' +
            'testBoolean=false&' +
            'testJSON=%7B%22test%22%3A%22value%22%7D&' +
            'testDuplicateKeys=test%20value%201&' +
            'testDuplicateKeys=test%20value%202&' +
            'testDuplicateKeys=test%20value%203&' +
            'testNull=null'
        );

        expect(String(query)).toEqual(
            '?' +
            'testString=test%20value&' +
            'testNumber=1&' +
            'testBoolean=false&' +
            'testJSON=%7B%22test%22%3A%22value%22%7D&' +
            'testDuplicateKeys=test%20value%201&' +
            'testDuplicateKeys=test%20value%202&' +
            'testDuplicateKeys=test%20value%203&' +
            'testNull=null'
        );

        expect(JSON.stringify(query)).toEqual(
            '{' +
                '"testString":"test value",' +
                '"testNumber":1,' +
                '"testBoolean":false,' +
                '"testJSON":{"test":"value"},' +
                '"testDuplicateKeys":["test value 1","test value 2","test value 3"],' +
                '"testNull":null' +
            '}'
        );
    });

    it('parsing a string without leading ?', () => {
        const query = new QueryString(
            'testString=test%20value&' +
            'testNumber=1&' +
            'testBoolean=false&' +
            'testJSON=%7B%22test%22%3A%22value%22%7D&' +
            'testNull=null'
        );

        expect(String(query)).toEqual(
            '?' +
            'testString=test%20value&' +
            'testNumber=1&' +
            'testBoolean=false&' +
            'testJSON=%7B%22test%22%3A%22value%22%7D&' +
            'testNull=null'
        );

        expect(JSON.stringify(query)).toEqual(
            '{' +
                '"testString":"test value",' +
                '"testNumber":1,' +
                '"testBoolean":false,' +
                '"testJSON":{"test":"value"},' +
                '"testNull":null' +
            '}'
        );
    });

    it('parsing a QueryString instance', () => {
        const original = new QueryString({
            testString: 'test value',
            testNumber: 1,
            testBoolean: false,
            testJSON: {'test': 'value'},
            testUndefined: undefined,
            testDuplicateKeys: ['test value 1', 'test value 2'],
            testNull: null,
        });
        const query = new QueryString(original);

        original.monkeyPatch = 'test';

        expect(String(query)).toEqual(
            '?' +
            'testString=test%20value&' +
            'testNumber=1&' +
            'testBoolean=false&' +
            'testJSON=%7B%22test%22%3A%22value%22%7D&' +
            'testDuplicateKeys=test%20value%201&' +
            'testDuplicateKeys=test%20value%202&' +
            'testNull=null'
        );

        expect(JSON.stringify(query)).toEqual(
            '{' +
                '"testString":"test value",' +
                '"testNumber":1,' +
                '"testBoolean":false,' +
                '"testJSON":{"test":"value"},' +
                '"testDuplicateKeys":["test value 1","test value 2"],' +
                '"testNull":null' +
            '}'
        );
    });


    it('allows you to update the query string after construction', () => {
        const query = new QueryString({
            testString: 'test value',
            testNumber: 1,
            testBoolean: false,
            testJSON: {'test': 'value'},
            testUndefined: undefined,
            testDuplicateKeys: ['test value 1', 'test value 2'],
            testNull: null,
        });

        query.testMonkeyPatch = 'test added field';

        expect(String(query)).toEqual(
            '?' +
            'testString=test%20value&' +
            'testNumber=1&' +
            'testBoolean=false&' +
            'testJSON=%7B%22test%22%3A%22value%22%7D&' +
            'testDuplicateKeys=test%20value%201&' +
            'testDuplicateKeys=test%20value%202&' +
            'testNull=null&' +
            'testMonkeyPatch=test%20added%20field'
        );

        expect(JSON.stringify(query)).toEqual(
            '{' +
                '"testString":"test value",' +
                '"testNumber":1,' +
                '"testBoolean":false,' +
                '"testJSON":{"test":"value"},' +
                '"testDuplicateKeys":["test value 1","test value 2"],' +
                '"testNull":null,' +
                '"testMonkeyPatch":"test added field"' +
            '}'
        );
    });

    it('throws an exception when receiving an array', () => {
        expect(() => {
            new QueryString([]);
        }).toThrow(new TypeError(`Array isn't an accepted constructor type`));
    });

    it('throws an exception when receiving a number', () => {
        expect(() => {
            new QueryString(1);
        }).toThrow(new TypeError(`number isn't an accepted constructor type`));
    });

    it('initializes a blank Query string when no arguments', () => {
        const query = new QueryString();

        expect(String(query)).toEqual('');
        expect(JSON.stringify(query)).toEqual('{}');
    });

    it('throws UrlError when query string contains multiple ?s', () => {
        expect(() => new QueryString('?one=1?two=2')).toThrow(new UrlError('Trying to add duplicate query param when already exists', '?one=1?two=2'));
    });
});
