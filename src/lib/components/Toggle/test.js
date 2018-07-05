import '.';
import '@polymer/polymer/lib/elements/dom-bind.js';
import Helper from 'lib/PolymerTestHelper';
import {html} from '@polymer/polymer/polymer-element.js';

describe('lib/components/Toggle', () => {
    it('renders child content', () => {
        const template = html`<z-toggle>Test Text</z-toggle>`;
        const handleActiveChange = jasmine.createSpy('handleActiveChange');
        const root = Helper.createElement(template, {handleActiveChange});

        Helper.assert(root, {
            'html': '<z-toggle>Test Text</z-toggle>',
        });
    });

    it('renders active when set to true', () => {
        const template = html`<z-toggle active="true">Test Text</z-toggle>`;
        const handleActiveChange = jasmine.createSpy('handleActiveChange');
        const root = Helper.createElement(template, {
            active: true,
            handleActiveChange,
        });

        Helper.assert(root, {
            'html': '<z-toggle active="">Test Text</z-toggle>',
        });
    });

    it('renders active when set to true', () => {
        const template = html`<z-toggle active>Test Text</z-toggle>`;
        const handleActiveChange = jasmine.createSpy('handleActiveChange');
        const root = Helper.createElement(template, {handleActiveChange});

        Helper.assert(root, {
            'html': '<z-toggle active="">Test Text</z-toggle>',
        });
    });

    it('renders active when set to false', () => {
        const template = html`<z-toggle active="[[active]]">Test Text</z-toggle>`;
        const handleActiveChange = jasmine.createSpy('handleActiveChange');
        const root = Helper.createElement(template, {
            label: 'Text Text',
            active: false,
            handleActiveChange,
        });

        Helper.assert(root, {
            'html': '<z-toggle>Test Text</z-toggle>',
        });
    });

    it('clicking a non-actve toggle requests it to become active', () => {
        const template = html`<z-toggle active on-active-change="handleActiveChange">Test Text</z-toggle>`;
        const handleActiveChange = jasmine.createSpy('handleActiveChange');
        const root = Helper.createElement(template, {handleActiveChange});

        root.firstChild.dispatchEvent(new MouseEvent('click'));

        Helper.assert(root, {
            'html': '<z-toggle active="">Test Text</z-toggle>',
        });

        expect(handleActiveChange.calls.all().map(Helper.getDetail))
            .toEqual([{active: false}]);
    });

    it('clicking a actve toggle requests it to become non-active', () => {
        const template = html`<z-toggle on-active-change="handleActiveChange">Test Text</z-toggle>`;
        const handleActiveChange = jasmine.createSpy('handleActiveChange');
        const root = Helper.createElement(template, {handleActiveChange});

        root.firstChild.dispatchEvent(new MouseEvent('click'));

        Helper.assert(root, {
            'html': '<z-toggle>Test Text</z-toggle>',
        });

        expect(handleActiveChange.calls.all().map(Helper.getDetail)).toEqual([{active: true}]);
    });
});
