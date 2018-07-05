import Styles from './Styles';

/**
 * @private
 * @param {Style} instance - A style instance
 * @return {Object} An object representation of the instance
 */
function toObject(instance) {
    return JSON.parse(JSON.stringify(instance));
}

describe('lib/Styles', () => {
    it('serializes an object with multiple values', () => {
        const styles = new Styles({'color': 'blue', 'width': 0});

        expect(toObject(styles)).toEqual({'color': 'blue', 'width': 0});
        expect(String(styles)).toEqual('color: blue; width: 0;');
    });

    it('serializes to an empty string when there are no values', () => {
        const styles = new Styles({});

        expect(toObject(styles)).toEqual({});
        expect(String(styles)).toEqual('');
    });

    it('serializes object with multiple values after construction', () => {
        const styles = new Styles({});

        styles.color = 'blue';
        styles.width = 0;

        expect(toObject(styles)).toEqual({'color': 'blue', 'width': 0});
        expect(String(styles)).toEqual('color: blue; width: 0;');
    });
});

