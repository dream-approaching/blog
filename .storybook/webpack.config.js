const path = require('path');

module.exports = function({ config }) {
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre'
  });

  config.resolve.alias = config.resolve.alias || {};
  config.resolve.alias['~'] = path.resolve(__dirname, '../src');
  return config;
};
