import withTests from 'storybook-addon-jest';
import testResults from 'test-results';


const fractionSlash = '⁄';

/**
 * @private
 */
function cleanupLog(log) {
    return log.filter((l) => {
        return !l.includes('<Jasmine>');
    }).map((l) => {
        return l.replace(/.*webpack:\/\/\/\.(.[^)]*)/, 'at ($1');
    });
}

/**
 * @private
 */
function toAssertionResults(tests) {
    let suiteStatus;
    let suiteStartTime = new Date().getTime();
    let suiteEndTime = suiteStartTime;
    const assertionResults = Object.keys(tests).map((testname) => {
        const test = tests[testname];

        if (!test.status) {
            return null;
        }

        const fullName = testname;
        const status = test.status.toLowerCase();
        const startTime = suiteStartTime;
        const endTime = suiteEndTime + test.time;
        const failureMessages = cleanupLog(test.log);

        if (!suiteStatus) {
            suiteStatus = status;
        } else if (status === 'failed') {
            suiteStatus = status;
        }

        suiteEndTime = endTime;

        return {
            fullName,
            status,
            startTime,
            failureMessages,
            endTime,
        };
    }).filter((t) => t);

    return {
        status: suiteStatus || 'passed',
        startTime: suiteStartTime,
        endTime: suiteEndTime,
        assertionResults,
    };
}

/**
 * @private
 */
function karmaToJest(files) {
    return {
        testResults: Object.keys(files).map((filename) => {
            const tests = files[filename];
            const {assertionResults, startTime, endTime, status} = toAssertionResults(tests);

            return {
                assertionResults,
                'coverage': {},
                endTime,
                'message': 'TEST MESSAGE',
                'name': filename.replace(/\//g, fractionSlash),
                startTime,
                status,
                'summary': 'TEST SUMMARY',
            };
        }),
    };
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

        binding.render();

        return container.children[0];
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
     * Adds a tst pane to storybook for the current component
     * @param {String} componentPath - The documentation module to include,
     * like 'lib/componentsToggle'
     * @return {*} The decorator information required for storybook
     */
    static withTests(componentPath) {
        const normalized = componentPath.replace(/\//g, fractionSlash);

        return withTests(karmaToJest(testResults), {filesExt: ''})(normalized);
    }

    /**
     * Adds relevant jsdoc documentation to the notes pane.
     * @param {String} componentPath - The documentation module to include,
     * like 'lib/componentsToggle'
     * @return {Object} The response as expected from the
     * <code>@storybook/plugin-notes</code> plugin.
     */
    static withDocumentation(componentPath) {
        const normalizedPath = componentPath.replace(/\//g, '_');
        const url = `documentation/module-${normalizedPath}.html`;
        const styles = 'position: absolute; top: 0; left: 0; right: 0; ' +
            'bottom: 0; border: 0; width: 100%; height: 100%;';

        return {
            notes: `<iframe src="${url}" style="${styles}"></iframe>`,
        };
    }
}
