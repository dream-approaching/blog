---
title: 事件循环
group:
  title: Interview
---

# 事件循环

## 1. 为什么 js 在浏览器中有事件循环的机制？

> js 是单线程的

## 2. 事件循环中有哪两种任务？

> 宏任务: 整体代码、`setTimeout`、`setInterval`、`I/O 操作`  
> 微任务: `new Promise().then`

## 3. 为什么要引入微任务的概念，只有宏任务可以吗？

> 宏任务保持先进先出的原则执行，无法调整优先级

## 4. node 中的事件循环和浏览器的事件循环有什么区别？

- 微任务的执行时机不同。
  - 在浏览器的事件循环中，每执行完一个宏任务，就会去检查微任务队列，如果有微任务，就会执行微任务，直到微任务队列为空，才会继续执行下一个宏任务
  - node 事件循环中则是在“上一阶段”执行完，“下一阶段”开始前执行微任务队列中的任务。也就是说，node 中的微任务是在两个阶段之间执行的。
- process.nextTick()的优先级不同。
  - 在浏览器事件循环中，process.nextTick()属于微任务，而且和其他微任务的优先级是一样的，不存在哪个微任务的优先级高就先执行谁。
  - 在 node 中，process.nextTick()的优先级要高于其他微任务，也就是说，在两个阶段之间执行微任务时，若存在 process.nextTick()，则先执行它，然后再执行其他微任务。

## 5. 笔试题

- 例题 1

  ```js | pure
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

  // script start => async1 start => async2 => promise1 => script end => async1 end => promise2 => setTimeout
  ```

- 例题 2

  ```js | pure
  console.log('start');
  const timer1 = setTimeout(() => {
    console.log('children2');
    Promise.resolve().then(() => {
      console.log('children3');
    });
  }, 0);

  new Promise((resolve) => {
    console.log('children4');
    const timer2 = setTimeout(() => {
      console.log('children5');
      resolve('children6');
    }, 0);
  }).then((res) => {
    console.log('children7');
    const timer3 = setTimeout(() => {
      console.log(res);
    });
  });
  // start => children4 => children2 => children3 => children5 => children7 => children6
  ```

  > - 第一轮没有微任务，因为 resolve 放在 setTimeout 中了，所以.then 并没有直接添加到微任务队列中
  > - 整体代码进入宏任务中遇到的其他宏任务，陆续放入后续宏任务中，本例中可以理解 4 轮宏任务，执行完每一轮的宏任务，都会检查当前轮是否有微任务队列。
  >
  >   1.  整体代码 => 无微任务
  >   2.  timer1 => 微任务: children3
  >   3.  timer2
  >   4.  timer3
  >
  >   易混淆点: 容易把 timer1、timer2、timer3 认为是同一轮的宏任务

- 例题 3

  ```js |  pure
  const p = () => {
    return new Promise((resolve, reject) => {
      const p1 = new Promise((p1Resolve) => {
        setTimeout(() => {
          p1Resolve(1);
        }, 0);
        p1Resolve(2);
      });
      p1.then((res) => console.log(res));
      console.log(3);
      resolve(4);
    });
  };

  p().then((res) => console.log(res));
  console.log('end');

  // 3 => end => 2 => 4
  ```

  > promise 的状态改变之后就不会在改变了
