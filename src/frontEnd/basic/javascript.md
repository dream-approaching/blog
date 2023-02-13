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

### 1. JavaScript 有哪些数据类型，它们的区别？

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

### 2. 数据类型检测的方式有哪些

#### 2.1. typeof

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

#### 2.2. instanceof

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

#### 2.3. constructor

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

#### 2.4. Object.prototype.toString.call()

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

### 3. null 和 undefined 区别

首先 `Undefined` 和 `Null` 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 `undefined` 和 `null。`

`undefined` 代表的含义是未定义，`null` 代表的含义是空对象。一般变量声明了但还没有定义的时候会返回 `undefined`，`null` 主要用于赋值给一些可能会返回对象的变量，作为初始化。

`undefined` 在 `JavaScript` 中不是一个保留字，这意味着可以使用 `undefined` 来作为一个变量名，但是这样的做法是非常危险的，它会 影响对 `undefined` 值的判断。我们可以通过一些方法获得安全的 `undefined` 值，比如说 `void 0`。

当对这两种类型使用 `typeof` 进行判断时，`Null` 类型化会返回 "`object`"，这是一个历史遗留的问题。当使用双等号对两种类型的 值进行比较时会返回 `true`，使用三个等号时会返回 `false`。

### 4. intanceof 操作符的实现原理及实现

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

### 5. 如何获取安全的 undefined 值？

因为 `undefined` 是一个标识符，所以可以被当作变量来使用和赋值， 但是这样会影响 `undefined` 的正常判断。表达式 `void ___` 没有返回值，因此返回结果是 `undefined`。`void` 并不改变表达式的结果， 只是让表达式不返回值。因此可以用 `void 0` 来获得 `undefined`。

### 6. Object.is() 与比较操作符 "==="、"=="" 的区别？

使用双等号（`==`）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。 使用三等号（`===`）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 `false`。 使用 `Object.is` 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 `-0` 和 `+0` 不再相等，两个 `NaN` 是相等的。

### 7. 为什么会有 BigInt 的提案？

`JavaScript` 中 `Number.MAX_SAFE_INTEGER` 表示最大安全数字，计算结果是 `9007199254740991`，即在这个数范围内不会出现精度丢失（小数除外）。但是一旦超过这个范围，js 就会出现计算不准确的情况，这在大数计算的时候不得不依靠一些第三方库进行解决，因此官方提出了 `BigInt` 来解决此问题。

### 8. 如何判断一个对象是空对象

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

### 9. 什么是 JavaScript 中的包装类型？

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

### 10. const 对象的属性可以修改吗

`const` 保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动。对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。

但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，`const` 只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。

### 11. 箭头函数与普通函数的区别

- 箭头函数比普通函数更加简洁
- 箭头函数没有自己的 `this`
- `call()`、`apply()`、`bind()`等方法不能改变箭头函数中 `this` 的指向
- 箭头函数不能作为构造函数使用
- 箭头函数不能用作 `Generator` 函数，不能使用 `yield` 关键字

### 12. 如果 new 一个箭头函数会怎么样

箭头函数是 `ES6` 中的提出来的，它没有 `prototype`，也没有自己的 `this` 指向，更不可以使用 `arguments` 参数，所以不能 New 一个箭头函数。

`new` 操作符的实现步骤如下：

1. 创建一个对象
2. 将构造函数的作用域赋给新对象（也就是将对象的 `proto` 属性指向构造函数的 `prototype` 属性）
3. 指向构造函数中的代码，构造函数中的 this 指向该对象（也就是为这个对象添加属性和方法）
4. 返回新的对象

所以，上面的第二、三步，箭头函数都是没有办法执行的。

### 13. 箭头函数的 this 指向哪里？

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

### 14. 扩展运算符的作用及使用场景

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

### 15. Proxy 可以实现什么功能？

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

### 16. 常用的正则表达式有哪些

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

### 17. JavaScript 脚本延迟加载的方式有哪些？

- `script defer` 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 `defer` 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
- `script async` 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 `js` 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 `async` 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
- 动态的创建 `script` 标签来引入 `js` 脚本
- 使用 `setTimeout` 延迟
- 让 `JS` 放在文档的底部

