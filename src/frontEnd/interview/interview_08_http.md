---
title: HTTP请求
group:
  title: Interview
---

# HTTP 请求

## 1. 平时怎么解决跨域问题的

[跨域以及常见解决办法](../basic/http-request.md#7-跨域以及常见解决办法)

## 2. 做过全局的请求处理吗？比如统一处理登录态、全局错误处理等

> 基于 axios、fetch 封装的请求库

## 3. http 1.0、1.1、2.0 在并发请求上有什么区别

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

## 4. http 1.1 的长连接和 http 2.0 的多路复用有什么区别

- http 1.1
  - 同一时间一个 TCP 连接只能处理一个请求，采用一问一答的方式，上个请求响应后才能进行下一个请求
  - chrome 浏览器最大并发数是 6 个，因为 chrome 浏览器默认开启了 6 个 TCP 连接
- http 2.0
  - 同域名上的所有通信都在一个 TCP 连接上完成，单个连接上可以并行处理多个请求和响应

## 5. 为什么 http 1.1 不能多路复用

- http 1.1 的请求和响应都是基于文本的，而 http 2.0 的请求和响应都是基于二进制的，所以 http 1.1 不能多路复用

## 6. 代码题，能给 xhr 添加 hook，实现在各个阶段打日志吗

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
