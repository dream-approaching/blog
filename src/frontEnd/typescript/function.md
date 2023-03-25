---
title: Function
group:
  title: Typescript
  order: 20
---

## Function

### 1. 参数类型注释

```ts
function greet(name: string) {
  console.log('Hello, ' + name.toUpperCase() + '!!');
}
const greet2 = (name: string) => {
  console.log('Hello, ' + name.toUpperCase() + '!!');
};

// 参数是对象
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
const printCoord2 = (pt: { x: number; y: number }) => {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
};

// 参数是对象 可选
function printName(obj: { first: string; last?: string }) {
  // ...
}
const printName2 = (obj: { first: string; last?: string }) => {
  // ...
};

// 参数是联合类型
function printId(id: number | string) {
  console.log('Your ID is: ' + id);
}
const printId2 = (id: number | string) => {
  console.log('Your ID is: ' + id);
};

// 参数是函数
function greeter(fn: (a: string) => void) {
  fn('Hello, World');
}
const greeter2 = (fn: (a: string) => void) => {
  fn('Hello, World');
};

// 参数是泛型参数
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
const firstElement2 = <T, N>(arr: T[]): T | undefined => {
  return arr[0];
};
const firstElement3: <T>(arr: T[]) => T | undefined = (arr) => {
  return arr[0];
};

// 参数是泛型参数
function map1<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
const map2 = <Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] => {
  return arr.map(func);
};
const map3: <Input, Output>(arr: Input[], func: (arg: Input) => Output) => Output[] = (
  arr,
  func,
) => {
  return arr.map(func);
};
```

### 2. 返回类型注释

```ts
function getFavoriteNumber(): number {
  return 26;
}
const getFavoriteNumber2 = (): number => {
  return 26;
};
```

### 3. 常用示例

```ts
function sanitizeInput(str: string): string {
  return `${str}123`;
}

/**
 * 多个重载的写法
 */
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
```

### 箭头函数怎么定义泛型

```ts
const firstElement4: <T>(arr: T[]) => T | undefined = (arr) => {
  return arr[0];
};
```

### react + ts 有什么坑

- 由于 React 和 React-dom 并不是使用 TS 进行开发的，所以 TS 不知道 React、 React-dom 的类型，以及该模块导出了什么，此时需要引入 .d.ts 的声明文件
- 需要使用 `import * as React from 'react';`，否则会报错
