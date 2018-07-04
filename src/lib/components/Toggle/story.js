import {html} from '@polymer/polymer/polymer-element.js';

import Helper from 'lib/PolymerTestHelper';
import {storiesOf} from '@storybook/html';
import {action} from '@storybook/addon-actions';

import '.';
import '@polymer/polymer/lib/elements/dom-bind.js';

const _handleActiveChange = action('on-active-change');

storiesOf('Toogle', module)
    .addParameters({
        'notes': '<iframe src="documentation/module-lib_components_Toggle.html" style="width: 100%; height: 100%; border: 0; position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></iframe>',
    })
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
