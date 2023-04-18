---
title: 算法
group:
  title: Interview
---

### 3.2. 背包问题

给你一个可装载重量为 W 的背包和 N 个物品，每个物品有重量和价值两个属性。其中第 i 个物品的重量为 wt[i]，价值为 val[i]，现在让你用这个背包装物品，最多能装的价值是多少？

举个简单的例子，输入如下：

```js
(N = 3), (W = 4);
wt = [2, 1, 3];
val = [4, 2, 3];

// 输出 6，选择前两件物品装进背包，总重量 3 小于 W，可以获得最大价值 6。
```

#### 3.2.1. 贪心算法

```js
/**
 * 排序逐个放入背包
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n)
 * @param {number} N 物品数量
 * @param {number} W 背包容量
 * @param {number[]} wt 物品重量list
 * @param {number[]} val 物品价值list
 * @return {number}
 */
var knapsack = function (N, W, wt, val) {
  // 按价值从大到小排序
  let list = [];
  for (let i = 0; i < N; i++) {
    list.push({ wt: wt[i], val: val[i] });
  }
  list.sort((a, b) => b.val - a.val);

  // 第一个物品重量大于背包容量，直接返回0
  if (list[0].wt > W) {
    return 0;
  } else {
    // 逐个放进背包，判断是否超重
    let wtSum = 0;
    let valSum = 0;
    for (let i = 0; i < N; i++) {
      if (wtSum + list[i].wt <= W) {
        wtSum += list[i].wt;
        valSum += list[i].val;
      }
    }
    return valSum;
  }
};

knapsack(3, 4, [2, 1, 3], [4, 2, 3]); // 6
knapsack(4, 4, [2, 1, 3, 1], [4, 2, 3, 3]); // 9
knapsack(4, 6, [2, 1, 3, 1], [4, 2, 3, 3]); // 10
knapsack(5, 7, [2, 1, 3, 1, 1], [4, 2, 3, 3, 2]); // 12
knapsack(5, 7, [8, 8, 8, 8, 8], [4, 2, 3, 3, 2]); // 0
```

#### 3.2.2. 动态规划

```js
/**
 * 动态规划
 * 时间复杂度：O(nW)
 * 空间复杂度：O(nW)
 * @param {number} N 物品数量
 * @param {number} W 背包容量
 * @param {number[]} wt 物品重量list
 * @param {number[]} val 物品价值list
 * @return {number}
 */
var knapsack = function (n, w, weights, values) {
  let dp = new Array(n + 1).fill(0).map(() => new Array(w + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= w; j++) {
      if (j - weights[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][w];
};
```

### 3.3. 时间调度问题

> 有 n 个活动的开始时间和结束时间，如何选择最多的活动，使得这些活动互不冲突。

#### 3.3.1. 贪心算法

```js
/**
 * 贪心算法
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n)
 * @param {number} n 活动数量
 * @param {number[]} start 开始时间list
 * @param {number[]} end 结束时间list
 * @return {number}
 */
var schedule = function (n, start, end) {
  // 按结束时间从小到大排序
  let list = [];
  for (let i = 0; i < n; i++) {
    list.push({ start: start[i], end: end[i] });
  }
  list.sort((a, b) => a.end - b.end);

  // 选择第一个活动
  let count = 1;
  let lastEnd = list[0].end;

  // 从第二个活动开始，判断是否与上一个活动冲突
  for (let i = 1; i < n; i++) {
    if (list[i].start >= lastEnd) {
      count++;
      lastEnd = list[i].end;
    }
  }
  return count;
};

schedule(4, [1, 3, 0, 5], [2, 4, 6, 7]); // 3
```

#### 3.3.2. 动态规划

```js
/**
 * 动态规划
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(n)
 * @param {number} n 活动数量
 * @param {number[]} start 开始时间list
 * @param {number[]} end 结束时间list
 * @return {number}
 */
var schedule = function (n, start, end) {
  // dp[i]表示前i个活动，最多可以选择的活动数量
  let dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    // 选择第i个活动
    let count = 1;
    for (let j = i - 1; j >= 1; j--) {
      if (end[j - 1] <= start[i - 1]) {
        count += dp[j];
        break;
      }
    }
    // 不选择第i个活动
    dp[i] = Math.max(dp[i - 1], count);
  }

  return dp[n];
};
```

