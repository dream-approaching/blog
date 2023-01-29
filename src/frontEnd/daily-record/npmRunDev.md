---
title: npm run dev执行过程
group:
  title: 日常记录
---

## npm run dev 执行过程

```json
// 假设有如下package.json
{
  "name": "h5",
  "version": "1.0.7",
  "private": true,
  "scripts": {
    "dev": "vue-cli-service serve"
  }
}
```

在执行`npm run dev`时，首先会去项目里的`package.json`文件里找`scripts`字段，然后执行`scripts`字段里的`dev`字段对应的命令，也就是`vue-cli-service serve`。

### FAQ

#### 1. 为什么不直接执行`vue-cli-service serve`?

> 因为直接执行`vue-cli-service serve`，会报错，因为`vue-cli-service`不是全局命令，所以需要在`package.json`里配置`scripts`字段，然后执行`npm run dev`。

#### 2. 为什么执行`npm run dev`的时候就能成功

> 在安装依赖的时候，会将执行脚本软链接到 `./node_modules/.bin` 目录下，还会自动把 `node_modules/.bin` 加入 `$PATH` 环境变量中
