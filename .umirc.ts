import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'site',
  title: 'Longzi',
  favicon: '/favicon.png',
  logo: '/logo.png',
  outputPath: '/docs-dist/',
  styles: [
    `.__dumi-default-navbar-logo:not([data-plaintext]) { padding-left: 90px !important;text-indent: -10000px; }`,
  ],
  mfsu: {},
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
  // navs: [null, { title: 'GitHub', path: 'https://github.com/dream-approaching/blog' }],
  // base: '/blog',
  // publicPath: '/blog/'
  // more config: https://d.umijs.org/config
});