### 3.4. 用最少的硬币付款

> 有 1 元、2 元、5 元、10 元、20 元、50 元、100 元的硬币若干枚，现在要用这些硬币支付 K 元，最少需要多少枚硬币？

#### 3.4.1. 贪心算法

```js
/**
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * @param {number} k 金额
 * @return {number} 硬币数量
 */
var coinChange = function (k) {
  let count = 0;
  let arr = [100, 50, 20, 10, 5, 2, 1];
  for (let i = 0; i < arr.length; i++) {
    // 如果剩余金额大于当前面值
    if (k >= arr[i]) {
      // 计算当前面值的硬币数量
      count += Math.floor(k / arr[i]);
      // 计算剩余金额
      k = k % arr[i];
    }
  }
  return count;
};

coinChange(1); // 1
coinChange(3); // 2
coinChange(27); // 3
coinChange(47); // 3
```

#### 3.4.2. 动态规划

思路：

- 双重循环，外层循环金额，内层循环面值。
- 当金额大于等于当前面值时，计算当前面值的硬币数量，然后计算剩余金额。
- 当金额小于当前面值时，跳过当前面值。
- 当金额为 0 时，结束循环。
- 最后返回 dp[amount]。
- coins[j]表示面值
- dp[i]表示金额为 i 时，最少需要的硬币数量。
- i - coins[j]表示剩余未计算的金额。
- dp[i - coins[j]]表示剩余未计算的金额，最少需要的硬币数量。
- dp[i - coins[j]] + 1 表示当前金额，最少需要的硬币数量，1 表示当前面值的硬币数量。

```js
/**
 * 硬币找零
 * 时间复杂度：O(nm)
 * 空间复杂度：O(nm)
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // dp[i]表示金额为i时，最少需要的硬币数量
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  // i表示金额
  for (let i = 1; i <= amount; i++) {
    // j表示面值的索引,coins[j]表示面值
    for (let j = 0; j < coins.length; j++) {
      // 如果当前金额小于当前面值，跳过
      if (i - coins[j] < 0) {
        continue;
      }
      // 取当前金额的最小硬币数量
      dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

coinChange([4, 3, 1], 6); // 2
```

### 3.5. 排序算法

#### 3.5.1. 冒泡排序

```js
/**
 * 冒泡排序
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * @param {number[]} arr
 * @return {number[]}
 */
var bubbleSort = function (arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};
```

#### 3.5.2. 选择排序

```js
/**
 * 选择排序
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * @param {number[]} arr
 * @return {number[]}
 */
var selectionSort = function (arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
};
```

#### 3.5.3. 插入排序

```js
/**
 * 插入排序
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * @param {number[]} arr
 * @return {number[]}
 */
var insertionSort = function (arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let preIndex = i - 1;
    let current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
};
```

#### 3.5.4. 希尔排序

```js
/**
 * 希尔排序
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(1)
 * @param {number[]} arr
 * @return {number[]}
 */
var shellSort = function (arr) {
  let len = arr.length;
  let gap = Math.floor(len / 2);
  while (gap > 0) {
    for (let i = gap; i < len; i++) {
      let preIndex = i - gap;
      let current = arr[i];
      while (preIndex >= 0 && arr[preIndex] > current) {
        arr[preIndex + gap] = arr[preIndex];
        preIndex -= gap;
      }
      arr[preIndex + gap] = current;
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
};
```

#### 3.5.5. 快速排序

```js
/**
 * 快速排序
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(logn)
 * @param {number[]} arr
 * @return {number[]}
 */
var quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};
```

### 3.6. 搜索算法

#### 3.6.1. 二分查找

```js
/**
 * 二分查找
 * 时间复杂度：O(logn)
 * 空间复杂度：O(1)
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var binarySearch = function (arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};
```

#### 3.6.2. 深度优先搜索

```js
/**
 * 深度优先搜索
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var dfs = function (arr, target) {
  let stack = [];
  let visited = new Set();
  stack.push(0);
  while (stack.length) {
    let cur = stack.pop();
    if (arr[cur] === target) {
      return cur;
    }
    visited.add(cur);
    let next = cur + 1;
    if (next < arr.length && !visited.has(next)) {
      stack.push(next);
    }
    next = cur - 1;
    if (next >= 0 && !visited.has(next)) {
      stack.push(next);
    }
  }
  return -1;
};
```

