---
title: nginx相关
group:
  title: Linux
  order: 55
---

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
