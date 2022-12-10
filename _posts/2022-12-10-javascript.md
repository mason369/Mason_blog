---
title: JavaScript基础总结~建议收藏
tags: [JavaScript, ES6, 基础]
style: secondary
color: warning
comments: true
description: Javascript是一门面向对象的，跨平台的脚本语言。
---

## JavaScript 介绍

### 什么是 JavaScript？

Javascript 是一门面向对象的，跨平台的脚本语言。

### JavaScript 有什么特点？

- 解释性脚本语言
- 运行在浏览器（浏览器内核带有 js 解释器，Chrome v8 引擎）
- 弱类型语言（松散型）
- 事件驱动（动态）
- 跨平台

### JavaScript 有什么用途？

- 嵌入动态文本于 HTML 页面
- 对浏览器事件做出响应
- 读写 HTML 元素
- 在数据被提交到服务器之前验证数据
- 检测访客的浏览器信息（可以使用 js 代码判断浏览器类型）
- 控制 cookies，包括创建和修改等
- 基于 Node.js 技术进行服务器端编程

### JavaScript 作用域？

作用域：变量的作用范围，主要有以下几种：

全局变量

> 作用范围为整个程序的执行范围，在函数体外部定义的变量就是全局变量，在函数体内部不使用 var 定义的也是全局变量。

- 局部变量

> 作用范围是某个函数体内部,在函数体内部通过 var 关键字定义的变量或者形参，都是局部变量,当局部变量与全局变量重名时，在函数体内部局部变量优先于全局变量。

- 变量提升

> 变量的声明会提升至当前作用域的最顶端，但不会提升赋值

### 暂存性死区

在相同的函数或块作用域内重新声明同一个变量会引发 SyntaxError;

在声明变量或常量之前使用它, 会引发 ReferenceError. 这就是暂存性死区。

这里主要存在两个坑点:

- switch case 中 case 语句的作用域

```javascript
switch (x) {
	case 0:
		let foo;
		break;

	case 1:
		let foo; // TypeError for redeclaration.
		break;
}
```

会报错是因为 switch 中只存在一个块级作用域, 改成以下形式可以避免:

```javascript
let x = 1;

switch (x) {
	case 0: {
		let foo;
		break;
	}
	case 1: {
		let foo;
		break;
	}
}
```

- 与词法作用域结合的暂存死区

```javascript
function test() {
	var foo = 33;
	if (true) {
		let foo = foo + 55; // ReferenceError
	}
}
test();
```

在 if 语句中使用了 let 声明了 foo, 因此在(foo+55)中引用的是 if 块级作用域中的 foo, 而不是 test 函数中的 foo; 但是由于 if 中的 foo 还没有声明完。

> 在这一行中，if 块的“foo”已经在词法环境中创建，但尚未达到（并终止）其初始化（这是语句本身的一部分）

因此它仍处于暂存死区

### 变量生命周期

全局变量的生命周期直至浏览器卸载页面才会结束。
局部变量只在函数的执行过程中存在，而在这个过程中会为局部变量在栈或堆上分配相应的空间，以存储它们的值，然后再函数中使用这些变量，直至函数结束

### 执行环境执行栈

执行环境执行栈（也称执行上下文–execution context）。

当 JavaScript 解释器初始化执行代码时，它首先默认进入全局执行环境，从此刻开始，函数的每次调用都会创建一个新的执行环境，每一个执行环境都会创建一个新的环境对象压入栈中。

当执行流进入一个函数时，函数的环境对象就会被压入一个环境栈中（execution stack）。在函数执行完后，栈将其环境弹出，把控制权返回给之前的执行环境。

<center><img style="width:70%;" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/20/17369a8614986ae3~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

### 严格模式

除了正常运行模式，ECMAscript 5 添加了第二种运行模式："严格模式"（strict mode）。顾名思义，这种模式使得 Javascript 在更严格的条件下运行。其主要有下面这几个目的：

- 消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 Javascript 做好铺垫。

"严格模式"体现了 Javascript 更合理、更安全、更严谨的发展方向，包括 IE 10 在内的主流浏览器，都已经支持它。

> 同样的代码，在非严格模式下可以运行，但是严格模式下可能将不能运行。

### 如何进入严格模式

