
JavaScript 中的每个值都有一组行为，您可以通过运行不同的操作观察到这些行为。
这听起来很抽象，但作为一个简单的例子，考虑我们可能对名为`message`的变量运行的一些操作。
```js
// Accessing the property 'toLowerCase'
// on 'message' and then calling it
message.toLowerCase();

// Calling 'message'
message();
```

如果我们将其分解，第一行可运行代码访问名为`toLowerCase的属性，然后调用它。
第二个尝试直接调用 `message` 。

但是假设我们不知道 `message` 的值——这很常见——我们无法可靠地说出尝试运行任何这段代码会得到什么结果。
每个操作的行为完全取决于我们首先拥有的价值。
- `message` 是可调用的吗？
- 它有一个名为 `toLowerCase` 的属性吗？
- 如果是，`toLowerCase` 是否可以调用？
- 如果这两个值都是可调用的，它们会返回什么？
这些问题的答案通常是我们在编写 JavaScript 时记在脑子里的东西，我们必须希望所有细节都正确。

假设 `message` 是按以下方式定义的。
```js
const message = "Hello World!";
```

正如您可能猜到的那样，如果我们尝试运行 `message.toLowerCase()`，我们只会得到小写的相同字符串。

那第二行代码呢？
如果您熟悉 JavaScript，就会知道这会失败并出现异常：

```
TypeError: message is not a function
```

It'd be great if we could avoid mistakes like this.

如果我们能避免这样的错误就太好了。

当我们运行我们的代码时，我们的 JavaScript 运行时选择做什么的方式是通过确定值的 _type_ - 它具有什么样的行为和功能。
这是 `TypeError` 所暗示的部分内容 - 它表示字符串`"Hello World!"`  不能作为函数调用。

对于某些值，例如原语`string`和`number`，我们可以在运行时使用`typeof`运算符识别它们的类型。
但是对于函数之类的其他东西，没有相应的运行时机制来识别它们的类型。
例如，考虑这个函数：
```js
function fn(x) {
  return x.flip();
}
```


我们可以通过阅读代码观察到，只有给定一个具有可调用`flip` 属性的对象，此函数才会起作用，但 JavaScript 不会以我们可以在代码运行时检查的方式显示此信息。
在纯 JavaScript 中判断 `fn` 对特定值的作用的唯一方法是调用它并查看会发生什么。
这种行为使得很难预测代码在运行之前将做什么，这意味着在编写代码时更难知道代码将做什么。

这样看来，_type_ 是描述哪些值可以传递给 `fn` 以及哪些值会崩溃的概念。
JavaScript 只真正提供了_dynamic_ 类型——运行代码看看会发生什么。

另一种方法是使用_static_类型系统来预测_在它运行之前_需要什么代码。
## 静态类型检查


回想一下我们之前尝试将`string`作为函数调用时遇到的`TypeError`。
 _大多数人_ 不喜欢在运行他们的代码时出现任何类型的错误——那些被认为是错误！
当我们编写新代码时，我们会尽力避免引入新的错误。

如果我们只添加一点代码，保存我们的文件，重新运行代码，并立即看到错误，我们可能能够快速隔离问题； 但情况并非总是如此。
我们可能没有对该功能进行足够彻底的测试，因此我们可能永远不会真正遇到会抛出的潜在错误！
或者，如果我们有幸目睹了错误，我们可能最终会进行大量重构并添加许多我们被迫挖掘的不同代码。

理想情况下，我们可以拥有一个工具来帮助我们在代码运行之前找到这些错误。
这就是像 TypeScript 这样的静态类型检查器所做的。
 _静态类型系统_ 描述了我们运行程序时我们的价值观的形状和行为。
像 TypeScript 这样的类型检查器使用该信息并告诉我们什么时候事情可能会偏离轨道。
```ts twoslash
// @errors: 2349
const message = "hello!";

message();
```

使用 TypeScript 运行最后一个示例将在我们首先运行代码之前给我们一条错误消息。
## 不期待错误


到目前为止，我们一直在讨论某些事情，比如运行时错误——JavaScript 运行时告诉我们它认为某些事情是荒谬的情况。
出现这些情况是因为 [ECMAScript 规范](https://tc39.github.io/ecma262/) 对语言在遇到意外情况时应如何表现有明确的说明。

例如，规范说尝试调用不可调用的东西应该抛出错误。
也许这听起来像是“显而易见的行为”，但您可以想象访问对象上不存在的属性也应该引发错误。
相反，JavaScript 给了我们不同的行为并返回值`undefined`:
```js
const user = {
  name: "Daniel",
  age: 26,
};

