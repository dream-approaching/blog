---
title: 算法题：最大子数组和
group:
  title: 算法
---

## 最大子数组和

### 1. 问题描述

给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组 是数组中的一个连续部分。

示例 1：  
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]  
输出：6  
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

示例 2：  
输入：nums = [1]  
输出：1

示例 3：  
输入：nums = [5,4,-1,7,8]  
输出：23

### 2. 解题思路

- 动态规划: dp[i] 表示在长度为 i 的数组中的最大值  
  dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])  
  时间复杂度：O(n)  
  空间复杂度：O(n)

### 3. 代码实现

#### 3.1. 方式 1 - 动态规划

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 1) {
    return nums;
  }

  // dp[i] 表示在长度为i的数组中的最大值
  const dp = [];

  dp[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }

  return Math.max(...dp);
};

maxSubArray([2, 1, -2, 3]);
```

#### 3.2. 方式 2 - 暴力法

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 1) {
    return nums;
  }

  let sumArr = [];

  for (let i = 0; i < nums.length; i++) {
    let j = i + 1;
    let currentSum = [nums[i]];
    while (j < nums.length) {
      const total = currentSum[currentSum.length - 1] + nums[j];
      currentSum.push(total);
      j++;
    }
    sumArr.push(Math.max(...currentSum));
  }
  const max = Math.max(...sumArr);
  return max;
};

maxSubArray([2, 1, -2, 3]);
```
