---
title: PM2
group:
  title: 常用命令行
---

### 执行 npm script

```json
// 已有package.json
{
  "name": "cidian-server",
  "scripts": {
    "start": "egg-scripts start --daemon --title=egg-server-cidian-server",
    "stop": "egg-scripts stop --title=egg-server-cidian-server",
    "dev": "egg-bin dev",
    "debug": "egg-bin debug",
    "test": "npm run lint -- --fix && npm run test-local",
    "test-local": "egg-bin test",
    "cov": "egg-bin cov",
    "lint": "eslint .",
    "ci": "npm run lint && npm run cov"
  }
}
```

```sh
# pm2 启动 dev
pm2 start npm --name "cidian-server" -- run "dev"
```

```sh
# 查看已启动服务
pm2 ls
```

| id  | name          | namespace | version | status |
| --- | ------------- | --------- | ------- | ------ |
| 0   | cidian-server | default   | 0.35.3  | online |

> 参考 [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) 参考 [Can pm2 run an 'npm start' script](https://stackoverflow.com/questions/31579509/can-pm2-run-an-npm-start-script)
