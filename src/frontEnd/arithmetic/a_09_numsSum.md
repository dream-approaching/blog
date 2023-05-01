---
title: 算法题：三数之和
group:
  title: 算法
---

## 三数之和

### 1. 问题描述

给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

你返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

实例 1：

```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
```

实例 2：

```
输入：nums = []
输出：[]
```

### 2. 解题思路

#### 2.1. 暴力解法

三重循环，时间复杂度 O(n^3)。

#### 2.2. 双指针

先对数组进行排序，然后使用双指针，时间复杂度 O(n^2)。

### 3. 解题代码

#### 3.1. 暴力解法

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = [];
  const len = nums.length;
  for (let i = 0; i < len - 2; i++) {
    for (let j = i + 1; j < len - 1; j++) {
      for (let k = j + 1; k < len; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const arr = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          if (!result.some((item) => item.join('') === arr.join(''))) {
            result.push(arr);
          }
        }
      }
    }
  }
  return result;
};
```

#### 3.2. 双指针

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = [];
  const len = nums.length;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len - 2; i++) {
    if (nums[i] > 0) {
      break;
    }
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let left = i + 1;
    let right = len - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // 去重
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        // 去重
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }
        // 继续寻找
        left++;
        // 继续寻找
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
};
```
