---
title: 捕获冒泡
group:
  title: Interview
  order: 1
---

# 捕获冒泡

## 1. 基本概念

> - 捕获：自顶向下
> - 冒泡：自底向上

## 2. window.addEventListener 监听的是什么阶段的事件？

```js
window.addEventListener('click', => {}, Boolean)
```

第三个参数默认是 `false`, 表示冒泡阶段，传 `true` 表示捕获阶段

## 3. 平时有哪些场景会用到这个机制

- 事件委托

  ```html
  <ul id="ul">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>

  <script>
    // 普通事件
    const liList = document.getElementsByTagName('li');

    for (let i = 0; i < liList.length; i++) {
      liList[i].addEventListener('click', (e) => {
        alert(`内容为${e.target.innerHTML}, 索引为${i}`);
      });
    }

    //  事件委托
    const ul = document.querySelector('ul');
    ul?.addEventListener('click', function (e) {
      // 判断是否li元素
      if (e.target.tagName.toLowerCase() === 'li') {
        const liList = this.querySelectorAll('li');
        // 注意此处不能直接调用indexOf
        const index = Array.prototype.indexOf.call(liList, e.target);
        alert(`内容为${e.target.innerHTML}, 索引为${index}`);
      }
    });
  </script>
  ```

## 场景题

- 一个历史页面上，有若干按钮的点击逻辑，每个按钮都有自己的 click 事件
- 请实现新需求，每一个访问页面的用户上多了 banned 属性，表示该用户是否被封禁，如被封禁，则不执行原来逻辑，直接 alert: 你被封禁了

  > - 方式 1: 每个 click 事件中处理
  > - 方式 2: 给整个页面放一个透明遮罩
  > - 方式 3: 在最顶层去监听捕获的阶段，如果被封禁则拦截掉

  ```js
  window.addEventListener(
    'click',
    (e) => {
      if (banned === true) {
        e.stopPropagation();
      }
    },
    true,
  );
  ```