```jaavsript
<script>
     "use strict"
    console.log("已经进入严格模式");
</script>
```

### 严格模式行为变更

- 全局变量声明时 必须加 var

```jaavsript
<script>

    "use strict"

    a = 10;//报错 因为 a没有被var 声明

     //Uncaught ReferenceError: a is not defined; 引用错误： a 没有被声明

</script>
```

- this 无法指向全局对象

```javascript
<script>
        "use strict"
         // console.log("已经进入严格模式");
        function a(){
            this.b = 10; //报错 ， 因为this指向了window对象;

            //Uncaught TypeError: Cannot set property 'b' of undefined; 类型错误 ： 不能给undefined设置属性b；

        }
        window.a()；
</script>
```

- 函数内重名属性

```javascript
<script>
    "use strict";
    function a(b,b,c){ //报错
            console.log(b,b,c); // 正常模式下 2,2,3

            // Uncaught SyntaxError: Duplicate parameter name not allowed in this context   ;语法错误：在此上下文中不允许重复的参数名称

    }
    a(1,2,3)
</script>
```

- arguments 对象

> arguments 对象不允许被动态改变;

```javascript
<script>
    function fn1(a) {
        a = 2;
        return [a, arguments[0]];
    }
    console.log(fn1(1)); // 正常模式为[2,2]
    function fn2(a) {
        "use strict";
        a = 2;
        return [a, arguments[0]];
    }
    console.log(fn2(1)); // 严格模式为[2,1]
</script>
```

> arguments 对象不允许被自调用

```javascript
<script>
        "use strict";
        var f = function() { return arguments.callee; };
        f(); // 报错

        //Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them

        //类型错误：“caller ”，“arguments.callee ”，不能在严格模式中使用;

        //caller返回调用当前函数的函数的引用  （正在执行的函数的属性）
       // callee返回正在执行的函数本身的引用 （arguments的属性）

</script>
```

### this

this 是 js 的关键字，他是根据执行上下文（执行环境）动态指向当前调用的对象；
谁调用，就指谁；

call()、apply()、bind() 可以改变 this 的指向

### js 的对象

js 语言中一切皆为对象，比如数字、字符串、数组、Math、Object、函数

js 中对象的本质：属性和方法的集合（无序，所以对象没有 length 属性）。

用官方一点的语言来解释对象：

> 什么是对象，其实就是一种类型，即引用类型。而对象的值就是引用类型的实例。在 ECMAScript 中引用类型是一种数据结构，用于将数据和功能组织在一起。它也常被称做为类，但 ECMAScript6 以前却没有这种东西。虽然 ECMAScript 是一门面向对象的语言，却不具备传统面向对象语言所支持的类等基本结构。

### 特点

封装、继承、多态

- 封装： 1. 写对象 2. 用对象

把一些相关的对象和属性放到一起，用一个变量抽象出来，那么这就完成了这个对象的封装

- 继承： 1. 子承父业 2. 子对象可以使用父对象的一些属性和方法

- 多态： 1. 重载，重写 2. 重载就是根据不同的参数类型，参数个数实现不同的功能 3. 重写就是父类的方法不好用，我自己重新定义一个方法名相同的不同方法

### 定义方式

- 字面量

```javascript
var obj = {
    键值对
    key:value
}
```

- new 运算符

```javascript
var obj = new Object();
```

- 构造函数

```javascript
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function () {
		alert(this.name);
	};
}

var person1 = new Person("monkey", 30, "web");
var person2 = new Person("zhu", 25, "h5");
```

- 工厂模式

工厂模式抽象了创建具体对象的过程。由于在 ECMAScript 中无法创建类，开发人员就发明了一种函数，用函数来封装以特定接口创建对象的细节，如下面的例子：

```javascript
function createPerson(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function () {
		alert(this.name);
	};
	return o;
}

var person1 = createPerson("monkey", 30, "web");
var person2 = createPerson("zhu", 25, "h5");
```

- ES6 class 语法糖

```javascript
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return "(" + this.x + ", " + this.y + ")";
	}
}
```

## 常用方法

### 内置对象

### String

