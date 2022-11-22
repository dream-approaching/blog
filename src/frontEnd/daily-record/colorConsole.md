---
title: 怎么改变console.log字体颜色
group:
  title: 日常记录
---

### 怎么改变终端控制台输出的字体颜色

#### 1、ANSI 转义，可在任何平台上生效

```js
/**
 * \x1b是转义字符，[31m是颜色代码
 * 31m是红色，表示前景色(字体颜色)为红色
 * 0m是默认颜色，表示前景色(字体颜色)为默认颜色，如不设置，后续输出的字体颜色都是红色
 */
const clc = {
  green: (text) => `\x1B[32m${text}\x1B[0m`,
  yellow: (text) => `\x1B[33m${text}\x1B[0m`,
  red: (text) => `\x1B[31m${text}\x1B[0m`,
};

// 使用
console.log(clc.green('这是绿色'));
console.log(clc.yellow('这是黄色'));
console.log(clc.red('这是红色'));

// 这种方式也可以
console.log('\x1b[36m', 'sometext', '\x1b[0m');
```

```shell
// 常用颜色
Reset = '\x1b[0m';
Bright = '\x1b[1m';
Dim = '\x1b[2m';
Underscore = '\x1b[4m';
Blink = '\x1b[5m';
Reverse = '\x1b[7m';
Hidden = '\x1b[8m';

FgBlack = '\x1b[30m';
FgRed = '\x1b[31m';
FgGreen = '\x1b[32m';
FgYellow = '\x1b[33m';
FgBlue = '\x1b[34m';
FgMagenta = '\x1b[35m';
FgCyan = '\x1b[36m';
FgWhite = '\x1b[37m';

BgBlack = '\x1b[40m';
BgRed = '\x1b[41m';
BgGreen = '\x1b[42m';
BgYellow = '\x1b[43m';
BgBlue = '\x1b[44m';
BgMagenta = '\x1b[45m';
BgCyan = '\x1b[46m';
BgWhite = '\x1b[47m';
```

颜色代码： ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20221122172533.png)

#### 2、使用插件

- [chalk](https://github.com/chalk/chalk)
- [cli-color](https://github.com/medikoo/cli-color)
- [colors](https://github.com/Marak/colors.js)
  - 不推荐 好像开发者恶意引入了无限循环[详情](https://snyk.io/blog/open-source-npm-packages-colors-faker/)

#### 3、使用 CSS，node 端不支持

```js
console.log('%c CSS:', 'color: #fff;background: #b457ff;', 'CSS');
```

> 参考与延伸
>
> - [维基百科 ANSI escape code](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors)
> - [stack overflow: How to change node.js's console font color?](https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color)
