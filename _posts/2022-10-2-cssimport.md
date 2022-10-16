---
title: 1.5 万字 CSS 基础拾遗（核心知识、常见需求）
tags: [CSS, 前端]
style: secondary
color: success
comments: true
description: 本篇文章围绕了 CSS 的核心知识点和项目中常见的需求来展开。虽然行文偏长，但较基础，适合初级中级前端阅读，阅读的时候请适当跳过已经掌握的部分。
---

本篇文章围绕了 CSS 的核心知识点和项目中常见的需求来展开。虽然行文偏长，但较基础，适合初级中级前端阅读，阅读的时候请适当跳过已经掌握的部分。

<center><img style="width:70%;" src="https://mason369.github.io/Mason_blog/assets/2022-10-1-img/1.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

## 核心概念和知识点

### 语法

CSS 的核心功能是将 CSS 属性设定为特定的值。一个属性与值的键值对被称为声明（declaration）。

```css
color: red;
```

而如果将一个或者多个声明用 {} 包裹起来后，那就组成了一个声明块（declaration block）。

```css
 {
	color: red;
	text-align: center;
}
```

声明块如果需要作用到对应的 HTML 元素，那还需要加上选择器。选择器和声明块组成了 CSS 规则集（CSS ruleset），常简称为 CSS 规则。

<center><img style="width:70%;" src="https://mason369.github.io/Mason_blog/assets/2022-10-1-img/2.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

```css
span {
	color: red;
	text-align: center;
}
```

> 规则集中最后一条声明可以省略分号，但是并不建议这么做，因为容易出错。

CSS 中的**注释**：

```css
/* 单行注释 */

/*
    多行
    注释
*/
```

在 CSS 文件中，除了注释、CSS 规则集以及 @规则 外，定义的一些别的东西都将被浏览器忽略。

### @规则

CSS 规则是样式表的主体，通常样式表会包括大量的规则列表。但有时候也需要在样式表中包括其他的一些信息，比如字符集，导入其它的外部样式表，字体等，这些需要专门的语句表示。
而 @规则 就是这样的语句。CSS 里包含了以下 @规则：

- [@namespace](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@namespace)告诉 CSS 引擎必须考虑 XML 命名空间。
- [@medi](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media), 如果满足媒体查询的条件则条件规则组里的规则生效。
- [@page](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@page), 描述打印文档时布局的变化.
  @font-face, 描述将下载的外部的字体。
- [@keyframes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes), 描述 CSS 动画的关键帧。
- [@document](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@document), 如果文档样式表满足给定条件则条件规则组里的规则生效。 (推延至 CSS Level 4 规范)

除了以上这几个之外，下面还将对几个比较生涩的 @规则 进行介绍。

### @charset

@charset 用于定义样式表使用的字符集。它必须是样式表中的第一个元素。如果有多个 @charset 被声明，只有第一个会被使用，而且不能在 HTML 元素或 HTML 页面的 <style> 元素内使用。
注意：值必须是双引号包裹

```css
@charset "UTF-8";
```

平时写样式文件都没写 @charset 规则，那这个 CSS 文件到底是用的什么字符编码的呢？
某个样式表文件到底用的是什么字符编码，浏览器有一套识别顺序（优先级由高到低）：

- 文件开头的 Byte order mark 字符值，不过一般编辑器并不能看到文件头里的 BOM 值；

- HTTP 响应头里的 content-type 字段包含的 charset 所指定的值，比如：

```css
Content-Type: text/css; charset=utf-8
```

- CSS 文件头里定义的 @charset 规则里指定的字符编码；

- <link> 标签里的 charset 属性，该条已在 HTML5 中废除；

- 默认是 UTF-8。

### @import

[@import](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import)用于告诉 CSS 引擎引入一个外部样式表。
link 和 @import 都能导入一个样式文件，它们有什么区别嘛？

