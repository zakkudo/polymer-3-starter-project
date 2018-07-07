import '.';
import Helper from 'application/PageTestHelper';
import {html} from '@polymer/polymer/polymer-element.js';

describe('Application/pages/SearchPage', () => {
    it('renders', () => {
        const template = html`<z-search-page code="[[code]]" message="[[message]]"/>`;
        const root = Helper.createElement(template, {
            'message': 'Test Message',
            'code': 'test search code',
        });

        Helper.assert(root, {
            hasContent: true,
            title: 'Search',
        });
    });
});