user.location; // returns undefined
```

最终，静态类型系统必须调用哪些代码应该在其系统中标记为错误，即使它是不会立即抛出错误的“有效”JavaScript。
在 TypeScript 中，以下代码会产生有关未定义 `location`的错误：
```ts twoslash
// @errors: 2339
const user = {
  name: "Daniel",
  age: 26,
};

user.location;
```


For example: typos,
虽然有时这意味着在您可以表达的内容上进行权衡，但目的是在我们的程序中捕获合法的错误。
TypeScript 捕获了 _很多_ 合法的错误。

例如：错别字，
```ts twoslash
// @noErrors
const announcement = "Hello World!";

// How quickly can you spot the typos?
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();

// We probably meant to write this...
announcement.toLocaleLowerCase();
```

uncalled functions,

```ts twoslash
// @noUnusedLocals
// @errors: 2365
function flipCoin() {
  // Meant to be Math.random()
  return Math.random < 0.5;
}
```

or basic logic errors.

```ts twoslash
// @errors: 2367
const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") {
  // Oops, unreachable
}
```

## 工具类型

当我们在代码中出错时，TypeScript 可以捕获错误。
这很好，但 TypeScript 也可以防止我们一开始就犯这些错误。

类型检查器具有检查诸如我们是否正在访问变量和其他属性的正确属性之类的信息。
一旦获得该信息，它还可以开始 _建议_ 您可能想要使用哪些属性。

这意味着 TypeScript 也可以用于编辑代码，核心类型检查器可以在您在编辑器中键入时提供错误消息和代码完成。
这是人们在谈论 TypeScript 中的工具时经常提到的部分内容。
<!-- prettier-ignore -->
```ts twoslash
// @noErrors
// @esModuleInterop
import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.sen
//       ^|
});

app.listen(3000);
```

TypeScript 非常重视工具，这不仅仅是您键入时的完成和错误。
支持 TypeScript 的编辑器可以提供“快速修复”以自动修复错误、重构以轻松重新组织代码，以及用于跳转到变量定义或查找对给定变量的所有引用的有用导航功能。
所有这些都建立在类型检查器之上并且是完全跨平台的，所以很可能 [你最喜欢的编辑器支持可用的 TypeScript](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support)。
## TS 编译器`tsc` 

我们一直在谈论类型检查，但我们还没有使用我们的*类型检查器*。
让我们认识一下我们的新朋友 `tsc`，TypeScript 编译器。
首先，我们需要通过 npm 获取它。
```sh
npm install -g typescript
```

> 这将全局安装 TypeScript 编译器 `tsc`。
> 如果您更愿意从本地 `node_modules` 包运行 `tsc`，则可以使用 `npx` 或类似工具。

现在让我们转到一个空文件夹并尝试编写我们的第一个 TypeScript 程序：`hello.ts`：  

```ts twoslash
// Greets the world.
console.log("Hello world!");
```

请注意这里没有多余的装饰； 这个“hello world”程序看起来与您用 JavaScript 编写的“hello world”程序完全相同。
现在让我们通过运行由 `typescript` 包为我们安装的命令 `tsc` 来对其进行类型检查。
```sh
tsc hello.ts
```
我们运行了 `tsc` 却没有任何反应！
好吧，没有类型错误，所以我们没有在控制台中得到任何输出，因为没有什么可报告的。

但再次检查 - 我们得到了一些 _file_ 输出。
如果我们查看当前目录，我们会在 `hello.ts` 旁边看到一个 `hello.js` 文件。
这是我们的 `hello.ts` 文件在 `tsc` _compiles_ 或 _transforms_ 到纯 JavaScript 文件后的输出。
如果我们检查内容，我们将看到 TypeScript 在处理 `.ts`文件后吐出的内容：
```js
// Greets the world.
console.log("Hello world!");
```

在这种情况下，TypeScript 几乎没有什么可以转换的，所以它看起来和我们写的一样。
编译器试图发出干净可读的代码，看起来像一个人会写的东西。
虽然这并不总是那么容易，但 TypeScript 始终如一地缩进，注意我们的代码何时跨越不同的代码行，并尝试保留注释。

如果我们 _确实_ 引入了类型检查错误怎么办？
让我们重写`hello.ts`：
```ts twoslash
// @noErrors
// This is an industrial-grade general-purpose greeter function:
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date}!`);
}

greet("Brendan");
```

