---
title: 内存处理
group:
  title: Interview
---

# 内存处理

## 1、内存的生命周期

- 分配内存：声明变量、函数、对象的时候，js 会自动分配内存
- 使用内存：调用、使用的时候
- 内存回收

## 2、 js 中的垃圾回收机制

> 概念：垃圾回收机制是指在不再使用的时候，自动回收内存

- 引用计数法：如果一个对象被引用了，那么引用数就加 1，如果引用数为 0，那么就会被回收
  - 优点：发现垃圾时立即回收
  - 缺点：无法回收循环引用的对象
- 标记清除法：从根节点开始，找到所有的引用，然后标记，最后清除没有标记的对象
  - 优点：可以回收循环引用的对象
  - 缺点：无法立即回收，需要等待一段时间

## 3、js 中常见的内存泄漏

- 全局变量
- 闭包：一个内部函数，有权访问包含其的外部函数的变量
- 事件监听
- 未被清理的定时器
- DOM 引用

## 4、如何避免内存泄漏

- 减少全局变量的使用
- 减少闭包的使用
- 事件监听和定时器需要在合适的时候清除
- DOM 引用需要在合适的时候清除

## 5、js 中的内存分配

- 栈内存：存储基本类型的值，存储的是值
- 堆内存：存储引用类型的值，存储的是地址

## 6、js 中的数据类型

- 基本类型：number、string、boolean、null、undefined、symbol
- 引用类型：object、array、function

## 7、实现一个 sizeof 函数，可以计算出一个对象占用的内存大小

```js
const testData = {
  a: 1,
  b: '2',
  c: true,
  d: { e: 3, f: '4', g: true, h: { i: 5, j: '6', k: true } },
};

const seen = new WeakSet();
function sizeof(obj) {
  let size = 0;
  if (obj !== null && obj !== undefined) {
    switch (typeof obj) {
      case 'number':
        size = 8;
        break;
      case 'string':
        size = obj.length * 2;
        break;
      case 'boolean':
        size = 4;
        break;
      case 'symbol':
        size = 4;
        break;
      case 'object':
        if (Array.isArray(obj)) {
          // 递归处理数组中的每一项
          size = obj.map(sizeof).reduce((a, b) => a + b, 0);
        } else {
          if (obj === null || obj === undefined) {
            size = 0;
          }

          const properties = Object.keys(obj);
          for (let i = 0; i < properties.length; i++) {
            size += 2; // 每个key占用2个字节
            const key = properties[i];
            const value = obj[key];
            if (seen.has(value)) {
              continue;
            } else {
              seen.add(value);
              size += sizeof(value);
            }
          }
        }
        break;
    }
  }
  return size;
}
```
