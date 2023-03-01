---
title: React
group:
  title: Interview
---

# React

## 1. React 有什么好处和坏处

- 好处
  - 组件化
  - 虚拟 dom
  - 单向数据流
  - 服务端渲染
- 坏处
  - 学习成本高
  - 体积大
  - 代码复杂

## 2. 了解虚拟 dom 吗？有什么优缺点

### 2.1. 什么是虚拟 dom

虚拟 dom 是用 js 对象来描述 dom 结构，通过 js 对象来描述 dom 结构，可以减少对 dom 的操作，从而提高性能

### 2.2. 为什么要使用虚拟 dom

- dom 操作是非常消耗性能的，因为 dom 操作会触发浏览器的重排和重绘
- 通过 js 对象来描述 dom 结构，可以减少对 dom 的操作，从而提高性能

### 2.3. 虚拟 dom 的优缺点

- 优点
  - 通过 js 对象来描述 dom 结构，可以减少对 dom 的操作，从而提高性能
  - 可以在 js 层面进行 diff，减少对 dom 的操作
- 缺点
  - 虚拟 dom 本身也是一个 js 对象，需要占用内存
  - 通过 js 对象来描述 dom 结构，需要进行一次转换，转换成真实的 dom 结构

## 3. React 为什么要使用 fiber

为了使 react 渲染的过程可以被中断，可以将控制权交还给浏览器，可以让位给高优先级的任务，等浏览器空闲后再次恢复渲染。对于计算量比较大的 js 计算或者 dom 计算，不会显得特别卡顿

### 3.1. generator 有类似的功能，为什么不用

- 使用 generator，需要将设计的所有代码包装成 generator \* 的形式，工作量大
- generator 很难在恢复执行的时候取到最新的状态

### 3.2. 如何判断当前是否有高优先级的任务

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

### 3.3. fiber 是如何实现的

- fiber 是一个链表，每个 fiber 节点都有一个 `child` 属性，指向第一个子节点，`sibling` 属性，指向下一个兄弟节点
- fiber 节点还有一个 `return` 属性，指向父节点
- fiber 节点还有一个 `alternate` 属性，指向上一次渲染的 fiber 节点

## 4. 用过高阶组件吗，什么是高阶组件，高阶组件能用来做什么

简称 HOC，是一个函数，接收一个组件作为参数，返回一个新的组件

### 4.1. 为什么要使用高阶组件(高阶组件能用来做什么)

- 代码复用，逻辑抽象
- 渲染劫持，劫持渲染逻辑，注入新的 props
- 状态抽象和复用，将 state 抽象到高阶组件中，通过 props 传递给子组件

### 4.2. 高阶组件的缺点

- 会产生嵌套地狱，因为高阶组件是一个函数，所以可以嵌套使用
- 不容易理解，因为高阶组件是一个函数，所以不容易理解

## 5. 什么是 react hooks？原理？有什么优势？

### 5.1. 什么是 react hooks

react hooks 是一种新的组件写法，可以让你在不编写 class 的情况下使用 state 以及其他的 react 特性

> react hooks 的原理：通过链表的方式，将每个组件的状态保存在链表中，每次组件更新的时候，从链表中取出对应的状态，更新状态，然后将新的状态保存到链表中

> 链表是什么：链表是一种数据结构，是一种线性表，但是并不会按线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)

### 5.2. 有什么优势

- class 的缺点
  - 组件间的逻辑复用难
  - 复杂组件变得难以理解
  - this 的指向问题，非箭头函数的情况下，需要手动绑定 this
- hooks 的优点
  - 逻辑复用更加简单
  - 组件变得更加简单
  - 不需要手动绑定 this

### 5.3. hooks 的注意事项

- 只能在函数组件和自定义 hooks 中使用
- 只能在函数的最外层调用 hooks，不要在循环，条件判断或者子函数中调用

## 6. 说一下 react 的 diff 算法，和 fiber 有什么关系

通过 diff 算法，可以减少不必要的 dom 操作，提高性能。

react 使用 virtual dom，将真实 dom 转换成虚拟 dom，然后通过 diff 算法，比较新旧虚拟 dom 的差异，然后将差异更新到真实 dom 上。 react16 之前，diff 算法是同步的，会阻塞主线程，导致页面卡顿。react16 之后，引入了 fiber，将 diff 算法拆分成一个个的任务，每个任务执行完之后，会将控制权交给浏览器，这样就不会阻塞主线程，页面不会卡顿。

## 7. key 的作用是什么? 为什么不能用 Index？用了会怎样? 如果不加 key 会怎样?

- key 的作用是给每个节点做标记，方便 diff 算法比较新旧节点的差异
- 不能用 index，因为 index 可能会发生变化，比如删除了某个节点，那么后面的节点的 index 都会发生变化
- 如果不加 key，会导致性能问题，因为 diff 算法会认为所有的节点都发生了变化，会重新渲染所有的节点

## 8. setState 是同步还是异步

在 React 中，setState 通常是异步更新组件状态的，但在一些情况下也可以是同步的。

