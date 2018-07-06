import '.';
import '@polymer/polymer/lib/elements/dom-bind.js';
import Helper from 'lib/PolymerTestHelper';
import {html} from '@polymer/polymer/polymer-element.js';

describe('lib/components/Link', () => {
    it('renders child content, passing through props', () => {
        const template = html`<z-link state="test state" reload></z-link>`;
        const root = Helper.createElement(template);

        Helper.assert(root, {
            'html': '<z-link state="test state" reload=""></z-link>',
            'properties': {
                'uirouter-sref': {
                    'state': 'test state',
                    'reload': true,
                },
            },
        });
    });
});
