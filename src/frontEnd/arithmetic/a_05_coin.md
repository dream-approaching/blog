---
title: 算法题：用最少的硬币付款
group:
  title: 算法
---

## 用最少的硬币付款

### 1. 问题描述

> 有 1 元、2 元、5 元、10 元、20 元、50 元、100 元的硬币若干枚，现在要用这些硬币支付 K 元，最少需要多少枚硬币？

### 2. 解题思路

### 3. 代码实现

#### 3.1. 贪心算法

```js
/**
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * @param {number} k 金额
 * @return {number} 硬币数量
 */
var coinChange = function (k) {
  let count = 0;
  let arr = [100, 50, 20, 10, 5, 2, 1];
  for (let i = 0; i < arr.length; i++) {
    // 如果剩余金额大于当前面值
    if (k >= arr[i]) {
      // 计算当前面值的硬币数量
      count += Math.floor(k / arr[i]);
      // 计算剩余金额
      k = k % arr[i];
    }
  }
  return count;
};

coinChange(1); // 1
coinChange(3); // 2
coinChange(27); // 3
coinChange(47); // 3
```

#### 3.2. 动态规划

思路：

- 双重循环，外层循环金额，内层循环面值。
- 当金额大于等于当前面值时，计算当前面值的硬币数量，然后计算剩余金额。
- 当金额小于当前面值时，跳过当前面值。
- 当金额为 0 时，结束循环。
- 最后返回 dp[amount]。
- coins[j]表示面值
- dp[i]表示金额为 i 时，最少需要的硬币数量。
- i - coins[j]表示剩余未计算的金额。
- dp[i - coins[j]]表示剩余未计算的金额，最少需要的硬币数量。
- dp[i - coins[j]] + 1 表示当前金额，最少需要的硬币数量，1 表示当前面值的硬币数量。

```js
/**
 * 硬币找零
 * 时间复杂度：O(nm)
 * 空间复杂度：O(nm)
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // dp[i]表示金额为i时，最少需要的硬币数量
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  // i表示金额
  for (let i = 1; i <= amount; i++) {
    // j表示面值的索引,coins[j]表示面值
    for (let j = 0; j < coins.length; j++) {
      // 如果当前金额小于当前面值，跳过
      if (i - coins[j] < 0) {
        continue;
      }
      // 取当前金额的最小硬币数量
      dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

coinChange([4, 3, 1], 6); // 2
```