- 字符串的两种创建方式（常量和构造函数），常用 api 有：
- charAt() 返回在指定位置的字符
- indexOf() 检索字符串，返回下标
- lastIndexOf() 从后向前搜索字符串。
- charCodeAt() 返回在指定的位置的字符的 Unicode 编码。
- fromCharCode() 从字符编码创建一个字符串。
- concat() 连接字符串。
- match() 找到一个或多个（正则表达式的）匹配。
- replace() 替换与正则表达式匹配的子串。
- search() 检索与正则表达式相匹配的值。
- slice() 提取字符串的片断，并在新的字符串中返回被提取的部分。
- split() 把字符串分割为字符串数组。
- substr() 从起始索引号提取字符串中指定数目的字符。
- substring() 提取字符串中两个指定的索引号之间的字符。
- toLowerCase() 把字符串转换为小写。
- toUpperCase() 把字符串转换为大写。
- trim() 去掉字符串前后空格（ES5）
- startsWith() 字符串是否以某个字符开头（ES6）
- endsWith() 字符串是否以某个字符结尾（ES6）
- includes() 字符串是否包含某个字符（ES6）
- repeat() 重复某个字符串几次（ES6）

### Math

- Math 的常用属性有：
- Math.E 返回算术常量 e，即自然对数的底数（约等于 2.718）。
- Math.LN2 返回 2 的自然对数（约等于 0.693）。
- Math.LN10 返回 10 的自然对数（约等于 2.302）。
- Math.LOG2E 返回以 2 为底的 e 的对数（约等于 1.414）。
- Math.LOG10E 返回以 10 为底的 e 的对数（约等于 0.434）。
- Math.PI 返回圆周率（约等于 3.14159）。
- Math.SQRT1_2 返回返回 2 的平方根的倒数（约等于 0.707）。
- SQRT1_2.SQRT2 返回 2 的平方根（约等于 1.414）。

### 常用 api 有:

- abs(x) 返回数的绝对值。
- sin(x) 返回数的正弦。
- cos(x) 返回数的余弦。
- tan(x) 返回角的正切。
- ceil(x) 对数进行上舍入。
- floor(x) 对数进行下舍入。
- round(x) 把数四舍五入为最接近的整数。
- max(x,y) 返回 x 和 y 中的最高值。
- min(x,y) 返回 x 和 y 中的最低值。
- pow(x,y) 返回 x 的 y 次幂。
- sqrt(x) 返回数的算术平方根。
- random() 返回 0 ~ 1 之间的随机小数，包含 0 不包含 1

### Date

常用 api 有:

- getDate() 从 Date 对象返回一个月中的某一天 (1 ~ 31)。
- getDay() 从 Date 对象返回一周中的某一天 (0 ~ 6)。
- getMonth() 从 Date 对象返回月份 (0 ~ 11)。
- getFullYear() 从 Date 对象以四位数字返回年份。
- getYear() 请使用 getFullYear() 方法代替。
- getHours() 返回 Date 对象的小时 (0 ~ 23)。
- getMinutes() 返回 Date 对象的分钟 (0 ~ 59)。
- getSeconds() 返回 Date 对象的秒数 (0 ~ 59)。
- getMilliseconds() 返回 Date 对象的毫秒(0 ~ 999)。
- getTime() 返回 1970 年 1 月 1 日至今的毫秒数。
- getTimezoneOffset() 返回本地时间与格林威治标准时间 (GMT) 的分钟差。
- parse() 返回 1970 年 1 月 1 日午夜到指定日期（字符串）的毫秒数。
- setDate() 设置 Date 对象中月的某一天 (1 ~ 31)。
- setMonth() 设置 Date 对象中月份 (0 ~ 11)。
- setFullYear() 设置 Date 对象中的年份（四位数字）。
- setYear() 请使用 setFullYear() 方法代替。
- setHours() 设置 Date 对象中的小时 (0 ~ 23)。
- setMinutes() 设置 Date 对象中的分钟 (0 ~ 59)。
- setSeconds() 设置 Date 对象中的秒钟 (0 ~ 59)。
- setMilliseconds() 设置 Date 对象中的毫秒 (0 ~ 999)。
- setTime() 以毫秒设置 Date 对象。

### js 数组

上学时，班上的同学会进行分组，如下图，一竖排是一组

