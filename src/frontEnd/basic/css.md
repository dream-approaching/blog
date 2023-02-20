---
title: css
order: 15
group:
  title: 基本知识
---

# CSS

## 1. 如何优化 css 性能

- 内联首屏关键 CSS
- 资源压缩
- css 的匹配是从右往左的，所以尽量把常用的放在左边
- 减少 DOM 操作，尽量使用 css3 代替 js 操作
- 减少 DOM 数量，尽量使用伪类代替标签
- 减少 css 选择器的层级，尽量使用 class 选择器
- 减少 css 的计算，可以使用 transform 代替 top、left 等
- 减少 css 的重绘和重排，可以使用 visibility 代替 display
- 少用@import，会影响浏览器的并行下载
- 少用通配符和属性选择器，会影响浏览器的性能

## 2. 有哪些 css 属性可以继承

- 字体相关：`font、font-family、font-size、font-weight、line-height、text-align、text-indent、letter-spacing、white-space、color、direction`
- 文本相关：`text-decoration、text-shadow、letter-spacing、word-wrap、word-break、vertical-align、direction、white-space`
- 颜色相关：`color、border、background、outline`
- 列表相关：`list-style、list-style-type`

## 3. 用 border 绘制三角形

```css
width: 0;
height: 0;
border: 30px solid;
border-color: transparent transparent lightblue;
```

