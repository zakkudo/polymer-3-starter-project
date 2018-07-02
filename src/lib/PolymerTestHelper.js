/**
 * @private
 */
export default class PolymerTestHelper {
    /**
     * @private
     */
    static createElement(template, data, target) {
        const binding = document.createElement('dom-bind');
        const container = document.createElement('div');

        binding.innerHTML = `<template>${template}</template>`;

        if (data) {
            Object.assign(binding, data);
        }

        container.appendChild(binding);

        //The element may never be appended to the document body, so we force
        //a render here to make sure the component is assertable
        binding.render();

        return container.firstChild;
    }

    /**
     * @private
     */
    static assert(root, asserts = {}) {
        if (asserts.hasOwnProperty('html')) {
            expect(root.outerHTML).toEqual(asserts.html);
        }
    }

    /**
     * @private
     */
    static getDetail(call) {
        return call.args[0].detail;
    }
}
