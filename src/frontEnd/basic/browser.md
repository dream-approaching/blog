---
title: 浏览器相关
order: 25
group:
  title: 基本知识
---

<!-- TOC -->

- [浏览器相关](#浏览器相关)
  - [1. 浏览器缓存](#1-浏览器缓存)
    - [1.1. 缓存类型](#11-缓存类型)
    - [1.2. 缓存位置](#12-缓存位置)
    - [1.3. 总结](#13-总结)
  - [2. 浏览器的本地存储 session、cookie、localStorage、sessionStorage、IndexDB](#2-浏览器的本地存储-sessioncookielocalstoragesessionstorageindexdb)
    - [2.1. 设置 cookie 有哪几种方式](#21-设置-cookie-有哪几种方式)
    - [2.2. cookie 的属性](#22-cookie-的属性)
    - [2.3. 哪些时候 http 请求会带上 cookie](#23-哪些时候-http-请求会带上-cookie)
  - [3. 输入一个网址到页面展示，发生了什么事情](#3-输入一个网址到页面展示发生了什么事情)
  - [4. 浏览器的渲染过程](#4-浏览器的渲染过程)
  - [5. XSS 攻击](#5-xss-攻击)
  - [6. CSRF 攻击](#6-csrf-攻击)
  - [7. 浏览器对象模型(BOM)](#7-浏览器对象模型bom)

<!-- /TOC -->

# 浏览器相关

## 1. 浏览器缓存

缓存是性能优化中非常重要的一环

### 1.1. 缓存类型

- 强缓存。首先是检查强缓存，这个阶段不需要发送 HTTP 请求。
  - `HTTP/1.0`使用`Expires`检查强缓存，即过期时间，存在于服务端返回的响应头中，但服务器的时间和浏览器的时间可能并不一致。因此这种方式很快在后来的`HTTP1.1`版本中被抛弃了。
  - `HTTP1.1`使用`Cache-Control`检查强缓存，采用过期时长来控制缓存，对应的字段是 max-age。如`Cache-Control:max-age=3600`，代表这个响应返回后在 3600 秒，也就是一个小时之内可以直接使用缓存。
- 协商缓存。强缓存失效之后，浏览器在请求头中携带相应的缓存 tag 来向服务器发请求，由服务器根据这个 tag，来决定是否使用缓存，这就是协商缓存。缓存 tag 分为两种: `Last-Modified` 和 `ETag`。
  - Last-Modified
    - 即最后修改时间。在浏览器第一次给服务器发送请求后，服务器会在响应头中加上这个字段。
    - 浏览器再次请求，会在请求头中携带 If-Modified-Since 字段
    - 服务器拿到 If-Modified-Since，跟服务器中时间做对比判断是否要更新
  - ETag
    - 是服务器根据当前文件的内容，给文件生成的唯一标识，只要里面的内容有改动，这个值就会变。服务器通过响应头把这个值给浏览器。
    - 浏览器接收到 ETag 的值，会在下次请求时，将这个值作为 If-None-Match 这个字段的内容，并放到请求头中，然后发给服务器。
    - 服务器接收到 If-None-Match 后，会跟服务器上该资源的 ETag 进行比对，判断是否要更新
  - 对比
    - 在精准度上，ETag 优于 Last-Modified
    - 在性能上，Last-Modified 优于 ETag
    - 如果两种方式都支持的话，服务器会优先考虑 ETag

### 1.2. 缓存位置

当强缓存命中或者协商缓存中服务器返回 304 的时候，我们直接从缓存中获取资源。缓存位置一共有四种，按优先级从高到低排列分别是

- Service Worker：离线缓存就是 Service Worker Cache
- Memory Cache：是内存缓存，从效率上讲它是最快的。但是从存活时间来讲又是最短的，当渲染进程结束后，内存缓存也就不存在了。
- Disk Cache：是存储在磁盘中的缓存，从存取效率上讲是比内存缓存慢的，但是他的优势在于存储容量和存储时长。
- Push Cache：即推送缓存，这是浏览器缓存的最后一道防线。它是 HTTP/2 中的内容

### 1.3. 总结

首先通过 Cache-Control 验证强缓存是否可用，如果强缓存可用，直接使用，否则进入协商缓存，即发送 HTTP 请求，服务器通过请求头中的 If-Modified-Since 或者 If-None-Match 字段检查资源是否更新，若资源更新，返回资源和 200 状态码，否则，返回 304，告诉浏览器直接从缓存获取资源。

> 参考：[第 1 篇: 能不能说一说浏览器缓存?](https://juejin.im/post/6844904021308735502#heading-0)

## 2. 浏览器的本地存储 session、cookie、localStorage、sessionStorage、IndexDB

- cookie：保存在浏览器端， 大小 4K，可以设置过期时间
- session：保存在服务器端，无大小限制
- localStorage：除非手动清除，否则永久保存，大小 5M
- sessionStorage：与 localStorage 类似，不过浏览器关闭时会自动清空 ![](https://user-gold-cdn.xitu.io/2018/12/14/167ac245e669b3b3?imageslim)
- IndexDB: 支持的浏览器比较广泛，大小限制通常约为 50MB。

### 2.1. 设置 cookie 有哪几种方式

- document.cookie：直接设置，但是只能设置一条
- 通过响应头的 Set-Cookie 字段设置，可以设置多条

### 2.2. cookie 的属性

- name：cookie 的名称
- value：cookie 的值
- expires：cookie 的过期时间，如果不设置，则为会话级 cookie，浏览器关闭时失效
- path：cookie 的作用路径，如果不设置，则默认为当前文档位置的路径
- domain：cookie 的作用域，如果不设置，则默认为当前域名
- secure：是否只通过 https 连接来传递 cookie，如果不设置，则默认为 false
- httpOnly：是否只允许 http 请求中携带 cookie，如果不设置，则默认为 false
- sameSite：是否允许第三方 cookie，如果不设置，则默认为 none

### 2.3. 哪些时候 http 请求会带上 cookie

- domain
  - 如果没有设置 domain，则只有当前域名下的请求才会带上 cookie
  - 如果设置了 domain，则当前域名下的请求和设置的 domain 域名下的请求都会带上 cookie，包括 domain 的子域名
- path
  - 如果没有设置 path，则只有当前路径下的请求才会带上 cookie
  - 如果设置了 path，则当前路径下的请求和设置的 path 路径下的请求都会带上 cookie
- secure
  - 如果没有设置 secure，则 http 和 https 都会带上 cookie
  - 如果设置了 secure，则只有通过 https 连接的请求才会带上 cookie
- httpOnly
  - 如果设置了 httpOnly，则只有 http 请求才会带上 cookie，js 无法获取和修改
- sameSite
  - 如果设置了 sameSite，则只有同源请求才会带上 cookie
  - 如果设置了 sameSite 为 none，则不管是同源还是非同源请求都会带上 cookie，但是需要设置 secure 为 true

## 3. 输入一个网址到页面展示，发生了什么事情

- DNS 解析:将域名解析成 IP 地址
- TCP 连接：TCP 三次握手
- 发送 HTTP 请求
- 服务器处理请求(期间可能会读取服务器缓存或查询数据库)，并返回响应报文
- 浏览器根据返回的状态码判断是下载还是从缓存读取文件内容
- 浏览器解析渲染页面
- 断开连接：TCP 四次挥手
  > - 参考：[掘金——浏览器基础](https://juejin.im/post/5c137e7c6fb9a049f7461639#heading-2)
  > - 参考：[掘金——从 URL 输入到页面展现到底发生什么？](https://juejin.im/post/5bf3ad55f265da61682afc9b)

## 4. 浏览器的渲染过程

- 读取并解析 HTML 标记并构建 DOM 树
- 如果遇到外部脚本文件，就会停止构建 DOM 树，等待脚本文件加载并执行完毕，然后再继续构建 DOM 树
- 读取并解析 CSS 标记并构建 CSSOM 树，css 不会阻塞 DOM 的构建
- 将 DOM 与 CSSOM 合并成一个渲染树，渲染树中包含了可见的节点和一些属性，如颜色、大小等
- 计算渲染树中各个节点的几何信息，如节点的宽高、位置等
- 将各个节点绘制到屏幕上

绘制过程中有个概念叫做重排和重绘

- 重排是指当渲染树中的一部分（或全部）因为元素的规模尺寸、布局、隐藏等改变而需要重新构建，这个过程叫做重排，重排必将引起重绘，而重绘不一定会引起重排。
- 重绘是指当渲染树中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的，比如 background-color。则就叫做重绘。

## 5. XSS 攻击

- 全称是 Cross Site Scripting(即跨站脚本) 为了和 CSS 区分，故叫它 XSS
- 攻击的实现有三种方式
  - 存储型：常见的场景是留言评论区提交一段脚本代码，如果前后端没有做好转义的工作，那评论内容存到了数据库，在页面渲染过程中直接执行, 相当于执行一段未知逻辑的 JS 代码
  - 反射型：如`http://sanyuan.com?q=<script>alert("你完蛋了")</script>`
  - 文档型：WIFI 路由器劫持或者本地恶意软件
- 防范措施：千万不要相信任何用户的输入！
  - 无论是在前端和服务端，都要对用户的输入进行转码或者过滤
  - 利用 CSP：即浏览器中的内容安全策略，它的核心思想就是服务器决定浏览器加载哪些资源
  - 利用 HttpOnly：很多 XSS 攻击脚本都是用来窃取 Cookie, 而设置 Cookie 的 HttpOnly 属性后，JavaScript 便无法读取 Cookie 的值。这样也能很好的防范 XSS 攻击。

## 6. CSRF 攻击

- CSRF(Cross-site request forgery), 即跨站请求伪造，指的是黑客诱导用户点击链接，打开黑客的网站，然后黑客利用用户目前的登录状态发起跨站请求。
- 防范措施

  - 利用 Cookie 的 SameSite 属性：SameSite 可以设置为三个值，Strict、Lax 和 None
  - 验证来源站点：需要要用到请求头中的两个字段: Origin 和 Referer。
  - 校验 token

## 7. 浏览器对象模型(BOM)

- BOM 是浏览器提供的一系列对象，用来操作浏览器窗口和提供与浏览器交互的方法和接口
- BOM 的核心对象是 window，它代表浏览器的一个实例，每个浏览器窗口都是一个 window 对象，它有很多属性和方法，比如
  - window.navigator：浏览器信息
  - window.location：当前页面的 URL 信息
  - window.history：浏览器历史记录
  - window.screen：屏幕信息
  - window.document：当前页面的文档对象
  - window.open()：打开新窗口
  - window.close()：关闭当前窗口
  - window.alert()：弹出警告框
  - window.confirm()：弹出确认框
  - window.setTimeout()：设置定时器
  - window.clearTimeout()：清除定时器
  - window.setInterval()：设置间隔定时器
  - window.clearInterval()：清除间隔定时器
  - window.requestAnimationFrame()：设置动画定时器
  - window.cancelAnimationFrame()：清除动画定时器
  - window.scrollTo()：滚动到指定位置
  - window.scrollBy()：滚动指定距离
  - window.scroll()：滚动到指定位置
