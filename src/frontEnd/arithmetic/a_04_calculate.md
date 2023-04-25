---
title: 算法题：计算器
group:
  title: 算法
---

## 计算器

### 1. 问题描述

计算简单四则运算，输入为一个四则运算的字符串，输出字符串的计算结果。

不考虑除法

如：输入 1+2\*3 输出 7

如：输入 2+1*2*3+22 输出 30

### 2. 解题思路

采用栈的思想，遇到数字就入栈，遇到运算符就出栈，然后计算，最后把结果入栈。

### 3. 代码实现

```js
function calculate(str) {
  let stack = []; // 用于存储数字

  let num = 0;
  let sign = '+';
  for (let i = 0; i < str.length; i++) {
    // 是否是运算符
    const isSign = isNaN(str[i]);

    // 如果是数字，累加
    if (!isSign) {
      num = num * 10 + parseInt(str[i]); // 由于可能是多位数，所以需要累加
    }

    // 如果是运算符，或者是最后一个字符，就需要计算
    if (isSign || i === str.length - 1) {
      switch (sign) {
        case '+':
          stack.push(num);
          break;
        case '-':
          stack.push(-num);
          break;
        case '*':
          // 乘法优先级高，要先计算
          stack.push(stack.pop() * num);
          break;
      }
      // 重置
      num = 0;
      sign = str[i]; // 保存当前的运算符, 用于下一次计算
    }
  }

  let res = 0;

  while (stack.length) {
    res += stack.pop();
  }

  return res;
}
```
