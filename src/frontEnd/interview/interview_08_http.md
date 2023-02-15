---
title: HTTP请求
group:
  title: Interview
---

## HTTP 请求

### 1. 平时怎么解决跨域问题的

1. jsonp
2. cors，后端设置响应头
3. nginx 反向代理，proxy_pass
4. node 中间层代理，通过 node 中间层代理请求，再返回给前端
5. img 标签的 src 属性可以跨域，通过 img 标签的 src 属性请求接口，再通过 onload 事件获取返回的数据

### 2. 做过全局的请求处理吗？比如统一处理登录态、全局错误处理等

> 基于 axios、fetch 封装的请求库

### 3. 代码题，能给 xhr 添加 hook，实现在各个阶段打日志吗

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
