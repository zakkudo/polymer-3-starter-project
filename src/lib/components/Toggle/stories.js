import Helper from 'lib/PolymerTestHelper';
import {storiesOf} from '@storybook/html';
import {decorateAction} from '@storybook/addon-actions';

import '.';
import '@polymer/polymer/lib/elements/dom-bind.js';

const _handleActiveChange = decorateAction([
  (request) => {
      return {request, value: request[1].active};
  },
])('on-active-change');

storiesOf('Toogle', module)
    .add('inactive', () => {
        const template = `<z-toggle on-active-change="_handleActiveChange">Test Content</z-toggle>`;
        const root = Helper.createElement(template, {
            _handleActiveChange,
        });

        return root;
    })
    .add('active', () => {
        const template = `<z-toggle active="{{active}}" on-active-change="_handleActiveChange">Test Content</z-toggle>`;
        const root = Helper.createElement(template, {
            active: true,
            _handleActiveChange,
        });

        return root;
    });
