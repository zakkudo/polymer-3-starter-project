import { configure } from '@storybook/html';

const lib = require.context('../src/lib', true, /story.js$/);
const application = require.context('../src/Application', true, /story.js$/);

function loadStories() {
  lib.keys().forEach(filename => lib(filename));
  application.keys().forEach(filename => application(filename));
}

configure(loadStories, module);