- link 是 HTML 标签，除了能导入 CSS 外，还能导入别的资源，比如图片、脚本和字体等；而 @import 是 CSS 的语法，只能用来导入 CSS；
- link 导入的样式会在页面加载时同时加载，@import 导入的样式需等页面加载完成后再加载；
- link 没有兼容性问题，@import 不兼容 ie5 以下；
- link 可以通过 JS 操作 DOM 动态引入样式表改变样式，而@import 不可以。

### @supports

@supports 用于查询特定的 CSS 是否生效，可以结合 not、and 和 or 操作符进行后续的操作。

```css
/* 如果支持自定义属性，则把 body 颜色设置为变量 varName 指定的颜色 */
@supports (--foo: green) {
	body {
		color: var(--varName);
	}
}
```

层叠性
层叠样式表，这里的层叠怎么理解呢？其实它是 CSS 中的核心特性之一，用于合并来自多个源的属性值的算法。比如说针对某个 HTML 标签，有许多的 CSS 声明都能作用到的时候，那最后谁应该起作用呢？层叠性说的大概就是这个。
针对不同源的样式，将按照如下的顺序进行层叠，越往下优先级越高：

- 用户代理样式表中的声明(例如，浏览器的默认样式，在没有设置其他样式时使用)。
- 作者样式表中的常规声明(这些是我们 Web 开发人员设置的样式)。
- 作者样式表中的 !important 声明。

理解层叠性的时候需要结合 CSS 选择器的优先级以及继承性来理解。比如针对同一个选择器，定义在后面的声明会覆盖前面的；作者定义的样式会比默认继承的样式优先级更高。

## 选择器

CSS 选择器无疑是其核心之一，对于基础选择器以及一些常用伪类必须掌握。下面列出了常用的选择器。
想要获取更多选择器的用法可以看 MDN CSS Selectors。

### 基础选择器

- 标签选择器：h1
- 类选择器：.checked
- ID 选择器：#picker
- 通配选择器：\*

### 属性选择器

- [attr]：指定属性的元素；
- [attr=val]：属性等于指定值的元素；
- [attr*=val]：属性包含指定值的元素；
- [attr^=val] ：属性以指定值开头的元素；
- [attr$=val]：属性以指定值结尾的元素；
- [attr~=val]：属性包含指定值(完整单词)的元素(不推荐使用)；
- [attr|=val]：属性以指定值(完整单词)开头的元素(不推荐使用)；

### 组合选择器

- 相邻兄弟选择器：A + B
- 普通兄弟选择器：A ~ B
- 子选择器：A > B
- 后代选择器：A B

## 伪类

### 条件伪类

- :lang()：基于元素语言来匹配页面元素；
- :dir()：匹配特定文字书写方向的元素；
- :has()：匹配包含指定元素的元素；
- :is()：匹配指定选择器列表里的元素；
- :not()：用来匹配不符合一组选择器的元素；

### 行为伪类

- :active：鼠标激活的元素；
- :hover： 鼠标悬浮的元素；
- ::selection：鼠标选中的元素；

### 状态伪类

- :target：当前锚点的元素；
- :link：未访问的链接元素；
- :visited：已访问的链接元素；
- :focus：输入聚焦的表单元素；
- :required：输入必填的表单元素；
- :valid：输入合法的表单元素；
- :invalid：输入非法的表单元素；
- :in-range：输入范围以内的表单元素；
- :out-of-range：输入范围以外的表单元素；
- :checked：选项选中的表单元素；
- :optional：选项可选的表单元素；
- :enabled：事件启用的表单元素；
- :disabled：事件禁用的表单元素；
- :read-only：只读的表单元素；
- :read-write：可读可写的表单元素；
- :blank：输入为空的表单元素；
- :current()：浏览中的元素；
- :past()：已浏览的元素；
- :future()：未浏览的元素；

### 结构伪类

