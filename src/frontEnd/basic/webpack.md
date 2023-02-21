---
title: webpack
group:
  title: 基本知识
---

# webpack

## 1. 前端模块化是什么

前端模块化就是把代码分成独立的模块有利于复用和维护。不过会有模块之间相互依赖的问题，所以有了 commonJS 规范，AMD，CMD 规范等等，以及用于 js 打包（编译等处理）的工具 ES6

- Commonjs
  - 主要用于服务端编程，加载模块是同步的，不适合在浏览器环境。在服务端，模块文件都存放在本地磁盘，读取非常快，所以这样做不会有问题
- AMD
  - 主要在浏览器环境中异步加载模块，可以并行加载多个模块
  - RequireJS 实现了 AMD 规范
- CMD
  - 与 AMD 规范相似，都用于浏览器编程，不同点在于：AMD 推崇依赖前置、提前执行，CMD 推崇依赖就近、延迟执行
  - seajs 实现了 CMD 规范
- ES6 模块功能主要由两个命令构成：export 和 import

### 1.1. ES6 模块与 CommonJS 模块的差异

- CommonJS 模块是运行时加载，ES6 模块是编译时加载模块
- CommonJS 输出是值的拷贝；ES6 Modules 输出的是值的引用

  ```js
  // CommonJS模块
  let { stat, exists, readFile } = require('fs');

  // 等同于
  let _fs = require('fs');
  let stat = _fs.stat;
  let exists = _fs.exists;
  let readfile = _fs.readfile;
  ```

  上面代码的实质是整体加载 fs 模块（即加载 fs 的所有方法），生成一个对象（\_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

  ```js
  // ES6模块
  import { stat, exists, readFile } from 'fs';
  ```

  上面代码的实质是从 fs 模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

## 2. webpack 有几个核心概念

> - `mode`: 模式，指定 `development`、`production` 或 `none` 之中的一个，默认值为 `production`
> - `entry`: 入口，webpack 执行构建的第一步将从 `entry` 开始，可抽象成输入
> - `output`: 输出结果，在 `webpack` 经过一系列处理并得出最终想要的代码后输出结果
> - `loader`: 模块转换器，用于把模块原内容按照需求转换成新内容
> - `plugin`: 扩展插件，在 `webpack` 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情
> - `devServer`: 开发服务器，用于快速开发应用程序

## 3. webpack loader 是什么，有哪些常见的 loader

> `loader` 可以理解为是一个转换器，将 Webpack 不认识的内容转化为认识的内容。`webpack` 本身只能理解 `JavaScript` 和 `JSON` 文件，`loader` 可以让 `webpack` 拥有了加载和解析非 JavaScript 文件的能力
>
> 常见的 loader 有
>
> - `babel-loader`: 将 ES6/7/8 转换成 ES5
> - `css-loader`: 加载 .css 文件，并且转换成 commonjs 对象
> - `style-loader`: 将样式通过 `<style>` 标签插入到 head 中
> - `file-loader`: 将文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
> - `url-loader`: 和 file-loader 功能一样，但是能在文件很小的时候返回一个 DataURL
> - `html-loader`: 将 HTML 文件导出为字符串，require 引入 HTML 等同于将 HTML 内容嵌入
> - `ts-loader`: 将 TypeScript 转换成 JavaScript
> - `thread-loader`: 多进程打包 JS 和 CSS
> - `raw-loader`: 将文件以字符串的形式导入
> - `postcss-loader`: 为 CSS 属性自动添加浏览器前缀
> - `less-loader`: 将 Less 转换成 CSS
> - `sass-loader`: 将 Sass 转换成 CSS
> - `stylus-loader`: 将 Stylus 转换成 CSS
> - `vue-loader`: 将 Vue 单文件组件转换成 JavaScript 模块
> - `tslint-loader`: 通过 TSLint 检查 TypeScript 代码
> - `eslint-loader`: 通过 ESLint 检查 JavaScript 代码
> - `stylelint-loader`: 通过 Stylelint 检查 CSS 代码
> - `source-map-loader`: 加载额外的 Source Map 文件，以方便断点调试
> - `image-webpack-loader`: 压缩图片
> - `svg-inline-loader`: 将 SVG 文件转换成为内联的 SVG 代码

