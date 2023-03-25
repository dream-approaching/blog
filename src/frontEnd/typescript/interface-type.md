---
title: Interface & Type
group:
  title: Typescript
---

### 语法

```ts
interface Animal {
  name: string;
}

type Animal = {
  name: string;
};
```

### 区别

两者十分相似，都可以描述一个对象或者函数，许多情况下可自由选择。关键的区别是 `Type` 不能重新打开以添加新属性，而 `Interface` 总是可扩展的。

- type 可以声明基本类型别名，联合类型，元组等类型
- interface 可以声明合并

### 联合

```ts
interface Bear extends Animal {
  honey: boolean;
}

type Bear = Animal & {
  honey: boolean;
};
```

### 扩展字段

```ts
/**
 * Interface
 */
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

/**
 * Type
 */
type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};

// Error: Duplicate identifier 'Window'.
```