React 在执行 setState 时，会将新的状态合并到组件的状态对象中，然后触发一次组件的重新渲染。由于 React 在同一周期内可能会进行多次 setState 操作，为了提高性能，React 会将多次的 setState 操作合并为一次。这种合并会在更新周期结束之前完成，因此在某些情况下 setState 不是立即执行的，而是在未来某个时间点执行。

**this.setState 同步的场景**

- 在 setTimeout、setInterval 或事件处理函数中调用 setState，React 也会立即执行 setState，因为这些代码块不是 React 的更新周期的一部分。
- 有一些生命周期函数是同步的，如 componentDidMount、componentWillUnmount，这些函数在组件挂载或卸载时只会被调用一次，不需要等待批量更新，所以在这些生命周期函数中调用 setState 会立即更新组件的状态
- 在 React 17 中，setState 也支持同步更新，但需要使用新的批量更新机制，即使用 ReactDOM.unstable_batchedUpdates 包装 setState 的调用。

## 9. react 的事件机制

react 事件机制和原生事件机制不一样，react 事件机制是事件委托的，事件会冒泡到 document 上，然后在 document 上统一处理。

## 10. react 的生命周期

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

## 11. react 的性能优化

- 减少不必要的渲染
  - shouldComponentUpdate
  - PureComponent
  - React.memo
- 减少不必要的 dom 操作
  - 使用 key
  - 使用 react-virtualized
- 减少不必要的计算
  - useMemo: 是一个 hook，可以缓存计算结果
  - useCallback: 是一个 hook，可以缓存函数
  - React.memo: 是一个高阶组件，可以缓存组件的渲染结果
- 减少不必要的网络请求
  - 使用 react-lazy
  - 使用 react-cache

## 12. useMemo 和 useCallback 的区别

- useMemo 用于缓存计算结果，useCallback 用于缓存函数
- useMemo 会在依赖项发生变化时重新计算，useCallback 会在依赖项发生变化时重新创建函数
- useMemo 会返回一个值，useCallback 会返回一个函数

## 13. React setState 之后发生了什么？

- 调用 setState 之后，React 会判断是否处于批量更新模式，如果是，会将 setState 的操作放到一个队列中，等待批量更新
- 然后 React 会调用 render 方法，生成新的虚拟 dom，然后和旧的虚拟 dom 进行 diff 操作，得到差异
- 然后 React 会调用 commitRoot 方法，将差异更新到真实 dom 上
- 最后 React 会调用 useEffect、useLayoutEffect、componentDidMount、componentDidUpdate 等生命周期函数

## 14. hooks 中的 setState 和 class 组件中的 setState 有什么区别？

- class 组件中的 setState，会将新的状态和旧的状态进行合并，然后触发一次组件的重新渲染
- hooks 中的 setState，会直接替换掉旧的状态，然后触发一次组件的重新渲染，如果是数组，会直接替换掉旧的数组，所以不能直接修改数组的某一项，而是需要先复制一份，然后修改复制的数组，最后再调用 setState

## 15. 手写 useState、useEffect、useRef

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

## 16. react 中 key 的作用是什么

在 react 中，key 的作用是为了提高列表渲染的性能。key 标识每个元素，当元素发生变化时，react 会根据 key 来判断元素是否发生了变化，如果 key 没有发生变化，react 会复用元素，如果 key 发生了变化，react 会销毁旧的元素，创建新的元素。

## 17. useRef 能作为依赖项吗

useRef 不能作为依赖项，因为 useRef 返回的 ref 对象在每次渲染时都会保持一致，即使在父组件重新渲染时，useRef 返回的 ref 对象也不会发生变化。

依赖项应该是组件中可能会导致重新渲染的状态变量、props、函数等等。如果使用 useRef 作为依赖项，React 将无法检测到变化并触发重新渲染，这可能会导致意外的行为。

## 18. redux

### 18.1. redux 的工作流程

- 创建 store
- 创建 reducer
- 创建 action
- 创建 action creator
- 创建 store
- store.dispatch(action)
- reducer 接收到 action，返回新的 state
- store 保存新的 state
- store.getState() 获取新的 state

### 18.2. redux 的中间件

- redux-saga
  - dispatch 一个简单对象，利用 generator 的思想处理异步
  - 优点: 异步控制清晰，并发处理方便
  - 缺点: 代码书写较多，上手较慢
- redux-thunk
  - 在 UI 组件中触发任务，dispatch 一个 action 生成函数，在这个函数中处理异步
  - 优点: 简单
  - 缺点: action 变得复杂，后期可维护性降低, 协调并发任务比较困难

### 18.3. redux 的原理

原理是利用发布订阅模式，将 store 和组件进行关联，当 store 中的 state 发生变化时，会通知所有的组件，组件会重新渲染。

