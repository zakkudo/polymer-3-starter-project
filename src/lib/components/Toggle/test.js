import Toggle from ".";
import '@polymer/polymer/lib/elements/dom-bind.js';

afterEach(() => {
    document.body.innerHTML = '';
});

class Helper {
    static createElement(template, data) {
        const root = document.createElement('dom-bind');

        root.innerHTML = `<template><div class="test-root">${template}</div></template>`;

        if (data) {
            Object.assign(root, data);
        }

        document.body.appendChild(root);

        return document.body.querySelector('.test-root');
    }

    static assert(root, asserts = {}) {
        if (asserts.hasOwnProperty('html')) {
            expect(root.innerHTML).toEqual(asserts.html);
        }
    }

    static getDetail(call) {
        return call.args[0].detail;
    }
}

describe('Toggle', () => {
    it('renders child content', () => {
        const template = '<z-toggle>Test Text</z-toggle>',
            handleActiveChange = jasmine.createSpy('handleActiveChange'),
            root = Helper.createElement(template, {handleActiveChange});

        Helper.assert(root, {
            'html': '<z-toggle>Test Text</z-toggle>'
        });
    });

    it('renders active when set to true', () => {
        const template = '<z-toggle active="true">Test Text</z-toggle>',
            handleActiveChange = jasmine.createSpy('handleActiveChange'),
            root = Helper.createElement(template, {
                active: true,
                handleActiveChange
            });

        Helper.assert(root, {
            'html': '<z-toggle active="">Test Text</z-toggle>'
        });
    });

    it('renders active when set to true', () => {
        const template = '<z-toggle active>Test Text</z-toggle>',
            handleActiveChange = jasmine.createSpy('handleActiveChange'),
            root = Helper.createElement(template, {handleActiveChange});

        Helper.assert(root, {
            'html': '<z-toggle active="">Test Text</z-toggle>'
        });
    });

    it('renders active when set to false', () => {
        const template = '<z-toggle active="[[active]]">Test Text</z-toggle>',
            handleActiveChange = jasmine.createSpy('handleActiveChange'),
            root = Helper.createElement(template, {
                label: 'Text Text',
                active: false,
                handleActiveChange
            });

        Helper.assert(root, {
            'html': '<z-toggle>Test Text</z-toggle>'
        });
    });

    it('clicking a non-actve toggle requests it to become active', () => {
        const template = '<z-toggle active on-active-change="handleActiveChange">Test Text</z-toggle>',
            handleActiveChange = jasmine.createSpy('handleActiveChange'),
            root = Helper.createElement(template, {handleActiveChange});

        root.firstChild.dispatchEvent(new MouseEvent('click'));

        Helper.assert(root, {
            'html': '<z-toggle active="">Test Text</z-toggle>'
        });

        handleActiveChange.calls.all()[0].args[0].detail
        expect(handleActiveChange.calls.all().map(Helper.getDetail)).toEqual([{active: false}]);
    });

    it('clicking a actve toggle requests it to become non-active', () => {
        const template = '<z-toggle on-active-change="handleActiveChange">Test Text</z-toggle>',
            handleActiveChange = jasmine.createSpy('handleActiveChange'),
            root = Helper.createElement(template, {handleActiveChange});

        root.firstChild.dispatchEvent(new MouseEvent('click'));

        Helper.assert(root, {
            'html': '<z-toggle>Test Text</z-toggle>'
        });

        handleActiveChange.calls.all()[0].args[0].detail
        expect(handleActiveChange.calls.all().map(Helper.getDetail)).toEqual([{active: true}]);
    });
});
