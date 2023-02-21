---
title: Vue
group:
  title: Interview
---

# Vue

## 1. 简单说一下 vue 的响应式原理

- `vue2`: 利用 Object.defineProperty()为属性添加 getter 和 setter。getter 用于依赖收集，setter 用于触发依赖更新。
- `vue3`: 利用 Proxy 对象创建一个对象的代理，从而实现基本操作的拦截和自定义

## 2. vue.nextTick 的原理

利用微任务队列 Promise.then() 实现, 也可以利用宏任务队列 setTimeout() 实现

## 3. vue computed 和 watch 的区别

- `computed`: 依赖的数据发生变化时，会自动重新计算，缓存计算结果，只有依赖的数据发生变化时才会重新计算
- `watch`: 依赖的数据发生变化时，会执行回调函数，不会缓存计算结果，依赖的数据发生变化时，无论数据是否发生变化，都会执行回调函数

## 4. vue3 和 vue2 的区别

- `vue3`: 采用 Proxy 代替 Object.defineProperty，实现响应式，提升性能
- `vue3`: 采用 Composition API 代替 Options API，更加灵活
- `vue3`: 采用 Vite 代替 Webpack，提升开发体验

## 5. vue3 的 Composition API

- `setup`: 组件初始化时执行，可以在此处获取 props、context、setupState
- `ref`: 创建一个响应式的 ref 对象，可以通过 .value 获取值
- `reactive`: 创建一个响应式的对象
- `computed`: 创建一个响应式的计算属性
- `watch`: 监听响应式数据的变化
- `watchEffect`: 监听响应式数据的变化，不会缓存计算结果
- `onMounted`: 组件挂载后执行
- `onUpdated`: 组件更新后执行
- `onUnmounted`: 组件卸载后执行
- `onBeforeMount`: 组件挂载前执行
- `onBeforeUpdate`: 组件更新前执行
- `onBeforeUnmount`: 组件卸载前执行
- `onErrorCaptured`: 捕获组件渲染过程中的错误

## 6. vue3 的 Composition API 和 vue2 的 Options API 的区别

- `vue2`: 通过 Options API 来组织代码，通过 this 访问组件实例，通过 this.$options 访问组件配置项
- `vue3`: 通过 Composition API 来组织代码，通过 setup 函数来获取组件实例，通过 setup 函数的参数来访问组件配置项

## 7. vue 的数据流

- vue 是单向数据流，父组件传递数据给子组件，子组件数据改变不会原路响应父组件，而是通过发消息的方式向上传递
- vue 可以通过 `v-model` 实现双向数据绑定。 `v-model` 本质是 `v-bind:value` 和 `v-on:input` 的语法糖

## 8. vue 的生命周期

- `beforeCreate`: 组件实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性
- `created`: 组件实例已经创建完成，此时 data 和 methods 已经创建好了，但是还没有开始挂载到页面中
- `beforeMount`: 组件挂载之前，此时已经可以访问到 template 了，但是还没有开始编译
- `mounted`: 组件挂载之后，此时，已经将编译好的 template 挂载到了页面中，所以，此时可以访问到页面中的 DOM 元素
- `beforeUpdate`: 组件更新之前，此时，data 中的数据已经发生了改变，但是还没有开始更新 DOM
- `updated`: 组件更新之后，此时，data 中的数据已经发生了改变，并且，DOM 也重新渲染完成了
- `beforeDestroy`: 组件销毁之前，此时，组件实例还没有被销毁
- `destroyed`: 组件销毁之后，此时，组件实例已经被销毁

## 9. vue 的组件通信

- `props` 和 `emit`: 父组件通过 props 向子组件传递数据，子组件通过 $emit 向父组件发送消息
- `provide` 和 `inject`: 祖先组件通过 provide 向后代组件提供数据，后代组件通过 inject 来注入数据
- `vuex`: 通过 vuex 来管理组件之间的共享数据
- `eventBus`: 通过 eventBus 来实现组件之间的通信

## 10. vue 中模版是怎么更新的，你是怎么理解虚拟 dom 的

模版是通过 `render` 函数来编译成 `vnode`，然后通过 `diff` 算法来比较新旧 `vnode`，最后更新视图。这个过程中，`vnode` 就是虚拟 DOM。

## 11. vue 中的 diff 算法

- `vue2`: 采用双端比较的方式，先首尾比较，然后再逐层比较，找到可复用的节点。使用 `key` 可以提高比较效率，最后将剩余的节点进行删除或者插入
- `vue3`: 采用快速比较的方式，先首位比较，然后创建一个新节点在旧 dom 的映射表，映射表中的节点都是可复用的，最后将剩余的节点进行删除或者插入

## 12. vue 中 keep-alive 的原理

keep-alive 组件是抽象组件, 会在组件渲染的过程中，把组件的 vnode 保存到缓存中，当组件再次渲染时，会从缓存中获取 vnode，然后渲染到页面中。

## 13. 怎么封装一个自己的指令

```js
// 定义一个指令
const myDirective = {
  // 指令的定义
  mounted(el, binding) {
    el.style.color = binding.value;
  },
};

// 注册一个全局指令
app.directive('my-directive', myDirective);

// 注册一个局部指令
export default {
  directives: {
    'my-directive': myDirective,
  },
};
```

## 14. vue3 中 reactive 是如何实现的

```js
const reactive = (target) => {
  const handler = {
    get(target, key) {
      const result = Reflect.get(target, key);
      track(target, key);
      return result;
    },
    set(target, key, value) {
      const result = Reflect.set(target, key, value);
      trigger(target, key);
      return result;
    },
  };
  return new Proxy(target, handler);
};
```