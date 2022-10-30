---
title: Git相关
---

### 配置 git 用户信息

```shell
git config [--global] user.email <email>
git config [--global] user.name <name>

# eg: 为当前仓库配置
git config user.email "longzizheng@gmail.com"
git config user.name "longzi"

# eg: 为全局配置
git config --global user.email "longzizheng@gmail.com"
git config --global user.name "longzi"
```

### 按时间顺序显示 git branch

```shell
git branch --sort=-committerdate

# eg:
git branch --sort=-committerdate
# master
# patch-1
# patch-2
```

### 别名 alias

设置别名

```shell
git config --global alias.<alias> <command>


# eg: 将 checkout 设置为 co
git config --global alias.co checkout
git co -b test
# Switched to a new branch 'test'
```

查看所有别名

```shell
git config -l | grep alias | sed 's/^alias\.//g'

# eg:
git config -l | grep alias | sed 's/^alias\.//g'
co=checkout
```
