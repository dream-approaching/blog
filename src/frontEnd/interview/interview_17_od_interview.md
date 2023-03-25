---
title: OD面试
group:
  title: Interview
---

## 技术一面：四则计算

计算简单四则运算，输入为一个四则运算的字符串，输出字符串的计算结果。

不考虑除法

如：输入 1+2\*3 输出 7

如：输入 2+1*2*3+22 输出 30

思路：采用栈的思想，遇到数字就入栈，遇到运算符就出栈，然后计算，最后把结果入栈。

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

## 技术二面：硬币找零

只有 3 种硬币 1 分、2 分、3 分，给定一个数 n，求组成 n 分钱的组合数。

```js
/**
 * 背包算法
 * @param {number} n
 * @return {number}
 */
function coin(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= 3; i++) {
    for (let j = i; j <= n; j++) {
      dp[j] += dp[j - i];
    }
  }

  console.log('%c zjs dp:', 'color: #fff;background: #b457ff;', dp);
  return dp[n];
}
```

## 主管面试
