---
title: 其他问题
group:
  title: Interview
---

# 其他问题

## 1. 日常项目题

- 说一下工作中解决过的比较困难的问题，说一下自己项目中比较有亮点的地方
- 最近项目做的什么？有没有遇到什么问题？怎么解决的？

## 2. 有没有了解一些最前言的技术

- 智能化方向
  - D2C：作为前端领域传统的智能化细分领域，利用机器视觉自动生成代码，关键在于对不同模型的优化。
  - 低代码：低代码领域的规范与约定形成更为重要，阿里开源的 LowCodeEngine 可以作为低代码构建的一个参考，另外与智能化方向的自动生成其实可能更有研究价值。
  - ChatGPT：作为 22 年年底最火的 AI 场景，对于回答等的薅羊毛行为，想必会很快出台禁止方案。但是在前端领域，对于代码方案等进行相关指导还是有一定的借鉴意义的。
- 互动方向:对新交互方式的探索与场景运用
  - 元宇宙：前端作为一种靠近用户的工种，其本身技术也会提供诸如：XR 的形态，在虚拟人物生成等方面，确实还是会有一些研究可能存在。
  - Web3：前端作为 Web 领域的重要一环，在第三世代中，肯定也会有重要的运用场景。个人认为，对于区块链相关的上层应用，如 DApp 等，可能还是有一些发展方向的。
- 中后台方向: 随着单页的瓶颈出现，中后台方向又出现了“分久必合，合久必分”的态势，不论是微前端还是 Islands 架构，其都有一种新瓶装旧酒的感觉。
  - 微前端：目前通用的微前端方案大都以“类 SPA”形式进行创建，其本身在接入其他 SPA 时有着天然的弊端。因而，个人认为真正意义上的“微前端”还尚未出现，私以为或许考虑借鉴下微服务的容器化思维，来真正的实现“微”的效果。
  - Islands：Islands 架构的本质其实是多种渲染方式的选择，从 MPA 到 SPA，又从 SPA 回归到 MPA。其实，个人认为可以基于场景的不同进行不同的选择，资源的合理使用来提供最佳的用户体验。
- 可视化方向
  - 领域图形库：对于可视化领域而言，最重要的其实是图形库的选择和开发，但是对于不同层次的可视化方案，也是构建出基于特定领域的专有图形库，解决一类问题，从而有一定的突破和创新。
  - 3D 图形库：大部分的图形库往往注重与二维图形库的创建，对于三维可视/编辑领域，也是有着十分广阔的场景的。

具体:

- 低代码平台: 是指通过可视化的方式，无需编程即可完成应用开发的平台
  - 阿里的飞冰
  - 腾讯的 Rax
  - 百度的 san
  - 微软的 PowerApps
- devops: Development（开发）和 Operations（运维）组合而成。涵盖了软件开发的全生命周期，包括需求管理、版本控制、持续集成、持续交付、持续部署、配置管理、监控、日志管理、安全管理等。
  - 源代码管理工具: gitlab、github、gitee
  - 持续集成/持续部署测试工具: jenkins、gitlab-ci、travis-ci、github-actions
  - 容器化工具: docker、k8s
  - 云服务: 阿里云、腾讯云、华为云、aws、gcp
  - 自动化配置管理工具: ansible、saltstack
  - 监控告警工具: prometheus、grafana、zabbix、elk
  - 项目管理工具: tapd、coding、jira
- web3d: 3D web 技术，是指在 web 上实现 3D 效果的技术
  - three.js
  - babylon.js
  - Cesium
  - WebGL

## 3. 经常逛的技术论坛有哪些？