## 4. webpack plugin 是什么，有哪些常见的 plugin

> `plugin` 是插件，可以在 `webpack` 运行到某个时刻的时候，帮你做一些事情，如: 打包优化，资源管理和注入环境变量
>
> 常见的 plugin 有
>
> - `html-webpack-plugin`: 打包输出 HTML 文件
> - `clean-webpack-plugin`: 清理构建目录
> - `mini-css-extract-plugin`: 将 CSS 从主应用程序中分离
> - `optimize-css-assets-webpack-plugin`: 优化 CSS 资源
> - `uglifyjs-webpack-plugin`: 压缩 JS 代码
> - `copy-webpack-plugin`: 将单个文件或整个目录复制到构建目录
> - `webpack-bundle-analyzer`: 可视化 webpack 输出文件的体积
> - `webpack-merge`: 合并多个 webpack 配置
> - `webpackbar`: 美化终端输出的进度条
> - `happypack`: 多线程打包
> - `dll-plugin`: 将第三方库单独打包
> - `add-asset-html-webpack-plugin`: 将打包后的资源注入到 html 文件中
> - `webpack.DefinePlugin`: 定义环境变量
> - `webpack.IgnorePlugin`: 忽略某些文件
> - `webpack.optimize.CommonsChunkPlugin`: 提取公共代码
> - `webpack.optimize.ModuleConcatenationPlugin`: 作用域提升
> - `webpack.optimize.UglifyJsPlugin`: 压缩 JS 代码
> - `webpack.optimize.AggressiveMergingPlugin`: 合并块
> - `webpack.optimize.OccurrenceOrderPlugin`: 为组件分配 ID，通过减少 toId 的映射次数来减少文件大小
> - `webpack.optimize.MinChunkSizePlugin`: 防止过小的 chunk 被创建
> - `webpack.optimize.AggressiveSplittingPlugin`: 分割 chunk
> - `webpack.optimize.LimitChunkCountPlugin`: 限制 chunk 的数量

## 5. webpack5 有哪些新特性

- 移除了对 Node.js v10 的支持
- 新增了长期缓存的算法，生产环境是默认开启的
- 新增了资源模块类型，用于替代 `file-loader` 、`url-loader`和 `raw-loader`
- 模块联邦: 允许一个应用程序使用来自另一个应用程序的代码，
- 更好的 tree shaking 支持
  - 支持嵌套的 tree-shaking
  - 支持模块内部的 tree-shaking
  - 支持部分 commonjs 的 tree-shaking
- 内置的 HMR 支持，不需要再使用 `webpack-dev-server`
- 内置 terser-webpack-plugin 插件，用于压缩 JS 代码

## 6. 怎么优化 Webpack 的构建速度

- 使用高版本的 Webpack
- 多线程/多实例构建：HappyPack(不维护了)、thread-loader
- 使用 DllPlugin 提高第三方库的构建速度
- 压缩代码
  - UglifyJsPlugin
  - TerserPlugin
  - mini-css-extract-plugin
- 图片压缩
  - image-webpack-loader
  - imagemin-webpack-plugin
- 缩小打包作用域
  - exclude/include，优先使用 include
  - noParse, 用于忽略那些没有依赖的第三方库
  - IgnorePlugin 忽略某些文件
  - resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)
- tree-shaking
  - mode: production
  - sideEffects: false
  - resolve.mainFields: ['module', 'main']
  - resolve.extensions: ['.js', '.jsx', '.ts', '.tsx']
- 代码分割
  - SplitChunksPlugin
  - 动态导入
- 缓存
  - babel-loader 开启缓存
  - cache-loader
  - hard-source-webpack-plugin
