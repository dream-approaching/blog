---
title: react
group:
  title: 基本知识
---

## Components

## 手写 useState

```jsx | pure
import ReactDOM from 'react-dom';
// import {useState} from 'react'

let workInProgressHook = {};
let firstWorkInProgressHook = { memoizedState: null, next: null };

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
    workInProgressHook = currentHook;
  }

  // 注意返回的是currentHook，而不是workInProgressHook
  return [currentHook.memoizedState, setState];
}

const Counter = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);
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
