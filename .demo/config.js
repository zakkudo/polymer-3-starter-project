import { configure, addDecorator } from '@storybook/html';
import { withNotes } from '@storybook/addon-notes';

const lib = require.context('../src/lib', true, /story.js$/);
const application = require.context('../src/Application', true, /story.js$/);

addDecorator(withNotes);

function loadStories() {
  lib.keys().forEach(filename => lib(filename));
  application.keys().forEach(filename => application(filename));
}

configure(loadStories, module);

