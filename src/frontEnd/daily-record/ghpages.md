---
title: 通过Github Actions自动部署到服务器中
group:
  title: 日常记录
---

## 通过 Github Actions 自动部署到服务器中

1. 项目根目录加`.github/workflows/deploy.yml`
2. 文件内容示例

   ```js
   # main.yml
   name: deploy
   on:
     push:
       branches:
         - main
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         # 切换分支
         - name: Checkout
           uses: actions/checkout@main
         # npm install
         - name: yarn and build
           run: |
             yarn
             npm run build
           env:
             CI: true
         # Deploy
         - name: Deploy
           uses: easingthemes/ssh-deploy@v2.1.1
           env:
             SSH_PRIVATE_KEY: ${{ secrets.access_token }}
             ARGS: '-avz --delete'
             SOURCE: 'dist/'
             REMOTE_HOST: ${{ secrets.remote_host }}
             REMOTE_USER: ${{ secrets.remote_user }}
             TARGET: ${{ secrets.remote_target }}

   ```

3. `secrets` 变量说明部署插件  
   [easingthemes/ssh-deploy@v2.1.1](https://github.com/easingthemes/ssh-deploy)，需要在 `github` 仓库中写入环境变量

   - 打开仓库设置  
     ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20221124134237.png)
   - Security-secrets-Actions 新增变量  
     ![](https://raw.githubusercontent.com/dream-approaching/pictureMaps/master/img/20221124134538.png)
     - ACCESS_TOKEN  
       在服务器端执行 `ssh-keygen -m PEM -t rsa -b 4096`,然后把公钥复制到文件 `authorized_keys`，再把私钥填入变量 ACCESS_TOKEN
     - REMOTE_HOST  
       域名如 `zhengjinshou.cn`, `ip` 好像也行
     - REMOTE_USER  
       服务器用户名
     - REMOTE_TARGET 静态资源需要放置的服务器路径如: `/root/sites/excelAdmin`

### 相关 FAQ

#### 部署后刷新页面 404

常出现于 history 路由模式，路由跳转是 js 操作，刷新后服务器没有匹配的处理方法，因此需要将请求转交给 js 去执行

```shell
server {
    listen       80;
    server_name  localhost;
    location / {
        root   html;
        index  index.html index.htm;
        # 在配置文件的此处加上这句话
        try_files $uri $uri/ /index.html;
    }
}
```
