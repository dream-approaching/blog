---
title: nginx
group:
  title: 常用命令行或快捷键
---

# nginx

### 查看错误日志

```shell
vim /var/log/nginx/error.log
```

### Nginx 服务启动、停止、重启

- 启动
  ```shell
  systemctl start nginx.service
  ```
- 查询服务的运行状况
  ```shell
  ps aux | grep nginx
  ```
- 停止
  ```shell
  nginx  -s stop // 这种方法比较强硬，无论进程是否在工作，都直接停止进程。
  nginx -s quit // 较stop相比就比较温和一些了，需要进程完成当前工作后再停止。
  killall nginx // 也是比较野蛮的，我们直接杀死进程，但是在上面使用没有效果时，我们用这种方法还是比较好的。
  systemctl stop nginx.service // systemctl 停止
  ```
- 重启
  ```shell
  systemctl restart nginx.service
  ```
- 重新载入配置文件
  ```shell
  nginx -s reload
  ```
- 查看端口号
  ```shell
  netstat -tlnp
  ```
