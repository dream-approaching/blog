---
title: 算法
group:
  title: Interview
---

# 算法

## 1. 常见算法解决思路

- 二分查找
- 双指针
- 滑动窗口
- 动态规划
- 贪心算法
- 分治算法
- 回溯算法

### 1.1. 二分查找

二分查找是一种在有序数组中查找某一特定元素的搜索算法。搜索过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。如果在某一步骤数组为空，则代表找不到。这种搜索算法每一次比较都使搜索范围缩小一半。

二分查找的时间复杂度为 `O(logn)`，空间复杂度为 `O(1)`。

### 1.2. 双指针

双指针是一种使用两个指针遍历数组的技巧。它可以用来解决一些数组类的问题，比如：

- 两数之和
- 三数之和
- 两数平方和
- 反转字符串中的元音字母
- 接雨水

### 1.3. 动态规划

动态规划是一种将复杂问题分解为更小的子问题来解决的优化技术。它将问题分解为子问题，通过求解子问题的解来求解原问题的解。动态规划的关键是找到子问题的重叠性质，从而减少计算量。

用动态规划解决问题时，要遵循三个重要步骤：

- 定义子问题
- 实现需要反复执行而解决子问题的部分
- 识别并求解出边界条件

能用动态规划解决的一些著名问题：

- 最长公共子序列
- 背包问题
- 硬币找零
- 矩阵链乘法

### 1.4. 贪心算法

贪心算法是一种在每一步选择中都采取在当前状态下最好或最优的选择，从而希望导致结果是全局最好或最优的算法。贪心算法与动态规划的不同在于它对每个子问题的解决方案都做出选择，不能回退。动态规划则会保存以前的运算结果，并根据以前的结果对当前进行选择，有回退功能。

能用贪心算法解决的一些著名问题：

- 硬币找零
- 买卖股票的最佳时机
- 分发饼干
- 跳跃游戏
- 加油站

### 1.5. 分治算法

分治算法是一种将问题分成一些小的问题然后递归求解的算法，而治的阶段则将分的阶段得到的各答案“修补”在一起，得到原问题的解。

能用分治算法解决的一些著名问题：

- 汉诺塔
- 快速排序
- 归并排序
- 线性时间选择

### 1.6. 回溯算法

回溯算法是一种通过穷举所有可能情况来找到所有解的算法。如果一个候选解最后被发现并不是可行解，回溯算法会舍弃它，并在前面的一些步骤做出一些修改，并重新尝试找到可行解。

能用回溯算法解决的一些著名问题：

- 八皇后问题
- 0-1 背包问题
- 求解数独
- 括号生成

## 2. 常见算法题

### 2.1. 接雨水

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

- 示例 1：
  > 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]  
  > 输出：6  
  > 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。  
  > ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20230207100102.png)
- 示例 2：
  > 输入：height = [4,2,0,3,2,5]  
  > 输出：9

#### 2.1.1. 思路

- 先计算每个位置能装多少水，然后求和。
- 每个位置能装的水，取决于左右两边最高的柱子中较矮的那个柱子，减去当前柱子的高度。
- 假设左边最高的柱子高度为 `leftMax`，右边最高的柱子高度为 `rightMax`，当前柱子高度为 `height[i]`，则当前柱子能装的水为 `Math.min(leftMax, rightMax) - height[i]`。

#### 2.1.2. 代码