一列就是一个数组，一个数组里面有很多个元素（多个同学），因为 js 是弱类型语言，所以数组也是弱类型，同一个数组变量里可以有各种不同类型的元素。

### 定义方式

- 字面量

```javascript
var arr = [];
```

- new 运算符

```javascript
var arr = new Array();
//构造函数的方式
var arr = new Array(10);//一个参数指数组长度为10
var arr = new Array(10，20，30);//多个参数指定义数组元素
```

### 常用方法

- concat()：连接两个或更多的数组，并返回结果。
- join()：把数组的所有元素放入一个字符串。元素通过指定的分隔符进行分隔。
- pop()：删除并返回数组的最后一个元素
- push()：向数组的末尾添加一个或更多元素，并返回新的长度。
- shift()：删除并返回数组的第一个元素
- unshift()：向数组的开头添加一个或更多元素，并返回新的长度
- reverse()：颠倒数组中元素的顺序
- slice()：从某个已有的数组返回选定的元素
- sort()：对数组的元素进行排序
- splice()：删除元素，并向数组添加新元素
- toString()：把数组转换为字符串，并返回结果

ES5 新增数组方法

- indexOf()

> 判断一个元素是否存在于数组中，若不存在返回-1，若存在就返回它第一次出现的位置

- lastIndexOf()

  > lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索

- forEach()

  > 循环遍历数组中的每一个元素，这个函数包含三个形参，分别为：item, index, array, 用不到时可以不写

- map()

  > 返回一个新数组，新数组是原数组的映射，不改变原数组，新数组的元素值是每次函数 return 的返回值，若不写 return，接收的新数组的元素值将全为空

- filter()

  > 过滤元素，返回一个新数组,新的数组由每次函数返回值为 true 对应的元素组成； 原数组不受影响

- some()

  > return 返回的值只要有一项为 true,最终的返回值就为 true,不会继续遍历后边的元素,若没有一项满足返回值为 true 的，就返回 false,原数组不受影响；

- every()

  > 对数组的每一项执行给定的函数，假如该函数每一项都返回 true，最后结果才为 true；只要有一项返回值为 false，最后结果就是 false。且后边的元素都不会再继续执行函数；原数组不受影响

- reduce()
  > reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。reduce() 可以作为一个高阶函数，用于函数的 compose

> reduce() 对于空数组是不会执行回调函数的

- reduceRight()
  > reduceRight() 方法的功能和 reduce() 功能是一样的，不同的是 reduceRight() 从数组的末尾向前将数组中的数组项做累加。

> reduceRight() 对于空数组是不会执行回调函数的

ES6 新增数组方法

- find()

  > 传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它，并且终止搜索

- findIndex()

  > 传入一个回调函数，找到数组中符合当前搜索规则的第一个元素，返回它的下标，并且终止搜索

- fill()
  > 用新元素替换掉数组内的元素，可以指定替换下标范围。

格式：arr.fill(value, start, end)

- copyWithin()
  > 选择数组的某个下标，从该位置开始复制数组元素，默认从 0 开始复制。也可以指定要复制的元素范围。

> 格式：arr.copyWithin(被替换的起始位置,选取替换值的起始位置,选取替换值的结束位置)

- Array.from()

  > 将类似数组的对象（array-like object）和可遍历（iterable）的对象转为真正的数组

- Array.of()

  > 用于将一组值，转换为数组

- entries()

  > 返回迭代器：返回键值对

- values()

  > 返回键值对的 value

- keys()()

  > 返回键值对的 key

- includes（）
  > 判断数组中是否存在该元素，参数：查找的值、起始位置，可以替换 ES5 时代的 indexOf 判断方式。indexOf 判断元素是否为 NaN，会判断错误。

### ES6 新增

**let/const**

块级作用域：一种普遍存在于各个语言中的作用域范围；

**扩展运算符 ...**

三个点号，功能是把数组或类数组对象展开成一系列用逗号隔开的值

```javascript
var foo = function (a, b, c) {
	console.log(a);
	console.log(b);
	console.log(c);
};

var arr = [1, 2, 3];

//传统写法
foo(arr[0], arr[1], arr[2]);

//使用扩展运算符
foo(...arr);
//1
//2
//3
```

### rest 运算符

