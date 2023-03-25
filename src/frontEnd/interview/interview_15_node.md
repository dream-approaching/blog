---
title: Node
group:
  title: Interview
---

# Node

## 1. 说一下你对 Node 的理解

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，它让 JavaScript 运行在服务端，也就是说 Node.js 可以让 JavaScript 脱离浏览器运行。

## 2. bff 层是什么，有什么优缺点

BFF 层是 Back-End For Front-End 的缩写，是一种后端服务的设计模式，它的目的是为了解决前后端分离后的一些问题，如：

- 前端需要多个接口才能完成一个业务，这样就会导致前端需要发起多次请求
- 可以做一些数据的聚合，减少前端的请求次数
- 可以做一些数据的转换，减少前端的复杂度
- 可以做一些数据的缓存，减少前端的耦合度
- 可以做一些数据的鉴权，减少前端的维护成本
- 可以做一些数据的校验，减少前端的维护成本

优点：

- 降低前端的请求次数，减少前端的请求压力
- 降低前端的复杂度，减少前端的代码量
- 降低前端的耦合度，减少前端的维护成本

缺点：

- 增加后端的复杂度，增加后端的代码量
- 增加后端的耦合度，增加后端的维护成本

## 3. 常见 node 框架有哪些

- express: 基于 Node.js 平台，快速、开放、极简的 web 开发框架
- koa: 基于 Node.js 平台的下一代 web 开发框架
- egg: 基于 Koa 开发的企业级 Node.js 框架
- nest: 一款基于 Node.js 的后端框架，它使用 TypeScript 编写，并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式响应式编程）的元素

## 4. node 中常用的 api 有哪些

- fs: 文件系统
  - fs.readFile: 读取文件
  - fs.writeFile: 写入文件
  - fs.appendFile: 追加文件
  - fs.unlink: 删除文件
  - fs.mkdir: 创建目录
  - fs.rmdir: 删除目录
- path: 路径
  - path.join: 拼接路径
  - path.resolve: 解析路径
  - path.extname: 获取文件扩展名
  - path.basename: 获取文件名
  - path.dirname: 获取文件所在目录
- http: http
  - http.createServer: 创建服务器
  - http.request: 发送请求
  - http.get: 发送 get 请求
  - http.Server: 服务器
- url: url
  - url.parse: 解析 url
- querystring: querystring
  - querystring.parse: 解析 querystring
  - querystring.stringify: 序列化 querystring
- util: 工具
  - util.promisify: 将回调函数转换为 promise
- stream: 流
  - stream.Readable: 可读流
  - stream.Writable: 可写流
  - stream.Duplex: 双工流

## 5. 说一下你对 koa 的理解

Koa 是一个新的 web 框架，它基于 Node.js 平台，使用 ES2017 中的 async 函数来作为中间件的处理机制，它的特点是：

- 基于 async 函数，使用起来更加简单
  - async 函数：async 函数是 Generator 函数的语法糖，它是一个异步操作的解决方案，它比 Generator 函数的写法更加简洁，更加语义化
- 基于中间件，扩展性更强
  - 中间件：中间件是一个函数，它可以访问请求对象、响应对象和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量
- 基于洋葱模型，更加清晰
  - 洋葱模型：洋葱模型是一种分层的模型，它的特点是每一层都是一个函数，每一层都可以对请求进行处理，然后再把请求传递给下一层，直到最后一层，最后一层会把请求返回给用户

koa 的核心是中间件，中间件的作用是在请求和响应之间做一些事情，比如：鉴权、日志、缓存等等。

常见的中间件有：

- koa-bodyparser: 解析请求体
- koa-logger: 日志中间件
- koa-static: 静态资源中间件
- koa-router: 路由中间件
- koa-session: session 中间件
- koa-views: 模板引擎中间件

## 6. 常见的服务端渲染有哪些

- nuxt: 基于 Vue.js 的服务端渲染应用框架
- next: 基于 React 的服务端渲染应用框架
- egg-view-react-ssr: 基于 React 的服务端渲染应用框架

## 7. 服务端渲染和客户端渲染的区别

- 服务端渲染：服务端渲染是指在服务端将页面渲染好，然后再返回给浏览器，浏览器只需要接收页面就可以了，这样可以减少浏览器的渲染压力，提高用户体验
- 客户端渲染：客户端渲染是指在浏览器端将页面渲染好，然后再返回给浏览器，这样可以减少服务端的压力，提高服务端的性能