- createStore
  - 接收 reducer 作为参数，返回一个 store
  - store 有 getState、dispatch、subscribe 三个方法
  - store 有一个 state 属性，用来保存当前的状态
  - store 有一个 listeners 数组，用来保存所有的监听函数
  - store.dispatch(action) 会触发 reducer，reducer 接收到 action，返回新的 state，store 保存新的 state，然后遍历 listeners 数组，依次执行监听函数
  - store.subscribe(listener) 会将 listener 添加到 listeners 数组中
- combineReducers
  - 接收 reducers 作为参数，返回一个 reducer
  - reducer 接收到 action，会遍历 reducers，依次执行每个 reducer，每个 reducer 接收到 action，返回新的 state，然后将新的 state 保存到一个对象中，最后返回这个对象
- applyMiddleware
  - 接收 middlewares 作为参数，返回一个函数
  - 这个函数接收 createStore 作为参数，返回一个新的 createStore
  - 这个新的 createStore 接收 reducer 作为参数，返回一个 store
  - store 有 getState、dispatch、subscribe 三个方法
  - store 有一个 state 属性，用来保存当前的状态
  - store 有一个 listeners 数组，用来保存所有的监听函数
  - store.dispatch(action) 会遍历 middlewares，依次执行每个 middleware，每个 middleware 接收到 store 和 next 作为参数，返回一个函数，这个函数接收 action 作为参数，执行这个函数，会触发 reducer，reducer 接收到 action，返回新的 state，store 保存新的 state，然后遍历 listeners 数组，依次执行监听函数
  - store.subscribe(listener) 会将 listener 添加到 listeners 数组中

### 18.4. redux 数据流的走向

![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20200915175323.png)

- 用户发出 Action: store.dispatch(action);
- Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action
- Reducer 会返回新的 State
- State 一旦有变化，Store 就会调用监听函数
- listener 可以通过 store.getState()得到当前状态，触发重新渲染 View

### 18.5. redux 和 mobx 的区别

- redux
  - 单一 store
  - 状态对象不可变
  - 优点：后期易维护
  - 缺点：繁琐、识点较多，上手相对较难
- mobx
  - 多个 store
  - 可直接修改对象
  - 优点：流程相对简单
  - 缺点：过于自由，后期不易维护

## 19. dva 是什么

dva 是基于 redux 和 redux-saga 的数据流方案，dva 封装了 redux 和 redux-saga，让我们可以更加方便的使用 redux 和 redux-saga。

### 19.1. dva 的工作流程

- 创建 model
- 创建 action
- 创建 action creator
- 创建 store
- store.dispatch(action)
- reducer 接收到 action，返回新的 state
- store 保存新的 state
- store.getState() 获取新的 state

### 19.2. dva 的原理

dva 的原理是利用 redux 和 redux-saga，将 store 和组件进行关联，当 store 中的 state 发生变化时，会通知所有的组件，组件会重新渲染。

### 19.3. dva 的优缺点

- 优点
  - 代码简洁
  - 逻辑清晰
  - 便于维护
- 缺点
  - 依赖 redux 和 redux-saga，学习成本较高
  - 依赖 redux 和 redux-saga，后期不易维护

## 20. react-redux

### 20.1. react-redux 和 redux 的关系

react-redux 是 redux 的官方绑定库，用来简化 redux 在 react 中的使用。

### 20.2. react-redux 中常用的 API

- Provider
  - 作用：用来提供 store
  - 使用：在根组件中使用
- connect
  - 作用：用来连接组件和 store
  - 使用：在组件中使用
- useSelector

  - 作用：用来获取 store 中的 state
  - 使用：在组件中使用

### 20.3. react-redux connect 的原理是什么

connect 是一个高阶组件，它接收一个组件作为参数，返回一个新的组件。新的组件会将 store 中的 state 作为 props 传递给原组件。

- connect 之所以会成功，是因为 Provider 组件
  - 在原应用组件上包裹一层，使原来整个应用成为 Provider 的子组件
  - 接收 Redux 的 store 作为 props，通过 context 对象传递给子孙组件上的 connect

## 21. react-router

### 21.1. react-router 和 react-router-dom 的区别

react-router 是 react-router-dom 的基础库，react-router-dom 是 react-router 的扩展库，react-router-dom 中包含了 react-router 中的所有 API，react-router-dom 中还包含了一些浏览器相关的 API。

### 21.2. react-router 的原理

react-router 是一个单页应用的路由库，它的原理是根据 url 的变化，渲染不同的组件。

### 21.3. hash 模式 和 history 模式的区别

- hash 模式
  - url 中有一个 #，# 后面的内容称为 hash
  - hash 模式的原理是监听 hashchange 事件，当 hash 发生变化时，重新渲染组件
  - hash 模式的优点是兼容性好，不需要后端配置
  - hash 模式的缺点是 url 中有 #，不美观
- history 模式
  - url 中没有 #，# 后面的内容称为 hash
  - history 模式的原理是监听 popstate 事件，当 url 发生变化时，重新渲染组件
  - history 模式的优点是 url 美观，不需要 #，不需要后端配置
  - history 模式的缺点是兼容性不好，需要后端配置
