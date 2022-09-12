import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'site',
  title: ' ',
  favicon: '/favicon.png',
  logo: '/logo.png',
  outputPath: '/docs-dist/',
  styles: [`.__dumi-default-navbar-logo:not([data-plaintext]) { padding-left: 90px !important; }`],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  // base: '/blog',
  // publicPath: '/blog/'
  // more config: https://d.umijs.org/config
});