如果我们再次运行 `tsc hello.ts`，请注意我们在命令行上收到错误！
```
Expected 2 arguments, but got 1.
```

如果我们再次运行 `tsc hello.ts`，请注意我们在命令行上收到错误！TypeScript 告诉我们忘记将参数传递给 `greet` 函数，这是正确的。
到目前为止，我们只编写了标准的 JavaScript，但类型检查仍然能够发现我们代码的问题。
感谢打字稿！
## 触发错误

在上一个示例中，您可能没有注意到的一件事是我们的 `hello.js` 文件再次更改。
如果我们打开那个文件，那么我们会看到内容基本上仍然与我们的输入文件相同。
考虑到 `tsc` 报告了有关我们代码的错误，这可能有点令人惊讶，但这是基于 TypeScript 的核心价值之一：很多时候，_你_ 比 TypeScript 更清楚。

重申一下，类型检查代码限制了您可以运行的程序种类，因此需要权衡类型检查器认为可接受的东西种类。
大多数情况下这没问题，但在某些情况下这些检查会妨碍您。
例如，想象一下您将 JavaScript 代码迁移到 TypeScript 并引入了类型检查错误。
最终您会为类型检查器清理一些东西，但是原始的 JavaScript 代码已经可以工作了！
为什么要将它转换为 TypeScript 才能阻止你运行它？

