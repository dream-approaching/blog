---
title: 性能优化
order: 60
group:
  title: Interview
---

## 性能优化

### 1. 说一下你对性能优化的理解

> 性能优化是指在保证功能的前提下，尽可能的减少资源的消耗，提高页面的加载速度，提升用户体验。

### 2. 说一下常用的性能优化的方法

- 减少 HTTP 请求，只请求当前需要的资源
  - 异步加载
  - 雪碧图
  - 懒加载
  - 缓存
  - polyfill 的包很大，可以使用 cdn
- 缩减资源体积
  - 打包压缩
  - gzip 压缩
  - 尽量减小 cookie 的大小，减少请求头的大小
  - 图片
    - 选择合适分辨率的图片
    - 选择合适的格式，如 webp
    - 压缩图片，如 tinypng、image-webpack-loader
- 时序优化
  - promise.all 可以并行加载资源
  - ssr 服务端渲染
  - [preload](https://pjchender.dev/webdev/web-preload-lazyload/#%E4%BD%BF%E7%94%A8-relpreload) 预获取 `<link rel="preload" as="image" href="https://aaa.com/p.png" />`
  - [prefetch](https://pjchender.dev/webdev/web-preload-lazyload/#%E4%BD%BF%E7%94%A8-relprefetch) 预加载 `<link rel="prefetch" href="index.js" />`
- 合理利用缓存
  - cdn，大流量的请求可以做 cdn 预热
  - 强缓存
    - expires
    - cache-control
  - 协商缓存
    - last-modified
    - etag

### 3. 如果某一段 js 执行时间非常，怎么去分析哪一段代码/函数执行时间过长

- 使用 performance API，如 performance.now()、performance.mark()、performance.measure()
- 使用 chrome 的 performance 面板，可以看到每个函数的执行时间
- console.time()、console.timeEnd()

### 4. 场景题：阿里云 oss 支持通过 url 参数来转换图片格式，尝试写一下把任意图片转换成 webp 格式

> 需要先判断浏览器是否支持 webp 格式，如果不支持，就使用原来的图片格式。

```js
function isSupportWebp() {
  try {
    return (
      document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
    );
  } catch (err) {
    return false;
  }
}

function getWebpUrl(url) {
  if (!url) {
    throw new Error('url is required');
    return '';
  }

  // 如果是 base64 格式的图片，就不转换了
  if (url.indexOf('data:image') === 0) {
    return url;
  }

  if (isSupportWebp()) {
    return url + '?x-oss-process=image/format,webp';
  }
  return url;
}
```

### 5. 怎么实现一个图片懒加载

- 使用 scroll 事件，监听滚动条的位置，如果元素在可视区域，就加载图片
- getBoundingClientRect()，可以获取元素的位置信息，如果元素在可视区域，就加载图片
- 使用 [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API) API，可以监听元素是否在可视区域，如果在可视区域，就加载图片

### 6. 如果有巨量的图片要展示，除了懒加载，还有什么方法可以限制同时加载图片的数量

> 代码题，通过 promise.race 实现 promise 的并发控制

```js
const urls = [
  { info: 'link1', time: 3000 },
  { info: 'link2', time: 2000 },
  { info: 'link3', time: 5000 },
  { info: 'link4', time: 1000 },
  { info: 'link5', time: 1200 },
  { info: 'link6', time: 2000 },
  { info: 'link7', time: 3000 },
  { info: 'link8', time: 800 },
  { info: 'link9', time: 2000 },
  { info: 'link10', time: 1000 },
];

const loadImg = (url) => {
  return new Promise((resolve, reject) => {
    console.log(`---- ${url.info} start`);

    // 模拟图片加载
    setTimeout(() => {
      console.log(`---- ${url.info} end`);
      resolve();
    }, url.time);
  });
};

function limitLoad(urls, handler, limit) {
  let promises = [];

  promises = urls.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });
  console.log('%c zjs promises1:', promises);

  // 选出第一个完成的 promise
  let p = Promise.race(promises);
  for (let i = 0; i < urls.length; i++) {
    p = p.then((res) => {
      promises[res] = handler(urls[i]).then(() => {
        return res;
      });

      console.log('%c zjs promises2:', promises);
      return Promise.race(promises);
    });
  }
}

limitLoad(urls, loadImg, 3);
```
