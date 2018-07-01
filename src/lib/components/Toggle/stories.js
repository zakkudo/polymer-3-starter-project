import Helper from 'lib/PolymerTestHelper';
import {storiesOf} from '@storybook/html';
import {action, configureActions} from '@storybook/addon-actions';

import '.';
import '@polymer/polymer/lib/elements/dom-bind.js';

storiesOf('Button', module)
    .add('default view', () => {
        const root = Helper.createElement('<z-toggle>FISH</z-toggle>');

        return root;
    });
