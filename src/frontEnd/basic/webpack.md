---
title: webpack
group:
  title: 基本知识
---

<!-- TOC -->

- [webpack](#webpack)
  - [1. 前端模块化是什么](#1-前端模块化是什么)
    - [1.1. ES6 模块与 CommonJS 模块的差异](#11-es6-模块与-commonjs-模块的差异)
  - [2. webpack 有几个核心概念](#2-webpack-有几个核心概念)
  - [3. webpack loader 是什么，有哪些常见的 loader](#3-webpack-loader-是什么有哪些常见的-loader)
  - [4. webpack plugin 是什么，有哪些常见的 plugin](#4-webpack-plugin-是什么有哪些常见的-plugin)
    - [4.1. uglifyjs-webpack-plugin 和 terser-webpack-plugin 的区别，webpack5 为什么不再使用 uglifyjs-webpack-plugin](#41-uglifyjs-webpack-plugin-和-terser-webpack-plugin-的区别webpack5-为什么不再使用-uglifyjs-webpack-plugin)
  - [5. webpack5 有哪些新特性](#5-webpack5-有哪些新特性)
    - [5.1. webpack5 是怎么做缓存的？](#51-webpack5-是怎么做缓存的)
    - [5.2. webpack5 的物理缓存是怎么做的？](#52-webpack5-的物理缓存是怎么做的)
  - [6. 怎么优化 Webpack 的构建速度](#6-怎么优化-webpack-的构建速度)
  - [7. 有哪些方式可以实现微前端](#7-有哪些方式可以实现微前端)
  - [8. webpack 的原理是什么](#8-webpack-的原理是什么)
  - [9. tree shaking 的原理是什么](#9-tree-shaking-的原理是什么)
  - [10. 热更新的原理是什么](#10-热更新的原理是什么)
  - [11. Webpack 中的 module 是指什么](#11-webpack-中的-module-是指什么)
    - [11.1. ES6 模块(ESM)](#111-es6-模块esm)
    - [11.2. CommonJS 模块(CJS)](#112-commonjs-模块cjs)
  - [12. Webpack 中的 modules，如何表达依赖关系](#12-webpack-中的-modules如何表达依赖关系)
  - [13. chunk 和 bundle 的区别](#13-chunk-和-bundle-的区别)
    - [13.1. chunk](#131-chunk)
    - [13.2. bundle](#132-bundle)
    - [13.3. chunk 和 bundle 的关系](#133-chunk-和-bundle-的关系)
    - [13.4. splitChunks](#134-splitchunks)
  - [14. webpack 中的 loader 和 plugin 分别是什么？是怎么工作的？](#14-webpack-中的-loader-和-plugin-分别是什么是怎么工作的)
    - [14.1. loader](#141-loader)
    - [14.2. plugin](#142-plugin)
    - [14.3. compiler 和 compilation](#143-compiler-和-compilation)
  - [15. 简单描述下 webpack 的打包流程](#15-简单描述下-webpack-的打包流程)
  - [16. 市面上其他的打包工具有哪些？他们的区别是什么？](#16-市面上其他的打包工具有哪些他们的区别是什么)
    - [16.1. Vite 为什么快](#161-vite-为什么快)

<!-- /TOC -->

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

### 4.1. uglifyjs-webpack-plugin 和 terser-webpack-plugin 的区别，webpack5 为什么不再使用 uglifyjs-webpack-plugin

他们都是用来压缩 JS 代码的，但是 `uglifyjs-webpack-plugin` 不支持 ES6 语法，所以在 webpack5 中不再使用 `uglifyjs-webpack-plugin`，而是使用 `terser-webpack-plugin`，`terser-webpack-plugin` 是 `uglifyjs-webpack-plugin` 的替代品，支持 ES6 语法

## 5. webpack5 有哪些新特性

- 移除了对 Node.js v10 的支持
- 新增了长期缓存的算法，生产环境是默认开启的
- 新增了资源模块类型，用于替代 `file-loader` 、`url-loader`和 `raw-loader`
- 模块联邦: 允许一个应用程序使用来自另一个应用程序的代码，
- 更好的 tree shaking 支持
  - 支持嵌套的 tree-shaking，指模块 a 被 b 引用，b 被 c 引用，c 中只用了 a 的一部分，那么在 c 中只会打包 a 的一部分
  - 支持模块内部的 tree-shaking，指当一个模块内部引用了另一个模块 a，但是当前模块只是做了导出，没有使用 a 的内容，那么在当前模块中不会打包 a
  - 支持部分 commonjs 的 tree-shaking
- 内置的 HMR 支持，不需要再使用 `webpack-dev-server`
- 内置 terser-webpack-plugin 插件，用于压缩 JS 代码，不能再使用 `uglifyjs-webpack-plugin`，因为 `uglifyjs-webpack-plugin` 不支持 ES6 语法

### 5.1. webpack5 是怎么做缓存的？

- 通过 `contenthash` 来实现的，`contenthash` 是根据文件内容来生成的，只要文件内容不变，`contenthash` 就不会变
- webpack4 是通过 `hash` 来实现的，`hash` 是根据整个项目来生成的，只要项目中有文件发生变化，那么 `hash` 就会变

### 5.2. webpack5 的物理缓存是怎么做的？

当第一次构建时，会将构建结果存储在缓存中，当第二次构建时，会先从缓存中读取，如果缓存中有构建结果，那么就直接使用缓存中的构建结果，如果缓存中没有构建结果，那么就会重新构建。

- 通过 `cache` 配置项来实现的，`cache` 配置项有两个属性
  - `type`: 缓存类型，有 `filesystem` 和 `memory` 两种
  - `cacheDirectory`: 缓存目录，只有在 `type` 为 `filesystem` 时才需要配置

当 `type` 为 `filesystem` 时，会将缓存文件存储在 `cacheDirectory` 目录下，当 `type` 为 `memory` 时，会将缓存文件存储在内存中。

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

## 7. 有哪些方式可以实现微前端

- webpack5 模块联邦
- qiankun
- nx
- lerna

nx 是一个基于 monorepo 的微前端框架，它的核心思想是将微前端的各个子应用作为一个独立的 npm 包来管理，通过 nx 的工具链来管理这些子应用，从而实现微前端的目的。

> lerna 被 nx 收购了

## 8. webpack 的原理是什么

> webpack 是静态模块打包器(module bundler)，它会递归地构建一个依赖关系图(dependency graph)，然后根据依赖图将所有模块打包成一个或多个 bundle

## 9. tree shaking 的原理是什么

> - tree shaking 是一种用于消除 JavaScript 上下文中的未引用代码(dead-code)的优化技术
> - tree shaking 依赖于 ES6 模块的静态结构特性，即 import 和 export 是静态结构，不会发生变化

## 10. 热更新的原理是什么

> - 热更新是指在不刷新浏览器的情况下，更新页面的内容
> - 热更新的原理是通过 webpack-dev-server 提供的热更新服务，当代码发生变化时，webpack-dev-server 会将变化的代码通过 websocket 发送给浏览器，浏览器接收到变化的代码后，会通过 webpack-dev-server 提供的热更新服务，将变化的代码替换掉原来的代码

## 11. Webpack 中的 module 是指什么

> - webpack 中的 module 是一个包含了构建过程中的所有模块的对象
> - 支持各种各样的模块，比如 CommonJS 模块、AMD 模块、ES6 模块、Asset 模块、CSS 模块等

### 11.1. ES6 模块(ESM)

- export，导出模块，允许将 ESM 内容暴露给其他模块
- import，导入模块，允许从其他模块导入内容

```js
// a.js
export const a = 1;

// b.js
import { a } from './a.js';
console.log(a);
```

### 11.2. CommonJS 模块(CJS)

- module.exports，导出模块，允许将 CJS 内容暴露给其他模块
- require，导入模块，允许从其他模块导入内容

```js
// a.js
module.exports = {
  a: 1,
};

// b.js
const { a } = require('./a.js');
console.log(a);
```

## 12. Webpack 中的 modules，如何表达依赖关系

> - ESM import 语句
> - CJS require 语句
> - CSS @import 语句
> - AMD define 和 require 语句

## 13. chunk 和 bundle 的区别

### 13.1. chunk

chunk 是 webpack **打包过程中** modules 的集合，一个 chunk 可以包含多个 modules，一个 module 也可以被多个 chunk 包含。

webpack 的打包是从一个入口模块开始，通过引用关系，递归地找到所有依赖的模块，然后将这些模块打包成一个或多个 chunk。

> 如果有多个入口模块，可能会产生多条打包路径，每条打包路径都会生成一个 chunk。

### 13.2. bundle

bundle 是最终 webpack **打包后** 生成的文件

### 13.3. chunk 和 bundle 的关系

> chunk 是 webpack 打包过程中的概念，bundle 是 webpack 打包后的概念

- 多数情况下，一个 chunk 会对应一个 bundle
- 如果使用了 source map，一个 chunk 会对应多个 bundle
- 如果使用了代码分割，一个 chunk 可能会对应多个 bundle

### 13.4. splitChunks

> webpack 4 中新增的配置项，用于提取公共代码

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
```

## 14. webpack 中的 loader 和 plugin 分别是什么？是怎么工作的？

### 14.1. loader

模块转换器，将非 JS 模块转换为 JS 模块。本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图可以直接引用的模块。

### 14.2. plugin

扩展插件，webpack 运行的各个阶段，会广播出许多事件，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。

### 14.3. compiler 和 compilation

- compiler: webpack 启动时实例化的对象，全局唯一性，包含了 webpack 环境所有的的配置信息，包括 options，loaders，plugins 等
- compilation: 包含了当前的模块资源、编译生成资源、变化的文件等。当运行 webpack 时，每当检测到一个文件变化，都会创建新的 compilation

## 15. 简单描述下 webpack 的打包流程

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，开始执行编译
3. 确定入口：根据配置中的 entry 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有 Loader ，再去递归的找出该模块依赖的模块
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到每个模块被翻译后的最终内容以及他们之间的依赖关系。（依赖图）
6. 输出资源：根据依赖关系，组装成一个个包含多个模块的 Chunk
7. 输出完成：根据配置确定输出的路径和文件名，把文件内容写入到文件系统

## 16. 市面上其他的打包工具有哪些？他们的区别是什么？

- webpack: 一切皆模块，支持各种各样的模块，比如 CommonJS 模块、AMD 模块、ES6 模块、Asset 模块、CSS 模块等
- vite: 基于 ES Module 的原生浏览器导入和导出语法，通过浏览器原生支持的 ES Module 动态导入功能，实现了按需编译的功能
- parcel: 无需配置，自动安装依赖，自动打包，自动刷新
- rollup: 专注于打包 JS 库，不支持代码分割，不支持按需加载，不支持热更新
- snowpack: 目前已经不维护了
- WMR: Preact 团队的 WMR ，主要是为了 Preact 项目而设计，并为其提供了集成度更高的功能，比如预渲染

### 16.1. Vite 为什么快

> 相较于传统的打包构建工具（如 Webpack）先打包构建再启动开发服务器，Vite 是先启动开发服务器再在请求时进行构建，利用浏览器的原生 ES Module 支持，实现了按需编译，相当于是让浏览器去做了打包构建的工作，这样就大大提高了开发效率。

- Vite 通过将模块预编译成浏览器可运行的 JavaScript 代码，实现了按需编译，而不是传统的打包构建，这样就大大提高了开发效率。
- vite 在开发环境中的预构建、文件编译使用的是 ESbuild，而生产环境使用的是 Rollup。这是因为 ESbuild 一些针对构建应用的重要功能仍然还在持续开发中 —— 特别是代码分割和 CSS 处理方面。就目前来说，Rollup 在应用打包方面, 更加成熟和灵活。
  - rollup 和 webpack 类似，都是打包工具，但是 rollup 更轻量、小众，生态没有 webpack 丰富，适合用来打包库，而 webpack 更适合用来打包应用
