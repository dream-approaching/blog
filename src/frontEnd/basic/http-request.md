---
title: http请求
group:
  title: 基本知识
---

# http 请求

## 1. http 请求的过程

```js
// 1. 创建一个XMLHttpRequest对象
const xhr = new XMLHttpRequest();
// 2. 初始化一个请求
xhr.open('GET', 'http://localhost:3000/api/user', true);
// 3. 发送请求
xhr.send(null);
// 4. 监听请求状态的变化
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } else {
      console.log('error');
    }
  }
};
```

## 2. http 请求的方法

- GET: 获取资源
- POST: 创建资源
- PUT: 更新资源
- DELETE: 删除资源

### 2.1. 什么时候会有 options 请求？怎么解决？

- 简单请求
  - 请求方法是`GET`、`HEAD`、`POST`之一
  - `Content-Type`的值只限于`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`
  - 请求中没有使用`ReadableStream`对象
- 复杂请求
  - 请求方法是`PUT`、`DELETE`、`CONNECT`、`OPTIONS`、`TRACE`、`PATCH`之一
  - `Content-Type`的值是`application/json`
  - 请求中使用了`ReadableStream`对象

当跨域请求时，如果是复杂请求，浏览器会先发送一个`options`请求，询问服务器是否允许这样的请求，如果允许，才会发送真正的请求。所以我们可以在服务器端设置`Access-Control-Allow-Methods`来解决这个问题。

Options 请求优化：

- 服务端设置`Access-Control-Max-Age`，表示预检请求的结果可以缓存多久，单位是秒
- 服务端设置`Access-Control-Allow-Headers`，表示允许的请求头

## 3. 常见状态码

- 1xx 信息相关
- 2XX 成功
  - 200 OK，成功
  - 204 No content，表示请求成功，但没有返回任何内容
- 3XX 重定向
  - 301 moved permanently，永久性重定向，表示资源已被分配了新的 URL
  - 302 found，临时性重定向，表示资源临时被分配了新的 URL
  - 304 not modified，表示未修改，读取缓存
- 4XX 客户端错误
  - 400 bad request，请求报文存在语法错误
  - 401 unauthorized，需要身份验证
  - 403 forbidden，表示对请求资源的访问被服务器拒绝
  - 404 not found，表示在服务器上没有找到请求的资源
- 5XX 服务器错误
  - 500 internal sever error，表示服务器端在执行请求时发生了错误
  - 503 service unavailable，服务不可用

> - 记住上面这些面试应该够了，工作需要其他的直接 google 吧

## 4. TCP 三次握手 四次挥手

三次握手在建立连接时使用，防止已失效的连接请求报文段传到服务端  
四次挥手在断开连接时使用，防止已失效的连接请求报文段传到客户端

- 三次握手
  - 客户端发送 SYN 报文
  - 服务端发送 SYN+ACK 报文
  - 客户端再发送 ACK 确认包
- 四次挥手
  - 主动方发送 FIN 报文
  - 接收方收到 FIN，发回一个 ACK 确认
  - 接收方也发送一个 FIN
  - 主动方收到后发回 ACK 确认

