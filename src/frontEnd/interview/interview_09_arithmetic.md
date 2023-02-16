---
title: 算法
group:
  title: Interview
---

## 算法

### 1、接雨水

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

- 示例 1：
  > 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]  
  > 输出：6  
  > 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。  
  > ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20230207100102.png)
- 示例 2：
  > 输入：height = [4,2,0,3,2,5]  
  > 输出：9

#### 思路

- 先计算每个位置能装多少水，然后求和。
- 每个位置能装的水，取决于左右两边最高的柱子中较矮的那个柱子，减去当前柱子的高度。
- 假设左边最高的柱子高度为 `leftMax`，右边最高的柱子高度为 `rightMax`，当前柱子高度为 `height[i]`，则当前柱子能装的水为 `Math.min(leftMax, rightMax) - height[i]`。

#### 代码

```js
/**
 * 1. 暴力法
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  // 数组长度小于3，不可能有水
  if (height.length < 3) return 0;
  let sum = 0;
  for (let currentIndex = 1; currentIndex < height.length - 1; currentIndex++) {
    let leftMax = 0;
    let rightMax = 0;

    // 从当前位置向左遍历，找出左边最高的柱子
    for (let leftPartIndex = currentIndex; leftPartIndex >= 0; leftPartIndex--) {
      leftMax = Math.max(leftMax, height[leftPartIndex]);
    }

    // 从当前位置向右遍历，找出右边最高的柱子
    for (let rightPartIndex = currentIndex; rightPartIndex < height.length; rightPartIndex++) {
      rightMax = Math.max(rightMax, height[rightPartIndex]);
    }

    sum += Math.min(leftMax, rightMax) - height[currentIndex];
  }
  return sum;
};

/**
 * 2. 动态规划
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  // 数组长度小于3，不可能有水
  if (height.length < 3) return 0;
  let sum = 0;
  let leftMax = new Array(height.length).fill(0);
  let rightMax = new Array(height.length).fill(0);

  // 计算每个位置左边最高的柱子
  leftMax[0] = height[0];
  for (let i = 1; i < height.length; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // 计算每个位置右边最高的柱子
  rightMax[height.length - 1] = height[height.length - 1];
  for (let i = height.length - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // 计算每个位置能装多少水
  for (let i = 1; i < height.length - 1; i++) {
    sum += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return sum;
};

/**
 * 3. 双指针
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  // 数组长度小于3，不可能有水
  if (height.length < 3) return 0;
  let sum = 0;
  let leftMax = height[0]; // 左边最高柱子的高度
  let rightMax = height[height.length - 1]; // 右边最高柱子的高度

  let leftIndex = 0; // 左指针
  let rightIndex = height.length - 1; // 右指针

  while (leftIndex < rightIndex) {
    // 判断哪边的柱子较矮，就计算哪边的水
    if (leftMax < rightMax) {
      // 左边的柱子矮，能装的水取决于左边最高柱子的高度，减去当前柱子的高度
      sum += leftMax - height[leftIndex];
      // 左指针右移
      leftIndex++;
      // 更新左边最高柱子的高度
      leftMax = Math.max(leftMax, height[leftIndex]);
    } else {
      // 右边的柱子矮，能装的水取决于右边最高柱子的高度，减去当前柱子的高度
      sum += rightMax - height[rightIndex];
      // 右指针左移
      rightIndex--;
      // 更新右边最高柱子的高度
      rightMax = Math.max(rightMax, height[rightIndex]);
    }
  }

  return sum;
};
```

### 2、背包问题

给你一个可装载重量为 W 的背包和 N 个物品，每个物品有重量和价值两个属性。其中第 i 个物品的重量为 wt[i]，价值为 val[i]，现在让你用这个背包装物品，最多能装的价值是多少？

举个简单的例子，输入如下：

```js
(N = 3), (W = 4);
wt = [2, 1, 3];
val = [4, 2, 3];

// 输出 6，选择前两件物品装进背包，总重量 3 小于 W，可以获得最大价值 6。
```

#### 1、排序逐个放入背包

```js
/**
 * 排序逐个放入背包
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n)
 * @param {number} N 物品数量
 * @param {number} W 背包容量
 * @param {number[]} wt 物品重量list
 * @param {number[]} val 物品价值list
 * @return {number}
 */
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

knapsack(3, 4, [2, 1, 3], [4, 2, 3]); // 6
knapsack(4, 4, [2, 1, 3, 1], [4, 2, 3, 3]); // 9
knapsack(4, 6, [2, 1, 3, 1], [4, 2, 3, 3]); // 10
knapsack(5, 7, [2, 1, 3, 1, 1], [4, 2, 3, 3, 2]); // 12
knapsack(5, 7, [8, 8, 8, 8, 8], [4, 2, 3, 3, 2]); // 0
```