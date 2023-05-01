---
title: 算法题：单词拆分
group:
  title: 算法
---

## 单词拆分

### 1. 问题描述

给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。

示例 1：

输入: s = "leetcode", wordDict = ["leet", "code"] 输出: true  
解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。

示例 2：

输入: s = "applepenapple", wordDict = ["apple", "pen"]  
输出: true  
解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。    
注意，你可以重复使用字典中的单词。

示例 3：

输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]  
输出: false

### 2. 解题思路

```js
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  let flag = false;

  let possibleArr = new Set();
  for (let i = 0; i < wordDict.length; i++) {
    if (s.startsWith(wordDict[i])) {
      possibleArr.add(wordDict[i]);
    }
  }

  while (possibleArr.size > 0) {
    if (possibleArr.has(s)) {
      flag = true;
      break;
    }
    const possibleArrX = new Set();
    const mapArray = Array.from(possibleArr);
    for (let i = 0; i < mapArray.length; i++) {
      const leftStr = s.slice(mapArray[i].length);

      for (let j = 0; j < wordDict.length; j++) {
        if (leftStr.startsWith(wordDict[j])) {
          possibleArrX.add(`${mapArray[i]}${wordDict[j]}`);
        }
      }
    }
    possibleArr = possibleArrX;
  }

  // console.log('%c  flag:', 'color: #0e93e0;background: #aaefe5;', flag);
  return flag;
};

// wordBreak("ccbbbcb", ["bc", "cb"])
// wordBreak("applepenapple", ["apple", "pen"])
// wordBreak("cars", ["car", "ca", "rs"])
// wordBreak("leetcode", ["leet", "code"])
// wordBreak("aaa", ["a"])
// wordBreak("catsandogcat", ["cats", "dog", "sand", "and", "cat", "an"])
// wordBreak("aaaaaa", ["aa", "a"])
// wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])
// wordBreak("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", ["a", "aa", "aaa", "aaaa", "aaaaa", "aaaaaa", "aaaaaaa", "aaaaaaaa", "aaaaaaaaa", "aaaaaaaaaa"])
```
