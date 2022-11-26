---
title: 「ES6系列」解构赋值全解析
tags: [ES6, JavaScript, 解构赋值]
style: fill
color: warning
comments: true
description: 对象和数组时 Javascript 中最常用的两种数据结构，由于 JSON 数据格式的普及，二者已经成为 Javascript 语言中特别重要的一部分。在编码过程中，我们经常定义许多对象和数组，然后有组织地从中提取相关的信息片段。ES6 中添加了可以简化这种任务的新特性：解构。解构是一种打破数据结构，将其拆分为更小部分的过程。
---

## 引言

对象和数组时 Javascript 中最常用的两种数据结构，由于 JSON 数据格式的普及，二者已经成为 Javascript 语言中特别重要的一部分。在编码过程中，我们经常定义许多对象和数组，然后有组织地从中提取相关的信息片段。ES6 中添加了可以简化这种任务的新特性：解构。解构是一种打破数据结构，将其拆分为更小部分的过程。

为什么需要解构
我们考虑一个大多数人在使用 Javascript 进行编码时可能遇到过的情况。

假设，我们有一个学生数据，在学生数据中用一个对象表示三个学科（数学、语文、英语）的分数，我们根据这些数据显示学生的分数信息：

```javascript
const student = {
	name: "jsPool",
	age: 20,
	scores: {
		math: 95,
		chinese: 98,
		english: 93,
	},
};
function showScore(student) {
	console.log("学生名:" + student.name);
	console.log("数学成绩:" + (student.scores.math || 0));
	console.log("语文成绩:" + (student.scores.chinese || 0));
	console.log("英语成绩:" + (student.scores.english || 0));
}
showScore(student);
```

使用上面的代码，我们将获得所需的结果。但是，以这种方式编写的代码需要有一些值得注意的地方。
由于我们访问的对象 scores 嵌套在另一个对象 student 中，所以，我们的访问链变得更长，这意味着更多的输入，
而由于更多的输入，也就更有可能造成拼写的错误。当然，这并不是什么大问题，但是通过解构，我们可以用更具有表现力
和更紧凑的语法来做同样的事情。

## 对象的解构赋值

对象解构的语法形式是在一个赋值操作符左边放置一个对象字面量，例如：

```javascript
let details = {
	firstName: "Code",
	lastName: "Burst",
	age: 22,
};
const { firstName, age } = details;

console.log(firstName); // Code
console.log(age); // 22
```

这段代码中 details.firstName 的值被存储在变量 firstName 中，details.age 的值被存储在变量 age 中。 这是对象解构的最基本形式。

用一张图来解释一下其中的解构过程：

<center><img style="width:70%;" src="https://masonosam.top/assets/2022-11-25-img/1.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

非同名变量赋值
在这个例子中，我们使用与对象属性名相同的变量名称，当然，我们也可以定义与属性名不同的变量名称：

```javascript
const person = {
	name: "jsPool",
	country: "China",
};
const { name: fullname, country: place } = person;

console.log(fullname); // jsPool
console.log(place); // China
```

在这里，我们创建了两个局部变量：fullname , place，并将 fullname 映射到 name，place 映射到 country。
默认值
使用解构赋值表达式时，如果指定的局部变量名称在对象中不存在，那么这个局部变量会被赋值为 undefined，就像这样：

```javascript
const person = {
	name: "jsPool",
	country: "China",
};
let { age } = person;
console.log(age); // undefined
```

这段代码额外定义了一个局部变量 age，然后尝试为它赋值，然而在 person 对象上，没有对应属性名称的属性值，所以它像预期中的那样赋值为 undefined。

当指定的属性不存在时，可以定义一个默认值，在属性名称后添加一个等号（=）和相应的默认值即可：

```javascript
const person = {
	name: "jsPool",
	country: "China",
	sexual: undefined,
};
let { age = 20, sexual: sex = "male" } = person;
console.log(age); // 20
console.log(sex); // male
```

在这个例子中，为变量 age 设置了默认值 20，为非同名变量 sex 设置了默认值 male。只有对象 person 上没有该属性或者属性值为 undefined 时该默认值才生效。

## 嵌套对象的解构赋值

解构嵌套对象仍然与对象字面量的语法相似，可以将对象拆解以获取你想要的信息。

再来看文中最开始的例子，我们有一个学生数据，在学生数据中用一个对象表示三个学科（数学、语文、英语）的分数，我们根据这些数据显示学生的分数信息。我们可以通过解构赋值优雅的对其进行操作:

