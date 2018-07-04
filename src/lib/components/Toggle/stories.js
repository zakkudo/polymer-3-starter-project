import {html} from '@polymer/polymer/polymer-element.js';

import Helper from 'lib/PolymerTestHelper';
import {storiesOf} from '@storybook/html';
import {action} from '@storybook/addon-actions';

import '.';
import '@polymer/polymer/lib/elements/dom-bind.js';

const _handleActiveChange = action('on-active-change');

storiesOf('Toogle', module)
    .addDecorator(Helper.withTests('lib/components/Toggle'))
    .add('inactive', () => {
        const template = html`
            <z-toggle on-active-change="_handleActiveChange">
                Test Content
            </z-toggle>
        `;
        const root = Helper.createElement(template, {
            _handleActiveChange,
        });

        return root;
    })
    .add('active', () => {
        const template = html`
            <z-toggle active="{{active}}" on-active-change="_handleActiveChange">
                Test Content
            </z-toggle>
        `;
        const root = Helper.createElement(template, {
            active: true,
            _handleActiveChange,
        });

        return root;
    });