- :root：文档的根元素；
- :empty：无子元素的元素；
- :first-letter：元素的首字母；
- :first-line：元素的首行；
- :nth-child(n)：元素中指定顺序索引的元素；
- :nth-last-child(n)：元素中指定逆序索引的元素；；
- :first-child ：元素中为首的元素；
- :last-child ：元素中为尾的元素；
- :only-child：父元素仅有该元素的元素；
- :nth-of-type(n) ：标签中指定顺序索引的标签；
- :nth-last-of-type(n)：标签中指定逆序索引的标签；
- :first-of-type ：标签中为首的标签；
- :last-of-type：标签中为尾标签；
- :only-of-type：父元素仅有该标签的标签；

### 伪元素

- ::before：在元素前插入内容；
- ::after：在元素后插入内容；

### 优先级

<center><img style="width:70%;" src="https://mason369.github.io/Mason_blog/assets/2022-10-1-img/3.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

优先级就是分配给指定的 CSS 声明的一个权重，它由匹配的选择器中的每一种选择器类型的数值决定。为了记忆，可以把权重分成如下几个等级，数值越大的权重越高：

- 10000：!important；
- 01000：内联样式；
- 00100：ID 选择器；
- 00010：类选择器、伪类选择器、属性选择器；
- 00001：元素选择器、伪元素选择器；
- 00000：通配选择器、后代选择器、兄弟选择器；

可以看到内联样式（通过元素中 style 属性定义的样式）的优先级大于任何选择器；而给属性值加上 !important 又可以把优先级提至最高，就是因为它的优先级最高，所以需要谨慎使用它，以下有些使用注意事项：

- 一定要优先考虑使用样式规则的优先级来解决问题而不是 !important；
- 只有在需要覆盖全站或外部 CSS 的特定页面中使用 !important；
- 永远不要在你的插件中使用 !important；
- 永远不要在全站范围的 CSS 代码中使用 !important；

## 继承性

<center><img style="width:70%;" src="https://mason369.github.io/Mason_blog/assets/2022-10-1-img/4.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

在 CSS 中有一个很重要的特性就是子元素会继承父元素对应属性计算后的值。比如页面根元素 html 的文本颜色默认是黑色的，页面中的所有其他元素都将继承这个颜色，当申明了如下样式后，H1 文本将变成橙色。

```css
body {
	color: orange;
}
h1 {
	color: inherit;
}
```

设想一下，如果 CSS 中不存在继承性，那么我们就需要为不同文本的标签都设置一下 color，这样一来的后果就是 CSS 的文件大小就会无限增大。  
CSS 属性很多，但并不是所有的属性默认都是能继承父元素对应属性的，那哪些属性存在默认继承的行为呢？一定是那些不会影响到页面布局的属性，可以分为如下几类：

- 字体相关：font-family、font-style、font-size、font-weight 等；
- 文本相关：text-align、text-indent、text-decoration、text-shadow、letter-spacing、word-spacing、white-space、line-height、color 等；
- 列表相关：list-style、list-style-image、list-style-type、list-style-position 等；
- 其他属性：visibility、cursor 等；

对于其他默认不继承的属性也可以通过以下几个属性值来控制继承行为：

- inherit：继承父元素对应属性的计算值；
- initial：应用该属性的默认值，比如 color 的默认值是 #000；
- unset：如果属性是默认可以继承的，则取 inherit 的效果，否则同 initial；
- revert：效果等同于 unset，兼容性差。

## 文档流

在 CSS 的世界中，会把内容按照从左到右、从上到下的顺序进行排列显示。正常情况下会把页面分割成一行一行的显示，而每行又可能由多列组成，所以从视觉上看起来就是从上到下从左到右，而这就是 CSS 中的流式布局，又叫文档流。文档流就像水一样，能够自适应所在的容器，一般它有如下几个特性：

- 块级元素默认会占满整行，所以多个块级盒子之间是从上到下排列的；
- 内联元素默认会在一行里一列一列的排布，当一行放不下的时候，会自动切换到下一行继续按照列排布；

