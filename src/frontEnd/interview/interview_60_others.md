---
title: 其他问题
group:
  title: Interview
---

# 其他问题

## 1. 日常项目题

- 说一下工作中解决过的比较困难的问题，说一下自己项目中比较有亮点的地方
- 最近项目做的什么？有没有遇到什么问题？怎么解决的？

## 2. 如何解决 a 标签点击后 hover 事件失效的问题?

改变 a 标签 css 属性的排列顺序,只需要记住`LoVe HAte`原则就可以了：

```
link→visited→hover→active
```

比如下面错误的代码顺序：

```css
a:hover {
  color: green;
  text-decoration: none;
}
a:visited {
  /* visited在hover后面，这样的话hover事件就失效了 */
  color: red;
  text-decoration: none;
}
```

## 3. 点击一个 input 依次触发的事件

```js
const text = document.getElementById('text');
text.onclick = function (e) {
  console.log('onclick');
};
text.onfocus = function (e) {
  console.log('onfocus');
};
text.onmousedown = function (e) {
  console.log('onmousedown');
};
text.onmouseenter = function (e) {
  console.log('onmouseenter');
};

// 'nmouseenter => onmousedown => onfocus => onclick
```

## 4. 数组去重

- `Array.from(new Set(arr))` / `[...new Set(arr)]`
- 利用 includes
  ```js
  function unique(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (!res.includes(arr[i])) {
        res.push(arr[i]);
      }
    }
    return res;
  }
  ```
  > 扩展：Set 取交集 并集 差集

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集 Set {1, 2, 3, 4}
let union = new Set([...a, ...b]);

// 交集 set {2, 3}
let intersect = new Set([...a].filter((x) => b.has(x)));

// （a 相对于 b 的）差集 Set {1}
let difference = new Set([...a].filter((x) => !b.has(x)));
```

## 5. 所有的事件都有冒泡吗？

并不是所有的事件都有冒泡的，例如以下事件就没有：

- onblur
- onfocus
- onmouseenter
- onmouseleave

## 6. typeof 和 instanceof 的区别

typeof 表示是对某个变量类型的检测，基本数据类型除了 null 都能正常的显示为对应的类型，引用类型除了函数会显示为'function'，其它都显示为 object。

instanceof 主要是用于实例的判断。 `A instanceof B` 用来判断 A 是否为 B 的实例。也可以判断一个实例是否是其父类型或者祖先类型的实例

> 扩展：变量类型

- 基本类型： string, number, boolean, undefined, null, Symbol, bigInt(es10 新增)
- 引用类型： function, array, object

## 7. 在移动端中怎样初始化根元素的字体大小

- 动态计算 font-size
  ```js
  (function () {
    var html = document.documentElement;
    function onWindowResize() {
      html.style.fontSize = html.getBoundingClientRect().width / 20 + 'px';
    }
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
  })();
  ```
- 还需要配合一个 meta 头 `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-sacle=1.0, maximum-scale=1.0, user-scalable=no" />`

## 8. 移动端布局

- 移动端布局的方式主要使用 rem 和 flex，可以结合 rem 和媒体查询，然后不同的上视口大小下设置设置 html 的 font-size。
- 可单独制作移动端页面也可响应式 pc 端移动端共用一个页面。没有好坏，视情况而定，因势利导
- 我一般是结合两个库`postcss-pxtorem`和`lib-flexible`，前者用于转换单位，后者用于修改根节点字体大小

## 9. 知道 meta 标签有把 http 换成 https 的功能吗

利用 meta 标签把 http 请求换为 https

```html
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
```

## 10. slice、substr 和 substring 有什么区别

`var test = 'hello world';`

- substr(start,len):从 start 开始，往后截取 len 个字符串
- substring(start,end)：从 min(start,end)开始截取到 max(start,end)

```js
test.substr(2, 5); // "llo w"
test.substring(2, 5) === test.substring(5, 2); // "llo"
test.slice(2, 5); // "llo"
```

## 11. git-flow 有了解过吗

- 是一个别人定义好的工作流程
- 并不会为 Git 扩展任何新的功能
- 安装 git-flow，会拥有一些扩展命令

## 12. Vite 为什么快

> 相较于传统的打包构建工具（如 Webpack）先打包构建再启动开发服务器，Vite 利用了浏览器对 ESM 的支持，先启动开发服务器，当代码执行到模块加载时再请求对应模块的文件

- 冷启动
  - Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类，改进了开发服务器启动时间。
  - Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。  
    ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20220222181730.png)
- 热更新
  - 在 Vite 中，HMR 是在原生 ESM 上执行的。
  - Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。

## 13. npm 和 yarn 的区别

都是包管理工具，但是有以下区别：

- yarn 会将包缓存到本地，下次安装时会直接从本地安装，而 npm 每次都会从远程仓库下载
- yarn 安装包的速度比 npm 快，因为它是并行下载的
- yarn 用 yarn.lock 文件来锁定依赖包的版本，npm 在 v5.5.0 之后使用了 package-lock.json 文件来锁定依赖包的版本

### 13.1. package.json 中版本号的写法

版本号格式：主版本号.次版本号.修订号

- `^1.2.3` 表示安装 1.x.x 版本的最新版本，但不包括 1.0.0
- `~1.2.3` 表示安装 1.2.x 版本的最新版本，但不包括 1.2.0
- `1.2.3` 表示安装 1.2.3 版本
- `*` 表示安装最新版本

## 14. 埋点数据的上报方式

- 通过 img 标签的 src 属性上报
- 通过 ajax 请求上报
- 通过 navigator.sendBeacon 上报

### 14.1. navigator.sendBeacon

- navigator.sendBeacon() 方法用于异步传输少量数据到 Web 服务器，即使在页面卸载之前。这个方法使用了 HTTP POST 请求，但是它的请求方式是 "fire-and-forget"，也就是说它不会等待服务器的响应，也不会在卸载之前等待数据传输完成。这个方法的主要用途是在用户关闭页面之前传输少量数据，比如统计数据或者广告点击数据。

### 14.2. 埋点数据丢失怎么解决

- 通过 navigator.sendBeacon 上报，因为它是异步的，不会阻塞页面卸载，所以不会丢失数据
- 通过 ajax 请求上报时，设置超时时间，超时后再次上报
- 通过 img 标签上报时，设置 onload 和 onerror 事件，如果失败了再次上报

## 15. 让你从头搭建一个项目，你会怎么做

- 项目初始化
  - 选择合适的脚手架工具，比如 vue-cli、create-react-app 等
  - 选择合适的 UI 框架，比如 element-ui、ant-design-vue 等
  - 选择合适的状态管理工具，比如 vuex、redux 等
  - 选择合适的路由管理工具，比如 vue-router、react-router 等
  - 选择合适的打包工具，比如 webpack、rollup 等
  - 选择合适的代码检查工具，比如 eslint、stylelint 等
  - 选择合适的代码格式化工具，比如 prettier、editorconfig 等
  - 选择合适的 git 提交规范工具，比如 commitizen、commitlint 等
  - 选择合适的单元测试工具，比如 jest、mocha 等
  - 选择合适的 e2e 测试工具，比如 cypress、nightwatch 等
  - 选择合适的持续集成工具，比如 travis、github actions 等
  - 选择合适的自动化部署工具，比如 pm2、docker 等
- 项目开发
  - 项目目录结构
  - 项目配置
  - 项目开发
  - 项目测试
  - 项目部署