import withTests from 'storybook-addon-jest';
import testResults from 'test-results';
import Styles from 'lib/Styles';

const fractionSlash = '⁄';

/**
 * storybook-addon-jest has some odd handling for slashes (using path.basename)
 * that we work around by using something that looks like a slash so the
 * string doesn't get modified.
 * @param {String} filename - The module name which isn't actually a filename
 * @return {String} The filename with the slashes converted to fraction slashes
 * @private
 */
function normalizeFilenameSlashes(filename) {
    return filename.replace(/\//g, fractionSlash);
}


/**
 * A set of helper methods for assisting in testing Polymer components.
 * None of these methods should ever be included in production code.
 * @module lib/PolymerTestHelper
 */
export default class PolymerTestHelper {
    /**
     * Creates a dom node from the template, injecting the data
     * for the dynamic attributes. There is a single forced
     * render of the element, but if you want it to update
     * due to changes in state, the returned node should probably
     * be appended to the body's DOM.
     * @param {DocumentFragment} template - Usually generate with polymer's
     * html helper
     * @param {Object} data - The data that is passed to the template element
     * to be subbed in for the values.
     * @return {HTMLElement} The rendered template
     * @example
     *  const template = html`
     *      <z-toggle active="{{active}}" on-active-change="_handleActiveChange">
     *            Test Content
     *        </z-toggle>
     *    `;
     *  const root = Helper.createElement(template, {
     *      active: true,
     *      _handleActiveChange,
     *  });
     */
    static createElement(template, data) {
        const binding = document.createElement('dom-bind');
        const container = document.createElement('div');

        binding.appendChild(template);

        if (data) {
            Object.assign(binding, data);
        }

        container.appendChild(binding);

        binding.connectedCallback();

        const root = container.children[0];

        if (root.connectedCallback) {
            root.connectedCallback();
        }

        return root;
    }

    /**
     * Helper assert methods.  By defailt, the only included assert
     * asserts the serialized html.
     * @param {HTMLElement} root - The dom to assert
     * @param {Object} asserts - Key value pairs of what you want ot assert.
     */
    static assert(root, asserts = {}) {
        if (asserts.hasOwnProperty('html')) {
            expect(root.outerHTML).toEqual(asserts.html);
        }

        if (asserts.hasOwnProperty('properties')) {
            Object.keys(asserts.properties).forEach((selector) => {
                const element = root.shadowRoot.querySelector(selector);
                const actual = Object.keys(asserts.properties[selector]).reduce((accumulator, k) => {
                    return Object.assign(accumulator, {[k]: element.get(k)});
                }, {});

                expect(actual).toEqual(asserts.properties[selector]);
            });
        }
    }

    /**
     * When using a spy to test CustomEvent calls, this methods will
     * map the CustomEvent to just the detail which is much more assertable
     * and meaningful in most tests.
     * @param {Object} call - The information when the spy was called.
     * @return {Object} The mapped data to ony contain the contents of the
     * detail.
     */
    static getDetail(call) {
        return call.args[0].detail;
    }


    /**
     * A storybook helper method. Adds a tst pane to storybook for the
     * current component
     * @param {String} componentPath - The documentation module to include,
     * like 'lib/componentsToggle'
     * @return {*} The decorator information required for storybook
     */
    static withTests(componentPath) {
        const normalized = normalizeFilenameSlashes(componentPath);

        ((testResults || {}).testResults || []).forEach((r) => {
                r.name = normalizeFilenameSlashes(r.name);
        });

        return withTests(testResults, {filesExt: ''})(normalized);
    }

    /**
     * A storybook helper method. Adds relevant jsdoc documentation to the
     * notes pane.
     * @param {String} componentPath - The documentation module to include,
     * like 'lib/componentsToggle'
     * @return {Object} The response as expected from the
     * <code>@storybook/plugin-notes</code> plugin.
     */
    static withDocumentation(componentPath) {
        const normalizedPath = componentPath.replace(/\//g, '_');
        const url = `documentation/module-${normalizedPath}.html`;
        const styles = new Styles({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: 0,
            width: '100%',
            height: '100%',
        });

        return {
            notes: `<iframe src="${url}" style="${styles}"></iframe>`,
        };
    }
}
