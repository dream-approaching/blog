---
title: EventBus
group:
  title: Interview
---

## EventBus

### 1. 常见的发布订阅模式有哪些？它们是同步的还是异步的？

- vue eventBus：同步
- node EventEmitter：同步

### 2. 说一下 EventBus 的原理

> EventBus 是一个发布订阅模式的实现，它的核心是一个事件总线，用来存储事件和事件的回调函数，当事件被触发时，会执行对应的回调函数

### 3. 说一下 EventBus 的优缺点

> 优点：解耦，让组件之间的通信更加简单缺点：无法跨页面通信，无法跨进程通信

### 4. 说一下 EventBus 的实现

> 1. 通过一个对象来存储事件和事件的回调函数
> 2. 通过 `on` 方法来订阅事件，通过 `emit` 方法来触发事件
> 3. 通过 `off` 方法来取消订阅事件

### 5. 说一下 EventBus 的应用场景

> 1. 组件之间的通信
> 2. 跨组件的通信
> 3. 跨页面的通信
> 4. 跨进程的通信

### 6. 实现一个 EventBus

```js
class EventEmitter {
  constructor(maxListeners) {
    this.events = {};
    this.maxListeners = maxListeners || 10;
  }

  // 监听事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    if (this.events[eventName].length >= this.maxListeners) {
      console.warn(
        `Possible EventEmitter memory leak detected. ${this.events[eventName].length} ${eventName} listeners added. Use emitter.setMaxListeners() to increase limit`,
      );
    }

    this.events[eventName].push(callback);

    return this; // 支持链式调用
  }

  // 触发事件
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback.apply(this, args);
      });

      return this; // 支持链式调用
    }
  }

  // 取消订阅
  off(eventName, callback) {
    if (!callback) {
      this.events[eventName] = [];
    }
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
    }

    return this; // 支持链式调用
  }

  // 只执行一次
  once(eventName, callback) {
    const onceCallback = (...args) => {
      this.off(eventName, onceCallback);
      callback.apply(this, args);
    };
    this.on(eventName, onceCallback);

    return this; // 支持链式调用
  }
}
```
