---
title: React Hook 简介
group:
  title: 外文翻译
---

> 原文：[Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)  
> 作者：React 官网

Hooks 是 React 16.8 的一个新特性。可以让你在不编写 class 的情况下使用 state 和其他 React 特性。

```js
import React, { useState } from 'react';

function Example() {
  // 声明一个state变量: count
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

函数 `useState` 是我们要学习的第一个 “Hook”，这个例子是简单演示。如果不理解也不用担心。

你可以在[下一节]()正式开始学习 Hook。 这一节，我们将会解释为什么会在 React 中加入 Hook，以及如何使用 Hook 写出更好的应用。

> 注意  
> React v16.8.0 是第一个支持 Hook 的版本。 升级时，请注意更新所有的 package，包括 React DOM。 React Native 从 0.59 版本开始支持 Hook。

### 视频介绍

在 React Conf 2018 上，Sophie Alpert 和 Dan Abramov 介绍了 Hook，紧接着 Ryan Florence 演示了如何使用 Hook 重构应用。点击下方图片查看视频：

[![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20200117162700.png)](https://www.youtube.com/watch?v=dpw9EHDh2bM&feature=youtu.be)

### 没有破坏性的改动

在继续学习之前，需要注意的是 Hooks 是：

- 完全可选的。你可以尝试在一些组件中使用 hooks 而不需要重写现有的代码。但是如果你现在不想学的话
- 100%向后兼容的。
- 现在可用。

没有计划从 React 中移除 class。你可以在本页的底部张杰读到更多关于 Hooks 的渐进策略。

Hooks 不会影响你对 React 概念的理解。相反，Hooks 为你已经知道的 React 概念(props, state, context, refs 还有生命周期)提供了一个更加直接的 Api。正如我们稍后将看到，Hooks 还提供了一种强大的方式来组合他们。

如果你只是想学 Hooks，尽管随意跳到下一节进行学习。
