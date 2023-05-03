---
title: 算法题：链表 两数相加
group:
  title: 算法
---

## 链表 两数相加

### 1. 问题描述

给你两个   非空 的链表，表示两个非负的整数。它们每位数字都是按照   逆序   的方式存储的，并且每个节点只能存储   一位   数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0  开头。

示例 1：  
输入：l1 = [2,4,3], l2 = [5,6,4]  
输出：[7,0,8]  
解释：342 + 465 = 807

示例 2：  
输入：l1 = [0], l2 = [0]  
输出：[0]

示例 3：  
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]  
输出：[8,9,9,9,0,0,0,1]

### 2. 解题思路

### 3. 代码实现

#### 3.1. 方式 1

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy;
  let carry = 0;
  while (l1 !== null || l2 !== null || carry !== 0) {
    let x = l1 ? l1.val : 0;
    let y = l2 ? l2.val : 0;
    let sum = x + y + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
    l1 = l1 ? l1.next : null;
    l2 = l2 ? l2.next : null;
  }

  return dummy.next;
};
```

#### 3.2. 方式 2

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var addTwoNumbers = function (l1, l2) {
  if (+l1.val === 0 && !l1.next) {
    return l2;
  }

  if (+l2.val === 0 && !l2.next) {
    return l1;
  }

  // 先把链表转成数组
  const toArray = (link) => {
    const array = [];
    while (link.val !== undefined) {
      array.unshift(link.val);
      if (!link.next) break;
      link = link.next;
    }
    return array;
  };

  const xArr = toArray(l1);
  const yArr = toArray(l2);

  let x = `${xArr.join('')}`;
  let y = `${yArr.join('')}`;
  if (xArr.length > yArr.length) {
    y = `${'0'.repeat(xArr.length - yArr.length)}${yArr.join('')}`;
  } else {
    x = `${'0'.repeat(yArr.length - xArr.length)}${xArr.join('')}`;
  }
  const len = Math.max(xArr.length, yArr.length) + 1;

  const sumArr = Array(len).fill(0);
  for (let i = x.length - 1; i >= 0; i--) {
    const total = Number(x[i]) + Number(y[i]);

    const pos1 = i;
    const pos2 = i + 1;
    const sum = total + Number(sumArr[pos2]);

    sumArr[pos1] += Math.floor(sum / 10);
    sumArr[pos2] = sum % 10;
  }

  const sumStr = sumArr.join('');
  let resStr = '';
  for (let i = 0; i < sumStr.length; i++) {
    if (+sumArr[i] !== 0 || resStr) {
      resStr += sumArr[i];
    }
  }

  // 生成链表
  const genList = (arr) => {
    let index = -1;
    const helper = () => {
      index++;
      return new ListNode(arr[index], index !== arr.length - 1 ? helper() : null);
    };
    return helper();
  };

  const LN = genList(Array.from(resStr).reverse());

  return LN;
};
```
