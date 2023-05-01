---
title: 算法题：在排序数组中查找元素的第一个和最后一个位置
group:
  title: 算法
---

## 在排序数组中查找元素的第一个和最后一个位置

### 1. 问题描述

给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回  [-1, -1]。

你必须设计并实现时间复杂度为  O(log n)  的算法解决此问题。

### 2. 解题思路

- 二分查找: 先找到一个目标值，然后向左右两边扩散，找到左右边界。
- 双指针: 分别从左右两边开始，向中间靠拢，找到左右边界。

### 3. 代码实现

```js
/**
 * 二分查找
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid = 0;
  let res = [-1, -1];

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      let i = mid;
      let j = mid;
      while (nums[i] === target) {
        i--;
      }
      while (nums[j] === target) {
        j++;
      }
      res = [i + 1, j - 1];
      break;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return res;
};

/**
 * 双指针
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let res = [-1, -1];

  while (left <= right) {
    if (nums[left] === target && nums[right] === target) {
      res = [left, right];
      break;
    }
    if (nums[left] !== target) {
      left++;
    }
    if (nums[right] !== target) {
      right--;
    }
  }

  return res;
};
```
