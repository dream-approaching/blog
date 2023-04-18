---
title: 防抖节流
group:
  title: Interview
---

# 防抖节流

## 1. 基本概念

> 防抖: 多次执行变为最后一次执行  
> 节流: 将多次执行变成每隔一段时间执行

## 2. 分别适用什么场景

> 防抖: input 搜索节流: resize scroll

## 3. 手写防抖函数

```js
/**
 * 可以立即执行的 防抖函数
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
const debounce = (fn, ms = 500, immediate = false) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    if (immediate) {
      const callNow = !timeoutId;
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, ms);
      if (callNow) fn.apply(this, args);
    } else {
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    }
  };
};
```

## 4. 手写节流函数

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
