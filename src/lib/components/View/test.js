import '.';
import '@polymer/polymer/lib/elements/dom-bind.js';
import Helper from 'lib/PolymerTestHelper';
import {html} from '@polymer/polymer/polymer-element.js';

describe('lib/components/View', () => {
    it('renders child content', () => {
        const template = html`<z-view name="test name" component="test component"></z-view>`;
        const root = Helper.createElement(template);

        Helper.assert(root, {
            'html': '<z-view name="test name" component="test component"></z-view>',
            'properties': {
                'uirouter-uiview': {
                    'name': 'test name',
                    'component': 'test component',
                },
            },
        });
    });
});
