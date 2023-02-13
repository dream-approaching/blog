---
title: promise
order: 50
group:
  title: Interview
---

## promise

### 1. 你了解 promise 吗？平时用的多吗？

> `promise` 是异步编程的一种解决方案

### 2. Promise.all 有什么特性？

> - 接收一个 `promise` 数组，数组中不一定都是 `promise`，如果不是 `promise`，会先调用 `Promise.resolve` 转换成 `promise`
> - 返回一个 `promise`，`resolve` 的结果是一个数组，数组中的元素是 `promise` resolve 的结果，顺序和 `promise` 数组中的顺序一致
> - `Promise.all` 会等待所有的 `promise` 都 `resolve` 之后才会 `resolve`，如果有一个 `reject` 了，就会立即 `reject`，不会等待其他的 `promise resolve` 或者 `reject`
> - 如果其中一个 `promise` 报错了，那其他的 `promise` 还会执行，因为 `promise` 是在创建的时候就会执行的，不会等到 `then` 的时候才执行

### 3. 手写一个 promise.all

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    let result = [];
    let count = 0;
    for (let i = 0; i < promises.length; i++) {
      // 通过 Promise.resolve 把可能不是 promise 的 item 转换成 promise
      Promise.resolve(promises[i]).then(
        (data) => {
          // result.push(data); // 这里不能用 push，因为promise是异步的，可能会出现顺序错乱的情况
          result[i] = data;
          count++;
          // 不能用result.length === promises.length判断，因为直接给result[i]赋值，result.length会是i+1
          // 如var arr = []; arr[6] = 7; arr.length === 7
          if (count === promises.length) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        },
      );
    }
  });
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 3000);
});

promiseAll([p1, p2, p3]).then((res) => {
  console.log(res);
});
```

### 4. 假定我们有一个 api/member 接口，我们希望接口数据能被缓存起来，这样在程序多个地方调用的时候，不会重复的发送请求，而是直接从缓存中取数据，怎么用 promise 缓存 http 请求结果？

```js
let cache = null;
function getMember() {
  if (cache) {
    return cache;
  }

  // 这里不带await，直接返回 promise
  cache = fetch('api/member');
  return cache;
}

// 调用
await getMember(); // 第一次调用，会发送请求
await getMember(); // 第二次调用，不会发送请求，直接从缓存中取数据
```
