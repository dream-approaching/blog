---
title: leetCode Hot 100
group:
  title: Interview
---

# leetCode Hot 100

## 1. 两数之和

> 难度：简单  
> https://leetcode.cn/problems/two-sum/

给定一个整数数组 nums  和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那   两个   整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

实例 1：输入：nums = [2,7,11,15], target = 9 输出：[0,1] 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

```js
/**
 * 暴力法
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 */
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};

/**
 * 哈希表
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  // 用于存储数组中的值和索引
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    // 计算差值
    let complement = target - nums[i];
    if (map.has(complement)) {
      // 如果差值存在于哈希表中，说明找到了两个数
      return [map.get(complement), i];
    }
    // 如果差值不存在于哈希表中，将当前值和索引存入哈希表
    console.log('%c zjs map:', 'color: #fff;background: #b457ff;', map);
    map.set(nums[i], i);
  }
  return [];
};
```

## 2. 最长回文子串

> 难度：中等  
> https://leetcode-cn.com/problems/longest-palindromic-substring/

给你一个字符串 s，找到 s 中最长的回文子串。

如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

示例 1：

输入：s = "babad" 输出："bab" 解释："aba" 同样是符合题意的答案。

示例 2：

输入：s = "cbbd" 输出："bb"

```js
/**
 * 暴力法
 * 时间复杂度：O(n^3)
 * 空间复杂度：O(1)
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let res = '';

  // 从长到短遍历子串
  for (i = 0; i < s.length; i++) {
    for (j = s.length - 1; j >= i; j--) {
      // 判断子串是否是回文串
      if (s[i] === s[j]) {
        // 判断子串是否是回文串
        let str = s.slice(i, j + 1);

        // 如果子串长度小于等于当前最长回文串的长度，直接跳出循环
        if (str.length <= res.length) {
          break;
        }

        if (str === str.split('').reverse().join('')) {
          res = str;
        }
      }
    }
  }

  return res;
};

/**
 * 动态规划
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n^2)
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let n = s.length;
  let res = '';
  // dp[i][j] 表示 s[i..j] 是否是回文串
  let dp = Array.from(new Array(n), () => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      // 状态转移方程
      dp[i][j] = s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1]);
      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.slice(i, j + 1);
      }
    }
  }
  return res;
};
```
