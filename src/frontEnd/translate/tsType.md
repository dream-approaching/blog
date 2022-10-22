---
title: 理解 typescript 类型符号
nav:
  title: 前端
  order: 0
group:
  title: 外文翻译
  order: 2
---

> 原文：[Understanding TypeScript’s type notation](https://2ality.com/2018/04/type-notation-typescript.html)  
> 作者：[Dr. Axel Rauschmayer](http://dr-axel.de/)  
> 时间：2018 年 4 月 8 日

这篇博文简要介绍了 `TypeScript` 的静态类型表示法。

### 1. 你能学到什么

读完这篇文章，你应该能够理解以下代码的含义:

```ts
interface Array<T> {
  concat(...items: Array<T[] | T>): T[];
  reduce<U>(callback: (state: U, element: T, index: number, array: T[]) => U, firstState?: U): U;
}
```

如果你认为这很神秘，没错我同意你的观点。但是(正如我希望证明的)这个符号相对容易学。一旦您理解了它，它就会为您提供代码行为的即时、精确和全面的摘要。不需要阅读冗长的英文描述。

### 2. 尝试代码示例

`TypeScript` 有一个[在线编辑器](http://www.typescriptlang.org/play/)。为了得到最全面的检查，您应该打开“选项”菜单中的所有选项。这相当于在严格模式下运行 `TypeScript` 编译器。

### 3. 指定类型检查的全面性

我总是用最严格的 `TypeScript` 检查，`--strict`。如果不用的话，程序编写起来会稍微容易一些，但是也会失去静态类型检查的许多好处。目前，`--strict`相当于启用以下设置:

- `--noImplicitAny`: 如果 `TypeScript` 不能推断类型，则必须指定它。这主要适用于函数和方法的参数:通过这些设置，您必须对它们进行注释。
- `--noImplicitThis`: 当 `this` 表达式的值为 `any` 类型的时候，生成一个错误。
- `--alwaysStrict`: 以严格模式解析并为每个源文件生成 "use strict"语句
- `--strictNullChecks`: `null` 不属于任何类型(除了它自己的类型 `null` 之外)，如果它是一个可接受的值，就必须显式地提到它。
- `--strictFunctionTypes`: 更强的函数类型检查
- `--strictPropertyInitialization`: 确保类的非 `undefined` 属性已经在构造函数里初始化。若要令此选项生效，需要同时启用`--strictNullChecks`。

更多信息: 在 TypeScript 手册[编译器选项](https://www.tslang.cn/docs/handbook/compiler-options.html)一章。

### 4. 类型

在本文中，类型只是一组值。`JavaScript` 语言(不是 `TypeScript`)有 7 种类型:

- `Undefined`
- `Null`
- `Boolean`
- `Number`
- `String`
- `Symbol`
- `Object`

所有这些类型都是动态的: 可以在运行时使用它们。

TypeScript 为 JavaScript 带来了额外的一层:静态类型。这些只有在编译或类型检查源代码时才存在。每个存储位置(变量或属性)都有一个静态类型，用于预测其动态值。类型检查确保这些预测成真。还有很多东西可以静态检查(无需运行代码)。例如，如果函数 f(x)的参数 x 预定义为 number 类型，那么函数调用 f('abc')是非法的，因为参数'abc'具有错误的静态类型。

### 5. 类型注释

变量名后面的冒号表示开始了一个类型注释:冒号后面的类型签名描述了变量可以具有的值。例如，下面这行告诉 TypeScript x 只存储数字:

```js
let x: number;
```

您可能想知道用 undefined 初始化 x 是否会违反静态类型。TypeScript 通过在赋值之前不允许读取 x 来解决这个问题。

### 6. 类型推断

即使每个存储位置在 TypeScript 中都有一个静态类型，也不必总是显式地指定它。TypeScript 经常可以推断出来。例如，如果你写:

```js
let x = 123;
```

然后 TypeScript 推断 x 是 number 类型。

### 7. 描述类型

在类型注释的冒号之后出现的是所谓的类型表达式。这些范围从简单到复杂，并按如下方式创建。  
基本类型是有效的类型表达式:

- JavaScript 动态类型的静态类型:
  - `undefined, null`
  - `boolean, number, string`
  - `symbol`
  - `object`
- Typescript 指定的类型:
  - `Array`
  - `any`任意类型
  - etc...

注意，“undefined as a value”和“undefined as a type”都被写成 undefined。根据您在何处使用它，它被解释为值或类型。对于 null 也是一样。

可以通过类型操作符组合基本类型来创建更多的类型表达式，类型操作符组合类型的方式类似于操作符 union(∪)和交集(∩)组合集合的方式。

下面几节解释 TypeScript 提供的一些类型操作符。

### 8. Array 类型

数组在 JavaScript 中用于以下两个角色(有时是两者的混合):

- 列表:所有元素都具有相同的类型。数组的长度是变化的。
- 元组:数组的长度是固定的。元素不一定具有相同的类型。

#### 8.1 列表

有两种方法来表示数组 arr 被用作一个列表，其元素都是数字:

```js
let arr: number[] = [];
let arr: Array<number> = [];
```

通常，如果有赋值，TypeScript 可以推断变量的类型。在本例中，必须手动指定，因为对于空数组，它不能确定元素的类型。

稍后我们将回到尖括号符号(`Array<number>`)。

#### 8.2 元组

如果在数组中存储一个二维点，则使用该数组作为元组。看起来是这样的:

```ts
let point: [number, number] = [7, 5];
```

在本例中，不需要类型注释。

元组的另一个例子是`Object.entries(obj)`的返回值:obj 的每个属性都有一个[key, value]对数组。

```ts
Object.entries({ a: 1, b: 2 });
// [ [ 'a', 1 ], [ 'b', 2 ] ]
```

Object.entries()的结果类型为:`Array<[string, any]>`

### 9. Function 类型

一个函数类型的例子:

```js
(num: number) => string;
```

这种类型包含所有接受单个参数、数字和返回字符串的函数。让我们在类型注释中使用这个类型(这里假设 String 是一个函数):

```ts
const func: (num: number) => string = String;
```

同样，我们通常不会在这里使用类型注释，因为 TypeScript 知道字符串的类型，因此可以推断 func 的类型。

下面的代码是一个更实际的例子:

```ts
function stringify12345(callback: (num: number) => string) {
  return callback(123);
}
```

我们指定用函数类型来描述 stringify123()的参数。由于这个类型注释，TypeScript 拒绝下面的函数调用。

```ts
f(Number);
```

但它接受以下函数调用:(上面假设 String 是一个函数)

```ts
f(String);
```

#### 9.1 函数声明的返回值类型

注释函数的所有参数是一个很好的实践。你也可以指定返回值类型(但是 TypeScript 很擅长推断):

```js
function stringify123(callback: (num: number) => string): string {
  const num = 123;
  return callback(num);
}
```

##### 特殊结果类型 void

void 是函数的一种特殊返回值类型:它告诉 TypeScript 函数总是返回 undefined(显式或隐式):

```js
function f1(): void {
  return undefined;
} // OK
function f2(): void {} // OK
function f3(): void {
  return 'abc';
} // error
```

#### 9.2 可选参数

标识符后面的问号表示该参数是可选的。例如:

```ts
function stringify1234(callback?: (num: number) => string) {
  const num = 123;
  if (callback) {
    return callback(num); // (A)
  }
  return String(num);
}
```

如果在`——strict`模式下运行，那么必须判断 callback 是否存在，不然会报错

##### 默认参数

TypeScript 支持 ES6 参数默认值:

```js
function createPoint(x = 0, y = 0) {
  return [x, y];
}
```

有默认值表示该参数可选。通常可以省略类型注释，因为 TypeScript 可以推断类型。例如，它可以推断 x 和 y 都是 number 类型。  
如果您想添加类型注释，应该如下所示。

```js
function createPoint(x: number = 0, y: number = 0) {
  return [x, y];
}
```

#### 9.3 扩展类型(...)

可以将 ES6 rest 操作符用于 TypeScript 参数定义。对应参数的类型必须是数组:

```js
function joinNumbers(...nums: number[]): string {
  return nums.join('-');
}
joinNumbers(1, 2, 3); // '1-2-3'
```

### 10. 组合类型

在 JavaScript 中，变量有时同同时具几种类型。要描述这些变量，可以使用 union 类型。例如，在下面的代码中，x 的类型不是 null 就是 number:

```js
let x = null;
x = 123;
```

x 的类型可以描述为`null|number`:

```js
let x: null | number = null;
x = 123;
```

我们重写函数 stringify123():这次，我们不希望参数回调是可选的，它应该总是存在。如果调用者不想提供函数，他们必须显式传递 null。具体实现如下:

```js
function stringify123(callback: null | ((num: number) => string)) {
  const num = 123;
  if (callback) {
    // (A)
    return callback(123); // (B)
  }
  return String(num);
}
```

注意，我们必须再次检查 callback 是否是一个函数(第 a 行)，然后才能在 b 行中执行 callback 调用。如果没有检查，TypeScript 将报告一个错误。

#### 10.1 可选 vs `undefined|T`(或者)

T 类型的可选参数和未定义的|T 类型的参数非常相似。(顺便提一句，可选属性也是如此。) 主要区别是你可以省略可选参数:

```js
function f1(x?: number) {}
f1(); // OK
f1(undefined); // OK
f1(123); // OK
```

但是你不能忽略类型为`undefined|T`的参数:

```js
function f2(x: undefined | number) {}
f2(); // error
f2(undefined); // OK
f2(123); // OK
```

#### 10.2 `null`和`undefined`通常不包含在类型中

在许多编程语言中，null 是所有类型的一部分。例如，无论何时参数的类型是 Java 中的 String，都可以传递 null, Java 不会报错。

相反，在 TypeScript 中，undefined 和 null 由独立的、不相交的类型处理。如果您想允许的话，需要一个类型联合，如`undefined|string`和`null|string`。

### 11. 对象类型

与数组类似，对象在 JavaScript 中扮演两个角色(有时混合):

- 记录:在开发时已知的固定数量的属性。每个属性可以有不同的类型。
- 字典:开发时名称未知的任意数量的属性。所有属性键(字符串和/或符号)都具有相同的类型，属性值也是如此。

在这篇博客文章中，我们将忽略对象作为字典。顺便提一句，Maps 通常是字典更好的选择。

#### 11.1 通过接口将对象作为记录输入

接口描述了一个对象的记录。例如:

```ts
interface Point {
  x: number;
  y: number;
}
```

TypeScript 类型系统的一大优势是它在结构上工作，而不是名义上。也就是说，接口点匹配所有具有适当结构的对象:

```js
function pointToString(p: Point) {
  return `(${p.x}, ${p.y})`;
}
pointToString({ x: 5, y: 7 }); // '(5, 7)'
```

相反，Java 的 nominal 类型系统需要类来 implement 接口。

#### 11.2 可选属性

如果可以省略某个属性，则在其名称后面加上问号:

```js
interface Person {
  name: string;
  company?: string;
}
```

#### 11.3 方法

接口还可以包含方法:

```js
interface Point {
  x: number;
  y: number;
  distance(other: Point): number;
}
```

### 12. 类型变量和泛型类型

使用静态类型，有两个级别:

- 值存在于对象级。
- 类型存在于元级别。

类似的：

- 普通变量存在于对象级。
- 类型变量，它们存在于元级别。它们是值是类型的变量。

普通变量通过`const、let`等引入。类型变量通过尖括号(< >)引入。例如，下面的代码包含类型变量 T，通过<T>引入。

```js
interface Stack<T> {
  push(x: T): void;
  pop(): T;
}
```

您可以看到类型参数 T 在堆栈主体中出现了两次。因此，这个接口可以直观理解为:

- Stack 是一组值的堆栈，所有值都具有给定的类型 T。
- 方法.push()接受类型为 T 的值。
- 方法.pop()返回类型为 T 的值。

如果使用 Stack，则必须为 T 分配一个类型。下面的代码显示了一个虚拟堆栈，其惟一目的是匹配接口。

```js
const dummyStack: Stack<number> = {
  push(x: number) {},
  pop() {
    return 123;
  },
};
```

#### 12.1 例子 Maps

Maps 在 TypeScript 中是通用类型的。例如:

```js
const myMap: Map<boolean, string> = new Map([
  [false, 'no'],
  [true, 'yes'],
]);
```

#### 12.2 函数的类型变量

函数(和方法)也可以引入类型变量:

```js
function id<T>(x: T): T {
  return x;
}
```

您可以像下面这样使用这个函数。

```js
id < number > 123;
```

由于类型推断，您也可以省略类型参数:

```js
id(123);
```

#### 12.3 传递类型参数

函数可以将其类型参数传递给接口、类等:

```js
function fillArray<T>(len: number, elem: T) {
  return new Array() < T > len.fill(elem);
}
```

类型变量 T 在这段代码中出现了三次:

- `fillArray<T>`: 引入类型变量
- `elem: T`: 使用类型变量，从参数中选取它。
- `Array<T>`: 将 T 传递给数组构造函数。

这意味着:我们不需要显式地指定数组<T>的类型 T -它是由参数 elem 推断的:

```js
const arr = fillArray(3, '*');
// Inferred type: string[]
```

### 13. 结论

让我们用我们所学到的知识来理解我们之前看到的这段代码:

```js
interface Array<T> {
  concat(...items: Array<T[] | T>): T[];
  reduce<U>(callback: (state: U, element: T, index: number, array: T[]) => U, firstState?: U): U;
}
```

这是一个数组的接口，其元素类型为 T，当我们使用这个接口时，必须填入类型 T

- 接口有两个方法：concat，reduce
- concat 方法有零个或多个参数(通过 rest 操作符定义)。每个参数的类型都是`T[]|T`。也就是说，它要么是每个元素都为 T 类型的数组，要么是单个 T 类型的值。
- concat 方法返回值为 T 类型的数组
- reduce 方法接收 2 个参数，callback 和 firstState，其中 firstStae 为可选参数
- reduce 方法引入了自己的类型变量 U. 表示以下的几个值都具有相同的类型(不需要指定，它是自动推断的):
  - callback()参数 state
  - callback()的返回值
  - reduce()的可选参数 firstState
  - reduce()的返回值
