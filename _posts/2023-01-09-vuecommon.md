---
title: 面试官最喜欢问的14种Vue修饰符
tags: [Vue, 前端]
style: secondary
color: success
comments: true
description: 众所周知，修饰符也是Vue的重要组成成分之一，利用好修饰符可以大大地提高开发的效率，接下来给大家介绍一下面试官最喜欢问的13种Vue修饰符
---

> ## 前言

大家好，我是林三心，众所周知，修饰符也是 Vue 的重要组成成分之一，利用好修饰符可以大大地提高开发的效率，接下来给大家介绍一下*面试官最喜欢问的 13 种 Vue 修饰符*

## 1. lazy

lazy 修饰符作用是，改变输入框的值时 value 不会改变，当光标离开输入框时，v-model 绑定的值 value 才会改变

```js
<input type="text" v-model.lazy="value">
<div>{{value}}</div>

data() {
        return {
            value: '222'
        }
    }
```

<center><img style="width:70%;" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/746b221956384678812cd585e4fa7834~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

## 2.trim

trim 修饰符的作用类似于 JavaScript 中的 trim()方法，作用是把 v-model 绑定的值的首尾空格给过滤掉。

```js
<input type="text" v-model.trim="value">
<div>{{value}}</div>

data() {
        return {
            value: '222'
        }
    }
```

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7416025f033140688ed68135f77c4b48~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

## 3.number

number 修饰符的作用是将值转成数字，但是先输入字符串和先输入数字，是两种情况

```js
<input type="text" v-model.number="value">
<div>{{value}}</div>

data() {
        return {
            value: '222'
        }
    }
```

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/322016b98d2c49fe87870c220814b266~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;">先输入数字的话，只取前面数字部分</span></center>

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3ae0a87592447df9938a446dd727e0a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;">先输入字母的话，number修饰符无效</span></center>

## 4.stop

stop 修饰符的作用是阻止冒泡

```js
<div @click="clickEvent(2)" style="width:300px;height:100px;background:red">
    <button @click.stop="clickEvent(1)">点击</button>
</div>

methods: {
        clickEvent(num) {
            不加 stop 点击按钮输出 1 2
            加了 stop 点击按钮输出 1
            console.log(num)
        }
    }
```

## 5.capture

事件默认是由里往外冒泡，capture 修饰符的作用是反过来，由外网内捕获

```js
<div @click.capture="clickEvent(2)" style="width:300px;height:100px;background:red">
    <button @click="clickEvent(1)">点击</button>
</div>

methods: {
        clickEvent(num) {
            不加 capture 点击按钮输出 1 2
            加了 capture 点击按钮输出 2 1
            console.log(num)
        }
    }
```

## 6.self

self 修饰符作用是，只有点击事件绑定的本身才会触发事件

```js
<div @click.self="clickEvent(2)" style="width:300px;height:100px;background:red">
    <button @click="clickEvent(1)">点击</button>
</div>

methods: {
        clickEvent(num) {
            不加 self 点击按钮输出 1 2
            加了 self 点击按钮输出 1 点击div才会输出 2
            console.log(num)
        }
    }
```

## 7.once

once 修饰符的作用是，事件只执行一次

```js
<div @click.once="clickEvent(2)" style="width:300px;height:100px;background:red">
    <button @click="clickEvent(1)">点击</button>
</div>

methods: {
        clickEvent(num) {
            不加 once 多次点击按钮输出 1
            加了 once 多次点击按钮只会输出一次 1
            console.log(num)
        }
    }
```

## 8.prevent

prevent 修饰符的作用是阻止默认事件（例如 a 标签的跳转）

```js
<a href="#" @click.prevent="clickEvent(1)">点我</a>

methods: {
        clickEvent(num) {
            不加 prevent 点击a标签 先跳转然后输出 1
            加了 prevent 点击a标签 不会跳转只会输出 1
            console.log(num)
        }
    }
```

## 9.native

native 修饰符是加在自定义组件的事件上，保证事件能执行

```html
执行不了
<My-component @click="shout(3)"></My-component>

可以执行
<My-component @click.native="shout(3)"></My-component>
```

## 10.left，right，middle

这三个修饰符是鼠标的左中右按键触发的事件

```html
<button
	@click.middle="clickEvent(1)"
	@click.left="clickEvent(2)"
	@click.right="clickEvent(3)"
>
	点我
</button>

methods: { 点击中键输出1 点击左键输出2 点击右键输出3 clickEvent(num) {
console.log(num) } }
```

## 11.passive

当我们在监听元素滚动事件的时候，会一直触发 onscroll 事件，在 pc 端是没啥问题的，但是在移动端，会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给 onscroll 事件整了一个.lazy 修饰符

```html
<div @scroll.passive="onScroll">...</div>
```

## 12.camel

```html
不加camel viewBox会被识别成viewbox
<svg :viewBox="viewBox"></svg>

加了canmel viewBox才会被识别成viewBox
<svg :viewBox.camel="viewBox"></svg>
```

## 13.sync

当父组件传值进子组件，子组件想要改变这个值时，可以这么做

```html
父组件里
<children :foo="bar" @update:foo="val => bar = val"></children>

子组件里 this.$emit('update:foo', newValue)
```

sync 修饰符的作用就是，可以简写：

```js
父组件里
<children :foo.sync="bar"></children>

子组件里
this.$emit('update:foo', newValue)
```

## 14.keyCode

当我们这么写事件的时候，无论按什么按钮都会触发事件

```html
<input type="text" @keyup="shout(4)" />
```

那么想要限制成某个按键触发怎么办？这时候 keyCode 修饰符就派上用场了

```html
<input type="text" @keyup.keyCode="shout(4)" />
```

Vue 提供的 keyCode：

```js
//普通键
.enter
.tab
.delete //(捕获“删除”和“退格”键)
.space
.esc
.up
.down
.left
.right
//系统修饰键
.ctrl
.alt
.meta
.shift
```

例如（具体的键码请看[键码对应表](https://zhidao.baidu.com/question/266291349.html)）

```html
按 ctrl 才会触发
<input type="text" @keyup.ctrl="shout(4)">

也可以鼠标事件+按键
<input type="text" @mousedown.ctrl.="shout(4)">

可以多按键触发 例如 ctrl + 67
<input type="text" @keyup.ctrl.67="shout(4)">
```