### 18. 什么是 DOM 和 BOM？

- DOM 全称是 Document Object Model，也就是文档对象模型。 图中区域 5
- BOM 全称是 Browser Object Model，也就是浏览器对象模型。 图中区域 1、2、3、4  
   ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20221031144444.png)

### 19. 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?

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

### 20. escape、encodeURI、encodeURIComponent 的区别

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

### 21. 封装一个 ajax 请求

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

### 22. 什么是尾调用，使用尾调用有什么好处？

- 含义：尾调用指的是函数的最后一步调用另一个函数。
- 好处：代码执行是基于执行栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。但如果使用尾调用的话，因为已经是函数的最后一步，所以这时可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化

> ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

### 23. ES6 模块与 CommonJS 模块有什么异同？

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

### 24. for...in 和 for...of 的区别

- `for...in` 循环遍历的是对象的属性名，包括原型链上的属性
- `for...of` 循环遍历的是对象的属性值，不包括原型属性和索引。是 `ES6` 新增的遍历方式
- `for...in` 比较适合用来遍历对象，也可以遍历数组，但是会存在一些问题
  - 遍历数组时，会遍历数组的原型链上的属性，而且遍历的顺序不是按照数组的顺序来的，而是按照对象的顺序来的，所以不建议使用 `for in` 来遍历数组
  - 如果不想遍历原型方法和属性的话，可以在循环内部判断一下，使用 `hasOwnProperty()`方法可以判断某属性是不是该对象的实例属性
- 一个数据结构只要部署了 `Symbol.iterator` 属性，就被视为具有 `iterator` 接口，就可以用 `for...of` 循环遍历它的成员

### 25. Iterator 接口

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

### 26. for 循环使用 await，for of 以及 for await of

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

### 27. forEach 和 map 的区别

- `map` 方法会分配内存空间存储新数组并返回
- `forEach` 方法没有返回值，而是直接对原数组进行操作

> 注: forEach 和 map 不能跳出循环，for of 可以跳出循环

### 28. addEventListener 方法的参数和使用

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

### 29. call、apply、bind 的区别

- `apply` 接收两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数是一个参数数组 `fun.apply(this, [arg1, arg2, ...])`
- `call` 和 `apply` 功能一样，区别在于接收的是若干个参数列表 `fun.call(this, arg1, arg2, ...)`
- `bind` 返回一个函数，需要手动调用。参数形式和 `call` 一致，第一个参数是 this 指向，后面的参数是函数的参数 `fun.bind(this, arg1, arg2, ...)()`

### 30. 对原型链的理解

- 原型链是一种机制，指的是 `JavaScript` 每个对象都有一个内置的 `__proto__` 属性指向它的原型对象
- 它的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的 `__proto__` 属性所指向的那个对象里找，如果父对象也不存在这个属性，则继续往上找，直到原型链顶端 `null`，由以上这种通过 `__proto__` 属性来连接对象直到 `null` 的一条链即为我们所谓的原型链
- 我们平时调用的字符串方法、数组方法、对象方法、函数方法等都是靠 `__proto__` 继承而来的。
- 图形理解  
  ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20230118175459.png)

> 参考: [CSDN——prototype、proto 与 constructor](https://blog.csdn.net/cc18868876837/article/details/81211729)  
> 参考: [知乎——JavaScript 世界万物诞生记](https://zhuanlan.zhihu.com/p/22989691)

### 31. 实现继承的几种方式

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

### 32. 什么是闭包？闭包的优缺点？有哪些常见的闭包使用场景？

#### 32.1. 闭包

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

#### 32.2. 闭包的优缺点

- 优点
  - 可以读取函数内部的变量
  - 让这些变量的值始终保持在内存中
- 缺点
  - 会增大内存使用量
  - 使用不当很容易造成内存泄漏

#### 32.3. 常见的闭包使用场景

- 防抖和节流
- react hooks

### 33. 深拷贝和浅拷贝

#### 33.1. 浅拷贝

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

#### 33.2. 深拷贝

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

#### 33.3. 赋值和浅拷贝深拷贝的区别

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

#### 33.4. 常用深拷贝、浅拷贝方法

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
