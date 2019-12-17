const path = require('path');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.less$/,
    include: path.resolve(__dirname, '../src/'),
    use: ['style-loader', 'css-loader', 'less-loader']
  });
  config.module.rules.push({
    test: /stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre'
  });

  config.resolve.alias = config.resolve.alias || {};
  config.resolve.alias['~'] = path.resolve(__dirname, '../src');

  return config;
};
