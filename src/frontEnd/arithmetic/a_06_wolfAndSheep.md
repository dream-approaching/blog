---
title: 算法题：狼养过河
group:
  title: 算法
---

## 狼养过河

### 1. 问题描述

一只农夫带着 m 只羊和 n 只狼过河，农夫有一条可载 x 只狼/羊的船。农夫在时，或者羊的数量大于狼时，狼不会攻击羊；农夫在不损失羊的情况下，运输几次可以完成运输？(返程不计入次数)

输入描述：

输入为一行，包含三个整数 m,n,x，用空格分隔，m 为羊的数量，n 为狼的数量，x 为可载狼和羊的数量。

输出描述：

输出为一行，包含一个整数，表示最少运输次数。

示例 1

输入： 5 3 3  
输出： 3  
说明：第一次 2 只狼，第二次 3 只羊，第三次 1 只狼 2 只羊

### 2. 解题思路

if(农夫在) { 狼不会攻击羊 } else { if (羊 > 狼) { 狼不会攻击羊 } else { 狼会攻击羊 } }

### 3. 代码实现

#### 3.1. 贪心算法

```js
// 递归运输
wolfAndSheep(allSheep, allWolf);

var n = -1; // 初始状态为负数，表示还没开始读取
var ans = 0; // 表示需要运输的次数，初始为0
var map = new Map(); // 用于保存已经运输过的狼和羊的数量

function wolfAndSheep(sheep, wolf) {
  // 如果狼和羊的数量都为0，说明已经运输完了，输出运输次数
  if (sheep <= 0 && wolf <= 0) {
    console.log(ans);
  } else {
    // 如果狼和羊的数量都不为0，说明还没有运输完，需要运输
    ans++;

    // 如果狼的数量大于羊的数量，说明狼会攻击羊
    if (wolf > sheep) {
      // 如果狼的数量大于可载狼和羊的数量，说明狼的数量会减少
      if (wolf > maxCount) {
        wolf -= maxCount;
      } else {
        // 有剩余的空位，就把剩余的空位给羊
        sheep -= Math.max(maxCount - wolf, 0);
        // 如果狼的数量小于可载狼和羊的数量，说明狼的数量会变为0
        wolf = 0;
      }
    } else {
      // 如果狼的数量小于羊的数量，说明狼不会攻击羊
      // 如果羊的数量大于可载狼和羊的数量，说明羊的数量会减少
      if (sheep > maxCount) {
        sheep -= maxCount;
      } else {
        // 有剩余的空位，就把剩余的空位给狼
        wolf -= Math.max(maxCount - sheep, 0);
        // 如果羊的数量小于可载狼和羊的数量，说明羊的数量会变为0
        sheep = 0;
      }
    }

    // 如果已经运输过的狼和羊的数量中已经存在这个数量，说明已经运输过了，直接输出0
    if (map.has(sheep + '-' + wolf)) {
      return 0;
    } else {
      // 如果不存在，就保存这个数量
      map.set(sheep + '-' + wolf, true);
    }

    // 递归运输
    return wolfAndSheep(sheep, wolf);
  }
}
```
