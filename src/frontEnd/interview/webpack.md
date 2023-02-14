---
title: Webpack
order: 100
group:
  title: Interview
---

## Webpack

### 1. tree shaking 的原理是什么

> - tree shaking 是一种用于消除 JavaScript 上下文中的未引用代码(dead-code)的优化技术
> - tree shaking 依赖于 ES6 模块的静态结构特性，即 import 和 export 是静态结构，不会发生变化

### 2. 热更新的原理是什么

> - 热更新是指在不刷新浏览器的情况下，更新页面的内容
> - 热更新的原理是通过 webpack-dev-server 提供的热更新服务，当代码发生变化时，webpack-dev-server 会将变化的代码通过 websocket 发送给浏览器，浏览器接收到变化的代码后，会通过 webpack-dev-server 提供的热更新服务，将变化的代码替换掉原来的代码

### 3. Webpack 中的 module 是指什么

> - webpack 中的 module 是一个包含了构建过程中的所有模块的对象
> - 支持各种各样的模块，比如 CommonJS 模块、AMD 模块、ES6 模块、Asset 模块、CSS 模块等

#### 3.1. ES6 模块(ESM)

- export，导出模块，允许将 ESM 内容暴露给其他模块
- import，导入模块，允许从其他模块导入内容

```js
// a.js
export const a = 1;

// b.js
import { a } from './a.js';
console.log(a);
```

#### 3.2. CommonJS 模块(CJS)

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

### 4. Webpack 中的 modules，如何表达依赖关系

> - ESM import 语句
> - CJS require 语句
> - CSS @import 语句
> - AMD define 和 require 语句

### 5. chunk 和 bundle 的区别

#### 5.1. chunk

chunk 是 webpack **打包过程中** modules 的集合，一个 chunk 可以包含多个 modules，一个 module 也可以被多个 chunk 包含。

webpack 的打包是从一个入口模块开始，通过引用关系，递归地找到所有依赖的模块，然后将这些模块打包成一个或多个 chunk。

> 如果有多个入口模块，可能会产生多条打包路径，每条打包路径都会生成一个 chunk。

#### 5.2. bundle

bundle 是最终 webpack **打包后** 生成的文件

#### 5.3. chunk 和 bundle 的关系

> chunk 是 webpack 打包过程中的概念，bundle 是 webpack 打包后的概念

- 多数情况下，一个 chunk 会对应一个 bundle
- 如果使用了 source map，一个 chunk 会对应多个 bundle
- 如果使用了代码分割，一个 chunk 可能会对应多个 bundle

#### 5.4. splitChunks

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

### 6. webpack 中的 loader 和 plugin 分别是什么？是怎么工作的？

#### 6.1. loader

模块转换器，将非 JS 模块转换为 JS 模块。本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图可以直接引用的模块。

#### 6.2. plugin

扩展插件，webpack 运行的各个阶段，会广播出许多事件，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。

#### 6.3. compiler 和 compilation

- compiler: webpack 启动时实例化的对象，全局唯一性，包含了 webpack 环境所有的的配置信息，包括 options，loaders，plugins 等
- compilation: 包含了当前的模块资源、编译生成资源、变化的文件等。当运行 webpack 时，每当检测到一个文件变化，都会创建新的 compilation

### 7. 简单描述下 webpack 的打包流程

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，开始执行编译
3. 确定入口：根据配置中的 entry 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有 Loader ，再去递归的找出该模块依赖的模块
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到每个模块被翻译后的最终内容以及他们之间的依赖关系。（依赖图）
6. 输出资源：根据依赖关系，组装成一个个包含多个模块的 Chunk
7. 输出完成：根据配置确定输出的路径和文件名，把文件内容写入到文件系统