如何脱离文档流呢？

- 脱流文档流指节点脱流正常文档流后，在正常文档流中的其他节点将忽略该节点并填补其原先空间。文档一旦脱流，计算其父节点高度时不会将其高度纳入，脱流节点不占据空间。有两种方式可以让元素脱离文档流：浮动和定位。

- 使用浮动（float）会将元素脱离文档流，移动到容器左/右侧边界或者是另一个浮动元素旁边，该浮动元素之前占用的空间将被别的元素填补，另外浮动之后所占用的区域不会和别的元素之间发生重叠；
  使用绝对定位（position: absolute;）或者固定定位（position: fixed;）也会使得元素脱离文档流，且空出来的位置将自动被后续节点填补。

## 盒模型

在 CSS 中任何元素都可以看成是一个盒子，而一个盒子是由 4 部分组成的：内容（content）、内边距（padding）、边框（border）和外边距（margin）。
盒模型有 2 种：标准盒模型和 IE 盒模型，本别是由 W3C 和 IExplore 制定的标准。
如果给某个元素设置如下样式：

```css
.box {
	width: 200px;
	height: 200px;
	padding: 10px;
	border: 1px solid #eee;
	margin: 10px;
}
```

标准盒模型认为：盒子的实际尺寸 = 内容（设置的宽/高） + 内边距 + 边框

<center><img style="width:70%;" src="https://mason369.github.io/Mason_blog/assets/2022-10-1-img/5.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>
所以 .box 元素内容的宽度就为 200px，而实际的宽度则是 width + padding-left + padding-right + border-left-width + border-right-width = 200 + 10 + 10 + 1 + 1 = 222。
IE 盒模型认为：盒子的实际尺寸 = 设置的宽/高 = 内容 + 内边距 + 边框

<center><img style="width:70%;" src="https://mason369.github.io/Mason_blog/assets/2022-10-1-img/6.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>
.box 元素所占用的实际宽度为 200px，而内容的真实宽度则是 width - padding-left - padding-right - border-left-width - border-right-width = 200 - 10 - 10 - 1 - 1 = 178。
现在高版本的浏览器基本上默认都是使用标准盒模型，而像 IE6 这种老古董才是默认使用 IE 盒模型的。
在  CSS3 中新增了一个属性 box-sizing，允许开发者来指定盒子使用什么标准，它有 2 个值：

- content-box：标准盒模型；
- border-box：IE 盒模型；

视觉格式化模型
视觉格式化模型（Visual formatting model）是用来处理和在视觉媒体上显示文档时使用的计算规则。CSS 中一切皆盒子，而视觉格式化模型简单来理解就是规定这些盒子应该怎么样放置到页面中去，这个模型在计算的时候会依赖到很多的因素，比如：盒子尺寸、盒子类型、定位方案（是浮动还是定位）、兄弟元素或者子元素以及一些别的因素。

