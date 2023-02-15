---
title: React 和 Vue相关
group:
  title: Interview
---

## React 和 Vue 相关

#### 数据流

单向数据流，就是父组件传递数据给子组件。子组件数据改变不会原路响应父组件，而是通过发消息的方式向上传递。这种限制也是为了避免双向流动导致逻辑不清。

> `react` 和 `vue` 都是单向数据流  
> `vue` 可以通过 `v-model` 实现双向数据绑定，不过 `v-model` 本质是 `v-bind:value` 和 `v-on:input` 的语法糖

#### vue 实现响应式的原理

- vue 2.0
  - 对于非数组用 Object.defineProperty 作为响应式原理的实现，深度监听时，需要递归到底，一次性计算量大, 不支持 Map、Set、Class 等数据结构
  - 对于数组，由于性能问题，是通过重写数组方法来实现
- vue 3.0
  - 利用 Proxy 对象创建一个对象的代理，从而实现基本操作的拦截和自定义
