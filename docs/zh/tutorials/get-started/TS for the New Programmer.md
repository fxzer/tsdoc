祝贺您选择 TypeScript 作为您的首选语言之一——您已经做出了正确的决定！

您可能已经听说过 TypeScript 是 JavaScript 的“风味”或“变体”。
TypeScript (TS) 和 JavaScript (JS) 之间的关系在现代编程语言中相当独特，因此更多地了解这种关系将有助于您了解 TypeScript 如何添加到 JavaScript 中。

## 什么是JavaScript？ 一个简短的历史

JavaScript（也称为 ECMAScript）最初是一种用于浏览器的简单脚本语言。
在它被发明的时候，它被期望用于嵌入网页的短代码片段——编写超过几十行的代码有点不寻常。
因此，早期的网络浏览器执行此类代码的速度非常慢。
不过，随着时间的推移，JS 变得越来越流行，Web 开发人员开始使用它来创建交互式体验。

Web 浏览器开发人员通过优化他们的执行引擎（动态编译）和扩展它的功能（添加 API）来应对 JS 使用的增加，这反过来又使 Web 开发人员更多地使用它。
在现代网站上，您的浏览器经常运行跨越数十万行代码的应用程序。
这是“网络”的漫长而渐进的成长过程，从一个简单的静态页面网络开始，演化为各种丰富_应用程序_的平台。

不仅如此，JS 已经变得足够流行，可以在浏览器上下文之外使用，例如使用 node.js 实现 JS 服务器。
JS 的“随处运行”特性使其成为跨平台开发的有吸引力的选择。
如今有许多开发人员_仅_使用 JavaScript 来对他们的整个堆栈进行编程！

总而言之，我们拥有一种专为快速使用而设计的语言，然后发展成为一种成熟的工具来编写具有数百万行的应用程序。
每种语言都有自己的_怪癖_——怪癖和惊奇，而 JavaScript 的低微起步使其拥有_许多_这样的怪癖。 一些例子：

- JavaScript 的相等运算符 (`==`) _coerces_ 它的参数，导致意外行为：

  ```js
  if ("" == 0) {
    // It is! But why??
  }
  if (1 < x < 3) {
    // True for *any* value of x!
  }
  ```

- JavaScript 还允许访问不存在的属性：

  ```js
  const obj = { width: 10, height: 15 };
  // Why is this NaN? Spelling is hard!
  const area = obj.width * obj.heigth;
  ```

大多数编程语言会在发生此类错误时抛出错误，有些会在编译期间抛出错误——在任何代码运行之前。
在编写小程序时，这种怪癖很烦人但可以管理； 在编写包含数百或数千行代码的应用程序时，这些不断出现的意外是一个严重的问题。

## TypeScript：静态类型检查器

我们之前说过，有些语言根本不允许那些有缺陷的程序运行。
在不运行代码的情况下检测代码中的错误称为_静态检查_。
根据正在操作的值的种类来确定什么是错误什么不是错误称为静态类型检查。

TypeScript 在执行前检查程序是否有错误，并根据_类型的值_进行检查，使其成为_静态类型检查器_。
例如，上面的最后一个示例由于 `obj` 的_type_而出错。
这是 TypeScript 发现的错误：

```ts 
// @errors: 2551
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
```

###  JavaScript 类型超集

但是，TypeScript 与 JavaScript 有何关系？

#### 语法

TypeScript 是一种语言，是 JavaScript 的_超集_：因此 JS 语法是合法的 TS。
语法是指我们编写文本以形成程序的方式。
例如，这段代码有一个_syntax_错误，因为它缺少一个`)`：

```ts 
// @errors: 1005
let a = (4
```

由于其语法，TypeScript 不会将任何 JavaScript 代码视为错误。
这意味着您可以将任何有效的 JavaScript 代码放入 TypeScript 文件中，而不必担心它的具体编写方式。

#### 类型