> - 参考：动画讲解：[掘金——三次握手 四次挥手](https://juejin.im/post/5b29d2c4e51d4558b80b1d8c)
> - 参考：[博客园——为什么不是 2 次握手或者其他次](https://www.cnblogs.com/zhuzhenwei918/p/7465467.html)

## 5. http 请求的头部

> - Accept: 客户端能够接受的内容类型
> - Accept-Charset: 客户端能够接受的字符集
> - Accept-Encoding: 客户端能够接受的编码，通常指定压缩的编码格式 gzip, deflate
> - Authorization: HTTP 授权的授权证书
> - Cache-Control: 指定请求和响应遵循的缓存机制
> - Connection: 表示是否需要持久连接
> - Cookie: HTTP 请求发送时，会把保存在该请求域名下的所有 cookie 值一起发送给 web 服务器
> - Content-Length: 请求的内容长度
> - Content-Type: 请求的与实体对应的 MIME 信息
> - User-Agent: 客户端信息
> - Host: 请求的服务器的域名和端口号
> - Referer: 请求的来源页面，即链接到当前请求页面的页面

## 6. http 请求的缓存

> - 强缓存：强缓存是指在客户端缓存了资源，当下次请求时，会先去缓存中查找，如果命中，则直接使用缓存中的资源，不会再去服务器中请求。强缓存可以通过设置响应头中的`Expires`或者`Cache-Control`来实现。
> - 协商缓存：协商缓存是指在客户端缓存了资源，当下次请求时，会先去缓存中查找，如果命中，则会向服务器发送请求，询问服务器缓存是否有效，如果有效，则使用缓存中的资源，如果无效，则会去服务器中请求资源。协商缓存可以通过设置响应头中的`Last-Modified`或者`Etag`来实现。

## 7. 跨域以及常见解决办法

- 浏览器有一个安全策略叫同源策略，同源就是要求, 域名, 协议, 端口相同，任意一个不同则叫不同域
- 同源策略还会引起 Cookie、LocalStorage 和 IndexDB 无法读取
- 不同域之间 iframe, ajax 均受其限制, script 标签不受此限制.

#### 7.0.1. 解决跨域的方式

1. jsonp
2. cors，后端设置响应头
3. nginx 反向代理，proxy_pass
4. node 中间层代理，通过 node 中间层代理请求，再返回给前端
5. img 标签的 src 属性可以跨域，通过 img 标签的 src 属性请求接口，再通过 onload 事件获取返回的数据

> 参考：[掘金——由同源策略到前端跨域](https://juejin.im/post/58f816198d6d81005874fd97)  
> 参考：[segmentfault——浅谈浏览器端 JavaScript 跨域解决方法](https://segmentfault.com/a/1190000004518374)  
> 参考：[简书——浏览器中使用 js 跨域获取数据的几种方式](https://www.jianshu.com/p/c71c20e98f94)

## 8. http 和 https 的区别

- http 是明文传输，https 是加密传输
- HTTPS 协议需要到 CA 申请证书，一般免费证书很少，需要交费
- HTTP 协议运行在 TCP 之上，所有传输的内容都是明文，HTTPS 运行在 SSL/TLS 之上，SSL/TLS 运行在 TCP 之上，所有传输的内容都经过加密的。
- HTTP 和 HTTPS 端口也不一样，前者是 80，后者是 443。
- HTTPS 可以有效的防止运营商劫持
- HTTPS 比 HTTP 更加安全，对搜索引擎更友好，利于 SEO

## 9. https 的证书加密过程

- 1. 客户端向服务器发送请求，请求服务器的证书
- 2. 服务器将证书返回给客户端，证书中包含了服务器的公钥
- 3. 客户端验证证书是否有效
- 4. 客户端生成一个随机数，用服务器的公钥加密，将加密后的随机数发送给服务器
- 5. 服务器用自己的私钥解密，得到随机数
- 6. 服务器用随机数加密数据，发送给客户端
- 7. 客户端用随机数解密数据

可以看到，ssl 证书同事使用了非对称加密和对称加密，非对称加密用来传输对称加密的密钥，对称加密用来加密数据。

## 10. http1.0、http1.1、http2.0 的区别

### 10.1. http1.0

- 缺陷：浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个 TCP 连接（TCP 连接的新建成本很高，因为需要客户端和服务器三次握手），服务器完成请求处理后立即断开 TCP 连接，服务器不跟踪每个客户也不记录过去的请求；
- 解决方案：添加头信息——非标准的 Connection 字段 Connection: keep-alive

### 10.2. http1.1

- 改进点
  - 持久连接：引入了持久连接，即 TCP 连接默认不关闭，可以被多个请求复用，不用声明 Connection: keep-alive(对于同一个域名，大多数浏览器允许同时建立 6 个持久连接)
  - 管道机制：在同一个 TCP 连接里面，客户端可以同时发送多个请求
  - 分块传输编码：服务端没产生一块数据，就发送一块，采用”流模式”而取代”缓存模式”。
  - 新增请求方式：put,delete,options,trace,connect
- 缺点
  - 虽然允许复用 TCP 连接，但是同一个 TCP 连接里面，所有的数据通信是按次序进行的。服务器只有处理完一个请求，才会接着处理下一个请求。如果前面的处理特别慢，后面就会有许多请求排队等着。这将导致“队头堵塞”
  - 避免方式：一是减少请求数，二是同时多开持久连接

### 10.3. http 2.0

- 二进制协议：HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为”帧”：头信息帧和数据帧。
- 完全多路复用：HTTP/2 复用 TCP 连接，在一个连接里，客户端和浏览器都可以同时发送多个请求或回应，而且不用按照顺序一一对应，这样就避免了”队头堵塞”。
- 报头压缩
- 服务器推送：允许服务器未经请求，主动向客户端发送资源

### 10.4. 总结

| http1.0 | http1.1 | http2.0 |
| :-: | :-: | :-: |
| 无状态、无连接 | 持久连接<br/>请求管道化<br/>加缓存处理<br/>增加 Host 字段<br/>支持断点传输等 | 二进制分帧 <br/> 多路复用（或连接共享）<br/> 头部压缩<br/>服务器推送 |

> - 参考：[HTTP1.0 HTTP1.1 HTTP2.0 主要特性对比/2](https://segmentfault.com/a/1190000013028798)
> - 参考：[HTTP1.0、HTTP1.1 和 HTTP2.0 的区别](https://juejin.im/entry/6844903489596833800)
> - 参考：[HTTP/2 服务器推送（Server Push）教程](http://www.ruanyifeng.com/blog/2018/03/http2_server_push.html)
> - 参考：[深入理解 http1.x、http 2 和 https](https://segmentfault.com/a/1190000015316332)
> - 参考：[怎样把网站升级到 http/2](https://zhuanlan.zhihu.com/p/29609078)

## 11. http 1.0、1.1、2.0 在并发请求上有什么区别

- http 1.0
  - 每个 TCP 连接只能发送一个请求，请求完毕后，连接就关闭了，如果还有请求，就需要重新建立 TCP 连接
- http 1.1
  - 默认采用持久连接，即 TCP 连接默认不关闭
  - 添加了管道机制，即一个 TCP 连接可以发送多个请求，但服务器端必须按照请求的顺序返回响应
- http 2.0
  - 加了双工通信机制，即客户端和服务器端都可以同时发送数据
  - 多路复用，即一个 TCP 连接可以同时发送多个请求，而且不用按照顺序返回响应
  - 服务器推送，即服务器可以主动向客户端推送资源，而不是客户端主动请求
  - 二进制传输，即 http 2.0 采用二进制格式传输，而不是文本格式

## 12. http 1.1 的长连接和 http 2.0 的多路复用有什么区别

- http 1.1
  - 同一时间一个 TCP 连接只能处理一个请求，采用一问一答的方式，上个请求响应后才能进行下一个请求
  - chrome 浏览器最大并发数是 6 个，因为 chrome 浏览器默认开启了 6 个 TCP 连接
- http 2.0
  - 同域名上的所有通信都在一个 TCP 连接上完成，单个连接上可以并行处理多个请求和响应

## 13. 为什么 http 1.1 不能多路复用

- http 1.1 的请求和响应都是基于文本的，而 http 2.0 的请求和响应都是基于二进制的，所以 http 1.1 不能多路复用

## 14. http 3.0

- 2018 年，QUIC 演变成为 HTTP3。
- 占比约 5%
- HTTP3 的主要改进在传输层上。不走 TCP 连接了，走 UDP。

> - 参考：[秒懂科普！HTTP 3 如此简单](https://segmentfault.com/a/1190000023929858)

## 15. http 请求的优化

> - 减少 http 请求
> - 减少 http 请求的大小
> - 减少 http 请求的响应时间
> - 减少 http 请求的重定向

## 16. 常见的 http 请求库

> - axios
> - fetch
> - superagent
> - request

## 17. axios 怎么取消请求

- 0.22 之前，可以通过`cancelToken`来实现
- 0.22 之后，可以通过 `new AbortController`来实现

  ```js
  const controller = new AbortController();

  axios.get('/foo/bar', { signal: controller.signal }).then(function (response) {
    //...
  });
  // 取消请求
  controller.abort();
  ```

## 18. 封装一个 fetchApi，要求超时报错的同时，取消执行的请求

### 18.1. 思路

> 超时报错可以用`Promise.race`来实现，取消执行的请求可以用`AbortController`来实现。

### 18.2. 代码

```js
const fetchApi = (url, options) => {
  const controller = new AbortController();
  const { signal } = controller;

  const timeoutPromise = (limitTime) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('timeout'));
        // 超时的话中止请求
        controller.abort();
      }, limitTime);
    });
  };

  const requestPromise = fetch(url, { ...options, signal }).then((res) => {
    return res.json();
  });

  // 通过promise.race来实现超时报错
  Promise.race([timeoutPromise(3000), requestPromise])
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
```

## 19. webSocket 的连接原理

> WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议。它实现了浏览器与服务器全双工通信，允许服务端主动向客户端推送数据。

### 19.1. 建立连接

> WebSocket 的建立是建立在 HTTP 协议之上的，所以握手阶段使用的是 HTTP 协议。握手阶段使用的是 HTTP 协议，但是握手之后，通信协议就变成了 WebSocket 协议了。

### 19.2. 通信

> WebSocket 通信协议是一个双向通信协议，客户端和服务器都可以主动的向对方发送或接收数据。

### 19.3. 关闭连接

> WebSocket 的连接是可以被客户端或者服务器端主动关闭的。当连接被关闭时，客户端和服务器端都会收到一个 close 事件。

### 19.4. WebSocket 的优缺点

- 优点
  - 服务器可以主动向客户端推送信息
  - 可以节省传输数据量
  - 可以节省服务器资源
  - 可以节省带宽
- 缺点
  - 服务器端需要额外的资源来维护 WebSocket 连接

## 20. 做过全局的请求处理吗？比如统一处理登录态、全局错误处理等

> 基于 axios、fetch 封装的请求库

## 21. 代码题，能给 xhr 添加 hook，实现在各个阶段打日志吗

> 考察点较多，难度比较高，慢慢理解
>
> - class 的使用, new 的使用
> - Object.defineProperty 的使用
> - this 指向
> - apply、call 的使用
> - hook 的理解

```js
class XhrHook {
  constructor(beforeHooks = {}, afterHooks = {}) {
    this.XHR = window.XMLHttpRequest;
    this.beforeHooks = beforeHooks;
    this.afterHooks = afterHooks;

    this.init();
  }

  init() {
    const self = this;
    window.XMLHttpRequest = function () {
      this._xhr = new self.XHR();
      this.overwrite(this);
    };
  }

  overwrite(proxyXHR) {
    for (let key in proxyXHR._xhr) {
      if (typeof proxyXHR._xhr[key] === 'function') {
        this.overwriteMethod(key, proxyXHR);
      } else {
        this.overwriteAttr(key, proxyXHR);
      }
    }
  }

  overwriteMethod(key, proxyXHR) {
    const self = this;
    proxyXHR[key] = function (...args) {
      if (self.beforeHooks[key]) {
        self.beforeHooks[key].call(this, args);
      }

      const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);

      if (self.afterHooks[key]) {
        self.afterHooks[key].call(this, args);
      }

      return res;
    };
  }

  overwriteAttr(key, proxyXHR) {
    const self = this;
    Object.defineProperty(proxyXHR, key, {
      get() {
        return proxyXHR._xhr[key];
      },
      set(val) {
        if (self.beforeHooks[key]) {
          self.beforeHooks[key].call(this, val);
        }

        proxyXHR._xhr[key] = val;

        if (self.afterHooks[key]) {
          self.afterHooks[key].call(this, val);
        }
      },
    });
  }
}

new XhrHook({
  open: function (args) {
    console.log('open', args);
  },
  onload: function (args) {
    console.log('onload', args);
  },
  onreadystatechange: function (args) {
    console.log('onreadystatechange', args);
  },
  onerror: function (args) {
    console.log('onerror', args);
  },
});
```
