import { configure } from '@storybook/react';

const req = require.context('../src/components', true, /\.stories\.js$/);

function loadStories() {
  return req.keys().map(filename => req(filename));
}

// automatically import all files ending in *.stories.js
// configure(require.context('../stories', true, /\.stories\.js$/), module);

configure(loadStories, module);
// configure(require.context('../src/components', true, /\.stories\.js$/), module);
