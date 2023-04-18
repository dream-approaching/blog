---
title: 性能优化
group:
  title: Interview
---

<!-- TOC -->

- [性能优化](#性能优化)
  - [1. 说一下你对性能优化的理解](#1-说一下你对性能优化的理解)
  - [2. 说一下常用的性能优化的方法](#2-说一下常用的性能优化的方法)
  - [3. 如果某一段 js 执行时间非常，怎么去分析哪一段代码/函数执行时间过长](#3-如果某一段-js-执行时间非常怎么去分析哪一段代码函数执行时间过长)
  - [4. 场景题：阿里云 oss 支持通过 url 参数来转换图片格式，尝试写一下把任意图片转换成 webp 格式](#4-场景题阿里云-oss-支持通过-url-参数来转换图片格式尝试写一下把任意图片转换成-webp-格式)
  - [5. 怎么实现一个图片懒加载](#5-怎么实现一个图片懒加载)
  - [6. 如果有巨量的图片要展示，除了懒加载，还有什么方法可以限制同时加载图片的数量](#6-如果有巨量的图片要展示除了懒加载还有什么方法可以限制同时加载图片的数量)
  - [7. 虚拟列表](#7-虚拟列表)
  - [8. 量化页面性能，平时是怎么做的](#8-量化页面性能平时是怎么做的)

<!-- /TOC -->

# 性能优化

## 1. 说一下你对性能优化的理解

> 性能优化是指在保证功能的前提下，尽可能的减少资源的消耗，提高页面的加载速度，提升用户体验。

## 2. 说一下常用的性能优化的方法

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
    - 小图片 base64 编码，或雪碧图，或 iconfont
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

## 3. 如果某一段 js 执行时间非常，怎么去分析哪一段代码/函数执行时间过长

- 使用 performance API，如 performance.now()、performance.mark()、performance.measure()
- 使用 chrome 的 performance 面板，可以看到每个函数的执行时间
- console.time()、console.timeEnd()

## 4. 场景题：阿里云 oss 支持通过 url 参数来转换图片格式，尝试写一下把任意图片转换成 webp 格式

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

## 5. 怎么实现一个图片懒加载

- 使用 scroll 事件，监听滚动条的位置，如果元素在可视区域，就加载图片
- getBoundingClientRect()，可以获取元素的位置信息，如果元素在可视区域，就加载图片
- 使用 [IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API) API，可以监听元素是否在可视区域，如果在可视区域，就加载图片

## 6. 如果有巨量的图片要展示，除了懒加载，还有什么方法可以限制同时加载图片的数量

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

## 7. 虚拟列表

> 原理：只渲染用户正在浏览的部分数据，而不是全部渲染，以提高页面的渲染速度和响应性。页面渲染比较耗时的过程是样式计算和 layout 布局，而虚拟列表只渲染用户正在浏览的部分数据，所以渲染速度会更快。

步骤：

1. 获取数据
2. 计算每一项的高度
3. 计算可视区域的高度，通过 window.innerHeight 或者 dom 元素的 clientHeight
4. 计算可视区域的数据量，即渲染多少条数据
5. 计算可视区域的数据起始索引，即渲染从第几条数据开始，通过滚动条的位置计算，即 scrollTop / 每一项的高度
6. 计算可视区域的数据结束索引，即渲染到第几条数据结束，即起始索引 + 可视区域的数据量，即 startIndex + visibleCount
7. 渲染数据

## 8. 量化页面性能，平时是怎么做的

- 使用 [Lighthouse](https://developers.google.com/web/tools/lighthouse) 工具，可以对网站进行性能评分，评分越高，性能越好
- 使用 [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) 工具，可以对网站进行性能评分，评分越高，性能越好
- 使用 performance API，如 performance.now()、performance.mark()、performance.measure()
  - performance.now()，返回从页面加载到当前的毫秒数
  - performance.mark()，标记一个时间点
  - performance.measure()，计算两个时间点之间的时间差
  - performance.getEntries()，获取所有的时间点
- 使用 chrome 的 performance 面板，可以看到每个函数的执行时间
