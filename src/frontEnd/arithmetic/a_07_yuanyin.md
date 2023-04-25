---
title: 算法题：最长的指定瑕疵度的元音子串
group:
  title: 算法
---

## 最长的指定瑕疵度的元音子串

### 1. 问题描述

开头和结尾都是元音字母（aeiouAEIOU）的字符串为元音字符串，其中混杂的非元音字母数量为其瑕疵度。比如: · “a” 、 “aa”是元音字符串，其瑕疵度都为 0 · “aiur”不是元音字符串（结尾不是元音字符） · “abira”是元音字符串，其瑕疵度为 2 给定一个字符串，请找出指定瑕疵度的最长元音字符子串，并输出其长度，如果找不到满足条件的元音字符子串，输出 0。子串：字符串中任意个连续的字符组成的子序列称为该字符串的子串。

输入描述：首行输入是一个整数，表示预期的瑕疵度 flaw，取值范围[0, 65535]。接下来一行是一个仅由字符 a-z 和 A-Z 组成的字符串，字符串长度(0, 65535]。输出描述：输出为一个整数，代表满足条件的元音字符子串的长度。

示例 1：输入 0 asdbuiodevauufgh 输出 3 说明满足条件的最长元音字符子串有两个，分别为 uio 和 auu，长度为 3。

示例 2 输入 2 aeueo 输出 0 说明没有满足条件的元音字符子串，输出 0

示例 3 输入 1 aabeobuu 输出 5 说明满足条件的最长元音字符子串有两个，分别为 aabee 和 eebuu，长度为 5

### 2. 解题思路

### 3. 代码实现

#### 3.1. 滑动窗口

```js
/**
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * @param {number} flaw 瑕疵度
 * @param {string} str 字符串
 * @return {number} 最长的指定瑕疵度的元音子串
 */

function isVowel(char) {
  return 'aeiouAEIOU'.includes(char);
}

var longestVowelSubstring = function (flaw, str) {
  let left = 0;
  let right = 0;
  let max = 0; // 最大长度
  let count = 0; // 瑕疵度

  for (left = 0; left < str.length; left++) {
    while (right < str.length) {
      // 如果前后都是元音字符，且瑕疵度等于指定的瑕疵度，那么就更新最大长度
      if (isVowel(str[left]) && isVowel(str[right]) && count === flaw) {
        // console.log('%c  str[right]:', 'color: #0e93e0;background: #aaefe5;', str[right]);
        max = Math.max(max, right - left + 1);
      }

      // 如果不是元音字符，那么瑕疵度+1
      if (!isVowel(str[right])) {
        count++;
      }

      console.log(
        '%c str[left] right str[right] count:',
        'color: #0e93e0;background: #aaefe5;',
        str[left],
        right,
        str[right],
        count,
      );
      // 如果瑕疵度大于指定的瑕疵度，那么就跳出循环
      if (count > flaw) {
        break;
      }

      //
      right++;
    }

    // 如果左边的字符不是元音字符，那么瑕疵度-1，因为左边的字符已经不在窗口中了，如：aabaa，当窗口为aba时，左边的a已经不在窗口中了，所以瑕疵度-1
    if (!isVowel(str[left])) {
      count--;
    }
  }

  return max;
};
```
