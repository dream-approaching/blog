import { configure } from '@storybook/react';

const req = require.context('../src/stories', true, /stories\.js$/);

function loadStories() {
  return req.keys().map(filename => req(filename));
}

// automatically import all files ending in *.stories.js
// configure(require.context('../stories', true, /\.stories\.js$/), module);

configure(loadStories, module);
