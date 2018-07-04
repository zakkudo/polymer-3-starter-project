import { configure } from '@storybook/html';

const lib = require.context('../src/lib', true, /stories.js$/);
const application = require.context('../src/Application', true, /stories.js$/);

function loadStories() {
  lib.keys().forEach(filename => lib(filename));
  application.keys().forEach(filename => application(filename));
}

configure(loadStories, module);