- [掘金](https://juejin.cn/)
- [知乎](https://www.zhihu.com/)
- [简书](https://www.jianshu.com/)
- [CSDN](https://www.csdn.net/)
- [github](https://github.com)
- [Stack Overflow](https://stackoverflow.com/)
- [SegmentFault 思否](https://segmentfault.com/)
- [开发者头条](https://toutiao.io/)
- [V2EX](https://www.v2ex.com/)
- [InfoQ](https://www.infoq.cn/)
- [medium](https://medium.com/)
- [dev.to](https://dev.to/)
- [css-tricks](https://css-tricks.com/)

## 4. 最近在看的书籍有哪些？

- JavaScript 高级程序设计（第 4 版）
- JavaScript 语言精粹
- Mysql 必知必会
- css 揭秘

## 5. 企业微信实现扫码登录的流程是怎样的？

- 在企微后台创建应用，配置应用的授权回调域名
- 开发者构造扫码链接，用户扫码后，企业微信会跳转到授权回调域名下的一个页面，同时会带上 code 和 state 参数
- 开发者通过 code 获取用户的 access_token 和 userid
- 开发者通过 userid 获取用户的详细信息

## 6. 管理后台的权限怎么做的

- 扫码登录后，如果有多个角色，进入一个角色列表
- 选择角色后，有个全局接口返回当前角色的权限列表
- 根据权限列表，渲染菜单和页面
- 权限列表存储在全局，各个页面通过状态管理获取，控制按钮的显示隐藏
- 如果直接进入某个页面，会先请求权限列表，匹配当前页面的权限，如果没有权限，跳转到无权限页面

## 7. 数组去重

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

## 8. 所有的事件都有冒泡吗？

并不是所有的事件都有冒泡的，例如以下事件就没有：

- onblur
- onfocus
- onmouseenter
- onmouseleave

## 9. typeof 和 instanceof 的区别

typeof 表示是对某个变量类型的检测，基本数据类型除了 null 都能正常的显示为对应的类型，引用类型除了函数会显示为'function'，其它都显示为 object。

instanceof 主要是用于实例的判断。 `A instanceof B` 用来判断 A 是否为 B 的实例。也可以判断一个实例是否是其父类型或者祖先类型的实例

> 扩展：变量类型

- 基本类型： string, number, boolean, undefined, null, Symbol, bigInt(es10 新增)
- 引用类型： function, array, object

## 10. 在移动端中怎样初始化根元素的字体大小

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

## 11. 移动端布局

- 移动端布局的方式主要使用 rem 和 flex，可以结合 rem 和媒体查询，然后不同的上视口大小下设置设置 html 的 font-size。
- 可单独制作移动端页面也可响应式 pc 端移动端共用一个页面。没有好坏，视情况而定，因势利导
- 我一般是结合两个库`postcss-pxtorem`和`lib-flexible`，前者用于转换单位，后者用于修改根节点字体大小

## 12. 知道 meta 标签有把 http 换成 https 的功能吗

利用 meta 标签把 http 请求换为 https

```html
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
```

## 13. slice、substr 和 substring 有什么区别

`var test = 'hello world';`

- substr(start,len):从 start 开始，往后截取 len 个字符串
- substring(start,end)：从 min(start,end)开始截取到 max(start,end)

```js
test.substr(2, 5); // "llo w"
test.substring(2, 5) === test.substring(5, 2); // "llo"
test.slice(2, 5); // "llo"
```

## 14. git-flow 有了解过吗

- 是一个别人定义好的工作流程
- 并不会为 Git 扩展任何新的功能
- 安装 git-flow，会拥有一些扩展命令

## 15. Vite 为什么快

> 相较于传统的打包构建工具（如 Webpack）先打包构建再启动开发服务器，Vite 利用了浏览器对 ESM 的支持，先启动开发服务器，当代码执行到模块加载时再请求对应模块的文件

- 冷启动
  - Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类，改进了开发服务器启动时间。
  - Vite 以 原生 ESM 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。  
    ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20220222181730.png)
- 热更新
  - 在 Vite 中，HMR 是在原生 ESM 上执行的。
  - Vite 同时利用 HTTP 头来加速整个页面的重新加载（再次让浏览器为我们做更多事情）：源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。

## 16. npm 和 yarn 的区别

都是包管理工具，但是有以下区别：

- yarn 会将包缓存到本地，下次安装时会直接从本地安装，而 npm 每次都会从远程仓库下载
- yarn 安装包的速度比 npm 快，因为它是并行下载的
- yarn 用 yarn.lock 文件来锁定依赖包的版本，npm 在 v5.5.0 之后使用了 package-lock.json 文件来锁定依赖包的版本

### 16.1. package.json 中版本号的写法

版本号格式：主版本号.次版本号.修订号

- `^1.2.3` 表示安装 1.x.x 版本的最新版本，但不包括 1.0.0
- `~1.2.3` 表示安装 1.2.x 版本的最新版本，但不包括 1.2.0
- `1.2.3` 表示安装 1.2.3 版本
- `*` 表示安装最新版本

## 17. 埋点数据的上报方式

- 通过 img 标签的 src 属性上报
- 通过 ajax 请求上报
- 通过 navigator.sendBeacon 上报

### 17.1. navigator.sendBeacon

- navigator.sendBeacon() 方法用于异步传输少量数据到 Web 服务器，即使在页面卸载之前。这个方法使用了 HTTP POST 请求，但是它的请求方式是 "fire-and-forget"，也就是说它不会等待服务器的响应，也不会在卸载之前等待数据传输完成。这个方法的主要用途是在用户关闭页面之前传输少量数据，比如统计数据或者广告点击数据。

### 17.2. 埋点数据丢失怎么解决

- 通过 navigator.sendBeacon 上报，因为它是异步的，不会阻塞页面卸载，所以不会丢失数据
- 通过 ajax 请求上报时，设置超时时间，超时后再次上报
- 通过 img 标签上报时，设置 onload 和 onerror 事件，如果失败了再次上报

## 18. 让你从头搭建一个项目，你会怎么做

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

## 19. 常见的数据可视化库

- ECharts：百度团队开发，封装了绝大多数常规 chart，用户通过配置 options 参数，就可很容易绘制指定图表。
  - 优点：学习门槛较低、图表丰富
  - 缺点：自由度较低、很难实现自定义图表
- antv.g2：蚂蚁金服团队开发，提供了更加友好的 API，支持 React、Vue、Angular 等框架。
  - 优点：自由度较高、可根据自己的 UI 需求，用 g2 做底层库，封装自己的 charts 库。
  - 缺点：学习成本稍高
- d3
  - 优点：更接近底层，d3 能直接操作 svg，所以拥有极大的自由度
  - 缺点：学习门槛较高，需要对 svg、canvas 等有一定了解，还要有可视化的设计能力

## 20. 怎么约定团队的代码规范

- 能统一编辑器最好，不能的话尽量不要太多种，一般就是 vscode 和 webstorm
- 电脑系统最好统一，比如 mac 或者 windows，因为不同系统下的换行符不一样，如果不能统一，需要在 setting.json 中配置换行符为 lf：`"files.eol": "\n"`
- 代码风格的统一使用 eslint，可以通过配置 .eslintrc.js 来统一团队的代码风格，常用的规范有 standard、plugin:react/recommended、plugin:react-hooks/recommended、plugin:prettier/recommended
- 代码格式化的统一使用 prettier，可以通过配置 .prettierrc.js 来统一团队的代码格式化
- 需要打开 eslint 的自动修复功能，这样可以在保存文件时自动修复代码风格问题
- 代码提交时使用 git hooks，校验代码风格，比如使用 husky 和 lint-staged
- 代码提交时还可以使用 commitizen 和 commitlint 来规范 commit message

## 21. 怎么提高开发效率

### 21.1. 工具

- chrome：翻墙、谷歌账号、谷歌插件
- vscode：常用插件(console-log-quickly、link-to-define、copilot)、快捷键
- mac
- 显示器双屏
- git 图形工具：sourceTree(提交代码灵活)
- 接口调试：postman(环境变量、脚本)
- 终端工具：cmder [wsl](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
- 笔记：有道云、印象笔记、语雀、Typora、Notion
- 图床：[picGo](https://github.com/Molunerfinn/PicGo)
- 其他：whistle、nvm、FoxMail、Xftp、Xshell、[Snipaste](https://zh.snipaste.com/)(截图贴图)

### 21.2. 开发习惯

- 代码层面：可读性、可维护性
- 调试层面：只有一个原则，减少调试成本，如 whistle、真机调试等
- 平时习惯：chrome 书签、笔记、代码片段
- 其他方面
  - 精神状态：加强锻炼、身体是本钱
  - 沟通层面：尽量当面沟通、描述清楚问题（预期是什么样，当前是什么样，在什么场景下遇到了什么问题）

## 22. 单元测试

### 22.1. 单元测试的优缺点

- 优点
  - 保证代码质量、可维护性、可扩展性、可重用性、可读性、可信赖性、可靠性、可测试性、可调试性、可移植性、可安全性、可性能、可稳定性
  - 保证代码的正确性
  - 保证代码的健壮性
- 缺点
  - 代码量增加
  - 代码复杂度增加
  - 代码维护成本增加
  - 代码执行效率降低

### 22.2. 单元测试的分类

- 功能测试：测试代码的功能是否符合预期
- 性能测试：测试代码的性能是否符合预期
- 安全测试：测试代码的安全性是否符合预期
- 兼容性测试：测试代码的兼容性是否符合预期
- 压力测试：测试代码的压力是否符合预期
- 回归测试：测试代码的回归是否符合预期

### 22.3. 单元测试的工具

- jest: facebook 出品，功能强大，支持 react、vue、angular 等框架，支持 ts、js 等语言，支持多种测试框架，比如 mocha、jasmine 等
- mocha: nodejs 出品，功能强大，支持 ts、js 等语言，支持多种测试框架，比如 chai、should 等
- enzyme:
  - shallow：浅渲染，只渲染当前组件，不渲染子组件
  - describe：测试套件，用于组织测试用例
  - it：测试用例，用于测试某个功能
  - expect：断言，用于判断测试结果是否符合预期
  - test：测试用例，用于测试某个功能，第一个参数是测试用例的描述，第二个参数是测试用例的函数

### 22.4. 什么场景下会用到单元测试

- 重要的代码、业务
- 基础的 utils 组件
- 公共的组件

### 22.5. 单元测试的原则

- 测试覆盖率：测试覆盖率越高，代码质量越高
- 测试用例的设计：测试用例的设计要考虑到各种情况，比如边界值、异常值、特殊值等
- 测试用例的执行：测试用例的执行要考虑到各种情况，比如正常情况、异常情况、边界情况等

### 22.6. 项目中怎么搭配使用

- 项目中使用 jest，使用 jest-dom、jest-fetch-mock、jest-localstorage-mock 等插件
- 项目中使用 enzyme，使用 enzyme-adapter-react-16 等插件

## 23. MVC、MVVM

### 23.1. MVC

- MVC 是一种软件设计模式，它把一个应用程序分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）
- 模型（Model）：模型代表应用程序的数据部分，负责处理应用程序的数据逻辑，通常模型对象负责在数据库中存取数据
- 视图（View）：视图代表应用程序的用户界面（UI），负责将模型包含的数据显示给用户，并允许用户编辑数据
- 控制器（Controller）：控制器负责处理用户交互，从视图读取数据，控制用户输入，并向模型发送数据

MVC 的数据流向是单向的，即：视图 -> 控制器 -> 模型 -> 视图，这种单向的数据流向使得代码的可读性和可维护性都很高，常见的框架有：Angular、Vue、React

### 23.2. MVVM

- MVVM 是 Model-View-ViewModel 的缩写，它是一种用户界面架构模式，它将一个复杂的用户界面分为三个部分：模型（Model）、视图（View）和视图模型（ViewModel）
- 模型（Model）：模型代表应用程序的数据部分，负责处理应用程序的数据逻辑，通常模型对象负责在数据库中存取数据
- 视图（View）：视图代表应用程序的用户界面（UI），负责将模型包含的数据显示给用户，并允许用户编辑数据
- 视图模型（ViewModel）：视图模型负责处理用户交互，从视图读取数据，控制用户输入，并向模型发送数据

MVVM 的数据流向是双向的，即：视图 -> 视图模型 -> 模型 -> 视图模型 -> 视图。

在 vue 中：Model:指的是 js 中的数据，如对象，数组等等。View:指的是页面视图 viewModel:指的是 vue 实例化对象。通过双向绑定可以提升开发效率

vm 的作用是将视图和模型进行绑定，当视图发生变化时，vm 会自动更新模型，当模型发生变化时，vm 会自动更新视图，这种双向的数据流向使得代码的可读性和可维护性都很高

## 24. 代码为什么要重构，是怎么做的

### 24.1. 代码为什么要重构

- 维护角度：历史代码很难维护，一个文件几千行，产品要改一个需求，要改好几个文件，可能在不经意间就影响到其他功能
- 性能角度：有些历史逻辑越写越大，之前用的 react，发现很多 setState 都是在循环里面，层层嵌套，导致性能很差

### 24.2. 代码怎么重构

- 沟通
  - 先在组内讨论可行性，征得组长或 leader 的同意
  - 和产品同步，告知其本次重构的目的，以及可能会影响到的功能，征得产品的同意
- 开发前准备工作
  - 梳理业务，可以从历史需求文档以及历史代码中梳理出业务逻辑，要关注些个性化逻辑
  - 根据梳理的业务列出大纲以及改动点，再整理出一个技术方案
  - 找产品、测试、根据业务的重要性以及影响范围叫上相关的同事或者 leader，开技术评审会，同步技术方案
- 开发
  - 按照梳理的大纲或者技术方案，将代码进行拆分，拆分成一个个独立的组件
  - 尽量把展示组件和逻辑组件分开，逻辑组件只负责逻辑，展示组件只负责展示
  - 一些公共的逻辑可以抽离出来，放到公共组件中
  - 重要的逻辑需要写单元测试
  - 开发过程中，一些关键的点要记下来，自测阶段着重测试下
