import '.';
import Helper from 'application/PageTestHelper';
import {html} from '@polymer/polymer/polymer-element.js';

describe('Application/pages/UserPage', () => {
    it('renders', () => {
        const template = html`<z-user-page/>`;
        const root = Helper.createElement(template);

        Helper.assert(root, {
            hasContent: true,
            title: 'User',
        });
    });
});
