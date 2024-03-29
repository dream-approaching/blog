---
title: javascript
order: 20
nav:
  title: 前端
  order: 0
group:
  title: 基本知识
  order: 0
---

<!-- TOC -->

- [1. JavaScript 有哪些数据类型，它们的区别？](#1-javascript-有哪些数据类型它们的区别)
- [2. 数据类型检测的方式有哪些](#2-数据类型检测的方式有哪些)
  - [2.1. typeof](#21-typeof)
  - [2.2. instanceof](#22-instanceof)
  - [2.3. constructor](#23-constructor)
  - [2.4. Object.prototype.toString.call()](#24-objectprototypetostringcall)
- [3. 堆栈的区别](#3-堆栈的区别)
- [4. null 和 undefined 区别](#4-null-和-undefined-区别)
- [5. intanceof 操作符的实现原理及实现](#5-intanceof-操作符的实现原理及实现)
- [6. Object.is() 与比较操作符 "==="、"=="" 的区别？](#6-objectis-与比较操作符--的区别)
- [7. 为什么会有 BigInt 的提案？](#7-为什么会有-bigint-的提案)
- [8. 如何判断一个对象是空对象](#8-如何判断一个对象是空对象)
- [9. 什么是 JavaScript 中的包装类型？](#9-什么是-javascript-中的包装类型)
- [10. 一段 js 代码是怎么被 js 引擎解析并执行的](#10-一段-js-代码是怎么被-js-引擎解析并执行的)
- [11. 函数是怎么执行的，进栈出栈，怎么确定 this 指向](#11-函数是怎么执行的进栈出栈怎么确定-this-指向)
- [12. const 对象的属性可以修改吗](#12-const-对象的属性可以修改吗)
- [13. 箭头函数与普通函数的区别](#13-箭头函数与普通函数的区别)
- [14. 如果 new 一个箭头函数会怎么样](#14-如果-new-一个箭头函数会怎么样)
- [15. 箭头函数的 this 指向哪里？](#15-箭头函数的-this-指向哪里)
- [16. 执行上下文是什么？this 和执行上下文有什么关系？](#16-执行上下文是什么this-和执行上下文有什么关系)
  - [16.1. 和 this 有什么关系？](#161-和-this-有什么关系)
- [17. 扩展运算符的作用及使用场景](#17-扩展运算符的作用及使用场景)
- [18. Proxy 可以实现什么功能？](#18-proxy-可以实现什么功能)
- [19. 常用的正则表达式有哪些](#19-常用的正则表达式有哪些)
- [20. JavaScript 脚本延迟加载的方式有哪些？](#20-javascript-脚本延迟加载的方式有哪些)
- [21. 什么是 DOM 和 BOM？](#21-什么是-dom-和-bom)
- [22. 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?](#22-为什么函数的-arguments-参数是类数组而不是数组如何遍历类数组)
- [23. escape、encodeURI、encodeURIComponent 的区别](#23-escapeencodeuriencodeuricomponent-的区别)
- [24. 封装一个 ajax 请求](#24-封装一个-ajax-请求)
- [25. 什么是尾调用，使用尾调用有什么好处？](#25-什么是尾调用使用尾调用有什么好处)
- [26. 什么是闭包？闭包的优缺点？有哪些常见的闭包使用场景？](#26-什么是闭包闭包的优缺点有哪些常见的闭包使用场景)
  - [26.1. 闭包](#261-闭包)
  - [26.2. 闭包的优缺点](#262-闭包的优缺点)
  - [26.3. 常见的闭包使用场景](#263-常见的闭包使用场景)
  - [26.4. 用了闭包怎么防止内存泄漏](#264-用了闭包怎么防止内存泄漏)
- [27. 防抖、节流](#27-防抖节流)
- [28. 重绘和回流（重绘和重排）](#28-重绘和回流重绘和重排)
- [29. 作用域](#29-作用域)
- [30. 深拷贝和浅拷贝](#30-深拷贝和浅拷贝)
  - [30.1. 浅拷贝](#301-浅拷贝)
  - [30.2. 深拷贝](#302-深拷贝)
  - [30.3. 赋值和浅拷贝深拷贝的区别](#303-赋值和浅拷贝深拷贝的区别)
  - [30.4. 常用深拷贝、浅拷贝方法](#304-常用深拷贝浅拷贝方法)
- [31. ES6 模块与 CommonJS 模块有什么异同？](#31-es6-模块与-commonjs-模块有什么异同)
- [32. Iterator 接口](#32-iterator-接口)
- [33. for 循环使用 await，for of 以及 for await of](#33-for-循环使用-awaitfor-of-以及-for-await-of)
- [34. forEach 和 map 的区别](#34-foreach-和-map-的区别)
- [35. for...in 和 for...of 的区别](#35-forin-和-forof-的区别)
- [36. 数组迭代方法](#36-数组迭代方法)
- [37. string 有哪些方法](#37-string-有哪些方法)
  - [37.1. 常用方法](#371-常用方法)
  - [37.2. ES6+ 新增方法](#372-es6-新增方法)
  - [37.3. 如何反转字符串](#373-如何反转字符串)
  - [37.4. 如何判断字符串是否包含某个字符](#374-如何判断字符串是否包含某个字符)
  - [37.5. substring 和 substr 的区别](#375-substring-和-substr-的区别)
- [38. addEventListener 方法的参数和使用](#38-addeventlistener-方法的参数和使用)
- [39. this 的指向以及 call、apply、bind 的区别](#39-this-的指向以及-callapplybind-的区别)
  - [39.1. this 的指向](#391-this-的指向)
  - [39.2. call、apply、bind 的区别](#392-callapplybind-的区别)
- [40. 对原型链的理解](#40-对原型链的理解)
- [41. 实现继承的几种方式](#41-实现继承的几种方式)
- [42. new 内部的原理，如何实现一个 new](#42-new-内部的原理如何实现一个-new)
- [43. 如何判断一个对象是否属于某个类](#43-如何判断一个对象是否属于某个类)
- [44. Set、Map、WeakSet、WeakMap](#44-setmapweaksetweakmap)
  - [44.1. map 和 object 的区别](#441-map-和-object-的区别)
- [45. 事件循环(EventLoop)](#45-事件循环eventloop)
  - [45.1. 宏任务，微任务](#451-宏任务微任务)
- [46. 柯里化](#46-柯里化)
- [47. 常见设计模式和数据结构](#47-常见设计模式和数据结构)
- [48. 前端工程化是什么？](#48-前端工程化是什么)
- [49. js 和 ts 的核心区别是什么](#49-js-和-ts-的核心区别是什么)
- [50. AST 语法树](#50-ast-语法树)
- [51. js 分片是什么，什么场景会用到，怎么实现](#51-js-分片是什么什么场景会用到怎么实现)
  - [51.1. 实现分片上传、断点续传](#511-实现分片上传断点续传)

<!-- /TOC -->

## 1. JavaScript 有哪些数据类型，它们的区别？

JavaScript 共有八种数据类型，分别是 `Undefined`、`Null`、`Boolean`、 `Number`、`String`、`Object`、`Symbol`、`BigInt`。其中 `Symbol` 和 `BigInt` 是 ES6 中新增的数据类型：

- `Symbol` 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
- `BigInt` 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 `BigInt` 可以安全地存储和操作大整数，即使这个数已经超出了 `Number` 能够表示的安全整数范围。

这些数据可以分为原始数据类型和引用数据类型：

- 栈：原始数据类型（`Undefined`、`Null`、`Boolean`、`Number`、`String`）
- 堆：引用数据类型（对象、数组和函数）

两种类型的区别在于存储位置的不同：

- 原始数据类型直接存储在栈（`stack`）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆（`heap`）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈 中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引 用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

堆和栈的概念存在于数据结构和操作系统内存中

- 在数据结构中，栈中数据的存取方式为先进后出，堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大 小来规定
- 在操作系统中，内存被分为栈区和堆区。
  - 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的 值等。其操作方式类似于数据结构中的栈。
  - 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可 能由垃圾回收机制回收。

## 2. 数据类型检测的方式有哪些

### 2.1. typeof

```js
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof 'str'); // string
console.log(typeof []); // object
console.log(typeof function () {}); // function
console.log(typeof {}); // object
console.log(typeof undefined); // undefined
console.log(typeof null); // object
```

其中数组、对象、null 都会被判断为 `object`，其他判断都正确。

### 2.2. instanceof

`instanceof` 可以正确判断对象的类型，其内部运行机制是判断在其 原型链中能否找到该类型的原型。

```js
console.log(2 instanceof Number); //false
console.log(true instanceof Boolean); //false
console.log('str' instanceof String); //false
console.log([] instanceof Array); //true
console.log(function () {} instanceof Function); //true
console.log({} instanceof Object); //true
```

可以看到，`instanceof` 只能正确判断引用数据类型，而不能判断基本数据类型。`instanceof` 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性。

### 2.3. constructor

```js
console.log((2).constructor === Number); // true
console.log(true.constructor === Boolean); //true
console.log('str'.constructor === String); //true
console.log([].constructor === Array); //true
console.log(function () {}.constructor === Function); //true
console.log({}.constructor === Object); //true
```

`constructor` 有两个作用，一是判断数据的类型，二是对象实例通过 `constructor` 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor` 就不能用来判断数据类型了：

```js
function Fn() {}
Fn.prototype = new Array();
var f = new Fn();
console.log(f.constructor === Fn); // false
console.log(f.constructor === Array); // true
```

### 2.4. Object.prototype.toString.call()

`Object.prototype.toString.call()` 使用 `Object` 对象的原型方法 `toString` 来判断数据类型：

```js
var a = Object.prototype.toString;

console.log(a.call(2)); //[object Number]
console.log(a.call(true)); // [object Boolean]
console.log(a.call('str')); //[object String]
console.log(a.call([])); //[object Array]

console.log(a.call(function () {})); //[object Function]
console.log(a.call({})); //[object Object]
console.log(a.call(undefined)); //[object Undefined]
console.log(a.call(null)); // [object Null]
```

---

同样是检测对象 `obj` 调用 `toString` 方法，`obj.toString()`的结果和 `Object.prototype.toString.call(obj)`的结果不一样，这是为什么？

> 这是因为 toString 是 `Object` 的原型方法，而 `Array`、`function` 等类型作为 `Object` 的实例，都重写了 `toString` 方法。不同的对象类型调用 `toString` 方法时，根据原型链的知识，调用的是对应的重写之后的 `toString` 方法（`function` 类型返回内容为函数体的字符串，`Array` 类型返回元素组成的字符串…），而不会去调用 `Object` 上原型 `toString` 方法（返回对象的具体类型），所以采用 `obj.toString()` 不能得到其对象类型，只能将 `obj` 转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用 `Object` 原型上的 `toString` 方法。

## 3. 堆栈的区别

- 栈(stack)
  - 会自动分配内存空间，会自动释放。
  - 存放简单的数据段，占据固定大小的空间。
  - 属于后进先出的数据结构。
- 堆(heap)
  - 动态分配的内存，大小不定也不会自动释放。
  - 存放复杂的数据段

> 参考：[[译] JavaScript 如何工作：对引擎、运行时、调用堆栈的概述](https://juejin.im/post/6844903510538993671)

## 4. null 和 undefined 区别

首先 `Undefined` 和 `Null` 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 `undefined` 和 `null。`

`undefined` 代表的含义是未定义，`null` 代表的含义是空对象。一般变量声明了但还没有定义的时候会返回 `undefined`，`null` 主要用于赋值给一些可能会返回对象的变量，作为初始化。

`undefined` 在 `JavaScript` 中不是一个保留字，这意味着可以使用 `undefined` 来作为一个变量名，但是这样的做法是非常危险的，它会 影响对 `undefined` 值的判断。我们可以通过一些方法获得安全的 `undefined` 值，比如说 `void 0`。

当对这两种类型使用 `typeof` 进行判断时，`Null` 类型化会返回 "`object`"，这是一个历史遗留的问题。当使用双等号对两种类型的 值进行比较时会返回 `true`，使用三个等号时会返回 `false`。

## 5. intanceof 操作符的实现原理及实现

`instanceof` 运算符用于判断构造函数的 `prototype` 属性是否出现 在对象的原型链中的任何位置。

```js
function myInstanceof(left, right) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left);
  // 获取构造函数的prototype对象
  let prototype = right.prototype;
  // 判断构造函数的prototype对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    // 如果没有找到，就续从其原型上找，Object.getPrototypeOf 方法用来获取指定对象的原型
    proto = Object.getPrototypeOf(proto);
  }
}
```

## 6. Object.is() 与比较操作符 "==="、"=="" 的区别？

- 使用双等号（`==`）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- 使用三等号（`===`）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 `false`。
- 使用 `Object.is` 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 `-0` 和 `+0` 不再相等，两个 `NaN` 是相等的。

## 7. 为什么会有 BigInt 的提案？

`JavaScript` 中 `Number.MAX_SAFE_INTEGER` 表示最大安全数字，计算结果是 `9007199254740991`，即在这个数范围内不会出现精度丢失（小数除外）。但是一旦超过这个范围，js 就会出现计算不准确的情况，这在大数计算的时候不得不依靠一些第三方库进行解决，因此官方提出了 `BigInt` 来解决此问题。

## 8. 如何判断一个对象是空对象

- 使用 JSON 自带的.stringify 方法来判断：

  ```js
  if (Json.stringify(Obj) == '{}') {
    console.log('空对象');
  }
  ```

- 使用 ES6 新增的方法 Object.keys()来判断：

  ```js
  if (Object.keys(Obj).length < 0) {
    console.log('空对象');
  }
  ```

## 9. 什么是 JavaScript 中的包装类型？

在 `JavaScript` 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 `JavaScript` 会在后台隐式地将基本类型的值转换为对象，如：

```js
const a = 'abc';
a.length; //3
a.toUppercase(); //"ABC"
```

在 访 问 `'abc'.length` 时 ， `JavaScript` 将 `'abc'` 在 后 台 转 换 成 `String('abc')`，然后再访问其 `length` 属性。

`JavaScript` 也可以使用 `Object` 函数显式地将基本类型转换为包装类型：

```js
var a = 'abc';
Object(a); //String {"abc"}
```

也可以使用 `valueOf` 方法将包装类型倒转成基本类型：

```js
var a = 'abc';
var b = Object(a);
var c = b.valueOf(); //'abc'
```

看看如下代码会打印出什么：

```js
var a = new Boolean(false);
if (!a) {
  console.log('Oops'); //never runs
}
```

答案是什么都不会打印，因为虽然包裹的基本类型是 `false`，但是 `false` 被包裹成包装类型后就成了对象，所以其非值为 `false`，所以 循环体中的内容不会运行。

## 10. 一段 js 代码是怎么被 js 引擎解析并执行的

- js 引擎会将 js 代码转换成抽象语法树（AST），然后再将 AST 转换成字节码，最后再将字节码转换成机器码，最终执行机器码
- js 引擎的执行过程
  - 解析：将代码转换成 AST
  - 优化：对 AST 进行优化，比如将变量声明提升到作用域的最前面
  - 生成：将 AST 转换成字节码
  - 执行：将字节码转换成机器码，最终执行机器码

## 11. 函数是怎么执行的，进栈出栈，怎么确定 this 指向

- 函数执行时，会创建一个执行上下文，然后将执行上下文压入执行栈中，然后执行函数中的代码，执行完毕后，将执行上下文从执行栈中弹出
- this 指向是在函数执行时确定的，而不是在函数定义时确定的

## 12. const 对象的属性可以修改吗

`const` 保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动。对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。

但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，`const` 只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。

## 13. 箭头函数与普通函数的区别

- 箭头函数比普通函数更加简洁
- 箭头函数没有自己的 `this`
- `call()`、`apply()`、`bind()`等方法不能改变箭头函数中 `this` 的指向
- 箭头函数不能作为构造函数使用
- 箭头函数不能用作 `Generator` 函数，不能使用 `yield` 关键字

## 14. 如果 new 一个箭头函数会怎么样

箭头函数是 `ES6` 中的提出来的，它没有 `prototype`，也没有自己的 `this` 指向，更不可以使用 `arguments` 参数，所以不能 New 一个箭头函数。

`new` 操作符的实现步骤如下：

1. 创建一个对象
2. 将构造函数的作用域赋给新对象（也就是将对象的 `proto` 属性指向构造函数的 `prototype` 属性）
3. 指向构造函数中的代码，构造函数中的 this 指向该对象（也就是为这个对象添加属性和方法）
4. 返回新的对象

所以，上面的第二、三步，箭头函数都是没有办法执行的。

## 15. 箭头函数的 this 指向哪里？

箭头函数不同于传统 `JavaScript` 中的函数，箭头函数并没有属于自己的 `this`，它所谓的 `this` 是捕获其所在上下文的 `this` 值，作为自己的 `this` 值，并且由于没有属于自己的 `this`，所以是不会被 `new` 调用的，这个所谓的 `this` 也不会被改变。可以⽤ Babel 理解⼀下箭头函数:

```js
// ES6
const obj = {
  getArrow() {
    return () => {
      console.log(this === obj);
    };
  },
};
// 转化后：
// ES5，由 Babel 转译
var obj = {
  getArrow: function getArrow() {
    var _this = this;
    return function () {
      console.log(_this === obj);
    };
  },
};
```

## 16. 执行上下文是什么？this 和执行上下文有什么关系？

执行上下文是 `JavaScript` 中的运行环境

分为三种：

- 全局执行上下文，也就是 `JavaScript` 中的 `window` 对象，也就是全局作用域
- 函数执行上下文，也就是函数执行时的上下文，包括 `this`、`arguments`、`作用域链`等
- `eval` 执行上下文，也就是 `eval` 函数执行时的上下文

### 16.1. 和 this 有什么关系？

`this` 的值在函数被调用时才会被确定，它的值取决于函数的调用方式，也就是函数的执行上下文。

## 17. 扩展运算符的作用及使用场景

（1）对象扩展运算符对象的扩展运算符 (`...`) 用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。

```js
let bar = { a: 1, b: 2 };
let baz = { ...bar }; // { a: 1, b: 2 }
```

上述方法实际上等价于:

```js
let bar = { a: 1, b: 2 };
let baz = Object.assign({}, bar); // { a: 1, b: 2 }
```

`Object.assign` 方法用于对象的合并，将源对象（`source`）的所有可枚举属性，复制到目标对象（`target`）。`Object.assign` 方法的第一个参数是目标对象，后面的参数都是源对象。(如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性)。  
同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

```js
let bar = { a: 1, b: 2 };
let baz = { ...bar, ...{ a: 2, b: 4 } }; // {a: 2, b: 4}
```

利用上述特性就可以很方便的修改对象的部分属性。在 `redux` 中的 `reducer` 函数规定必须是一个纯函数，reducer 中的 state 对象要求不能直接修改，可以通过扩展运算符把修改路径的对象都复制一遍，然后产生一个新的对象返回。

## 18. Proxy 可以实现什么功能？

在 Vue3.0 中通过 `Proxy` 来替换原本的 `Object.defineProperty` 来实现数据响应式。

`Proxy` 是 `ES6` 中新增的功能，它可以用来自定义对象中的操作。

```js
let p = new Proxy(target, handler);
```

`target` 代表需要添加代理的对象，`handler` 用来自定义对象中的操作，比如可以用来自定义 `set` 或者 `get` 函数。

下面来通过 `Proxy` 来实现一个数据响应式：

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value, property);
      return Reflect.set(target, property, value);
    },
  };
  return new Proxy(obj, handler);
};
let obj = { a: 1 };
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`);
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`);
  },
);
p.a = 2; // 监听到属性a改变
p.a; // 'a' = 2
```

在上述代码中，通过自定义 `set` 和 `get` 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。

当然这是简单版的响应式实现，如果需要实现一个 `Vue` 中的响应式，需要在 `get` 中收集依赖，在 `set` 派发更新，之所以 Vue3.0 要使用 `Proxy` 替换原本的 `API` 原因在于 `Proxy` 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 `Proxy` 可以完美监听到任何方式的数据改变，唯一缺陷就是浏览器的兼容性不好。

## 19. 常用的正则表达式有哪些

```js
// （1）匹配 16 进制颜色值
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;

// （2）匹配日期，如 yyyy-mm-dd 格式
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// （3）匹配 qq 号
var regex = /^[1-9][0-9]{4,10}$/g;

// （4）手机号码正则
var regex = /^1[34578]\d{9}$/g;

// （5）用户名正则
var regex = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/;
```

## 20. JavaScript 脚本延迟加载的方式有哪些？

- `script defer` 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 `defer` 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
- `script async` 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 `js` 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 `async` 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
- 动态的创建 `script` 标签来引入 `js` 脚本
- 使用 `setTimeout` 延迟
- 让 `JS` 放在文档的底部

## 21. 什么是 DOM 和 BOM？

- DOM 全称是 Document Object Model，也就是文档对象模型。 图中区域 5
- BOM 全称是 Browser Object Model，也就是浏览器对象模型。 图中区域 1、2、3、4  
   ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20221031144444.png)

## 22. 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?

`arguments` 是一个对象，它的属性是从 0 开始依次递增的数字，还有 `callee` 和 `length` 等属性，与数组相似；但是它却没有数组常见的方法属性，如 `forEach`, `reduce` 等，所以叫它们类数组。

遍历类数组，有三个方法

- 将数组的方法应用到类数组上，这时候就可以使用 `call` 和 `apply` 方法，如：

  ```js
  function foo() {
    Array.prototype.forEach.call(arguments, (a) => console.log(a));
  }
  ```

- 使用 `Array.from` 方法将类数组转化成数组：‌

  ```js
  function foo() {
    const arrArgs = Array.from(arguments);
    arrArgs.forEach((a) => console.log(a));
  }
  ```

- 使用展开运算符将类数组转化成数组

  ```js
  function foo() {
    const arrArgs = [...arguments];
    arrArgs.forEach((a) => console.log(a));
  }
  ```

## 23. escape、encodeURI、encodeURIComponent 的区别

- 字符串编码
  - `escape` 是对字符串(`string`)进行编码(而另外两种是对 `URL`)，作用是让它们在所有电脑上可读。其中 `ASCII 字母 数字 @\*/+` 这几个字符不会被编码，其余的都会
- URI 编码
  - `encodeURI` 是对整个 `URI` 进行转义，将 `URI` 中的非法字符转换为合法字符，所以对于一些在 `URI` 中有特殊意义的字符不会进行转义。
  - `encodeURIComponent` 是对 `URI` 的组成部分进行转义，所以一些特殊字符也会得到转义。当需要编码 `URL` 中的参数的时候，那么 `encodeURIComponent` 是最好方法。
    ```js
    const uri = 'http://www.cnblogs.com/season-huang/some other thing';
    encodeURI(uri); // 'http://www.cnblogs.com/season-huang/some%20other%20thing'
    encodeURIComponent(uri); // 'http%3A%2F%2Fwww.cnblogs.com%2Fseason-huang%2Fsome%20other%20thing'
    ```

## 24. 封装一个 ajax 请求

```js
//封装一个ajax请求
function ajax(options) {
  //创建XMLHttpRequest对象
  const xhr = new XMLHttpRequest();

  //初始化参数的内容
  options = options || {};
  options.type = (options.type || 'GET').toUpperCase();
  options.dataType = options.dataType || 'json';
  const params = options.data;

  //发送请求
  if (options.type === 'GET') {
    xhr.open('GET', options.url + '?' + params, true);
    xhr.send(null);
  } else if (options.type === 'POST') {
    xhr.open('POST', options.url, true);
    xhr.send(params);
  }
  //接收请求
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  };
}
```

> readyState  
> ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20221031151530.png)

## 25. 什么是尾调用，使用尾调用有什么好处？

- 含义：尾调用指的是函数的最后一步调用另一个函数。
- 好处：代码执行是基于执行栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。但如果使用尾调用的话，因为已经是函数的最后一步，所以这时可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化

> ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

## 26. 什么是闭包？闭包的优缺点？有哪些常见的闭包使用场景？

### 26.1. 闭包

闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。

```js
// bar 是一个闭包
function foo() {
  var a = 2;
  function bar() {
    console.log(a);
  }
  return bar;
}
```

### 26.2. 闭包的优缺点

- 优点
  - 可以读取函数内部的变量
  - 让这些变量的值始终保持在内存中
- 缺点
  - 会增大内存使用量
  - 使用不当很容易造成内存泄漏

### 26.3. 常见的闭包使用场景

- 防抖和节流
- react hooks

### 26.4. 用了闭包怎么防止内存泄漏

- 闭包的作用域链中保存着父级作用域中的变量，如果父级作用域中的变量不再被使用，那么这些变量就会一直保存在内存中，造成内存泄漏。
- 解决方法：在父级作用域中，将不再使用的变量设置为 `null`，这样就可以解除对这些变量的引用，从而释放内存。

## 27. 防抖、节流

- 防抖和节流的作用都是防止函数多次调用
- 防抖：任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。
  - 应用场景(执行最后一次)
    - input 在 onchange 时候的触发(用户输入验证/搜索等)
    - 按钮重复点击(也是一种场景，不过我习惯用 btnLoading)
  - 代码实现
    ```js
    // 可以立即执行的实现
    const debounce = (fn, ms = 500, immediate = false) => {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        if (immediate) {
          const callNow = !timeoutId;
          timeoutId = setTimeout(() => {
            timeoutId = null;
          }, ms);
          if (callNow) fn.apply(this, args);
        } else {
          timeoutId = setTimeout(() => fn.apply(this, args), ms);
        }
      };
    };
    ```
- 节流：指定时间间隔内只会执行一次任务；

  - 应用场景(有间隔地持续执行)
    - 鼠标滚动时会执行的函数
    - 窗口 resize
    - 拖拽(slider)
  - 代码实现

  ```js
  const throttle = (fn, ms) => {
    let canRun = true;
    let timer;
    let lastTime = Date.now();
    return function (...args) {
      if (canRun) {
        fn.apply(this, args);
        canRun = false;
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (Date.now() - lastTime >= ms) {
            fn.apply(this, args);
            lastTime = Date.now();
          }
        }, Math.max(ms - (Date.now() - lastTime), 0));
      }
    };
  };
  ```

> - 参考：[掘金——函数节流与函数防抖](https://juejin.im/entry/58c0379e44d9040068dc952f)
> - 参考：[InterviewMap——防抖](https://yuchengkai.cn/docs/frontend/#%E9%98%B2%E6%8A%96)
> - 参考：[github issues——节流和防抖的个人见解](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/5)

## 28. 重绘和回流（重绘和重排）

- 回流也叫重排
- 当对 DOM 结构的修改引发 DOM 几何尺寸变化的时候，会发生回流的过程
  - 一个 DOM 元素的几何属性变化，常见的几何属性有 width、height、padding、margin、left、top、border 等等
  - 使 DOM 节点发生增减或者移动
  - 读写 offset 族、scroll 族和 client 族属性的时候，浏览器为了获取这些值，需要进行回流操作
  - 调用 window.getComputedStyle 方法
- 当 DOM 的修改导致了样式的变化，并且没有影响几何属性的时候，会导致重绘(repaint)
  - 例如改变元素背景色时
  - visibility: hidden 隐藏一个 DOM 节点-只触发重绘
- 重绘不一定导致回流，但回流一定发生了重绘。
- 如何减少重绘和回流

  - 不要逐个变样式

    ```js
    // bad
    var left = 10,
      top = 10;
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    // better
    el.className += ' theclassname';
    // 当top和left的值是动态计算而成时...
    // better
    el.style.cssText += '; left: ' + left + 'px; top: ' + top + 'px;';
    ```

  - 不要频繁计算样式
    ```js
    // no-no!
    for (big; loop; here) {
      el.style.left = el.offsetLeft + 10 + 'px';
      el.style.top = el.offsetTop + 10 + 'px';
    }
    // better
    var left = el.offsetLeft,
      top = el.offsetTop;
    esty = el.style;
    for (big; loop; here) {
      left += 10;
      top += 10;
      esty.left = left + 'px';
      esty.top = top + 'px';
    }
    ```
  - 对于 resize、scroll 等进行防抖/节流处理
  - 使用[createDocumentFragment](https://www.jianshu.com/p/8ae83364c09c)
    > - 参考：[翻译计划-重绘重排重渲染](https://xdlrt.github.io/2016/11/05/2016-11-05/)
    > - 参考：[谈谈你对重绘和回流的理解](https://juejin.im/post/6844904021308735502#heading-54)

## 29. 作用域

- 作用域链  
   在查找变量的时候，先在函数作用域中查找，没有找到，再去全局作用域中查找，有一个从里往外查找的过程。 ![image](https://note.youdao.com/yws/public/resource/9791688f8f13043d64eb2ded545dc193/xmlnote/F1866E20E2F34E769495F1BEF73D6803/4723)
- 词法作用域(静态作用域)  
   JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了，即在书写代码时就确定了
  ```js
  var value = 1;
  function foo() {
    console.log(value);
  }
  function bar() {
    var value = 2;
    foo();
  }
  bar(); // 1
  // 执行 foo 函数时，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。
  ```
- 动态作用域  
   动态作用域与词法作用域相反，函数的作用域是在函数调用的时候才决定的。  
   上面代码如果是动态作用域，则会输出 2

## 30. 深拷贝和浅拷贝

### 30.1. 浅拷贝

浅拷贝只会拷贝一层对象，如果对象的属性值是对象类型，那么拷贝出来的结果是对象的引用。

```js
var obj = {
  a: 1,
  b: {
    c: 2,
  },
};
var obj2 = Object.assign({}, obj);
obj2.a = 3;
obj2.b.c = 4;
console.log(obj); // {a: 1, b: {c: 4}}
console.log(obj2); // {a: 3, b: {c: 4}}
```

### 30.2. 深拷贝

深拷贝会把一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，修改新对象不会影响原对象。

```js
var obj = {
  a: 1,
  b: {
    c: 2,
  },
};
var obj2 = JSON.parse(JSON.stringify(obj));
obj2.a = 3;
obj2.b.c = 4;
console.log(obj); // {a: 1, b: {c: 2}}
console.log(obj2); // {a: 3, b: {c: 4}}
```

### 30.3. 赋值和浅拷贝深拷贝的区别

赋值是将某一数值或对象赋给某个变量的过程，分两种情况：

- 基本数据类型：赋值，赋值后两个变量互不影响
- 引用数据类型: 赋址，两个变量指向同一个地址，同一个对象，相互之间有影响

对引用数据类型进行赋址操作，两个变量指向同一个对象，改变变量 a 的值会影响变量 b 的值，哪怕改变的只是对象 a 中的基础数据类型：

```js
var a = {
  name: 'Jane',
  book: {
    name: 'Vue.js',
    price: 50,
  },
};
var b = a;
b.name = 'hahaha';
b.book.price = 52;
console.log(a); // { name: 'hahaha', book: { name: 'Vue.js', price: 52 } }
console.log(b); // { name: 'hahaha', book: { name: 'Vue.js', price: 52 } }
```

### 30.4. 常用深拷贝、浅拷贝方法

- 浅拷贝
  - Object.assign: 第一级属性是深拷贝，第二级属性是浅拷贝
  - 扩展运算符: 第一级属性是深拷贝，第二级属性是浅拷贝
  - Array.prototype.slice()
  - Array.prototype.concat()
  - Array.from()
- 深拷贝
  - 递归
    ```js
    function deepClone(obj) {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }
      let result = Array.isArray(obj) ? [] : {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          result[key] = deepClone(obj[key]);
        }
      }
      return result;
    }
    ```
  - JSON parse
    ```js
    function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    ```
  - lodash
    ```js
    function deepClone(obj) {
      return _.cloneDeep(obj);
    }
    ```

## 31. ES6 模块与 CommonJS 模块有什么异同？

- `CommonJS` 模块是运行时加载，`ES6 Modules` 是编译时加载模块
- `CommonJS` 输出是值的拷贝；`ES6 Modules` 输出的是值的引用

  ```js
  // CommonJS模块
  let { stat, exists, readFile } = require('fs');
  // 等同于
  let _fs = require('fs');
  let stat = _fs.stat;
  let exists = _fs.exists;
  let readFile = _fs.readFile;
  ```

  上面代码的实质是整体加载 `fs` 模块（即加载 `fs` 的所有方法），生成一个对象（`\_fs`），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

  ```js
  // ES6模块
  import { stat, exists, readFile } from 'fs';
  ```

  上面代码的实质是从 `fs` 模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 `ES6` 可以在编译时就完成模块加载，效率要比 `CommonJS` 模块的加载方式高。当然，这也导致了没法引用 `ES6` 模块本身，因为它不是对象。

## 32. Iterator 接口

- 原生具备 Iterator 接口的数据结构如下
  - Array
  - Map
  - Set
  - String
  - TypedArray
  - 函数的 arguments 对象
  - NodeList 对象
- 默认调用 Iterator 接口的场合
  - 解构赋值
  - 扩展运算符
  - yield\*
  - for...of
  - Array.from()
  - Map(), Set(), WeakMap(), WeakSet()（比如 new Map([['a',1],['b',2]])）
  - Promise.all()
  - Promise.race()

## 33. for 循环使用 await，for of 以及 for await of

```js
function getData(times) {
  times = times || 0;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(times);
    }, times * 1000);
  });
}
```

- for

  ```js
  let arrays = [2, 1, 3];
  async function execute() {
    for (let i = 0; i < arrays.length; i++) {
      let data = await getData(arrays[i]);
      console.log('返回结果：' + data);
    }
  }
  execute();
  //Promise {<pending>} // 立即返回Promise
  // 返回结果：2 // 2秒后打印
  // 返回结果：1  // 1秒后打印
  // 返回结果：3 // 3秒后打印
  ```

- for of
  ```js
  let arrays = [2, 1, 3];
  async function execute() {
    let index = 1;
    for (let item of arrays) {
      let data = await getData(item);
      console.log('返回结果：' + data);
    }
  }
  execute();
  //Promise {<pending>} // 立即返回Promise
  // 返回结果：2 // 2秒后打印
  // 返回结果：1  // 1秒后打印
  // 返回结果：3 // 3秒后打印
  ```
- for await...of: 异步迭代器，该方法是主要用来遍历异步对象。是 ES2018 中引入方法。

  ```js
  let arrays = [getData(2), getData(1), getData(3)];
  async function execute() {
    for await (let item of arrays) {
      console.log('返回结果：' + item);
    }
  }
  execute();
  //Promise {<pending>} // 立即返回Promise
  // 返回结果：2 // 2秒后同时返回2和1
  // 返回结果：1
  // 返回结果：3 // 又过了1秒返回3
  ```

总结

- `for`、`for of` 是 `await` 这一行代码在等待，`for await of` 是整个 `for` 在等待；
- `for...of` 循环用于遍历同步的 `Iterator` 接口。新引入的 `for await...of` 循环，则是用于遍历异步的 `Iterator` 接口
- `forEach` 中使用 `await` 无效
- `map`、`filter`、`reduce` 中使用 `await` 将返回一个 `promise`，还需再使用 `Promise.all` 来获取结果

## 34. forEach 和 map 的区别

- `map` 方法会分配内存空间存储新数组并返回
- `forEach` 方法没有返回值，而是直接对原数组进行操作

> 注: forEach 和 map 不能跳出循环，for of 可以跳出循环

## 35. for...in 和 for...of 的区别

- `for...in` 循环遍历的是对象的属性名，包括原型链上的属性。遍历的顺序是不确定的
- `for...of` 循环遍历的是对象的属性值，不包括原型属性和索引。是 `ES6` 新增的遍历方式
- `for...in` 比较适合用来遍历对象，也可以遍历数组，但是会存在一些问题
  - 遍历数组时，会遍历数组的原型链上的属性，而且遍历的顺序不是按照数组的顺序来的，而是按照对象的顺序来的，所以不建议使用 `for in` 来遍历数组
  - 如果不想遍历原型方法和属性的话，可以在循环内部判断一下，使用 `hasOwnProperty()`方法可以判断某属性是不是该对象的实例属性
- 一个数据结构只要部署了 `Symbol.iterator` 属性，就被视为具有 `iterator` 接口，就可以用 `for...of` 循环遍历它的成员

## 36. 数组迭代方法

- forEach map reduce filter some every  
  ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/arr.png)

  > 参考 [掘金——数组迭代方法图解](https://juejin.im/post/5835808067f3560065ed4ab2)

- reduce:

  - 语法 `arr.reduce(callback,[initialValue])`
    - callback （执行数组中每个值的函数，包含四个参数）
      - previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
      - currentValue （数组中当前被处理的元素）
      - index （当前元素在数组中的索引）
      - array （调用 reduce 的数组）
    - initialValue （作为第一次调用 callback 的第一个参数。）
  - 举例

    ```js
    var arr = [
      { id: 1, type: 'A', total: 3 },
      { id: 2, type: 'B', total: 5 },
      { id: 3, type: 'E', total: 7 },
    ];
    // 统计 total 的总和
    arr.reduce((sum, { total }) => {
      return sum + total;
    }, 0); // 15

    // 转换成对象
    arr.reduce((res, { id, type, total }) => {
      res[id] = { type, total };
      return res;
    }, {});
    // {1:{type: 'A', total: 3}, 2: { type: 'B', total: 5 },{ type: 'E', total: 7 }}
    ```

- slice splice
  - slice
    - 可操控 Array 及 String
    - 返回新数组，不该变原值
    - `arr.slice(begin)` / `arr.slice(begin, end)`
  - splice
    - 可操控 Array
    - 从 Array 中添加/刪除项目，返回被刪除的项目。会改变原值
    - `array.splice(start, deleteCount, item1, item2, ...)`
      - start 增加/刪除項目的位置，負數代表從後方算起。
      - deleteCount 刪除的個數，如為 0 則不會刪除。
      - item… 添加的新項目。

## 37. string 有哪些方法

### 37.1. 常用方法

- `charAt()`: 返回指定位置的字符
- `charCodeAt()`: 返回指定位置的字符的 Unicode 编码
- `concat()`: 连接两个或多个字符串
- `indexOf()`: 返回某个指定的字符串值在字符串中首次出现的位置
- `lastIndexOf()`: 返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索
- `match()`: 找到一个或多个正则表达式的匹配
- `replace()`: 替换与正则表达式匹配的子串
- `slice()`: 提取字符串的片断，并在新的字符串中返回被提取的部分，不改变原字符串
- `split()`: 把字符串分割为字符串数组
- `substr()`: 从起始索引号提取字符串中指定数目的字符，不改变原字符串
- `substring()`: 提取字符串中两个指定的索引号之间的字符，不改变原字符串
- `toLowerCase/toUpperCase()`: 把字符串转换为小写
- `trim()`: 删除字符串的头尾空白符
- `valueOf()`: 返回某个字符串对象的原始值

### 37.2. ES6+ 新增方法

- `repeat()`: 返回一个新字符串，表示将原字符串重复 n 次
- `padStart()`: 用另一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的头部（左侧）开始填充
- `padEnd()`: 用另一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的尾部（右侧）开始填充
- `startsWith()`: 判断当前字符串是否以另外一个给定的子字符串“开始”，根据判断结果返回 true 或 false
- `endsWith()`: 判断当前字符串是否以另外一个给定的子字符串“结束”，根据判断结果返回 true 或 false
- `includes()`: 判断一个字符串是否包含在另一个字符串中，根据判断结果返回 true 或 false
- `codePointAt()`: 返回一个字符串中指定位置的字符的 Unicode 编码，接受一个参数
- `trimStart()`: 删除字符串头部的空白符
- `trimEnd()`: 删除字符串尾部的空白符
- `trimLeft()`: 删除字符串头部的空白符
- `trimRight()`: 删除字符串尾部的空白符
- `replaceAll()`: 替换所有匹配项

### 37.3. 如何反转字符串

```js
// 方法一
function reverseString(str) {
  return str.split('').reverse().join('');
}

// 方法二
function reverseString(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

// 方法三
function reverseString(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    console.log('%c zjs str[i]:', 'color: #fff;background: #b457ff;', str[i], result);
    result = str[i] + result;
  }
  return result;
}
```

### 37.4. 如何判断字符串是否包含某个字符

```js
// 方法一
function isInclude(str, target) {
  return str.indexOf(target) !== -1;
}

// 方法二
function isInclude(str, target) {
  return str.includes(target);
}
```

### 37.5. substring 和 substr 的区别

- `substring(start, end)`  
  返回字符串的一个子串，其内容是从 start 处到 end-1 处的所有字符，或从 start 处到字符串末尾的所有字符。如果参数为负数，则被当作 0。如果 end 小于 start，则两者交换。
  ```js
  var str = 'Mozilla';
  console.log(str.substring(1, 3)); // expected output: "oz"
  console.log(str.substring(2)); // expected output: "zilla"
  ```
- `substr(start, length)`  
  返回一个从 start 处开始的指定长度的子字符串。如果第二个参数 length 未指定，则返回从 start 处开始到原字符串结尾的子字符串。如果参数为负数，则被当作 0。
  ```js
  var str = 'Mozilla';
  console.log(str.substr(1, 3)); // expected output: "ozi"
  console.log(str.substr(2)); // expected output: "zilla"
  ```

## 38. addEventListener 方法的参数和使用

```js
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);
target.addEventListener(type, listener, useCapture, wantsUntrusted);
```

- `type`  
  一个区分大小写的字符串，表示要侦听的事件类型。
- `listener`  
  一个监听器对象，或者是一个实现了 EventListener 接口的对象，或者是一个函数。
- `options`

  - `capture?:boolean`  
    可选的一个布尔值，指示此类型的事件将在被分派到 `DOM` 树中它下面的 `listener` 任何事件之前被分派到 已注册的。`EventTarget` 如果未指定，则默认为 `false`.

  - `once?:boolean`  
    指示 `listener` 在添加后最多应调用一次。如果 `true`，则 `listener` 在调用时将自动删除。如果未指定，则默认为 `false`.

  - `passive?:boolean`  
    可选的一个布尔值，如果 `true`，则表示由 指定的函数 `listener` 永远不会调用 `preventDefault()`。如果被动侦听器确实调用 `preventDefault()`了，则用户代理除了生成控制台警告外什么都不做。一般情况下默认为 `false` 。在 `Safari` 和 `Internet Explorer` 以外的浏览器中，`wheel`, `mousewheel`, `touchstart`， `touchmove` 事件默认为`true`

  - `signal:AbortSignal`  
    当调用给定 `AbortSignal` 对象的 `abort()` 方法时，侦听器将被删除。如果未指定，则 `noAbortSignal` 与侦听器相关联。

## 39. this 的指向以及 call、apply、bind 的区别

### 39.1. this 的指向

this 永远指向最后调用它的那个对象

### 39.2. call、apply、bind 的区别

> call、apply、bind 都是用来改变函数的 this 对象的指向的

- `apply` 接收两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数是一个参数数组 `fun.apply(this, [arg1, arg2, ...])`
- `call` 和 `apply` 功能一样，区别在于接收的是若干个参数列表 `fun.call(this, arg1, arg2, ...)`
- `bind` 返回一个函数，需要手动调用。参数形式和 `call` 一致，第一个参数是 this 指向，后面的参数是函数的参数 `fun.bind(this, arg1, arg2, ...)()`

> 参考： https://juejin.cn/post/6844903496253177863

## 40. 对原型链的理解

- 原型链是一种机制，指的是 `JavaScript` 每个对象都有一个内置的 `__proto__` 属性指向它的原型对象
- 它的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的 `__proto__` 属性所指向的那个对象里找，如果父对象也不存在这个属性，则继续往上找，直到原型链顶端 `null`，由以上这种通过 `__proto__` 属性来连接对象直到 `null` 的一条链即为我们所谓的原型链
- 我们平时调用的字符串方法、数组方法、对象方法、函数方法等都是靠 `__proto__` 继承而来的。
- 图形理解  
  ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20230118175459.png)

1.  实例的**proto** === 其构造函数的 prototype ![](https://note.youdao.com/yws/public/resource/5decefaed3b17cd4bab92965ace4d207/xmlnote/36A4E7356D3A42A6A8655EEEF65CEEB2/4117)

    ```js
    function Person(name) {
      this.name = name;
    }
    let p = new Person('longzi');
    console.log(p.__proto__); // Person.prototype
    console.log(Person.__proto__); // Function.prototype
    ```

2.  `Function.__proto__ === Function.prototype`</br> ![](https://note.youdao.com/yws/public/resource/5decefaed3b17cd4bab92965ace4d207/xmlnote/E02A3DBFB32641C7A10EBC8982CCB875/4114)
3.  原型链的最顶层都是 null

> 参考: [CSDN——prototype、proto 与 constructor](https://blog.csdn.net/cc18868876837/article/details/81211729)  
> 参考: [知乎——JavaScript 世界万物诞生记](https://zhuanlan.zhihu.com/p/22989691)

## 41. 实现继承的几种方式

```js
// 假设有父类 Parent
function Parent(name, age) {
  this.name = name;
  this.age = age;
  this.colors = ['red', 'blue', 'yellow'];
}
Parent.prototype.showName = function () {
  console.log(this.name);
};
```

- 原型链继承

  ```js
  function Child() {}
  Child.prototype = new Parent(); // 原型链继承

  var a = new Child();
  var b = new Child();
  // 可以访问到父类的属性和方法，但是无法向实例传参
  console.log(a.showName()); // undefined
  console.log(a.colors); // ["red","blue","yellow"]
  console.log(b.colors); // ["red","blue","yellow"]

  // colors 是引用类型，所以会影响到其他实例
  a.colors.push('black');
  console.log(a.colors); // ["red","blue","yellow","black"]
  console.log(b.colors); // ["red","blue","yellow","black"]
  ```

- 构造函数继承

  ```js
  function Child(name, age) {
    Parent.call(this, name, age); // 或apply  构造函数继承
  }

  Child.prototype.showChildName = function () {
    console.log(this.name);
  };

  // 可以向实例传参
  var child1 = new Child('longzi', 23);
  var child2 = new Child('xiaofeng', 18);

  // 修改引用类型的属性，不会影响到其他实例
  child1.colors.push('black');
  console.log(child1.colors); // ["red", "blue", "yellow", "black"]
  console.log(child2.colors); //["red", "blue", "yellow"]

  // 可以继承父类的属性和方法
  console.log(child1.name, child1.age); // longzi, 23
  console.log(child2.name, child2.age); // xiaofeng, 18
  console.log(child1.showChildName()); // longzi
  console.log(child2.showChildName()); // xiaofeng

  // 无法继承父类原型上的属性和方法
  console.log(child1.showName()); // Uncaught TypeError: child1.showName is not a function
  console.log(child2.showName()); // Uncaught TypeError: child2.showName is not a function
  ```

- 组合继承(原型链+构造函数)

  ```js
  function Child(name, age) {
    Parent.call(this, name, age); // 构造函数继承
  }
  Child.prototype = new Parent(); // 原型链继承

  // 可以向实例传参
  var child1 = new Child('longzi', 23);
  var child2 = new Child('xiaofeng', 18);

  // 修改引用类型的属性，不会影响到其他实例
  child1.colors.push('black');
  console.log(child1.colors); // ["red", "blue", "yellow", "black"]
  console.log(child2.colors); //["red", "blue", "yellow"]

  // 可以继承父类原型上的属性和方法
  console.log(child1.showName()); // longzi
  ```

- Object.create()  
  使用现有的对象来作为新创建对象的原型
  ```js
  function Child(name, age) {
    Parent.call(this, name, age); // 构造函数继承
  }
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child; // 修正构造函数指向
  var child1 = new Child('longzi', 23);
  var child2 = new Child('xiaofeng', 18);
  child1.colors.push('black');
  console.log(child1.colors); // ["red", "blue", "yellow", "black"]
  console.log(child2.colors); //["red", "blue", "yellow"]
  console.log(child1.showName()); // longzi
  ```
- ES6: extends
  ```js
  class Parent {}
  class Child1 extends Parent {
    constructor(x, y, colors) {
      super(x, y); // 调用父类的constructor(x, y)
      this.colors = colors;
    }
    toString() {
      return this.colors + ' ' + super.toString(); // 调用父类的toString()
    }
  }
  ```

| --- | 优点 | 缺点 |
| --- | --- | --- |
| 原型链继承 | 可以继承原型链上的属性和方法，查找效率高 | 1.父类实例属性为引用类型时，不恰当地修改会导致所有子类被修改</br> 2.无法给实例传递参数 |
| 构造函数继承 | 1.可以在 Child 中向 Parent 传参</br>2.避免了引用类型的属性被所有实例共享 | 父类原型上的东西是没法继承的 |
| 组合继承 | 解决上述两种方式的缺点 | 调用了两次父类的构造函数 |
| Object.create() | 1.解决上述三种方式的缺点</br>2.ES5 首选 | 暂无 |
| class.extends | 清晰 方便 | 注意：子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。 |

## 42. new 内部的原理，如何实现一个 new

```js
function _new() {
  // 创建一个空对象
  var obj = new Object();
  // .shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值
  // 获取构造函数，arguments 中去除第一个参数
  var Constructor = [].shift.call(arguments);
  // 将新创建的空对象的隐式原型指向其构造函数的显示原型
  obj.__proto__ = Constructor.prototype;
  // 改变构造函数的 this 指向，指向新创建的对象
  var ret = Constructor.apply(obj, arguments);
  // 如果构造函数返回的是一个对象，则返回该对象，否则返回新创建的对象
  return typeof ret === 'object' ? ret : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

var person = _new(Person, 'longzi', 23);
console.log(person.name, person.age); // longzi, 23
```

## 43. 如何判断一个对象是否属于某个类

```js
function Person() {
  this.name = 'longzi';
  this.age = 23;
}
var person = new Person();

// instanceof
console.log(person instanceof Person); // true

// constructor
console.log(person.constructor === Person); // true
```

## 44. Set、Map、WeakSet、WeakMap

- Set

  - Set 类似于数组，但是成员的值都是唯一的，没有重复的值
  - Set 本身是一个构造函数，用来生成 Set 数据结构
  - Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化
  - 使用 Set 可以很容易地实现并集、交集和差集

    ```js
    let a = new Set([1, 2, 3]);
    let b = new Set([4, 3, 2]);

    // 并集
    let union = new Set([...a, ...b]);
    // Set {1, 2, 3, 4}

    // 交集
    let intersect = new Set([...a].filter((x) => b.has(x)));
    // set {2, 3}

    // 差集
    let difference = new Set([...a].filter((x) => !b.has(x)));
    // Set {1}
    ```

    ```js
    const set = new Set([1, 2, 3, 4, 4]);
    // [1, 2, 3, 4]
    ```

  - Set 实例的属性和方法

    | 属性/方法                   | 说明                                         |
    | --------------------------- | -------------------------------------------- |
    | Set.prototype.constructor   | 构造函数，默认就是 Set 函数                  |
    | Set.prototype.size          | 返回 Set 实例的成员总数                      |
    | Set.prototype.add(value)    | 添加某个值，返回 Set 结构本身                |
    | Set.prototype.delete(value) | 删除某个值，返回一个布尔值，表示删除是否成功 |
    | Set.prototype.has(value)    | 返回一个布尔值，表示该值是否为 Set 的成员    |
    | Set.prototype.clear()       | 清除所有成员，没有返回值                     |

- Map

  - Map 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
  - Map 本身是一个构造函数，用来生成 Map 数据结构
  - Map 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化

    ```js
    const map = new Map([
      ['name', '张三'],
      ['title', 'Author'],
    ]);
    // Map { 'name' => '张三', 'title' => 'Author' }
    ```

  - Map 实例的属性和方法

    | 属性/方法 | 说明 |
    | --- | --- |
    | Map.prototype.constructor | 构造函数，默认就是 Map 函数 |
    | Map.prototype.size | 返回 Map 结构的成员总数 |
    | Map.prototype.set(key, value) | 设置键名 key 对应的键值为 value，然后返回整个 Map 结构。如果 key 已经有值，则键值会被更新，否则就新生成该键 |
    | Map.prototype.get(key) | 读取 key 对应的键值，如果找不到 key，返回 undefined |
    | Map.prototype.has(key) | 返回一个布尔值，表示某个键是否在当前 Map 对象之中 |
    | Map.prototype.delete(key) | 删除某个键，返回 true。如果删除失败，返回 false |
    | Map.prototype.clear() | 清除所有成员，没有返回值 |

- WeakSet

  - WeakSet 结构与 Set 类似，也是不重复的值的集合
  - WeakSet 的成员只能是对象，而不能是其他类型的值
  - WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中
  - WeakSet 不能遍历，方法也有限
  - WeakSet 没有 size 属性，没有办法遍历它的成员
  - WeakSet 有三个方法可用：add(value)、delete(value)、has(value)

- WeakMap

  - WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合
  - WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名
  - WeakMap 的键名所指向的对象，不计入垃圾回收机制
  - WeakMap 的键名所指向的对象，都是弱引用，如果没有其他的变量或属性引用这个对象的话，这个对象会被垃圾回收掉，不考虑这个对象还存在于 WeakMap 之中
  - WeakMap 没有遍历操作（即没有 keys()、values()和 entries()方法），也没有 size 属性
  - WeakMap 只有四个方法可用：get(key)、set(key, value)、has(key)、delete(key)

### 44.1. map 和 object 的区别

- Map 的键可以是各种类型的值，包括函数、对象、基本类型，而 Object 的键只能是字符串或 Symbols
- Map 中的键值是有序的，而添加到对象中的键则不是。因此，当对它进行遍历时，Map 对象是按插入的顺序返回键值
- Map 中的键值对个数可以通过 size 属性获取，而 Object 的键值对个数只能手动计算
- Object 的原型链上有一个 constructor 属性，指向构造函数 Object，而 Map 没有这个属性
- Map 中的键值对可以通过 clear 方法清空，而 Object 中的键值对只能一个一个删除
- Map 中的键值对可以通过 for...of 循环遍历，而 Object 中的键值对只能通过 Object.keys()、Object.values()、Object.entries()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols() 等方法遍历

## 45. 事件循环(EventLoop)

![](https://note.youdao.com/yws/public/resource/9791688f8f13043d64eb2ded545dc193/xmlnote/CDE1E05AA6924122A3BC9793CF2C6D0E/5042)

- 同步和异步任务分别进入不同的执行"场所"
- 同步的进入主线程，异步的进入 Event Table 并注册函数。
- 当指定的事情完成时，Event Table 会将这个函数移入 Event Queue。
- 主线程内的任务执行完毕为空，会去 Event Queue 读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的 Event Loop(事件循环)。

### 45.1. 宏任务，微任务

![](https://note.youdao.com/yws/public/resource/9791688f8f13043d64eb2ded545dc193/xmlnote/AC64F1B26FF04EB5A7724F4A8E2080F9/5052)

- 例子

  ```js
  console.log('1');

  setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
      console.log('3');
    });
    new Promise(function (resolve) {
      console.log('4');
      resolve();
    }).then(function () {
      console.log('5');
    });
  }, 500);
  process.nextTick(function () {
    console.log('6');
  });
  new Promise(function (resolve) {
    console.log('7');
    resolve();
  }).then(function () {
    console.log('8');
  });

  setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
      console.log('10');
    });
    new Promise(function (resolve) {
      console.log('11');
      resolve();
    }).then(function () {
      console.log('12');
    });
  }, 1000);
  // 1，7，6，8，2，4，3，5，9，11，10，12
  ```

  > 写的比较简略，详情请看参考:[掘金——这一次，彻底弄懂 JavaScript 执行机制](https://segmentfault.com/a/1190000018227028)

## 46. 柯里化

- 是高阶函数的一种特殊用法
- 定义：接收函数 A 作为参数，运行后能够返回一个新的函数，并且这个新的函数能够处理函数 A 的剩余参数。
- 实现
  - lodash.curry()
  - 简单实现，参数只能从右到左传递
    ```js
    function createCurry(fn, args) {
      let length = fn.length; // 指参数个数
      args = args || [];
      return function (...rest) {
        let _args = [...args, ...rest];
        if (_args.length < length) {
          return createCurry.call(this, fn, _args);
        } else {
          return fn.apply(this, _args);
        }
      };
    }
    ```
  - 30 seconds of code:
    ```js
    const curry = (fn, fnLength = fn.length, ...args) =>
      fnLength <= args.length ? fn(...args) : curry.bind(null, fn, fnLength, ...args);
    ```
- 例子
  ```js
  function add2(a, b, c) {
    return a + b + c;
  }
  createCurry(add)(1, 2, 3); // 6
  createCurry(add)(1, 2)(3); // 6
  createCurry(add)(1)(2)(3); // 6
  curry(add)(1)(2)(3); // 6
  curry(add)(1)(2, 3); // 6
  ```
  > - 参考：[llh911001——JS 函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch4.html#%E4%B8%8D%E4%BB%85%E4%BB%85%E6%98%AF%E5%8F%8C%E5%85%B3%E8%AF%AD%E5%92%96%E5%96%B1)
  > - 参考：[简书——深入详解函数的柯里化](https://www.jianshu.com/p/5e1899fe7d6b)
  > - 参考：[segmentfault——简述几个非常有用的柯里化函数使用场景](https://segmentfault.com/a/1190000015281061)

## 47. 常见设计模式和数据结构

设计模式

- 单例模式
  - 保证一个类仅有一个实例，并提供一个访问它的全局访问点。实现的方法为先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
  - 适用场景：一个单一对象，比如：弹窗，无论点击多少次，弹窗只应该被创建一次
- 装饰者模式
  - 在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法。
  - 举例：redux connect 与 Hoc
- 观察者模式
  - 定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。
  - 适用场景：发布订阅模式、vue 的 watch、react 的 useEffect
- 工厂模式
  - 定义一个用于创建对象的接口，让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。
  - 适用场景：创建对象、创建 DOM
- 代理模式
  - 为一个对象提供一个代用品或占位符，以便控制对它的访问。
  - 代理对象和本体对象具有一致的接口
  - 适用场景：图片懒加载、预加载、缓存
- 中介者模式
  - 对象和对象之间借助第三方中介者进行通信
  - 例如飞机只需要和塔台通信就知道其他飞机的状态，不需要和所有飞机通信
  - 适用场景：商城购买，多种场景都会触发 onchange
- 适配器模式
  - 将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。
  - 适用场景：兼容性问题
- 策略模式
  - 定义一系列的算法，把他们一个个封装起来，并且使他们可以相互替换。
  - 根据不同参数可以命中不同的策略
  - 适用场景：表单校验

发布订阅模式和观察者模式的区别

- 观察者模式里只有 2 个角色，一个是观察者，一个是被观察者，而发布订阅模式里有 3 个角色，一个是发布者，一个是订阅者，还有一个是消息中心。

数据结构

- 数组
  - 数组是一种线性表数据结构，用一组连续的内存空间，来存储一组具有相同类型的数据。
  - 数组的插入和删除操作，需要移动大量的元素，时间复杂度为 O(n)。
- 链表
  - 链表是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。
  - 链表的插入和删除操作，只需要修改指针的指向，时间复杂度为 O(1)。
  - 常见的链表有单链表、双向链表、循环链表等。
  - 已知哪些是通过链表实现的：Promise、LRU 缓存、文件系统、事件循环、react fiber 等。
- 栈
  - 栈是一种先进后出的数据结构，只能在一端插入和删除数据。
  - 常见的栈有函数调用栈、浏览器的前进后退等。
- 队列
  - 队列是一种先进先出的数据结构，只能在一端插入数据，在另一端删除数据。
  - 常见的队列有消息队列、打印队列等。
- 树
  - 树是一种非线性的数据结构，它是由 n(n>=1) 个有限节点组成一个具有层次关系的集合。
  - 常见的树有二叉树、二叉搜索树、平衡二叉树、红黑树、B 树、B+ 树、B\* 树、哈夫曼树等。

> 参考：[JavaScript 中常见设计模式整理](https://juejin.im/post/6844903607452581896)  
> 参考：[JavaScript 设计模式](https://juejin.im/post/6844903503266054157)

## 48. 前端工程化是什么？

前端工程化是指在开发过程中，提高开发效率，减少后期维护成本的一个方案。它应该考虑以下几个因素：

- 模块化
- 组件化
- 规范化(目录结构, 统一的编码规范, 文档规范, git 分支管理, mock 数据, 接口返回格式)
- 自动化(自动化测试, 自动化部署)

## 49. js 和 ts 的核心区别是什么

- js 是弱类型语言，ts 是强类型语言
- TypeScript 是静态类型语言，需要编译成 JavaScript 才能运行，所以可以在编译阶段就发现大部分错误，而 JavaScript 是动态类型语言，只有在运行时才会发现错误

## 50. AST 语法树

- 什么是 AST
  - 抽象语法树（Abstract Syntax Tree，AST），是源代码的抽象语法结构的树状表现形式。它是源代码的一种抽象语法结构的树状表现形式，用来表示源代码中各级语法结构之间的关系。它可以用来做语法分析、代码生成、代码优化等工作。
- 为什么要用 AST
  - 在编译器、IDE、Linter 等工具中，都需要对源代码进行解析，以便能够对源代码进行相应的处理。而解析源代码的过程，就是把源代码转换成 AST 的过程。因此，AST 是这些工具的基础。
- 常见的通过 AST 分析源代码的工具
  - babel: 实现对 JavaScript 语法的转换
  - eslint: 实现对 JavaScript 语法的检查
  - prettier: 实现对 JavaScript 语法的格式化
  - vue-loader: 实现对 Vue 组件的编译
  - webpack: 实现对模块依赖的解析
  - postcss: 实现对 CSS 语法的转换
  - rollup: 实现对模块依赖的解析
  - react: 实现对 JSX 语法的转换
  - vue: 实现对模板语法的转换
  - typescript: 实现对 TypeScript 语法的转换

## 51. js 分片是什么，什么场景会用到，怎么实现

- 分片是指将一个文件分成多个部分，每个部分都可以独立传输，最后再将这些部分组合起来，形成完整的文件。
- 场景：上传大文件，断点续传

### 51.1. 实现分片上传、断点续传

核心思想是利用 Blob.slice()方法将文件分片，然后将分片上传到服务器，最后将分片合并成完整的文件。

H5 的原生 File 对象 是 Blob 的子类，所以 File 也有 slice()方法，用法和 Blob 的 slice()方法一样。

通过缓存判断是否有上传过，如果有上传过，就从上次上传的位置开始上传。

最终在服务端将分片合并成完整的文件。

```js
// 用axios上传文件，实现进度显示和断点续传
function uploadFile(file, url) {
  const chunkSize = 2 * 1024 * 1024; // 每片2M
  const chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  const spark = new SparkMD5.ArrayBuffer();
  const fileReader = new FileReader();
  const formData = new FormData();
  // 判断是否有上传过，如果有上传过，就从上次上传的位置开始上传
  if (localStorage.getItem(file.name)) {
    currentChunk = localStorage.getItem(file.name);
  }
  const upload = () => {
    const start = currentChunk * chunkSize;
    const end = Math.min(file.size, start + chunkSize);
    fileReader.readAsArrayBuffer(file.slice(start, end));
  };
  fileReader.onload = (e) => {
    spark.append(e.target.result); // 每次读取一片，就计算一次md5
    formData.append('chunk', e.target.result); // 每次读取一片，就上传一片
    formData.append('filename', file.name); // 文件名
    formData.append('chunkIndex', currentChunk); // 当前是第几片
    formData.append('chunks', chunks); // 总共多少片
    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (e) => {
          const progress = Math.round((currentChunk / chunks) * 100);
          console.log(progress);
        },
      })
      .then((res) => {
        currentChunk++;
        localStorage.setItem(file.name, currentChunk); // 缓存上传到哪一片了
        if (currentChunk < chunks) {
          upload();
        } else {
          console.log('上传完成');
          console.log('文件唯一标识', spark.end());
        }
      });
  };
  upload();
}

const file = document.querySelector('#file').files[0];
uploadFile(file, 'http://localhost:3000/upload');
```