```javascript
const student = {
	name: "jsPool",
	age: 20,
	scores: {
		math: 95,
		chinese: 98,
		english: 93,
	},
};
function showScore(student) {
	const {
		name,
		scores: { math = 0, chinese = 0, english = 0 },
	} = student;
	console.log("学生名:" + name);
	console.log("数学成绩:" + math);
	console.log("语文成绩:" + chinese);
	console.log("英语成绩:" + english);
}
showScore(student);
```

在这里，我们定义了四个局部变量：name、math、chinese、english。此外我们还为变量 math、chinese、english 分别指定了默认值。

## 数组的解构赋值

与对象解构的语法相比，数组解构就简单多了，它使用的是数组字面量，且解构操作全部在数组内完成，而不是像对象字面量语法一样使用对象的命名属性。

```javascript
let list = [221, "Baker Street", "London"];
let [houseNo, street] = list;
console.log(houseNo, street); // 221 , Baker Street
```

在上面的代码中，我们从数组 list 中解构出数组索引 0 和 1 所对应的值并分别存储至变量 houseNo 和 street 中。

在数组的解构中，也可以直接省略元素，只为需要的元素提供变量名：

```javascript
let list = [221, "Baker Street", "London"];
let [houseNo, , city] = list;
console.log(houseNo, city); // 221 , London
```

这段代码中使用解构语法从数组 list 中获取索引 0 和索引 2 所对应的元素，city 前的逗号是前方元素的占位符，无论数组中的元素有多少个，都可用这种方式来提取想要的元素。

用一张图来解释一下其中的解构过程：

<center><img style="width:70%;" src="https://masonosam.top/assets/2022-11-25-img/2.png">
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;"></span></center>

## 默认值

在数组的解构赋值表达式中也可以为数组的任意位置添加默认值，当指定位置的属性不存在或其值为 undefined 时使用默认值：

```javascript
let list = [221, "Baker Street"];
let [houseNo, street, city = "BJ"] = list;
console.log(houseNo, street, city); // 221 , Baker Street , BJ
```

上面代码中，数组 list 只有两个元素，变量 city 没有对应的匹配值，但有一个默认值 BJ，所以最终 city 的输出结果不是 undefined 而是默认值 BJ。
嵌套数组的解构赋值
就像对象一样，也可以对嵌套数组进行解构操作，在原有的数组解构模式中插入另一个数组解构模式，即可将解构过程深入到下一级：

```javascript
let colors = ["red", ["green", "yellow"], "blue"];
let [firstColor, [secondColor]] = colors;
console.log(firstColor, secondColor); // red , green
```

在这个例子中，我们通过数组的嵌套解构，为变量 firstColor 和 secondColor 分配对应的值。

不定元素
在数组中，可以通过...语法将数组中的其余元素赋值给一个特定的变量，就像这样：

```javascript
let colors = ["red", "green", "blue"];
let [firstColor, ...otherColors] = colors;
console.log(firstColor); // red
console.log(otherColors); // ['green','blue']
```

这个例子中，数组 colors 的第一个元素被赋值给了 firstColor ，其他元素被赋值给了 otherColors 数组，所以 otherColors 中包含两个元素：'green' 和 'blue'。

## 混合解构

可以混合使用对象解构和数组解构来构建更多复杂的表达式，如此一来可以从任何混杂着对象和数组的数据结构中提取你想要的信息。

```javascript
let node = {
	name: "foo",
	loc: {
		start: {
			line: 1,
			column: 1,
		},
	},
	range: [0, 3],
};
let {
	loc: {
		start: { line },
	},
	range: [startIndex],
} = node;
console.log(line); // 1
console.log(startIndex); // 0
```

当使用混合解构语法时，可以从 node 对象中提取任意想要的信息。

混合解构这种方式对于从 JSON 中提取数据时尤其有效，不再需要遍历整个解构了。

## 参考

- [深入理解 ES6](https://book.douban.com/subject/27072230/)
- [一个简单的解构指南](https://codeburst.io/a-simple-guide-to-destructuring-and-es6-spread-operator-e02212af5831)
- [ES6 解构：完整指南](https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f)
- [ES6 标准入门之变量的解构赋值](https://juejin.cn/post/6844903839947030542)

## 系列文章推荐

- [ES6 系列-let 和 const 全解析](https://juejin.cn/post/1)
- [ES6 系列-箭头函数全解析](https://juejin.cn/post/6844903862365585416)
- [ES6 系列-Promise 全解析](https://juejin.cn/post/6844903869407985672)
