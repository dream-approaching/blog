---
title: React
group:
  title: Interview
---

## React

### 1. 了解虚拟 dom 吗？有什么优缺点

#### 1.1. 什么是虚拟 dom

虚拟 dom 是用 js 对象来描述 dom 结构，通过 js 对象来描述 dom 结构，可以减少对 dom 的操作，从而提高性能

#### 1.2. 为什么要使用虚拟 dom

- dom 操作是非常消耗性能的，因为 dom 操作会触发浏览器的重排和重绘
- 通过 js 对象来描述 dom 结构，可以减少对 dom 的操作，从而提高性能

#### 1.3. 虚拟 dom 的优缺点

- 优点
  - 通过 js 对象来描述 dom 结构，可以减少对 dom 的操作，从而提高性能
  - 可以在 js 层面进行 diff，减少对 dom 的操作
- 缺点
  - 虚拟 dom 本身也是一个 js 对象，需要占用内存
  - 通过 js 对象来描述 dom 结构，需要进行一次转换，转换成真实的 dom 结构

### 2. React 为什么要使用 fiber

为了使 react 渲染的过程可以被中断，可以将控制权交还给浏览器，可以让位给高优先级的任务，等浏览器空闲后再次恢复渲染。对于计算量比较大的 js 计算或者 dom 计算，不会显得特别卡顿

#### 2.1. generator 有类似的功能，为什么不用

- 使用 generator，需要将设计的所有代码包装成 generator \* 的形式，工作量大
- generator 很难在恢复执行的时候取到最新的状态

#### 2.2. 如何判断当前是否有高优先级的任务

- 当前 js 的环境其实没有办法判断是否有高优先级任务
- 只能约定一个合理的执行时间(如 16ms)，当超过执行时间任务仍然没有完成，则中断当前任务，将控制权交还给浏览器

> 16ms 的来历：人眼能识别的大概是 60 帧，1000ms / 60f ≈ 16ms

`requestIdleCallback` 是一个浏览器提供的 api，可以在浏览器空闲的时候执行回调函数

- 传入一个参数 `deadline`，可以通过 `deadline.timeRemaining()` 获取当前浏览器剩余的时间
- 传入第二个参数 `options`，可以设置 `timeout`，当超过 `timeout` 时间后，`requestIdleCallback` 会在下一帧强制执行回调函数

但是 `requestIdleCallback` 有兼容性问题，所以 react 通过`messageChannel`模拟实现了一个`requestIdleCallback`

react 预置了 5 个优先级，分别是：

- ImmediatePriority，立即执行
- UserBlockingPriority，用户交互优先级
- NormalPriority，普通优先级
- LowPriority，低优先级
- IdlePriority，空闲优先级

#### 2.3. fiber 是如何实现的

- fiber 是一个链表，每个 fiber 节点都有一个 `child` 属性，指向第一个子节点，`sibling` 属性，指向下一个兄弟节点
- fiber 节点还有一个 `return` 属性，指向父节点
- fiber 节点还有一个 `alternate` 属性，指向上一次渲染的 fiber 节点

### 3. 用过高阶组件吗，什么是高阶组件，高阶组件能用来做什么

简称 HOC，是一个函数，接收一个组件作为参数，返回一个新的组件

#### 3.1. 为什么要使用高阶组件(高阶组件能用来做什么)

- 代码复用，逻辑抽象
- 渲染劫持，劫持渲染逻辑，注入新的 props
- 状态抽象和复用，将 state 抽象到高阶组件中，通过 props 传递给子组件

#### 3.2. 高阶组件的缺点

- 会产生嵌套地狱，因为高阶组件是一个函数，所以可以嵌套使用
- 不容易理解，因为高阶组件是一个函数，所以不容易理解

### 4. 什么是 react hooks？原理？有什么优势？

#### 4.1. 什么是 react hooks

react hooks 是一种新的组件写法，可以让你在不编写 class 的情况下使用 state 以及其他的 react 特性

> react hooks 的原理：通过链表的方式，将每个组件的状态保存在链表中，每次组件更新的时候，从链表中取出对应的状态，更新状态，然后将新的状态保存到链表中

> 链表是什么：链表是一种数据结构，是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)

#### 4.2. 有什么优势

- class 的缺点
  - 组件间的逻辑复用难
  - 复杂组件变得难以理解
  - this 的指向问题，非箭头函数的情况下，需要手动绑定 this
- hooks 的优点
  - 逻辑复用更加简单
  - 组件变得更加简单
  - 不需要手动绑定 this

#### 4.3. hooks 的注意事项

- 只能在函数组件和自定义 hooks 中使用
- 只能在函数的最外层调用 hooks，不要在循环，条件判断或者子函数中调用

### 5. 说一下 react 的 diff 算法，和 fiber 有什么关系

通过 diff 算法，可以减少不必要的 dom 操作，提高性能。

react 使用 virtual dom，将真实 dom 转换成虚拟 dom，然后通过 diff 算法，比较新旧虚拟 dom 的差异，然后将差异更新到真实 dom 上。 react16 之前，diff 算法是同步的，会阻塞主线程，导致页面卡顿。react16 之后，引入了 fiber，将 diff 算法拆分成一个个的任务，每个任务执行完之后，会将控制权交给浏览器，这样就不会阻塞主线程，页面不会卡顿。

### 6. setState 是同步还是异步

在 React 中，setState 通常是异步更新组件状态的，但在一些情况下也可以是同步的。

