---
title: 防抖节流
group:
  title: 面试相关
---

### 1. 基本概念

> 防抖: 多次执行变为最后一次执行  
> 节流: 将多次执行变成每隔一段时间执行

### 2. 分别适用什么场景

> 防抖: input 搜索节流: resize scroll

### 3. 手写防抖函数

```js
// 简单版的防抖，这个防抖只能在最后调用
const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  let timer = 0;
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

/**
 * 可以立即执行的 防抖函数
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce(func, wait = 50, immediate = true) {
  let timer, context, args;

  // 延迟执行函数
  const later = () =>
    setTimeout(() => {
      // 延迟函数执行完毕，清空缓存的定时器序号
      timer = null;
      // 延迟执行的情况下，函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args);
        context = args = null;
      }
    }, wait);

  // 这里返回的函数是每次实际调用的函数
  return function (...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later();
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params);
      } else {
        context = this;
        args = params;
      }
      // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer);
      timer = later();
    }
  };
}
```

### 4. 手写节流函数

```js
const throttle = (fn, ms) => {
  let canRun = true;
  let timer;
  let lastTime = Date.now();
  return function (...args) {
    if (canRun) {
      fn.apply(this, args);
      canRun = false;
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (Date.now() - lastTime >= ms) {
          fn.apply(this, args);
          lastTime = Date.now();
        }
      }, Math.max(ms - (Date.now() - lastTime), 0));
    }
  };
};
```