#### 3.6.3. 广度优先搜索

```js
/**
 * 广度优先搜索
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var bfs = function (arr, target) {
  let queue = [];
  let visited = new Set();
  queue.push(0);
  while (queue.length) {
    let cur = queue.shift();
    if (arr[cur] === target) {
      return cur;
    }
    visited.add(cur);
    let next = cur + 1;
    if (next < arr.length && !visited.has(next)) {
      queue.push(next);
    }
    next = cur - 1;
    if (next >= 0 && !visited.has(next)) {
      queue.push(next);
    }
  }
  return -1;
};
```

### 3.7. 数组转换树结构

有一个数组，数组中的每个元素都是一个对象，对象中有一个 id 和 parentId 属性，id 表示当前元素的 id，parentId 表示当前元素的父元素的 id。现在要求将这个数组转换成树结构，要求如下：

1. 数组中的元素以 id 作为唯一标识，不会出现重复的 id
2. parentId 为 0 的元素为根元素
3. 转换后的树结构中，每个元素的 children 属性表示当前元素的子元素

```js
/**
 * 数组转换树结构
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {object[]} arr
 * @return {object}
 */
var arrayToTree = function (arr) {
  // 用于存储数组中的值和索引
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i].id, i);
  }
  console.log('%c zjs map:', 'color: #fff;background: #b457ff;', map);
  let root = null;
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item.parentId === 0) {
      root = item;
    } else {
      let parentIndex = map.get(item.parentId);
      let parent = arr[parentIndex];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item);
    }
  }
  return root;
};

let arr = [
  { id: 1, parentId: 0 },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 2 },
  { id: 6, parentId: 4 },
  { id: 7, parentId: 3 },
  { id: 8, parentId: 3 },
  { id: 9, parentId: 3 },
  { id: 10, parentId: 5 },
  { id: 11, parentId: 7 },
  { id: 12, parentId: 11 },
];

console.log('%c zjs arrayToTree:', 'color: #fff;background: #b457ff;', arrayToTree(arr));
```

### 3.8. 去除字符串中出现次数最少的字符，不改变原字符串的顺序

```js
/**
 * 去除字符串中出现次数最少的字符，不改变原字符串的顺序
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {string} str
 * @return {string}
 */
var removeMinChar = function (str) {
  // 用一个map存储每个字符出现的次数
  let map = new Map();
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
  }
  // 最小出现次数
  const min = Math.min(...map.values());

  let result = '';
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (map.get(char) > min) {
      result += char;
    }
  }

  return result;
};

removeMinChar('ababac'); // 'ababa'
```

### 3.9. 数字转换成汉语的输出

将数字转换成汉语的输出，输入为不超过 10000 亿的数字。如 123456 —— 十二万三千四百五十六

```js
/**
 * 数字转换成汉语的输出
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * @param {number} num
 * @return {string}
 */
var numberToChinese = function (num) {
  // 0-9
  const numArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  // 单位
  const unitArr = [
    '',
    '十',
    '百',
    '千',
    '万',
    '十',
    '百',
    '千',
    '亿',
    '十',
    '百',
    '千',
    '万',
    '十',
    '百',
    '千',
  ];
  // 转换成字符串
  const str = num.toString();
  // 结果
  let result = '';
  for (let i = 0; i < str.length; i++) {
    // 获取当前数字
    const num = str[i];
    // 获取当前数字对应的单位
    const unit = unitArr[str.length - i - 1];
    // 如果当前数字不是 0，拼接到结果中
    if (num !== '0') {
      result += numArr[num] + unit;
    } else {
      // 如果当前数字是 0，判断是否需要加零
      // 如果当前数字是最后一个数字，不需要加零
      // 如果当前数字不是最后一个数字，判断下一个数字是否为 0，如果下一个数字不是 0，需要加零
      if (i !== str.length - 1 && str[i + 1] !== '0') {
        result += numArr[num];
      }
    }
  }
  return result;
};

numberToChinese(123456); // '一十二万三千四百五十六'
```
