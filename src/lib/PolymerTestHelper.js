/**
 * @private
 */
export default class PolymerTestHelper {
    /**
     * @private
     */
    static createElement(template, data) {
        const root = document.createElement('dom-bind');

        root.innerHTML = `<template><div class="test-root">${template}</div></template>`;

        if (data) {
            Object.assign(root, data);
        }

        document.body.appendChild(root);

        return document.body.querySelector('.test-root');
    }

    /**
     * @private
     */
    static assert(root, asserts = {}) {
        if (asserts.hasOwnProperty('html')) {
            expect(root.innerHTML).toEqual(asserts.html);
        }
    }

    /**
     * @private
     */
    static getDetail(call) {
        return call.args[0].detail;
    }
}
