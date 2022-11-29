---
title: Function
group:
  title: Typescript
  order: 20
---

### 参数类型注释

```ts
function greet(name: string) {
  console.log('Hello, ' + name.toUpperCase() + '!!');
}

// 参数是对象
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

// 参数是对象 可选
function printName(obj: { first: string; last?: string }) {
  // ...
}

// 联合类型
function printId(id: number | string) {
  console.log('Your ID is: ' + id);
}

// 参数是函数
function greeter(fn: (a: string) => void) {
  fn('Hello, World');
}

// 泛型参数
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
// 泛型参数
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
```

### 返回类型注释

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

### 常用示例

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