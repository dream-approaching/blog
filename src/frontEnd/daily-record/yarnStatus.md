---
title: 在NPM / YARN安装期间，执行了哪些步骤
group:
  title: 日常记录
  order: 0
---

## 在 NPM / YARN 安装期间，Linking dependencies 是在做什么？

![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20221121175253.png)

> 执行 yarn 命令时，终端中可以看到以上 4 个步骤，分别是在做什么？

- Resolving packages(解析): Yarn 通过向注册表发出请求并递归查找每个依赖项来开始解析依赖项
- Fetching packages(下载): Yarn 在全局缓存目录中查找所需的包是否已经下载。如果没有，将为包获取 tarball 并将其放在全局缓存中，这样它就可以离线工作，而不需要多次下载依赖项
- Linking dependencies(链接): 将所有需要的文件从全局缓存复制到本地节点模块目录，从而将所有文件链接到一起，如果这步慢的话，主要是复制大量小文件导致的，可以使用 `yarn install --no-bin-links` 来跳过这一步
- Building fresh packages(构建): 执行各个安装包里的 postinstall 钩子，这步慢的话，主要是执行了大量的脚本导致的，可以使用 `yarn install --ignore-scripts` 来跳过这一步

> 参考与延伸
>
> - [stack overflow: What does "Linking Dependencies" during npm / yarn install really do?](https://stackoverflow.com/questions/50683248/what-does-linking-dependencies-during-npm-yarn-install-really-do)
> - [yarn 文档](https://classic.yarnpkg.com/en/docs)
> - [yarn 的 Building fresh packages 到底是在干啥呀？](https://www.eliseos.org/en/water/post/208)
> - [npm scripts 使用指南](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
