---
title: html
order: 10
group:
  title: 基本知识
---

<!-- TOC -->

- [1. html5 有哪些新特性](#1-html5-有哪些新特性)
- [2. script defer 和 async 的区别](#2-script-defer-和-async-的区别)
- [3. 常⽤的 meta 标签有哪些](#3-常⽤的-meta-标签有哪些)
- [4. canvas](#4-canvas)
  - [4.1. canvas 元素的属性](#41-canvas-元素的属性)
  - [4.2. canvas 元素的方法](#42-canvas-元素的方法)
  - [4.3. canvas 绘图环境的属性](#43-canvas-绘图环境的属性)
  - [4.4. 代码示例](#44-代码示例)
- [5. 怎么提升 seo 排名](#5-怎么提升-seo-排名)

<!-- /TOC -->

## 1. html5 有哪些新特性

- 语义化标签
  ```html
  <header></header>
  <nav></nav>
  <main></main>
  <section></section>
  <article></article>
  <aside></aside>
  <footer></footer>
  ```
- 新增表单元素
  ```html
  <input type="email" />
  <input type="url" />
  <input type="search" />
  <input type="tel" />
  <input type="number" />
  <input type="range" />
  <input type="color" />
  <input type="date" />
  ```
- 新增 API
  ```html
  <canvas></canvas>
  <video></video>
  <audio></audio>
  <svg></svg>
  ```
- 新增属性
  ```html
  <div contenteditable="true"></div>
  <div draggable="true"></div>
  <div hidden></div>
  <div spellcheck="true"></div>
  <div translate="yes"></div>
  ```

## 2. script defer 和 async 的区别

![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20221031142357.png)

## 3. 常⽤的 meta 标签有哪些

- `charset`，用来描述 HTML 文档的编码类型
  ```html
  <meta charset="UTF-8" />
  ```
- `keywords`，页面关键词
  ```html
  <meta name="keywords" content="关键词" />
  ```
- `description`，页面描述
  ```html
  <meta name="description" content="页面描述内容" />
  ```
- `viewport`，适配移动端，可以控制视口的大小和比例

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  ```

- http-equiv，设置 http 头部信息
  ```html
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  ```
- 把 http 转成 https

  ```html
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
  ```

  content 参数有以下几种：

  - width viewport ：宽度(数值/device-width)
  - height viewport ：高度(数值/device-height)
  - initial-scale ：初始缩放比例
  - maximum-scale ：最大缩放比例
  - minimum-scale ：最小缩放比例
  - user-scalable ：是否允许用户缩放(yes/no）

- og 协议
  ```html
  <meta property="og:title" content="什么是 Open Graph 标签？不懂你还做什么社交营销优化？！" />
  <meta property="og:site_name" content="瓦特研究所" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="http://www.watelab.com/what-is-open-graph-tags/" />
  <meta property="og:image" content="http://www.watelab.com/uploads/cover-004.jpg" />
  <meta
    property="og:description"
    content="Open Graph Protocol（开放图谱协议），简称 OG 协议或 OGP。"
  />
  ```

## 4. canvas

### 4.1. canvas 元素的属性

- `width`，canvas 元素的宽度
- `height`，canvas 元素的高度

### 4.2. canvas 元素的方法

- `getContext()`，返回一个用于在画布上绘图的环境对象
- `toDataURL()`，返回一个包含图片展示的 data URI
- `toBlob()`，返回一个包含图片展示的 Blob 对象

### 4.3. canvas 绘图环境的属性

- `beginPath()`，新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
- `closePath()`，闭合路径之后图形绘制命令又重新指向到上下文中。
- `stroke()`，通过线条来绘制图形轮廓。
- `fill()`，通过填充路径的内容区域生成实心的图形。
- `moveTo()`，把路径移动到画布中的指定点，不创建线条。
- `lineTo()`，添加一个新点，然后在画布中创建从该点到最后指定点的线条。
- `arc()`，创建弧/曲线（用于创建圆形或部分圆）。
- `quadraticCurveTo()`，创建二次贝塞尔曲线。
- `bezierCurveTo()`，创建三次方贝塞尔曲线。
- `rect()`，创建一个矩形。
- `clip()`，从原始画布剪切任意形状和尺寸的区域。
- `isPointInPath()`，如果指定的点位于当前路径中，则返回 true，否则返回 false。

### 4.4. 代码示例

```js
// 画一个圆
function drawCircle() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.beginPath();

  // arc(x, y, radius, startAngle, endAngle, anticlockwise)
  ctx.arc(100, 100, 50, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

// 画一个矩形
function drawRect() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.beginPath();

  // rect(x, y, width, height)
  ctx.rect(100, 100, 100, 100);
  ctx.closePath();
  ctx.fill();
}

// 画一个三角形
function drawTriangle() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.beginPath();

  // moveTo(x, y)
  ctx.moveTo(100, 100);
  // lineTo(x, y)
  ctx.lineTo(200, 100);
  ctx.lineTo(150, 200);
  ctx.closePath();
  ctx.fill();
}
```

## 5. 怎么提升 seo 排名

- 网站结构合理，层级清晰
  - 使用语义化标签，如：`<header>`、`<nav>`、`<main>`、`<footer>`、`<article>`、`<section>`、`<aside>`、`<figure>`、`<figcaption>`、`<time>`、`<mark>`、`<progress>`、`<meter>`、`<video>`、`<audio>`、`<canvas>`、`<svg>`、`<datalist>`、`<keygen>`、`<output>`、`<details>`、`<summary>`
- 网站页面加载速度快
- 网站页面标题、关键词、描述合理
  - 网站页面标题不超过 70 个字符，`<title>` 标签中的内容不要重复
  - 网站页面关键词不超过 100 个字符, 用英文逗号分隔, `<meta name="keywords" content="关键词" />`
  - 网站页面描述不超过 150 个字符, `<meta name="description" content="页面描述内容" />`
- 网站页面内容不重复
- 网站页面内容不少于 300 个字符
