---
title: 算法题：字符串相乘
group:
  title: 算法
---

## 字符串相乘

### 1. 问题描述

给定两个以字符串形式表示的非负整数  num1  和  num2，返回  num1  和  num2  的乘积，它们的乘积也表示为字符串形式。

注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。

### 2. 解题思路

#### 2.1. 模拟竖式乘法

模拟竖式乘法的过程，从右往左遍历乘数的每一位，将乘数的每一位与被乘数相乘，将每一步的结果进行累加。

### 3. 代码实现

```js
function multiply(num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0';
  }

  const m = num1.length;
  const n = num2.length;
  const pos = new Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    const x = +num1[i];
    for (let j = n - 1; j >= 0; j--) {
      const y = +num2[j];
      const product = x * y;
      const p1 = i + j,
        p2 = i + j + 1;
      const sum = product + pos[p2];

      pos[p1] += Math.floor(sum / 10);
      pos[p2] = sum % 10;
    }
  }

  let result = '';
  for (let i = 0; i < pos.length; i++) {
    if (pos[i] !== 0 || result !== '') {
      result += pos[i];
    }
  }
  return result === '' ? '0' : result;
}
```