所以 TypeScript 不会妨碍您。
当然，随着时间的推移，您可能希望对错误采取更多的防御措施，并让 TypeScript 的行为更加严格。
在这种情况下，您可以使用 [`noEmitOnError`](/tsconfig#noEmitOnError) 编译器选项。
尝试更改您的“hello.ts”文件并使用该标志运行“tsc”：
```sh
tsc --noEmitOnError hello.ts
```

你会注意到 `hello.js` 永远不会更新。
##  显式类型


到目前为止，我们还没有告诉 TypeScript `person` 或 `date` 是什么。
让我们编辑代码以告诉 TypeScript `person` 是一个 `string`，而 `date` 应该是一个 `Date` 对象。
我们还将在 `date` 上使用 `toDateString()` 方法。
```ts twoslash
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

我们所做的是在 `person` 和 `date` 上添加 _类型注解_ 来描述可以调用哪些类型的值 `greet`。
您可以将该签名解读为“`greet` 接受类型为 `string` 的 `person` 和类型为 `Date` 的 `date`。

有了这个，TypeScript 可以告诉我们 `greet` 可能被错误调用的其他情况。
例如...
```ts twoslash
// @errors: 2345
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", Date());
```

嗯？
TypeScript 在我们的第二个参数上报告了错误，但为什么呢？

也许令人惊讶的是，在 JavaScript 中调用 `Date()`会返回一个`string`。
另一方面，用 `new Date()` 构造一个 `Date` 实际上符合我们预期的结果。

无论如何，我们可以快速修复错误：
```ts twoslash {4}
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
```

请记住，我们不必总是编写显式类型注释。
在许多情况下，TypeScript 甚至可以为我们 _推断_（或“弄清楚”）类型，即使我们忽略它们也是如此。
```ts twoslash
let msg = "hello there!";
//  ^?
```

即使我们没有告诉 TypeScript `msg` 的类型是 `string`，它也能识别出来。
这是一个特性，最好不要在类型系统最终会推断出相同类型时添加注释。

> 注意：前面代码示例中的消息气泡是您将鼠标悬停在该词上时编辑器将显示的内容。
## 擦除类型

让我们看看当我们用`tsc` 编译上面的函数  `greet` 输出 JavaScript 时会发生什么：
```ts twoslash
// @showEmit
// @target: es5
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
```

这里注意两件事：

1. 我们的 `person` 和 `date`  参数不再有类型注释。
2. 我们的“模板字符串”——使用反引号（`` ` `` 字符）的字符串被转换为带有连接的普通字符串。

稍后会详细介绍第二点，但现在让我们关注第一点。
类型注释不是 JavaScript 的一部分（或 ECMAScript 是迂腐的），因此实际上没有任何浏览器或其他运行时可以不加修改地运行 TypeScript。
这就是为什么 TypeScript 首先需要一个编译器——它需要某种方法来剥离或转换任何特定于 TypeScript 的代码，以便您可以运行它。
大多数特定于 TypeScript 的代码都被删除了，同样，这里我们的类型注释也被完全删除了。

> **切记**：类型注解永远不会改变程序的运行时行为。
## 降级处理


```js
`Hello ${person}, today is ${date.toDateString()}!`;
```

to

```js
"Hello " + person + ", today is " + date.toDateString() + "!";
```


为什么会这样？

模板字符串是 ECMAScript 版本 ECMAScript 2015（又名 ECMAScript 6、ES2015、ES6 等 - _别问_）的一项功能。
TypeScript 能够将代码从新版本的 ECMAScript 重写到旧版本，例如 ECMAScript 3 或 ECMAScript 5（又名 ES3 和 ES5）。
从较新或“更高”版本的 ECMAScript 向下移动到较旧或“较低”版本的过程有时称为_downleveling_。

默认情况下，TypeScript 以 ES3 为目标，这是 ECMAScript 的一个非常旧的版本。
我们可以使用 `target`  选项选择更新一些的东西。
使用“--target es2015”运行会将 TypeScript 更改为目标 ECMAScript 2015，这意味着代码应该能够在支持 ECMAScript 2015 的任何地方运行。
所以运行 `tsc --target es2015 hello.ts` 给我们以下输出：
```js
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());
```

> 虽然默认目标是 ES3，但当前绝大多数浏览器都支持 ES2015。
> 因此，大多数开发人员可以安全地将 ES2015 或更高版本指定为目标，除非与某些旧版浏览器的兼容性很重要。
## 严格模式

不同的用户使用 TypeScript 在类型检查器中寻找不同的东西。
有些人正在寻找一种更宽松的选择加入体验，它可以帮助仅验证他们程序的某些部分，并且仍然拥有不错的工具。
这是 TypeScript 的默认体验，其中类型是可选的，推理采用最宽松的类型，并且不检查潜在的`null`/`undefined`值。
就像 `tsc` 在遇到错误时发出的方式一样，这些默认设置已准备就绪，不会妨碍您。
如果您正在迁移现有的 JavaScript，那么这可能是理想的第一步。

相比之下，许多用户更喜欢让 TypeScript 尽可能多地立即验证，这就是该语言也提供严格设置的原因。
这些严格设置将静态类型检查从一个开关（无论您的代码是否被检查）变成更接近拨号盘的东西。
你把这个拨盘调得越高，TypeScript 就会为你检查越多。
这可能需要一些额外的工作，但总的来说，从长远来看它是值得的，并且可以进行更彻底的检查和更准确的工具。
如果可能，新代码库应始终启用这些严格检查。

TypeScript 有几个可以打开或关闭的类型检查严格性标志，除非另有说明，否则我们的所有示例都将启用所有这些标志。
CLI 中的 [`strict`](/tsconfig#strict) 标志，或 [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig -json.html) 同时打开它们，但我们可以单独选择退出它们。
您应该了解的两个最大的是 [`noImplicitAny`](/tsconfig#noImplicitAny) 和 [`strictNullChecks`](/tsconfig#strictNullChecks)。
## 禁止隐式any`noImplicitAny`

回想一下，在某些地方，TypeScript 不会尝试为我们推断类型，而是回退到最宽松的类型：`any`。
这不是可能发生的最糟糕的事情——毕竟，回退到 `any`  只是普通的 JavaScript 体验。

然而，使用 `any`  通常会违背使用 TypeScript 的初衷。
您的程序类型越多，您获得的验证和工具就越多，这意味着您在编写代码时遇到的错误会更少。
打开 [`noImplicitAny`](/tsconfig#noImplicitAny) 标志将对类型被隐式推断为 any 的任何变量发出错误。
## `strictNullChecks`
默认情况下，像 `null` 和 `undefined`  这样的值可以分配给任何其他类型。
这可以使编写一些代码更容易，但忘记处理 `null` 和 `undefined` 是世界上无数错误的原因——有些人认为这是一个 [十亿美元的错误](https://www.youtube.com/watch?v=ybrQvs4x0Ps)！
 `strictNullChecks`  标志使处理 `null` 和 `undefined` 更加明确，并且_spares_ 我们不必担心我们是否_忘记_处理 `null` 和 `undefined`。