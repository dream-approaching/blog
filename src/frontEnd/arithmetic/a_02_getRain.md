---
title: 算法题：接雨水
group:
  title: 算法
---

## 接雨水

### 1. 问题描述

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

- 示例 1：
  > 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]  
  > 输出：6  
  > 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。  
  > ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20230207100102.png)
- 示例 2：
  > 输入：height = [4,2,0,3,2,5]  
  > 输出：9

### 2. 解题思路

- 先计算每个位置能装多少水，然后求和。
- 每个位置能装的水，取决于左右两边最高的柱子中较矮的那个柱子，减去当前柱子的高度。
- 假设左边最高的柱子高度为 `leftMax`，右边最高的柱子高度为 `rightMax`，当前柱子高度为 `height[i]`，则当前柱子能装的水为 `Math.min(leftMax, rightMax) - height[i]`。

### 3. 代码实现

#### 3.1 暴力法，双重循环

```js
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
```

#### 3.2 动态规划，边遍历边计算

```js
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
```

#### 3.3 双指针，单次遍历

```js
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
