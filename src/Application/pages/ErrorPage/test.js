import '.';
import Helper from 'application/PageTestHelper';
import {html} from '@polymer/polymer/polymer-element.js';

describe('Application/pages/ErrorPage', () => {
    it('renders', () => {
        const template = html`<z-error-page code="[[code]]" message="[[message]]"/>`;
        const root = Helper.createElement(template, {
            'message': 'Test Message',
            'code': 'test error code',
        });

        expect(root.shadowRoot.innerHTML.includes('test error code')).toBe(true);
        expect(root.shadowRoot.innerHTML.includes('Test Message')).toBe(true);

        Helper.assert(root, {
            hasContent: true,
            title: 'Oops! You weren\'t supposed to see this...',
        });
    });
});