React 在执行 setState 时，会将新的状态合并到组件的状态对象中，然后触发一次组件的重新渲染。由于 React 在同一周期内可能会进行多次 setState 操作，为了提高性能，React 会将多次的 setState 操作合并为一次。这种合并会在更新周期结束之前完成，因此在某些情况下 setState 不是立即执行的，而是在未来某个时间点执行。

**this.setState 同步的场景**

- 在 setTimeout、setInterval 或事件处理函数中调用 setState，React 也会立即执行 setState，因为这些代码块不是 React 的更新周期的一部分。
- 有一些生命周期函数是同步的，如 componentDidMount、componentWillUnmount，这些函数在组件挂载或卸载时只会被调用一次，不需要等待批量更新，所以在这些生命周期函数中调用 setState 会立即更新组件的状态
- 在 React 17 中，setState 也支持同步更新，但需要使用新的批量更新机制，即使用 ReactDOM.unstable_batchedUpdates 包装 setState 的调用。

### 7. react 的事件机制

react 事件机制和原生事件机制不一样，react 事件机制是事件委托的，事件会冒泡到 document 上，然后在 document 上统一处理。

### 8. react 的生命周期

- 初始化阶段
  - constructor
  - static getDerivedStateFromProps
  - render
  - componentDidMount
- 更新阶段
  - static getDerivedStateFromProps
  - shouldComponentUpdate
  - render
  - getSnapshotBeforeUpdate
  - componentDidUpdate
- 卸载阶段
  - componentWillUnmount

### 9. react 的性能优化

- 减少不必要的渲染
  - shouldComponentUpdate
  - PureComponent
  - React.memo
- 减少不必要的 dom 操作
  - 使用 key
  - 使用 react-virtualized
- 减少不必要的计算
  - useMemo
  - useCallback
  - React.memo
- 减少不必要的网络请求
  - 使用 react-lazy
  - 使用 react-cache

### 10. 手写 useState、useEffect、useRef

```jsx | pure
import ReactDOM from 'react-dom';
// import {useState} from 'react'

let workInProgressHook = {}; // 当前 hook
let firstWorkInProgressHook = {
  memoizedState: null, // 保存状态
  next: null, // 指向下一个 hook
};

function useState(initState) {
  let currentHook = workInProgressHook.next
    ? workInProgressHook.next
    : { memoizedState: initState, next: null };

  function setState(newState) {
    currentHook.memoizedState = newState;
    render();
  }

  if (workInProgressHook.next) {
    // 如果有 next，说明已经执行过了，直接返回即可
    workInProgressHook = workInProgressHook.next;
  } else {
    // 如果没有 next，说明是第一次执行，需要将 hook 挂载到链表上
    // 利用堆栈的特性，将 hook 挂载到链表上，顺序不能错
    workInProgressHook.next = currentHook;
    workInProgressHook = workInProgressHook.next;
  }

  // 注意返回的是currentHook，而不是workInProgressHook
  return [currentHook.memoizedState, setState];
}

function useEffect(callback, deps) {
  if (workInProgressHook.next) {
    // 如果有 next，说明已经执行过了，直接返回即可
    workInProgressHook = workInProgressHook.next;
  } else {
    // 如果没有 next，说明是第一次执行，需要将 hook 挂载到链表上
    // 利用堆栈的特性，将 hook 挂载到链表上，顺序不能错
    workInProgressHook.next = { memoizedState: null, next: null };
    workInProgressHook = workInProgressHook.next;
  }

  const hasNoDeps = !deps;
  let hasChangedDeps;
  if (workInProgressHook.memoizedState) {
    // 如果有 memoizedState，说明已经执行过了，需要比较 deps 是否发生了变化
    hasChangedDeps = deps.some((dep, i) => !Object.is(dep, workInProgressHook.memoizedState[i]));
  } else {
    // 如果没有 memoizedState，说明没传 deps，每次都执行
    hasChangedDeps = true;
  }

  if (hasNoDeps || hasChangedDeps) {
    callback();
    workInProgressHook.memoizedState = deps;
  }
}

function useRef(initValue) {
  if (workInProgressHook.next) {
    // 如果有 next，说明已经执行过了，直接返回即可
    workInProgressHook = workInProgressHook.next;
  } else {
    // 如果没有 next，说明是第一次执行，需要将 hook 挂载到链表上
    // 利用堆栈的特性，将 hook 挂载到链表上，顺序不能错
    workInProgressHook.next = { memoizedState: { current: initValue }, next: null };
    workInProgressHook = workInProgressHook.next;
  }

  return workInProgressHook.memoizedState;
}

const Counter = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);

  useEffect(() => {
    console.log('count', count);
  }, [count]);
  useEffect(() => {
    console.log('count2', count2);
  }, [count2]);

  return (
    <div id="test">
      <h4>{count}</h4>
      <button onClick={() => setCount(count + 1)}>+++</button>
      <button onClick={() => setCount(count - 1)}>---</button>
      <h4>{count2}</h4>
      <button onClick={() => setCount2(count2 + 1)}>+++</button>
      <button onClick={() => setCount2(count2 - 1)}>---</button>
    </div>
  );
};

function render() {
  // 每次重新渲染的时候，都将 workInProgressHook 指向 firstWorkInProgressHook
  workInProgressHook = firstWorkInProgressHook;
  ReactDOM.render(<Counter />, document.getElementById('root'));
}
render();
```
