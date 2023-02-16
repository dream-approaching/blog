---
title: npx 简介:一个 npm 的包执行器
group:
  title: 外文翻译
  order: 5
---

> 原文：[Introducing npx: an npm package runner](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)  
> 作者：[Kat Marchán](https://medium.com/@maybekatz)  
> 时间：2017 年 7 月 11 日

那些将 npm 升级到最新版本[`npm@5.2.0`](https://github.com/npm/npm/releases/tag/v5.2.0)的人可能会注意到，这次版本除了通常的`npm`之外还安装了一个新的二进制文件：[`npx`](https://www.npmjs.com/package/npx)

npx 是一个工具，它旨在提高从 npm 注册表中使用软件包的体验，就和 npm 使得安装和管理贮存在注册表中的依赖变得十分简单一样，npx 使得使用 CLI 工具和其他贮存在注册表中的可执行文件变得容易。它极大地简化了许多操作，这些操作就算现在单单用 npm 的话也要执行一些必要的“仪式”。

### 使用本地安装的工具，不执行 npm run-script

![](https://raw.githubusercontent.com/dream-approaching/translate-blog/master/assets/one.gif)(图 1)  
将 cowsay 作为本地 devDependency 进行安装，并使用 npx cowsay 来运行它(图 1 注)

在过去的几年里，npm 生态系统越来越倾向于将工具安装为项目本地`devDependencies`，而不是要求用户全局安装。这意味着一些工具，像[`mocha`](https://www.npmjs.com/package/mocha)，[`grunt`](https://www.npmjs.com/package/grunt-cli) 和 [`bower`](https://www.npmjs.com/package/bower)，之前主要是被全局安装在系统上，现在可以在每个项目的基础上管理自己的版本。这也意味着，要使一个基于 npm 的项目启动并运行，你所需要做的只是确保在你的系统中装有 node 和 npm，克隆 git 仓库，然后执行 `npm it` 运行 install 和 test。由于`npm run-script`将本地二进制文件添加到 path 中，所以这可以很好地工作!

这样有个缺点就是你不能使用快速/方便的方法来交互式地调用本地二进制文件。有几种方法可以做到这一点，但它们都有一些不好的地方。例如你可以把那些工具添加到你的`script`中，但是得记得需要用`--`传递参数；又如你可以使用 shell 技巧`alias npmx=PATH=$(npm bin):$PATH`；再如你可以用`./node_modules/.bin/mocha`手动地为这些工具设置 PATH。这些方式都可以，但都不是非常理想的。

npx 提供了我认为最好的解决方案：使用本地安装的话你只需要执行`npx mocha`。如果你进行额外的步骤并配置[shell 自动回调函数](https://www.npmjs.com/package/npx#shell-auto-fallback)(下面有详细介绍)，那么在项目目录下执行`mocha`将会做到这点。

还有比较好的一点，npx 如果调用已经安装的二进制文件，基本上[没有额外的开销](https://twitter.com/maybekatz/status/877444832494596096)。因为它把需要运行的工具的代码直接加载到当前运行的 node 进程中，这点是十分聪明的。这几乎是这类事情的最快速度了，使它成为一个让人完全可以接受的脚本工具。

### 执行一次性的命令

![](https://raw.githubusercontent.com/dream-approaching/translate-blog/master/assets/two.gif)(图 2)  
`$ npx create-react-app my-cool-new-app`安装一个临时的 create-react-app 并执行它，不会污染全局安装或需要多个步骤！(图 2 注)