<center><img style="width:70%;" src="https://mason369.github.io/Mason_blog/assets/2022-10-1-img/7.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>
从上图中可以看到视觉格式化模型涉及到的内容很多，有兴趣深入研究的可以结合上图看这个 W3C 的文档 [Visual formatting model](https://www.w3.org/TR/CSS2/visuren.html)。所以这里就简单介绍下盒子类型。

<center><img style="width:70%;" src="https://mason369.github.io/Mason_blog/assets/2022-10-1-img/8.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

盒子类型由 display 决定，同时给一个元素设置 display 后，将会决定这个盒子的 2 个显示类型（display type）：

- outer display type（对外显示）：决定了该元素本身是如何布局的，即参与何种格式化上下文；
- inner display type（对内显示）：其实就相当于把该元素当成了容器，规定了其内部子元素是如何布局的，参与何种格式化上下文；

### outer display type

对外显示方面，盒子类型可以分成 2 类：block-level box（块级盒子） 和 inline-level box（行内级盒子）。
依据上图可以列出都有哪些块级和行内级盒子：

- 块级盒子：display 为 block、list-item、table、flex、grid、flow-root 等；
- 行内级盒子：display 为 inline、inline-block、inline-table 等；

所有块级盒子都会参与 BFC，呈现垂直排列；而所有行内级盒子都参会 IFC，呈现水平排列。
除此之外，block、inline 和 inline-block 还有什么更具体的区别呢？

### block

- 占满一行，默认继承父元素的宽度；多个块元素将从上到下进行排列；
- 设置 width/height 将会生效；
- 设置 padding 和 margin 将会生效；

### inline

- 不会占满一行，宽度随着内容而变化；多个 inline 元素将按照从左到右的顺序在一行里排列显示，如果一行显示不下，则自动换行；
- 设置 width/height 将不会生效；
- 设置竖直方向上的 padding 和 margin 将不会生效；

### inline-block

- 是行内块元素，不单独占满一行，可以看成是能够在一行里进行左右排列的块元素；
- 设置 width/height 将会生效；
- 设置 padding 和 margin 将会生效；

### inner display type

对内方面，其实就是把元素当成了容器，里面包裹着文本或者其他子元素。container box 的类型依据 display 的值不同，分为 4 种：

- block container：建立 BFC 或者 IFC；
- flex container：建立 FFC；
- grid container：建立 GFC;
- ruby container：接触不多，不做介绍。

值得一提的是如果把 img 这种替换元素（replaced element）申明为 block 是不会产生 container box 的，因为替换元素比如 img 设计的初衷就仅仅是通过 src 把内容替换成图片，完全没考虑过会把它当成容器。  
参考：
[CSS 原理 - 你所不知道的 display](https://yachen168.github.io/article/display.html)
[格式化上下文](https://ithelp.ithome.com.tw/articles/10223896?sc=pt)

### 格式化上下文

格式化上下文（Formatting Context）是 CSS2.1 规范中的一个概念，大概说的是页面中的一块渲染区域，规定了渲染区域内部的子元素是如何排版以及相互作用的。
不同类型的盒子有不同格式化上下文，大概有这 4 类：

- BFC (Block Formatting Context) 块级格式化上下文；
- IFC (Inline Formatting Context) 行内格式化上下文；
- FFC (Flex Formatting Context) 弹性格式化上下文；
- GFC (Grid Formatting Context) 格栅格式化上下文；

其中 BFC 和 IFC 在 CSS 中扮演着非常重要的角色，因为它们直接影响了网页布局，所以需要深入理解其原理。

### BFC

块格式化上下文，它是一个独立的渲染区域，只有块级盒子参与，它规定了内部的块级盒子如何布局，并且与这个区域外部毫不相干。

<center><img style="width:70%;" src="https://mason369.github.io/Mason_blog/assets/2022-10-1-img/9.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>
BFC 渲染规则

* 内部的盒子会在垂直方向，一个接一个地放置；
* 盒子垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻盒子的 margin 会发生重叠；
* 每个元素的 margin 的左边，与包含块 border 的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此；
* BFC 的区域不会与 float 盒子重叠；
* BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算 BFC 的高度时，浮动元素也参与计算。

### 如何创建 BFC？

* 根元素：html
* 非溢出的可见元素：overflow 不为 visible
* 设置浮动：float 属性不为 none
* 设置定位：position 为 absolute 或 fixed
* 定义成块级的非块级元素：display: inline-block/table-cell/table-caption/flex/inline-flex/grid/inline-grid

### BFC 应用场景
1. 自适应两栏布局
应用原理：BFC 的区域不会和浮动区域重叠，所以就可以把侧边栏固定宽度且左浮动，而对右侧内容触发 BFC，使得它的宽度自适应该行剩余宽度。
<center><img style="width:70%;" src="https://mason369.github.io/Mason_blog/assets/2022-10-1-img/10.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>