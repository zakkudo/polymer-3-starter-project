/**
 * Converts an object to a styles string that can
 * be used as is in html elements when serialized.
 * @example
 *   const styles = new Styles({color: 'blue'});
 *
 *   <div styles=[[styles]]></div>
 * @module lib/Styles
 */
export default class Styles {
    /**
     * @param {Object} styles - The initial styles
     */
    constructor(styles) {
        Object.assign(this, styles);
    }

    /**
     * @private
     * @return {String} The serialized object
     */
    toString() {
        let serialized = Object.keys(this).reduce((accumulator, k) => {
            return accumulator.concat([`${k}: ${String(this[k])}`]);
        }, []).join('; ');

        if (serialized.length) {
            serialized += ';';
        }

        return serialized;
    }
}