rest 运算符也是三个点号，不过其功能与扩展运算符恰好相反，把逗号隔开的值序列组合成一个数组

```javascript
//主要用于不定参数，所以ES6开始可以不再使用arguments对象
var bar = function (a, ...args) {
	console.log(a);
	console.log(args);
};

bar(1, 2, 3, 4);
//1
//[ 2, 3, 4 ]
```

### 模板字符串

ES6 中存在一种新的字符串， 这种字符串是 以 (波浪线上的那个字符 > 反引号)括起来表示的； 通常我们想要拼接一个带有标签的字符串， 是用这样的方式:

```javascript
bianliang + " <strong>这是一个文字" + obj.name + "</strong> " + bianliang;
```

但是有了 ES6 字符串一切都变得非常简单了;

```javascript
${bianliang} <strong>这是一个文字${obj.name}</strong>${bianliang} `
```

用 \${ } 扩住变量让拼接变得非常容易;

### =>箭头函数

原来的写法

```javascript
var test = function (x) {
	return x + 2;
};
```

使用箭头函数：

```javascript
var test = (x) => x + 2;

var 函数名 = (参数) => 运算规则;
```

箭头函数 this 指向的固定化，并不是因为箭头函数内部有绑定 this 的机制，实际原因是箭头函数根本没有自己的 this,导致内部的 this 就是外层代码块的 this。正是因为这个，所以箭头函数也不能做构造函数。主要有两个缺陷：

- 箭头函数是不能 new 的，它的设计初衷就跟构造函数不太一样
- 箭头函数如果要返回一个 JSON 对象，必须用小括号包起来 var test = ()=>({id:3, val=20})

### 解构赋值

```javascript
var [a, b, c] = [1, 2, 3];
var { a, b, c } = {
	a: 1,
	b: 2,
	c: 3,
};

