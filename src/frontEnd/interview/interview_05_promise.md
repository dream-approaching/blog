---
title: 异步 & promise
group:
  title: Interview
---

<!-- TOC -->

- [1. 异步编程的几种方式](#1-异步编程的几种方式)
- [2. promise](#2-promise)
- [3. generator](#3-generator)
- [4. async/await](#4-asyncawait)
- [5. 手写一个 promise.all](#5-手写一个-promiseall)
- [6. promise 缓存接口](#6-promise-缓存接口)
- [7. promise.race 实现并发控制](#7-promiserace-实现并发控制)

<!-- /TOC -->

## 1. 异步编程的几种方式

- 回调函数
- promise
- generator
- async/await

## 2. promise

Promise 是异步编程的一种解决方案, 有以下两个特点:

- 对象的状态不受外界影响
- 一旦状态改变，就不会再变

**常用**

- resolve 函数在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
- reject 函数，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
- Promise.prototype.finally()：用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
  ```js
  promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
  ```
- Promise.all()
  - 接受一个数组作为参数，p1、p2、p3 都是 Promise 实例，如果不是，就会先调用 Promise.resolve 方法，将参数转为 Promise 实例
  - 返回一个 `promise`，`resolve` 的结果是一个数组，数组中的元素是 `promise` resolve 的结果，顺序和 `promise` 数组中的顺序一致
  - `Promise.all` 会等待所有的 `promise` 都 `resolve` 之后才会 `resolve`，如果有一个 `reject` 了，就会立即 `reject`，不会等待其他的 `promise resolve` 或者 `reject`
  - 如果其中一个 `promise` 报错了，那其他的 `promise` 还会执行，因为 `promise` 是在创建的时候就会执行的，不会等到 `then` 的时候才执行
  - Promise.all 方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
    ```js
    const p = Promise.all([p1, p2, p3]);
    // 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
    // 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
    ```
- Promise.race()
  - 基本语法与 Promise.all()类似
  - 返回的规则不同
    ```js
    const p = Promise.race([p1, p2, p3]);
    // 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
    // 率先改变的 Promise 实例的返回值，就传递给p的回调函数
    ```
- Promise.resolve(): 将现有对象转为 Promise 对象
- Promise.reject(reason): 返回一个新的 Promise 实例，该实例的状态为 rejected

  ```js
  const p = Promise.reject('出错了');
  // 等同于
  const p = new Promise((resolve, reject) => reject('出错了'));

  p.then(null, function (s) {
    console.log(s);
  });
  // 出错了
  ```

## 3. generator

- generator 函数是一个状态机，封装了多个内部状态
- Generator 还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
- 调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，必须调用遍历器对象的 next 方法，使得指针移向下一个状态
- 换言之，Generator 函数是分段执行的，yield 表达式是暂停执行的标记，而 next 方法可以恢复执行

  ```js
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }

  var hw = helloWorldGenerator();
  hw.next(); // { value: 'hello', done: false }
  hw.next(); // { value: 'world', done: false }
  hw.next(); // { value: 'ending', done: true }
  hw.next(); // { value: undefined, done: true }
  ```

- Generator 函数可以不用 yield 表达式，这时就变成了一个单纯的暂缓执行函数。
- 语法：下面四种都行
  ```js
  function * foo(x, y) { ··· }
  function *foo(x, y) { ··· }
  function* foo(x, y) { ··· }
  function*foo(x, y) { ··· }
  ```
- yield 表达式
  - 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值
  - 下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式。
  - 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值。
  - 如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined。
- yield\*表达式

  - 在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的
  - yield\*表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数

    ```js
    function* bar() {
      yield 'x';
      yield* foo();
      yield 'y';
    }

    // 等同于
    function* bar() {
      yield 'x';
      yield 'a';
      yield 'b';
      yield 'y';
    }

    // 等同于
    function* bar() {
      yield 'x';
      for (let v of foo()) {
        yield v;
      }
      yield 'y';
    }

    for (let v of bar()) {
      console.log(v);
    }
    // "x"
    // "a"
    // "b"
    // "y"
    ```

- for...of 循环

  - for...of 循环可以自动遍历 Generator 函数运行时生成的 Iterator 对象，且此时不再需要调用 next 方法。

    ```js
    function* foo() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
      return 6;
    }

    for (let v of foo()) {
      console.log(v);
    }
    // 1 2 3 4 5
    // 上面代码使用for...of循环，依次显示 5 个yield表达式的值。
    // 这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象
    // 所以上面代码的return语句返回的6，不包括在for...of循环之中
    ```

## 4. async/await

- 是 Generator 函数的语法糖
- 与 Generator 的区别
  - 内置执行器：Generator 函数的执行必须靠执行器，async 函数的执行，与普通函数一模一样，只要一行
  - 更好的语义
  - Generator 函数的返回值是 Iterator 对象，async 函数的返回值是 Promise 对象
- 遇到 await 表达式时，会让 async 函数 暂停执行，等到 await 后面的语句（Promise）状态发生改变（resolved 或者 rejected）之后，再恢复 async 函数的执行（再之后 await 下面的语句），并返回解析值（Promise 的值）
- 例子

  ```js
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }
  async function async2() {
    console.log('async2');
  }
  console.log('script start');
  setTimeout(function () {
    console.log('setTimeout');
  }, 0);
  async1();
  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  }).then(function () {
    console.log('promise2');
  });
  console.log('script end');

  // script start
  // async1 start
  // async2
  // promise1
  // script end
  // async1 end
  // promise2
  // setTimeout
  ```

> 参考：[掘金——前端 er，你真的会用 async 吗？](https://juejin.im/post/5c0397186fb9a049b5068e54)

## 5. 手写一个 promise.all

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

## 6. promise 缓存接口

> 假定我们有一个 api/member 接口，我们希望接口数据能被缓存起来，这样在程序多个地方调用的时候，不会重复的发送请求，而是直接从缓存中取数据，怎么用 promise 缓存 http 请求结果？

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

## 7. promise.race 实现并发控制

[通过 promise.race 实现 promise 的并发控制](./interview_06_optimization.md#6-如果有巨量的图片要展示除了懒加载还有什么方法可以限制同时加载图片的数量)
