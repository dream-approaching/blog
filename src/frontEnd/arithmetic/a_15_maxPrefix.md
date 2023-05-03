---
title: 算法题：最长公共前缀
group:
  title: 算法
---

## 最长公共前缀

### 1. 问题描述

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1：  
输入：strs = ["flower","flow","flight"]  
输出："fl"

示例 2：  
输入：strs = ["dog","racecar","car"]  
输出："" 解释：输入不存在公共前缀。

### 2. 解题思路

### 3. 代码实现

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 1) {
    return strs[0];
  }

  if (strs.includes('')) {
    return '';
  }

  const minLen = strs.sort((a, b) => a.length - b.length)[0].length;
  // console.log('minLen', minLen)
  let right = 1;
  let str = '';

  while (right <= minLen) {
    str = strs[0].slice(0, right);
    for (let i = 0; i < strs.length; i++) {
      if (!strs[i].startsWith(str)) {
        str = strs[0].slice(0, right - 1);
        console.log('str', str);
        return str;
      }
    }
    right++;
  }

  return str;
};

// longestCommonPrefix(["flo", "flo", "flo"])
```