var username = "zhangsan";
var age = 18;
var obj = { username, age };
```

### Set 和 Map 结构

想当初设计 JS 的时候，由于有 SUN 公司人员的参与 再加上当时如日中天的 JAVA 及其优秀的设计，才使得 JS 语法及内存设计跟 JAVA 会如此的接近。但 JAVA 很多优秀的内容，JS 不知道为了什么目的并没有引入，例如 Set 和 Map 集合

### Set 集合

Set 集合，本质上就是对数组的一种包装 例如：

```javascript
let imgs = new Set();
imgs.add(1）;
imgs.add(1）;
imgs.add(5）;
imgs.add("5"）;
imgs.add(new String("abc")）;
imgs.add(new String("abc")）;

// 打印的结果： 1  5  '5'  'abc'  'abc'
```

Set 集合是默认去重复的，但前提是两个添加的元素严格相等 所以 5 和"5"不相等，两个 new 出来的字符串不相等

关于遍历的方法 由于 Set 集合本质上还是一个 map，因此会有以下几种奇怪的遍历方法

```javascript
var imgs = new Set(["a", "b", "c"]);

//根据KEY遍历
for (let item of imgs.keys()) {
	console.log(item);
} //a //b //c
```

```javascript
//根据VALUE遍历
for (let item of imgs.values()) {
	console.log(item);
} //a //b //c
```

```javascript
//根据KEY-VALUE遍历
for (let item of imgs.entries()) {
	console.log(item);
} //['a','a'] //['b','b'] //['c','c']
```

```javascript
//普通for...of循环(for...of跟for-in的区别很明显，就是直接取值，而不再取下标了)
for (let item of imgs) {
	console.log(item);
} //a //b //c
```

SET 集合没有提供下标方式的访问，因此只能使用 for 来遍历。

// 下面展示了一种极为精巧的数组去重的方法

var newarr = [...new Set(array)];

### Map 集合

Map 集合,即映射

```javascript
let map = new Map();

map.set("S230", "张三");
map.set("S231", "李四");
map.set("S232", "王五");

获取某一个元素 map.get("s232"); //王五
```

//循环遍历，配合解构赋值

```javascript
for (let [key, value] of map) {
	console.log(key, value);
}
```

### BOM

BOM（Browser Object Model 浏览器对象模型），结构如下图所示：

<center><img style="width:70%;" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/7/20/17369a8617eeb4ab~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

window 是全局浏览器内置顶级对象，表示浏览器中打开的窗口（没有应用于 window 对象的公开标准，不过所有浏览器都支持该对象）。

在客户端 JavaScript 中，Window 对象是全局对象，所有的表达式都在当前的环境中计算。

也就是说，要引用当前窗口根本不需要特殊的语法，可以把那个窗口的属性作为全局变量来使用。

例如，可以只写 document，而不必写 window.document。

同样，可以把当前窗口对象的方法当作函数来使用，如只写 alert()，而不必写 Window.alert()。

除了上面列出的属性和方法，Window 对象还实现了核心 JavaScript 所定义的所有全局属性和方法。

### 全局变量

全局变量默认是挂在 window 下的，例如：

```javascript
var a = 123;

alert(window.a); //123
```

### window 下的子对象

location:

- window.location.href 当前页面的 URL，可以获取，可以修改（页面跳转）。
- window.location.hostname web 主机的域名
- window.location.pathname 当前页面的路径和文件名
- window.location.port web 主机的端口 （80 或 443）
- window.location.protocol 所使用的 web 协议（http:// 或 https://）
- window.location.search 请求参数（？后面的内容）
- window.location.reload() 刷新页面的方法。

> 一般情况下给 reload()传递一个 true，让他刷新，并不使用缓存。缓存的东西一般为 js 文件，css 文件等。用这个方法可以让自己不能动的页面动起来了。刷新当前页面。

window.navigator:

- navigator.appName 返回获取当前浏览器的名称。
- navigator.appVersion 返回 获取当前浏览器的版本号。
- navigator.platform 返回 当前计算机的操作系统。
  以上属性已经在逐渐被抛弃了。

一个新的属性将替代这些属性。

navigator.userAgent 返回浏览器信息（可用此属性判断当前浏览器）

判断当前浏览器类型的,示例：

```javascript
function isBrowser() {
	var userAgent = navigator.userAgent;
	//微信内置浏览器
	if (userAgent.match(/MicroMessenger/i) == "MicroMessenger") {
		return "MicroMessenger";
	}
	//QQ内置浏览器
	else if (userAgent.match(/QQ/i) == "QQ") {
		return "QQ";
	}
	//Chrome
	else if (userAgent.match(/Chrome/i) == "Chrome") {
		return "Chrome";
	}
	//Opera
	else if (userAgent.match(/Opera/i) == "Opera") {
		return "Opera";
	}
	//Firefox
	else if (userAgent.match(/Firefox/i) == "Firefox") {
		return "Firefox";
	}
	//Safari
	else if (userAgent.match(/Safari/i) == "Safari") {
		return "Safari";
	}
	//IE
	else if (!!window.ActiveXObject || "ActiveXObject" in window) {
		return "IE";
	} else {
		return "未定义:" + userAgent;
	}
}
```

history:

- history.go(1) 参数可写任意整数，正数前进，负数后退
- history.back() 后退
- history.forward() 前进

screen: 屏幕

- window.screen.width 返回当前屏幕宽度(分辨率值)
- window.screen.height 返回当前屏幕高度(分辨率值)

window 下的弹框方法:

- alert() 弹出一个提示框
- prompt() 弹出一个输入框
- confirm() 弹出一个确认框

### DOM

DOM（Document Object Model 文档对象模型），DOM 定义了表示和修改文档所需的对象、行为和属性，以及这些对象之间的关系。

## 获取 DOM 节点

- document.getElementById(id 名)
- getElementsByTagName(标签名)

  > 得到的是一个集合（不止一个，是一堆）

- getElementsByName( ) 通过 Name 值获取元素，返回值是集合，通常用来获取有 name 的 input 的值

  > 不是所有的标签都有 name 值,低版本的浏览器会有兼容问题

- getElementsByClassName(class 名称)

  > IE8 以下不能用

- document.querySelector () (ES5)>>>> 一旦匹配成功一个元素，就不往后匹配了
- document.querySelectorAll () (ES5)>>>> 强大到超乎想象;匹配到所有满足的元素, 支持 IE8+

### 属性获取和操作

- getAttribute( )获取元素的属性值
- setAttribute( )设置元素的属性
- removeAttribute( )删除属性
