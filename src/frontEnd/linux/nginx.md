---
title: nginx相关
group:
  title: Linux
  order: 55
---

## 常用命令

```shell
# 关闭某个端口的进程
lsof -i:端口号
kill -9 进程号

# 查看端口占用
netstat -anp | grep 端口号


mkdir # 创建文件夹
rm -rf # 删除文件夹
cd # 进入文件夹
pwd # 查看当前路径
ls # 查看当前文件夹下的文件
ls -a # 查看当前文件夹下的所有文件


# nginx 命令
nginx # 启动 nginx
nginx -s reload # 重启 nginx
nginx -s stop # 停止 nginx
nginx -v # 查看 nginx 版本


```

## nginx 相关

#### 1. 服务器重启后 nginx 启动不了

```shell
nginx: [error] open() "/run/nginx.pid" failed (2: No such file or directory)
```

> 解决办法 https://stackoverflow.com/questions/49571099/certbot-renew-nginx-error-open-run-nginx-pid-failed-2-no-such-file-or

#### 2. Nginx 允许跨域配置

```shell
location / {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

    if ($request_method = 'OPTIONS') {
        return 204;
    }
}
```

> 参考 [Nginx 配置跨域请求 Access-Control-Allow-Origin \*](https://segmentfault.com/a/1190000012550346)
