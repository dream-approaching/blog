---
title: JsBridge
group:
  title: Interview
---

# JsBridge

## 1、什么是 JsBridge

> 概念：JsBridge 是一种机制，可以在 js 和原生之间传递数据。

native <-> jsBridge <-> js

## 2、JsBridge 的常见实现方式

- url scheme，客户端拦截 webview 的 url，然后解析 url 中的参数，进行相应的操作
- 注入 js 对象，客户端注入一个 js 对象到 webview 中，h5 通过 js 对象调用客户端的方法，如：`window.android.xxx()`

## 3、JsBridge 的优缺点

- 优点
  - 无需客户端开发，只需要前端开发
  - 无需客户端升级，只需要前端升级
- 缺点
  - 安全性问题
  - 无法实现客户端主动调用 h5 的方法

## 4、JsBridge 的安全性问题

- 通过 url scheme 实现 JsBridge，客户端拦截 webview 的 url，然后解析 url 中的参数，进行相应的操作，这种方式存在安全性问题，因为 url 是可以被篡改的，所以需要对 url 进行签名，客户端拦截 url 后，需要对 url 进行签名校验，如果签名校验失败，则不执行相应的操作。
- 通过注入 js 对象实现 JsBridge，客户端注入一个 js 对象到 webview 中，h5 通过 js 对象调用客户端的方法，这种方式不存在安全性问题，因为 js 对象是由客户端注入的，所以不会被篡改。

## 5、wx js sdk 和 JsBridge 的区别

- wx js sdk 是微信提供的 js sdk，可以实现微信分享、微信支付等功能，是微信提供的一种 js 与 native 交互的方式。
- JsBridge 是一种机制，可以在 js 和原生之间传递数据，是一种 js 与 native 交互的方式。