> 参考： [简书——CSS 绘制三角形](https://www.jianshu.com/p/9a463d50e441)

## 4. 修改 placeholder 样式

```css
.input::-webkit-input-placeholder {
  color: red;
}
.input:-moz-placeholder {
  color: red;
}
.input:-ms-input-placeholder {
  color: red;
}
```

## 5. 自定义滚动条

```css
// 滚动条整体部分 定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent;
}
//滚动条两端的按钮
::-webkit-scrollbar-button {
  background-color: transparent;
}
// 外层轨道
::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 10px;
}
//内层轨道，滚动条中间部分（除去）
::-webkit-scrollbar-track-piece {
  background-color: transparent;
}
//滚动条里面可以拖动的那个
::-webkit-scrollbar-thumb {
  background-color: #294269;
  border-radius: 3px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
//边角
::-webkit-scrollbar-corner {
  background-color: transparent;
}
//定义右下角拖动块的样式
::-webkit-resizer {
  background-color: transparent;
}
```

## 6. 超出省略号

```css
/* 单行 */
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
width: 160px;

/* 多行 */
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
/* autoprefixer: off */
-webkit-box-orient: vertical;
/* autoprefixer: on */
```

autoprefixer 不仅会帮你加-webkit-之类的 prefixer，它还会帮你删除你自己写在 css/sass/less 里的样式

> 参考: [-webkit-box-orient 不见了， webkit 和 autoprefixer 的坑](https://blog.csdn.net/sinat_24070543/article/details/79755285)

## 7. css 盒模型

- box-sizing: content-box（W3C 盒模型，又名标准盒模型）：元素的宽高大小表现为内容的大小。
- box-sizing: border-box（IE 盒模型，又名怪异盒模型）：元素的宽高表现为内容 + 内边距 + 边框的大小。背景会延伸到边框的外沿。

> 若不声明 DOCTYPE 类型，IE 浏览器会将盒子模型解释为 IE 盒子模型，FireFox 等会将其解释为 W3C 盒子模型；若在页面中声明了 DOCTYPE 类型，所有的浏览器都会把盒模型解释为 W3C 盒模型。  
> html5 中写`<!DOCTYPE html>`

## 8. css3 动画样式

- transform
  ```css
  transform: rotate(10deg); /* 旋转 */
  transform: skew(20deg); /* 倾斜 */
  transform: scale(1.5); /* 缩放 */
  transform: translate(120px, 0); /* 位移 */
  ```
- transition：允许 css 的属性值在一定的时间区间内平滑地过渡,有如些 4 个参数
  - `transition-property`：all / none / indent(属性名)
  - `transition-duration`：持续时间
  - `transition-timing-function`：缓动函数(linear、ease、ease-in、ease-out、ease-in-out)
  - `transition-delay`：延迟
- animation
  ```css
  /* animation: 动画名称 时长必填 缓动函数 延时 执行次数 动画方向 */
  div {
    animation: myfirst 5s linear 2s infinite alternate;
  }
  /* 也可用from to 等同于 0% 100% */
  @keyframes myfirst {
    0% {
      background: red;
    }
    25% {
      background: yellow;
    }
    50% {
      background: blue;
    }
    100% {
      background: green;
    }
  }
  ```

## 9. css 变量 / css 自定义属性

```css
/* 通过 -- 定义css属性  */
.foo {
  color: red;
  --theme-color: gray;
}

/* 使用css属性 一个变量可用于多个地方 */
.button {
  background-color: var(--theme-color);
}
.title {
  color: var(--theme-color);
}
.image-grid > .image {
  border-color: var(--theme-color);
}

/* 加上默认值 */
.button {
  background-color: var(--theme-color, gray);
}
/* 如果默认值也是css属性 */
.button {
  background-color: var(--theme-color, var(--fallback-color));
}

/* 可通过使用 :root 伪元素将css属性设置为全局变量，处处可用 */
:root {
  --theme-color: gray;
}
```

- 自定义元素的定义由 `--` 开头，这样浏览器能够区分自定义属性和原生属性
- 使用时用`var()`
- 可通过`:root`定义全局变量，局部想覆盖可重新定义
- 可与 calc 进行计算`calc(var(--title-multiplier) * var(--base-size))`
- 和 js 交互
  - 可以通过 `getPropertyValue` 和 `setProperty` 方法操作
    ```js
    const styles = getComputedStyle(document.querySelector('.foo'));
    // Read value. Be sure to trim to remove whitespace.
    const oldColor = styles.getPropertyValue('--color').trim();
    // Write value.
    foo.style.setProperty('--color', 'green');
    ```

## 10. BFC

> 常见于 margin 发生折叠情况

- BFC 即 Block Formatting Contexts (块级格式化上下文)，是一个独立的渲染区域
- 只要元素满足下面任一条件即可触发 BFC 特性
  - body 根元素
  - 浮动元素：float 除 none 以外的值
  - 绝对定位元素：position (absolute、fixed)
  - display 为 inline-block、table-cells、flex
  - overflow 除了 visible 以外的值 (hidden、auto、scroll)
- BFC 特性及应用
  - 同一个 BFC 中外边距会发生折叠(如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中)
  - BFC 可以包含浮动的元素（清除浮动）
  - BFC 可以阻止元素被浮动元素覆盖

## 11. 垂直居中

- line-height 等于 hieght
- vertical-align: middle 需要是 inline-block
- 绝对定位 `top:50%` 配合 `margin-top: -height / 2` 或者 `transform:translateY(-50%);`(优点是不需要知道宽高)
- 绝对定位 top、right、bottom、left 都为 0 配合 margin: auto;
- flex 布局

## 12. flex

flex 布局是一种新的布局方式，它可以让我们更加简单的实现各种布局，比如垂直居中、水平居中、两端对齐、等高布局、自适应布局等等。

常用属性:

- flex-grow: 表示放大比例
- flex-shrink: 表示缩小比例
- flex-basis: 表示初始大小
- flex-direction: row | row-reverse | column | column-reverse
- flex-wrap: nowrap | wrap | wrap-reverse
- flex-flow: flex-direction 和 flex-wrap 的简写形式，默认值为 row nowrap
- justify-content: flex-start | flex-end | center | space-between | space-around
- align-items: flex-start | flex-end | center | baseline | stretch
- align-content: flex-start | flex-end | center | space-between | space-around | stretch,多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

### 12.1. flex 1 是什么意思

> flex: 1; 等价于 flex: 1 1 0%; 也就是 flex-grow: 1; flex-shrink: 1; flex-basis: 0%; 三个属性的简写形式。

- flex-grow: 1 表示放大比例为 1，即如果存在剩余空间，也会将项目放大，如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间（如果存在的话）。如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。
- flex-shrink: 1 表示缩小比例为 1，即如果空间不足，该项目将缩小。如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。
- flex-basis: 0% 表示初始大小为 0，即在分配多余空间之前，项目占据的主轴空间（main size）。

## 13. grid

grid 布局是一种二维布局方式，可以很方便的实现多列布局，也可以实现多行布局。

常用属性:

- grid-template-columns: 100px 100px 100px; // 列宽
- grid-template-rows: 100px 100px 100px; // 行高
- grid-template-areas: "header header header" "main main sidebar" "footer footer footer"; // 区域
- grid-template: grid-template-rows / grid-template-columns; // 简写
- grid-column-gap: 10px; // 列间距
- grid-row-gap: 10px; // 行间距
- grid-gap: 10px 20px; // 简写
- grid-auto-columns: 100px; // 自动列宽
- grid-auto-rows: 100px; // 自动行高
- grid-auto-flow: row | column; // 自动排列方式
- grid: grid-template / grid-auto-flow / grid-gap; // 简写
- grid-column-start: 1; // 列开始位置
- grid-column-end: 3; // 列结束位置
- grid-row-start: 1; // 行开始位置
- grid-row-end: 3; // 行结束位置

## 14. flex 和 grid 的区别，什么场景下用 flex，什么场景下用 grid

- flex 是一维布局，grid 是二维布局
- 使用 flex 的场景
  - 一维布局
  - 布局方向固定
  - 项目数量不固定
- 使用 grid 的场景
  - 二维布局
  - 布局方向不固定
  - 项目数量固定

## 15. CSS 伪类选择器中的: 和 ::(冒号区别)

css3 为了区分两者，已经明确规定了

- : 用于伪类选择器，比如 :hover、:active、:first-child 等
- :: 用于伪元素选择器，比如 ::before、::after 等

对于 CSS2 之前已有的伪元素，比如:before，单冒号和双冒号的写法::before 作用是一样的

## 16. position 的粘性定位

position: sticky; 粘性定位，当元素滚动到指定位置时，元素会固定在指定位置，直到滚动到另一个指定位置。

用法：

```css
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}
```