然而，TypeScript 是一个 _typed_ 超集，这意味着它添加了关于如何使用不同类型的值的规则。
之前关于  `obj.heigth` 的错误不是 _syntax_ 错误：它是以不正确的方式使用某种值（_type_）的错误。

作为另一个示例，这是您可以在浏览器中运行的 JavaScript 代码，它_将_记录一个值：
```js
console.log(4 / []);
```

这个语法上合法的程序记录了`Infinity`。
但是，TypeScript 将数字除以数组视为无意义的操作，并且会发出错误：
```ts 
// @errors: 2363
console.log(4 / []);
```

有可能您真的_确实_打算将一个数字除以一个数组，也许只是为了看看会发生什么，但大多数时候，这是一个编程错误。
TypeScript 的类型检查器旨在允许正确的程序通过，同时仍然捕获尽可能多的常见错误。
（稍后，我们将了解可用于配置 TypeScript 检查代码的严格程度的设置。）

如果您将一些代码从 JavaScript 文件移动到 TypeScript 文件，您可能会看到_类型错误_，具体取决于代码的编写方式。
这些可能是代码的合理问题，或者 TypeScript 过于保守。
在本指南中，我们将演示如何添加各种 TypeScript 语法来消除此类错误。

#### 运行时行为

TypeScript 也是一种编程语言，它保留了 JavaScript 的_运行时行为_。
例如，在 JavaScript 中除以零会产生“Infinity”而不是抛出运行时异常。
作为一项原则，TypeScript **从不**改变 JavaScript 代码的运行时行为。

这意味着，如果您将代码从 JavaScript 移至 TypeScript，则**保证**以相同的方式运行，即使 TypeScript 认为代码存在类型错误。

保持与 JavaScript 相同的运行时行为是 TypeScript 的基本承诺，因为这意味着您可以轻松地在两种语言之间转换，而不必担心可能导致程序停止运行的细微差异。

#### 擦除的类型

粗略地说，一旦 TypeScript 的编译器检查完您的代码，它就会_擦除_类型以生成生成的“已编译”代码。
这意味着一旦你的代码被编译，生成的普通 JS 代码就没有类型信息。

这也意味着 TypeScript 永远不会根据它推断的类型更改程序的_行为_。
最重要的是，虽然您可能会在编译期间看到类型错误，但类型系统本身与程序运行时的工作方式无关。

最后，TypeScript 不提供任何额外的运行时库。
您的程序将使用与 JavaScript 程序相同的标准库（或外部库），因此无需学习额外的 TypeScript 特定框架。


## 学习 JavaScript 和 TypeScript

我们经常会看到“我应该学习 JavaScript 还是 TypeScript？”这个问题。

答案是不学JavaScript就学不会TypeScript！
TypeScript 与 JavaScript 共享语法和运行时行为，因此您学习的任何有关 JavaScript 的知识都可以同时帮助您学习 TypeScript。

有很多资源可供程序员学习 JavaScript； 如果您正在编写 TypeScript，您不应该_忽略这些资源。
例如，标记为“javascript”的 StackOverflow 问题比“typescript”多 20 倍，但_所有_的“javascript”问题也适用于 TypeScript。

如果您发现自己正在搜索诸如“如何在 TypeScript 中对列表进行排序”之类的内容，请记住：**TypeScript 是带有编译时类型检查器的 JavaScript 运行时**。
在 TypeScript 中对列表进行排序的方式与在 JavaScript 中排序的方式相同。
如果您找到直接使用 TypeScript 的资源，那也很好，但不要局限于认为您需要特定于 TypeScript 的答案来解决有关如何完成运行时任务的日常问题。


## 下一步

这是对日常 TypeScript 中使用的语法和工具的简要概述。 从这里，您可以：

- <a href="/handbooks/handbook-v2/Basics">阅读完整手册</a>
- [案例探索](https://www.typescriptlang.org/play#show-examples)
