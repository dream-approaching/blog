---
title: 常用api
group:
  title: 算法
  order: 30
---

<!-- TOC -->

- [一、Array](#%E4%B8%80array)
  - [初始化](#%E5%88%9D%E5%A7%8B%E5%8C%96)
  - [array.flat](#arrayflat)
  - [array.flatmap](#arrayflatmap)
  - [array.includes](#arrayincludes)
  - [array.push](#arraypush)
  - [array.pop](#arraypop)
  - [array.shift](#arrayshift)
  - [array.unshift](#arrayunshift)
  - [array.slice](#arrayslice)
  - [array.splice](#arraysplice)
  - [array.concat](#arrayconcat)
  - [array.join](#arrayjoin)
  - [array.reverse](#arrayreverse)
  - [array.sort](#arraysort)
  - [array.indexOf](#arrayindexof)
  - [array.toString](#arraytostring)
- [二、String](#%E4%BA%8Cstring)
  - [进制转换](#%E8%BF%9B%E5%88%B6%E8%BD%AC%E6%8D%A2)
- [三、退出循环](#%E4%B8%89%E9%80%80%E5%87%BA%E5%BE%AA%E7%8E%AF)
  - [break](#break)
  - [continue](#continue)
  - [return](#return)

<!-- /TOC -->

## 一、Array

### 初始化

- 一维数组，长度为 n 的数组，且每个元素都是 0

  ```js
  Array(n).fill(0); // [0, 0, 0, 0, 0]

  Array.from({ length: n }).fill(0); // [0, 0, 0, 0, 0]

  Array(n).map(() => 0); // [0, 0, 0, 0, 0]
  ```

- 二维数组，长度为 n，且每个元素都是长度为 m 的数组

  ```js
  Array(n)
    .fill(0)
    .map(() => Array(m).fill(0));

  Array.from({ length: n }, () => Array(m).fill(0));
  ```

### array.flat

将多维数组转换为一维数组，depth 为转换的层数，默认为 1。传入 Infinity 则转换为最深层的一维数组。

```js
var arr1 = [1, 2, [3, 4]];
arr1.flat(); // [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat(); // [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2); // [1, 2, 3, 4, 5, 6]

var arr4 = [1, 2, [3, 4, [5, 6]]];
arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6]
```

### array.flatmap

对数组的每个元素执行一次提供的函数（callback），并且返回一个新的数组。该方法会将执行结果扁平化为一维数组。

```js
var arr1 = [1, 2, 3, 4];
arr1.map((x) => [x * 2]); // [[2], [4], [6], [8]]
arr1.flatMap((x) => [x * 2]); // [2, 4, 6, 8]

var arr2 = ["it's Sunny in", '', 'California'];
arr2.map((x) => x.split(' ')); // [["it's","Sunny","in"],[""],["California"]]
arr2.flatMap((x) => x.split(' ')); // ["it's","Sunny","in", "", "California"]
```

### array.includes

判断数组是否包含某个元素，返回布尔值。

```js
var arr = [1, 2, 3];
arr.includes(2); // true
arr.includes(4); // false
```

### array.push

向数组末尾添加一个或多个元素，返回新的长度。该方法会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits.push('Kiwi'); // fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi"]
```

### array.pop()

删除并返回数组的最后一个元素。该方法会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits.pop(); // "Mango"  fruits = ["Banana", "Orange", "Apple"]
```

### array.shift()

删除并返回数组的第一个元素。该方法会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits.shift(); // "Banana"  fruits = ["Orange", "Apple", "Mango"]
```

### array.unshift

向数组的开头添加一个或更多元素，并返回新的长度。该方法会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits.unshift('Lemon', 'Pineapple'); // fruits = ["Lemon", "Pineapple", "Banana", "Orange", "Apple", "Mango"]
```

### array.slice

从某个已有的数组返回选定的元素，返回新数组。start 为开始提取的位置，end 为结束提取的位置（不包含该元素）。如果省略 end 参数，则 slice() 方法会一直提取到数组末尾。如果该参数为负数，则表示从数组中的倒数第几个元素提取，slice(-2) 表示提取数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。如果 start 大于 end，则返回空数组。该方法不会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];

fruits.slice(0, 1); // citrus = ["Banana"]
fruits.slice(1, 3); // citrus = ["Orange", "Lemon"]
fruits.slice(1); // citrus = ["Orange", "Lemon", "Apple", "Mango"]
fruits.slice(-2); // citrus = ["Apple", "Mango"]
```

### array.splice

删除元素，并向数组添加新元素。index 为删除元素的索引，howmany 为删除的数量，item1, ..., itemX 为要添加的元素。如果 howmany 参数为 0，则不会删除元素。如果省略 itemX，则 splice() 方法只删除元素。如果只有一个参数，如：splice(2)，表示从索引 2 开始删除所有元素。该方法会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits.splice(2, 0, 'Lemon', 'Kiwi'); // fruits = ["Banana", "Orange", "Lemon", "Kiwi", "Apple", "Mango"]
fruits.splice(0, 1); // fruits = ["Orange", "Lemon", "Kiwi", "Apple", "Mango"]
fruits.splice(2, 1, 'Watermelon'); // fruits = ["Orange", "Lemon", "Watermelon", "Apple", "Mango"]
fruits.splice(2); // fruits = ["Orange", "Lemon"]
```

### array.concat

合并数组，返回新数组。该方法不会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
var citrus = ['Lemon', 'Kiwi'];
fruits.concat(citrus); // ["Banana", "Orange", "Apple", "Mango", "Lemon", "Kiwi"]
```

### array.join

将数组转换为字符串，返回字符串。separator 为分隔符，省略该参数则使用逗号作为分隔符。该方法不会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits.join(); // "Banana,Orange,Apple,Mango"
fruits.join(''); // "BananaOrangeAppleMango"
fruits.join(' '); // "Banana Orange Apple Mango"
```

### array.reverse()

颠倒数组中元素的顺序，返回数组。该方法会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits.reverse(); // fruits = ["Mango", "Apple", "Orange", "Banana"]
```

### array.sort

对数组的元素进行排序，返回数组。compareFunction 为比较函数，省略该参数则按照字符编码的顺序进行排序。传入 compareFunction 时，该函数接收两个参数 a 和 b，如果 a 小于 b，则返回一个小于 0 的数；如果 a 等于 b，则返回 0；如果 a 大于 b，则返回一个大于 0 的数。该方法会改变原数组。

```js
var ages = ['11', '222', '53', '32'];
// 默认排序
ages.sort(); // ages = ["11", "222", "32", "53"]
// 按照数字大小，从小到大排序
ages.sort(function (a, b) {
  return a - b;
}); // ages = ["11", "32", "53", "222"]
// 按照数字大小，从大到小排序
ages.sort(function (a, b) {
  return b - a;
}); // ages = ["222", "53", "32", "11"]
```

### array.indexOf

返回数组中某个元素的索引，如果不存在则返回 -1。start 为开始查找的位置，省略该参数则从数组开头查找。该方法不会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits.indexOf('Apple'); // 2
fruits.indexOf('Apple', 3); // -1
```

### array.toString()

把数组转换为字符串，返回字符串。该方法不会改变原数组。

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits.toString(); // "Banana,Orange,Apple,Mango"
```

## 二、String

### 进制转换

```js
// 十进制转n进制
parseInt(12).toString(2); // 转换为二进制 1100
parseInt(12).toString(8); // 转换为八进制 14
parseInt(12).toString(16); // 转换为十六进制 c

// n 进制转 n 进制
parseInt(1101, 2).toString(10); // 二进制转换为十进制 13
parseInt(1101, 2).toString(8); // 二进制转换为八进制 15
parseInt(1101, 2).toString(16); // 二进制转换为十六进制 d

// 十进制转二进制
(12).toString(2); // 1100
// 二进制转十进制
parseInt(1100, 2); // 12
```

## 三、退出循环

### break

跳出循环，继续执行循环下面的代码。

```js
for (var i = 0; i < 10; i++) {
  if (i === 3) {
    break;
  }
  console.log(i);
}
// 0 1 2

while (true) {
  if (i === 3) {
    break;
  }
  console.log(i);
  i++;
}

// 0 1 2
```

### continue

跳出本次循环，继续执行下一次循环。

```js
for (var i = 0; i < 10; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}
// 0 1 2 4 5 6 7 8 9

while (true) {
  if (i === 3) {
    continue;
  }
  console.log(i);
  i++;
}
// 0 1 2 4 5 6 7 8 9
```

### return

跳出循环，终止函数执行。

```js
function test() {
  for (var i = 0; i < 10; i++) {
    if (i === 3) {
      return;
    }
    console.log(i);
  }
}
test();
// 0 1 2
```
