---
title: JavaScript中var、let、const区别
tags: [前端, JavaScript、ES6]
style: secondary
color: warning
comments: true
description: ES2015（ES6）推出了许多闪亮的新功能。从 2020 年开始，我们假设许多 JavaScript 开发人员已经熟悉并开始使用这些功能。尽管这个假设可能部分正确，但是其中某些功能可能对一些开发人员来说仍然是个谜。
---

ES2015（ES6）推出了许多闪亮的新功能。从 2020 年开始，我们假设许多 JavaScript 开发人员已经熟悉并开始使用这些功能。尽管这个假设可能部分正确，但是其中某些功能可能对一些开发人员来说仍然是个谜。

## var

### 1. var 声明作用域

```javascript
function test() {
	var message = "hi"; //局部变量
}
test();
console.log(message); //报错！message未定义
```
<center>
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;">这里，message 变量是函数内部使用 var 定义的，函数名 test()，调用它会创建这个变量并给它赋值，调用之后变量就会被销毁，所以最后代码运行结果会显示未定义。</span></center>

```javascript
function test() {
	message = "hi"; //全局变量
}
test();
console.log(message); //正常打印hi
```
<center>
<span style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;">去掉 var 之后，message 就会变成全局变量，代码就可以正常打印。只要调用一次函数，就会定义这个变量，并且可以在函数外部访问到。虽然通过省略 var 可以定义全局变量，但不推荐这么做。在局部作用域中定义的全局变量很那维护，容易出错。</span></center>

### 2. var 声明提升

```javascript
function test() {
	console.log(age);
	var age = 16;
}
test();
```

这里是不会报错的，因为使用这个关键词声明的变量会自动提升到函数作用域顶部，就相当于如下代码：

```javascript
{
	function test() {
		var age;
		console.log(age);
		var age = 16;
	}
	test();
}
```

需要注意的是只是将变量的声明提升到函数作用域的顶部，并没有将赋值提上去，所以代码的运行结果是 undefined。还有就是对一个变量多次赋值是没有任何问题的。

## let

### 1. let 的声明

```javascript
if (true) {
	var age = 26;
	console.log(age); //26
}
console.log(age); //26
```

```javascript
if (true) {
	let age = 26;
	console.log(age); //26
}
console.log(age); //undefined
```

- var 和 let 的第一点区别就是，var 声明的范围是函数作用域，let 声明的范围是块作用域。let 定义的 age 变量不能在 if 块外部被引用，是因为它的作用域仅限于该块内部。块作用域是函数作用域的子集，适用于 var 的作用域限制同样也适用于 let。
- 第二个区别就是 let 不允许同一个块作用域中出现重复声明。

```javascript
lat name;
let name; //SyntaxError: Identifier 'name' has already been declared
```

嵌套使用相同的标识符不会报错，这是因为同一个块中没有重复的声明。

```javascript
let name = "JingYu";
console.log(name); //打印输出JingYu
if (true) {
	let name = "JingYu";
	console.log(name); //打印输出JingYu
}
```

报错的原因是因为这两个关键词的声明并不是不同类型变量，它们只是指出变量在相关作用域如何存在。

```javascript
//第一种：
var name;
let name; //SyntaxError: Identifier 'name' has already been declared

//第二种：
let name;
var name; //SyntaxError: Identifier 'name' has already been declared
```

### 2. 暂时性死区

- 第三个区别就是 let 声明变量不会在作用域中被提升。
  在解析代码时，JavaScript 引擎也会注意到出现在后面的声明，只不过在此之前不能用，在 let 声明之前的执行瞬间被称为”暂时性死区“。

```javascript
console.log(age);
let age = 26; //ReferenceError: Cannot access 'age' before initialization
```

### 3. 全局声明

- 第四个区别就是 let 在全局作用域中声明的变量不会成为 window 对象的属性，var 变量则会。

```javascript
var age = 26;
console.log(window.age); //26

let age = 26;
console.log(window.age); //undefined
```

4. for 循环中的 let 声明
   for 循环定义的迭代变量会渗透到循环体外：
   为什么输出的是 5 呢，是因为退出循环时，迭代变量保存的是导致循环退出的值：5。在之后执行超时逻辑时，所有的 i 都是 5。

```javascript
for (var i = 0; i < 5; i++) {}
console.log(i); //5
```

改成 let 之后就不会

```javascript
for (let i = 0; i < 5; i++) {}
console.log(i); //undefined
```

使用 let 声明迭代变量时，JavaScript 引擎会在后台为每个迭代循环声明一个新的迭代变量。

```javascript
for (let i = 0; i < 5; i++) {
	setTimeout(() => console.log(i), 0);
} //输出0、1、2、3、4
```

## const

const 基本与 let 用法相同，唯一一个重要的区别就是 const 声明变量必须同时初始化变量，且修改 const 声明的变量会报错。

```javascript
const age = 15;
age = 18; //TypeError: Assignment to constant variable.
```

1. const 也不允许重复声明
2. const 声明的作用域也是块
3. const 声明的限制只适用于它指向的变量的引用。如果 const 变量引用的是一个对象，那么修改这个对象内部的属性并不违反 const 的限制。

```javascript
const person = {};
person.name = "Jingyu";
```

4. const 是不能用来声明迭代变量的，因为迭代变量会自增。

```javascript
for (const i = 0; i < 10; ++i) {} //TypeError: Assignment to constant variable.
```

\*你可以用 const 声明一个不会被修改的 for 循环变量，那也是可以的。也就是说，每次迭代只是创建一个新变量。

```javascript
let i = 0;
for (const j = 7; i < 5; ++i) {
	console.log(j); //7,7,7,7,7
}
```

## 总结

### var:

1. 声明变量的作用域限制于函数作用域
2. 变量的声明会被提升，总是被提升到函数作用域顶部

### let：

1. 声明变量的作用域限制于块级
2. 变量的声明不会被提升，处于“暂时性死区”

### const:

1. 声明变量的同时必须初始化，修改值时指针就会发生改变，要报错
2. 如果是复合类型，只修改某个 value 值是不会报错的。
3. 
在开发过程中，程序员优先使用 const，let 次之，一般不使用 var
