---
title: 算法题：背包问题
group:
  title: 算法
---

## 背包问题

### 1. 问题描述

给你一个可装载重量为 W 的背包和 N 个物品，每个物品有重量和价值两个属性。其中第 i 个物品的重量为 wt[i]，价值为 val[i]，现在让你用这个背包装物品，最多能装的价值是多少？

举个简单的例子，输入如下：

```js
(N = 3), (W = 4);
wt = [2, 1, 3];
val = [4, 2, 3];

// 输出 6，选择前两件物品装进背包，总重量 3 小于 W，可以获得最大价值 6。
```

### 2. 解题思路

### 3. 代码实现

#### 3.1. 动态规划，二维数组

```js
var knapsack = function (n, w, weights, values) {
  // dp[i][j] 表示前 i 个物品中能够装入容量为 j 的背包中的最大价值
  let dp = new Array(n + 1).fill(0).map(() => new Array(w + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= w; j++) {
      if (j - weights[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][w];
};
```

#### 3.2. 贪心算法, 优先装价值高的物品

```js
var knapsack = function (N, W, wt, val) {
  // 按价值从大到小排序
  let list = [];
  for (let i = 0; i < N; i++) {
    list.push({ wt: wt[i], val: val[i] });
  }
  list.sort((a, b) => b.val - a.val);

  // 第一个物品重量大于背包容量，直接返回0
  if (list[0].wt > W) {
    return 0;
  } else {
    // 逐个放进背包，判断是否超重
    let wtSum = 0;
    let valSum = 0;
    for (let i = 0; i < N; i++) {
      if (wtSum + list[i].wt <= W) {
        wtSum += list[i].wt;
        valSum += list[i].val;
      }
    }
    return valSum;
  }
};
```
