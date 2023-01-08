---
title: javaScript 进阶之路 --- 《手写 Promise（前篇）》
tags: [Promise, JS进阶, javaScript]
style: secondary
color: dark
comments: true
description:
---

## 手写 Promise

前言： 该来的还是来了，经过完成我们前面的四个支线任务

- [JS 代码运行机制](https://masonosam.top/blog/jsrun)
- [加深理解回调函数](https://masonosam.top/blog/jsback)
- [手写“回调地狱”](https://masonosam.top/blog/promise)
- [宏任务和微任务](https://masonosam.top/blog/microbig)

终于到了我们的主线任务 ---《手写 Promise》。对于前端来讲，当你完全理解 Promise 的设计思路，那么你会对你之前所了解的 JS 世界，有一个全新的认知。

不知各位是否有过下面这样的想法：

**--“我感觉我现在知识储备差不多了，接下来如何进阶呢？”**

其实这个问题谁都无法告诉你准确答案。只有当你在某一天掌握了你之前不知道的知识点，并且完全领悟它的时候。你脑子里就会突然有种 “知识升华” 的感觉。（我也无法准确描述那种感觉，就好像突然悟了一样）脑子里会瞬间把之前所有知识串联起来，各个知识点不再是一个一个的碎片 🧩。

这种感觉就是在我某一天读懂 JS 回调函数真正想表达出的思想,并且手写出 Promise 涌现的。当你某天有过一次这样感觉后，你就不会再去问别人关于如何进阶这种问题了，因为那时候的你，其实已经完成了当前知识的进阶，当你回过头看之前的代码时，你会发现不一样的世界，是那种拨云见日的感觉。

## **⚠️ 注意：本文的内容需要你对回调函数和宏任务微任务有比较清晰的认识，请不太懂的小伙伴在家长的陪同下认真观看**

## 一. 文件准备

本文需要你准备的文件非常简单，随便在你的目录文件夹下创建一个 myPromise.ts 文件，对 .ts 不太熟悉的小伙伴不需要担心，本篇用到 ts 的相关内容很少。

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cc3e2bd526d47a594dba835dfd8ce2a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

## 二. 实现 MyPromise 类 的构造器函数

1. 首先我们定义一个叫做 MyPromise 的类。在接下来我会顺着原生的 Promise 一步一步帮你去理解 Promise 的实现思想。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c906084cc2f44da78244bba86b94b2b7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

2. 在上一章内容我们了解了，Promise 类会接收一个叫做 executor 的函数来初始化我们的 Promise 类的实例。

<center><img style="width:70%;" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acd501656f9d4563bb433e380826d3d8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

ok，并且我们还特别强调了，executor 就是一个普普通通的函数而已。那么我们就可以像下面这样，在 MyPromise 的 constructor 函数内定义一个形参，来准备接收在初始化时传递给我们的实参数。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a07d5d066ac143b6abb5c6e2f0c9c350~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

我相信聪明的你一定可以看出来，我们其实在 new 一个 Promise 实例的时候，传递给 Promise 类的函数就是我们刚刚定义的这个 executor 函数的实参。

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9ab832b36ee4f19b114e701b6738c39~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

3. OK，我们继续。我们还知道 executor 函数会被传递两个参数。这两个参数分别是一个叫做 resolve 和 reject 的函数！注意，它们两个是函数！！所以我们就可以像下面这样写。

<center><img style="width:70%;" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fe31402eca1477296707fb5d6480623~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

好像飘红了？是的，因为在 MyPromise 结构体内，还没有这两个函数。那怎么办呢？🤔，这还不简单？没有我们就自己造呗～

4. 可以看到我们自己定义了两个函数，好像还是飘红...

<center><img style="width:70%;" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/241e285ec4a044199e665892322501f8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

这里就需要用到 this 关键词，来告诉 executor 我要传递的是类本身的方法。所以正确的方法应该下面这样。

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d965e59cb434bf29e3c2b8bf3836940~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

## 三. 实现 resolve，reject 函数

1. 这里我们先实现 resolve ，别着急。我们先看原生 Promise 是怎么使用的。

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d965e59cb434bf29e3c2b8bf3836940~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

我们可以得知，resolve 函数可以被传递一个参数，所以我们可以更进一步得出。

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d965e59cb434bf29e3c2b8bf3836940~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

我们先来测试一下我们的思路是不是对的。我们先 new 一个实例保存一个数据看看。

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d965e59cb434bf29e3c2b8bf3836940~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/691d67dac366481fae16b27e29e8f8a4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

嗯...看来有点那味道了。🍦

2. 同理 reject 函数也是这种写法。到这一步，我想你的 MyPromise 类应该长这个样子。

<center><img style="width:70%;" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3cd3bedc9f4437582ce39f6376b4a26~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

## 四.实现 then 方法

1. 我们先回忆一下，原生的 Promise 读取数据的时候，是在实例的 then 方法上读取的。这里我们就需要提供一个变量去接收 resolve 传递的值。并且需要在 MyPromise 类中提供一个 then 方法，去读取传递过来的数据。

<center><img style="width:70%;" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/625b3c5261284720a470c28a8e78b80c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

2. 这里先停一下，我们想一想。我们的 result 是不希望被实例引用的。什么意思呢？如果我们按照上面的写法，是会引发这样的错误的。

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97e3be1bd4374356ae83c87e4e20379c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

实例竟然可以直接去引用这个 result ，这是我们不希望看到的。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1beb10c27ae4d1eb7f0afae47151f9f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

这里需要用到的知识是：假如我们不希望实例调用某个属性，方法也很简单，只需要在前面加上一个 #号即可。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28475286190a4c55803d5cdad4b7054f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

3. 接下来是本文的第一个重点。then 函数该怎么设计？我们先看原生 Promise 实例的身上 .then 方法是怎么使用的。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/394b5064fa194213b96b228870b53f89~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

由之前的知识我们可以知道，then 方法也是接受两个回调函数作为参数的。并且第一个回调函数的参数会被传递 resolve 保存的值，第二个回调函数的参数会被传递 reject 保存的值。

4. ok，那我们先不考虑那么多，直接先给 then 函数传两个参数，这两个参数也是两个函数。第一个参数我们就起一个叫 onFulfilled 的函数 ，它对应着 resolve 保存的值。第二个参数我们就叫 onRejected 吧，它也应该是一个函数。于是我们就可以补充 then 函数的内容，它会被传递我们通过 reject 保存的那个结果。

<center><img style="width:70%;" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4eadcb7839fc400bad5f0be2822d17f4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

下面的代码应该是你目前写出来的样子。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7365ac7c23d40d7abd3934fbe4a34f8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

## 五. MyPromise 的三种状态

1. 等等，我们好像忘了一个很关键的东西，Promise 的三种状态！！！还记得吗？Promise 在初始化的时候是有三个状态的，分别是 pending，fulfilled 和 rejected。这三种状态分别影响着 then 函数中我们取到的值。

2. 知道这一点，我们马上就应该想到，我需要再定义一个变量，来存放这三个状态值。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/687aa09b0846474cb698d6c267c955bd~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

并且还有一点，pending 状态是会在初始化，也就是还没调用 resolve 或者 reject 函数之前的状态。

所以我们就需要在 constructor 构造函数调用 executor 之前将 state 的状态信息改为 pending，对应就是下面这行代码的意义。

<center><img style="width:70%;" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1dfa3ca4535d4a0ea3ffc94007edc034~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

3. 并且我们可以推算出，在 resolve 函数内，和 reject 函数内需要分别修改状态值为 fulfilled 和 rejected，就如同下面的写法一样。

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/780dbd9f3a44443b947b5076339cf3ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

4. 由于我们 then 函数会根据状态去做相应传递的参数不同，所以理所当然的需要修改为下面的写法。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cd61cd5af924471a9e4576941843aaa~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

5. 下面应该是你目前的代码。

<center><img style="width:70%;" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/667ff650e38a4bbb8387d04506ce8d92~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

## 六. 创造一个 MyPromise 实例

1. 目前看起来好像我们的逻辑非常严谨对吧，我们别着急往下写，我们自己去调用一下看看是什么样子。我们先自己 new MyPromise 生成一个实例看看。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b15ea616ff2459986ffb01aab25be4f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

按照我们的推算，控制台应该会出入一个字符串韩振方。
我们看一下结果：

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe4c064bc6694704ad7784eb9dca6df1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

什么情况？竟然报错了？别着急，我们分析一下错误。

```js
Uncaught TypeError: Cannot set properties of undefined (setting '#result')
```

> 这个错误的意思是我们不能给 undefined 设置属性，我们看一下我们的代码，我们在 then 函数中，我们是通过 this.#result 去获取到结果的，但是我们在 new MyPromise 的时候，我们并没有给 this.#result 赋值，所以就会报错了。

不能给 undefined 设置 #result 的属性。
怎么回事啊？我们怎么在给 undefined 设置属性？我们不是在给 MyPromise 实例设置属性吗？我还就不信了，我非得打印一下看看，我们在 resolve 里面打印一下 this 看看到底这个 this 是谁 。

<center><img style="width:70%;" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5fa1887fc1b94981a949cfb150eb5c0e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

看一下控制台:

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e362362180c4448b9b6e519f5db84453~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

emm...好像还真是 undefined。

2. 到底怎么回事呢？🤔 其关键点在于下面这段代码。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4be5579954424ef685bf4a82b1680217~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

在这里我们看似在引用实例自身去调用 resolve，实际上在这里调用者的其实是 window 对象。不过因为我们在 Class 类里面是默认开启严格模式的，如果丢失了 this ，并不会将 this 默认指向全局对象 window。

<center><img style="width:70%;" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db6c9820f3d942faa222dea9da8200c4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

3. 所以我们需要干一件非常非常重要的事情，没错，就是绑定 this。

<center><img style="width:70%;" src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a41d014479924066910cb34c7722f55b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

因为我们 constructor 函数里的 this 总是会指向实例本身，所以我们需要在 调用 resolve 函数和 reject 函数之前，需要在 excutor 的参数提前绑定好 this 才可以。所以我们现在的代码应该是这个样子：

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/728a676d7ab94ea7a0b5e3a02834cb2f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

4. 让我们再次调用一下我们自己的 MyPromise ，来看一下现在能不能成功读取我们保存的数据。

<center><img style="width:70%;" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a381910c07544cb99b3eca4015cc4836~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

<center><img style="width:70%;" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5411b7a1cef04a1d97d29b3ae997bfd2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

可以看到，我们已经成功读取了我们通过 then 方法读取到了 resolve 传递过来的数据。

5. 到这里你可能好奇，为什么 then 方法不用绑定 this。因为你别忘了我们的 then 是怎么去调用的。

<center><img style="width:70%;" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b9dbdcc3603492e854f515b410cf1ac~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

可以看到，我们的 then 是通过对象点一个属性名去调用的，那么它的 this 百分百就是 data 实例对象。它是不需要我们考虑 this 指向问题的。

## 总结

在本文主要引导大家构造好一个 Promise 的骨架，大家可以先消化一下，在下一篇内容我会更深入的讲解其中的细节。🎁