```js
/**
 * 1. 暴力法
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  // 数组长度小于3，不可能有水
  if (height.length < 3) return 0;
  let sum = 0;
  for (let currentIndex = 1; currentIndex < height.length - 1; currentIndex++) {
    let leftMax = 0;
    let rightMax = 0;

    // 从当前位置向左遍历，找出左边最高的柱子
    for (let leftPartIndex = currentIndex; leftPartIndex >= 0; leftPartIndex--) {
      leftMax = Math.max(leftMax, height[leftPartIndex]);
    }

    // 从当前位置向右遍历，找出右边最高的柱子
    for (let rightPartIndex = currentIndex; rightPartIndex < height.length; rightPartIndex++) {
      rightMax = Math.max(rightMax, height[rightPartIndex]);
    }

    sum += Math.min(leftMax, rightMax) - height[currentIndex];
  }
  return sum;
};

/**
 * 2. 动态规划
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  // 数组长度小于3，不可能有水
  if (height.length < 3) return 0;
  let sum = 0;
  let leftMax = new Array(height.length).fill(0);
  let rightMax = new Array(height.length).fill(0);

  // 计算每个位置左边最高的柱子
  leftMax[0] = height[0];
  for (let i = 1; i < height.length; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  // 计算每个位置右边最高的柱子
  rightMax[height.length - 1] = height[height.length - 1];
  for (let i = height.length - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  // 计算每个位置能装多少水
  for (let i = 1; i < height.length - 1; i++) {
    sum += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return sum;
};

/**
 * 3. 双指针
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  // 数组长度小于3，不可能有水
  if (height.length < 3) return 0;
  let sum = 0;
  let leftMax = height[0]; // 左边最高柱子的高度
  let rightMax = height[height.length - 1]; // 右边最高柱子的高度

  let leftIndex = 0; // 左指针
  let rightIndex = height.length - 1; // 右指针

  while (leftIndex < rightIndex) {
    // 判断哪边的柱子较矮，就计算哪边的水
    if (leftMax < rightMax) {
      // 左边的柱子矮，能装的水取决于左边最高柱子的高度，减去当前柱子的高度
      sum += leftMax - height[leftIndex];
      // 左指针右移
      leftIndex++;
      // 更新左边最高柱子的高度
      leftMax = Math.max(leftMax, height[leftIndex]);
    } else {
      // 右边的柱子矮，能装的水取决于右边最高柱子的高度，减去当前柱子的高度
      sum += rightMax - height[rightIndex];
      // 右指针左移
      rightIndex--;
      // 更新右边最高柱子的高度
      rightMax = Math.max(rightMax, height[rightIndex]);
    }
  }

  return sum;
};
```

### 2.2. 背包问题

给你一个可装载重量为 W 的背包和 N 个物品，每个物品有重量和价值两个属性。其中第 i 个物品的重量为 wt[i]，价值为 val[i]，现在让你用这个背包装物品，最多能装的价值是多少？

举个简单的例子，输入如下：

```js
(N = 3), (W = 4);
wt = [2, 1, 3];
val = [4, 2, 3];

// 输出 6，选择前两件物品装进背包，总重量 3 小于 W，可以获得最大价值 6。
```

#### 2.2.1. 贪心算法

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

#### 2.2.2. 动态规划

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

### 2.3. 时间调度问题

> 有 n 个活动的开始时间和结束时间，如何选择最多的活动，使得这些活动互不冲突。

#### 2.3.1. 贪心算法

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

#### 2.3.2. 动态规划

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

### 2.4. 用最少的硬币付款

> 有 1 元、2 元、5 元、10 元、20 元、50 元、100 元的硬币若干枚，现在要用这些硬币支付 K 元，最少需要多少枚硬币？

#### 2.4.1. 贪心算法

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

#### 2.4.2. 动态规划

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

### 2.5. 排序算法

#### 2.5.1. 冒泡排序

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

#### 2.5.2. 选择排序

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

#### 2.5.3. 插入排序

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

#### 2.5.4. 希尔排序

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

#### 2.5.5. 快速排序

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

### 2.6. 搜索算法

#### 2.6.1. 二分查找

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

#### 2.6.2. 深度优先搜索

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

#### 2.6.3. 广度优先搜索

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

### 2.7. 数组转换树结构

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

### 2.8. 去除字符串中出现次数最少的字符，不改变原字符串的顺序

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

### 2.9. 数字转换成汉语的输出

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
