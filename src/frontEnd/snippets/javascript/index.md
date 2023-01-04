---
title: Javascript
---

## Array

```js
// 删除两个数组中重复的元素(找出两个数组不同的元素)
export function difference(arr, repeatArr) {
  const setRepeatArr = new Set(repeatArr);
  return arr.filter((item) => !setRepeatArr.has(item));
}

/**
 * 复杂数组找不同(删除arr1元素中和arr2重复的元素)
 * var a = [{id: 1},{id: 2},{id: 3}]
 * var b = [{id: 3},{id: 4},{id: 5}]
 * differenceBy(a, b, x => x.id); // [{id: 1},{id: 2}]
 * differenceBy(b, a, x => x.id); // [{id: 4},{id: 5}]
 */
export function differenceBy(a, b, fn) {
  const s = new Set(b.map(fn));
  return a.filter((x) => !s.has(fn(x)));
}

// 返回一个两个数组中重复元素的数组
export function intersection(a, b) {
  const s = new Set(b);
  return a.filter((x) => s.has(x));
}
```

### 4 种必须知道的 Array 方法

## Javascript

## Object

## String

## Browser

## Date

#### 随机生成颜色值

```js
const generalColorById = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = hash * 34 + id.charCodeAt(i);
    hash = intValue(hash);
  }
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  return 'rgba(' + r + ',' + g + ',' + b + ',' + '0.5)';
};

function intValue(num: number) {
  const MAX_VALUE = 0x7fffffff;
  const MIN_VALUE = -0x80000000;
  if (num > MAX_VALUE || num < MIN_VALUE) {
    return (num &= 0xffffffff);
  }
  return num;
}

generalColorById('龙子');
// 'rgba(21,141,162,0.5)'
```
