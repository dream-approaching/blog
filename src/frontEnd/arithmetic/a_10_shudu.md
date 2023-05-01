---
title: 算法题：有效的数独
group:
  title: 算法
---

## 有效的数独

### 1. 问题描述

请你判断一个  9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。

数字  1-9  在每一行只能出现一次。数字  1-9  在每一列只能出现一次。数字  1-9  在每一个以粗实线分隔的  3x3  宫内只能出现一次。（请参考示例图）

注意：

一个有效的数独（部分已被填充）不一定是可解的。只需要根据以上规则，验证已经填入的数字是否有效即可。空白格用  '.'  表示。

### 2. 解题思路

### 3. 代码

#### 一次遍历

```js
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  let row = new Array(9).fill(0).map(() => new Array(9).fill(0));
  let col = new Array(9).fill(0).map(() => new Array(9).fill(0));
  let box = new Array(9).fill(0).map(() => new Array(9).fill(0));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // 1. 获取当前数字
      let num = board[i][j];

      // 2. 判断是否为数字
      if (num !== '.') {
        let n = num - 1;
        // 3. 获取当前数字所在的盒子
        let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

        // 4. 判断当前数字是否已经出现过
        row[i][n]++;
        col[j][n]++;
        box[boxIndex][n]++;

        if (row[i][n] > 1 || col[j][n] > 1 || box[boxIndex][n] > 1) {
          return false;
        }
      }
    }
  }
  console.log('%c  row:', 'color: #0e93e0;background: #aaefe5;', row);
  console.log('%c  col:', 'color: #0e93e0;background: #aaefe5;', col);
  console.log('%c  box:', 'color: #0e93e0;background: #aaefe5;', box);

  return true;
};
```

#### 三次遍历

```js
var isValidSudoku = function (board) {
  let flag = true;
  const colArr = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));
  const areaArr = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));
  // const colArr = []
  for (let i = 0; i < 9; i++) {
    let objRow = {};
    for (let j = 0; j < 9; j++) {
      // 把列转为二维数组
      colArr[i][j] = board[j][i];

      // 把每个小方块转为二维数组
      const index = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      const col = Math.floor(i % 3) * 3 + Math.floor(j % 3);
      // areaArr[index][col] = board[i][j];
      areaArr[i][j] = board[index][col];

      // 判断每一行是否有重复
      if (board[i][j] !== '.') {
        if (objRow[board[i][j]]) {
          flag = false;
          break;
        } else {
          objRow[board[i][j]] = true;
        }
      }
    }
  }

  // 判断每一列是否有重复
  for (let i = 0; i < 9; i++) {
    let objCol = {};
    for (let j = 0; j < 9; j++) {
      if (colArr[i][j] !== '.') {
        if (objCol[colArr[i][j]]) {
          flag = false;
          break;
        } else {
          objCol[colArr[i][j]] = true;
        }
      }
    }
  }

  // 判断每个小方块是否有重复
  for (let i = 0; i < 9; i++) {
    let objArea = {};
    for (let j = 0; j < 9; j++) {
      if (areaArr[i][j] !== '.') {
        if (objArea[areaArr[i][j]]) {
          flag = false;
          break;
        } else {
          objArea[areaArr[i][j]] = true;
        }
      }
    }
  }

  // console.log('colArr', colArr)
  console.log('areaArr', areaArr);
  return flag;
};
```
