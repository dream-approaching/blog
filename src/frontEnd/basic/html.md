---
title: html
order: 10
group:
  title: 基本知识
---

## 1. script defer 和 async 的区别

![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20221031142357.png)

## 2. 常⽤的 meta 标签有哪些

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
