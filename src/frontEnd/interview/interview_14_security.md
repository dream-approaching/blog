---
title: 前端安全
group:
  title: Interview
---

## 前端安全

### 1、了解哪些前端安全相关知识

- XSS: 跨站脚本攻击
- CSRF: 跨站请求伪造
- SQL 注入: 通过拼接 SQL 语句，将 SQL 语句中的关键字替换为恶意代码
- 点击劫持: 通过 iframe 嵌入第三方网站，通过 CSS 隐藏原网站内容，通过 JS 监听用户操作，通过 JS 修改原网站内容
- https: 传输层安全协议
- CSP: 内容安全策略
- cors: 跨域资源共享
- referer-policy： 控制 referer 的发送
- x-frame-options: 控制页面是否可以被嵌入到 iframe 中

### 2、说一下 xss

#### 2.1 概念

XSS（Cross Site Scripting）跨站脚本攻击，是一种代码注入攻击，攻击者往 Web 页面里插入恶意的 HTML 代码，当用户浏览该页之时，嵌入其中 Web 里面的代码会被执行，从而达到恶意攻击用户的目的。

#### 2.2 类型

- 反射型 XSS
- 存储型 XSS
- DOM 型 XSS

#### 2.2 防御

- 对用户输入进行转义
- 设置 httpOnly
- 设置 CSP
- 设置 referer-policy
- 设置 x-frame-options

### 3、说一下 csrf

#### 3.1 概念

CSRF（Cross Site Request Forgery）跨站请求伪造，是一种利用网站对用户的信任，以用户的名义发送恶意请求的攻击方式。

常见的攻击步骤：

1. 用户登录 A 网站，A 网站给用户设置了 cookie
2. 用户访问了恶意网站 B，B 网站通过 iframe 嵌入了 A 网站
3. B 网站通过 JS 修改了 A 网站的内容，比如修改了转账金额
4. 用户点击了转账按钮，A 网站收到了请求，因为用户已经登录，所以 A 网站会认为这是用户的请求，从而完成了转账操作

#### 3.2 防御

- 验证码
- token
- referer： 通过 referer 验证请求来源
- Samesite： 通过设置 cookie 的 SameSite 属性，可以限制第三方网站不能发送 cookie

#### 3.3 常见的攻击场景

- 爬虫
- 通过邮件发送恶意链接
- 自动提交表单
