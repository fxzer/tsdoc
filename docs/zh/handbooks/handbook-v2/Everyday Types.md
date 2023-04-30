
在本章中，我们将介绍一些在 JavaScript 代码中最常见的值类型，并解释在 TypeScript 中描述这些类型的相应方法。
这不是一个详尽的列表，以后的章节将描述更多命名和使用其他类型的方法。

类型还可以出现在更多 _地方_，而不仅仅是类型注释。
当我们了解类型本身时，我们还将了解我们可以引用这些类型以形成新结构的地方。

我们将从回顾您在编写 JavaScript 或 TypeScript 代码时可能遇到的最基本和最常见的类型开始。
这些稍后将形成更复杂类型的核心构建块。
## 原生类型: `string`, `number`, and `boolean`

JavaScript 具有三个非常常用的[原生类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)：`string`、`number` 和`boolean`。
每个在 TypeScript 中都有相应的类型。
如您所料，这些名称与您在这些类型的值上使用 JavaScript `typeof` 运算符时看到的名称相同：

- `string` 表示字符串值，例如 `"Hello, world"`
- `number` 适用于像 `42` 这样的数字。 JavaScript 没有整数的特殊运行时值，因此没有等同于 `int` 或 `float` - 一切都是简单的 `number`
- `boolean` 用于两个值 `true` 和 `false`

> 类型名称 `String`、`Number` 和 `Boolean`（以大写字母开头）是合法的，但指的是一些很少出现在您的代码中的特殊内置类型。 _始终_ 使用`string`, `number`, or `boolean` 作为类型。
## Arrays


要指定数组的类型，如 `[1, 2, 3]`，您可以使用语法 `number[]`； 此语法适用于任何类型（例如，`string[]` 是一个字符串数组，等等）。
您可能还会看到它写成 `Array<number>`，意思是一样的。
当我们介绍_泛型_时，我们将学习更多关于语法`T<U>`的知识。

> 注意 `[number]` 中定义不同的类型； 请参阅有关 **元组** 的部分。
## `any`

TypeScript 还有一种特殊类型，`any`，只要您不希望特定值导致类型检查错误，就可以使用它。

当一个值是`any`类型时，您可以访问它的任何属性（它又是`any`类型），像调用函数一样调用它，将它赋值给（或从）任何类型的值，或者 几乎任何其他语法上合法的东西：
```ts twoslash
let obj: any = { x: 0 };
// 以下代码行都不会抛出编译器错误。
// 使用 `any` 禁用所有进一步的类型检查，并且假定
// 你比 TypeScript 更了解环境。
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

当您不想为了让 TypeScript 相信某行特定代码没问题时，`any` 类型很有用。
### `noImplicitAny`

当您不指定类型，并且 TypeScript 无法从上下文中推断出它时，编译器通常会默认为 `any` 。

不过，您通常希望避免这种情况，因为没有对  `any`  进行类型检查。
使用编译器配置项 `noImplicitAny` 将任何隐式的 `any` 标记为错误。
## 变量类型注解

当您使用 `const`、`var` 或 `let` 声明变量时，您可以选择添加类型注释以显式指定变量的类型：
```ts twoslash
let myName: string = "Alice";
//        ^^^^^^^^ Type annotation
```

> TypeScript 不使用“左侧类型”式的声明，例如 `int x = 0;`
> 类型注解总是_在_被输入的东西之后。

但是，在大多数情况下，这不是必需的。
只要有可能，TypeScript 就会尝试自动_推断_代码中的类型。
例如，变量的类型是根据其初始值设定项的类型推断的：
```ts twoslash
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";
```
在大多数情况下，您不需要明确学习推理规则。
如果您刚开始，请尝试使用比您想象的更少的类型注释——您可能会惊讶于 TypeScript 完全理解正在发生的事情所需的类型注释如此之少。

## 函数

函数是在 JavaScript 中传递数据的主要方式。
TypeScript 允许您指定函数的输入值和输出值的类型。

### 参数类型注解

当你声明一个函数时，你可以在每个参数后面加上类型注解来声明函数接受什么类型的参数。
参数类型注释位于参数名称之后：
```ts twoslash
// Parameter type annotation
function greet(name: string) {
  //                 ^^^^^^^^
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

当参数具有类型注释时，将检查该函数的参数：
```ts twoslash
// @errors: 2345
declare function greet(name: string): void;
// ---cut---
// Would be a runtime error if executed!
greet(42);
```

> 即使您的参数没有类型注释，TypeScript 仍会检查您是否传递了正确数量的参数。
当参数具有类型注释时，将检查该函数的参数：
### 返回值类型注解

您还可以添加返回类型注释。
返回类型注释出现在参数列表之后：
```ts twoslash
function getFavoriteNumber(): number {
  //                        ^^^^^^^^
  return 26;
}
```


Here's an example:
与变量类型注释非常相似，您通常不需要返回类型注释，因为 TypeScript 会根据函数的`return` 语句推断函数的返回类型。
上面示例中的类型注释不会改变任何东西。
一些代码库会出于文档目的明确指定返回类型，以防止意外更改或仅出于个人喜好。

### 匿名函数

匿名函数与函数声明有点不同。
当函数出现在 TypeScript 可以确定将如何调用它的地方时，该函数的参数会自动指定类型。

这是一个例子：
```ts twoslash
// @errors: 2551
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];

// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
});
```


即使参数 `s` 没有类型注释，TypeScript 使用 `forEach`  函数的类型以及数组的推断类型来确定 s 将具有的类型。

这个过程称为 _上下文推断_，因为函数发生的上下文告诉它应该有什么类型。

与推理规则类似，您无需明确了解这是如何发生的，但了解它_确实_发生了可以帮助您注意到何时不需要类型注释。
稍后，我们将看到更多示例，说明值出现的上下文如何影响其类型。

## 对象类型

除了基元之外，您会遇到的最常见类型是_对象类型_。
这是指任何具有属性的 JavaScript 值，几乎是所有的值！
要定义对象类型，我们只需列出其属性及其类型。

例如，这是一个接受点状对象的函数：
```ts twoslash
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  //                      ^^^^^^^^^^^^^^^^^^^^^^^^
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

在这里，我们用具有两个属性的类型注释参数 - `x` 和 `y` - 都是 `number` 类型。
您可以使用 `,` 或 `;` 来分隔属性，最后一个分隔符是可选的。

每个属性的类型部分也是可选的。
如果您不指定类型，它将被假定为 `any`.。

### 可选属性

对象类型还可以指定它们的部分或全部属性是_可选的_。
为此，请在属性名称后添加一个 `?` ：
```ts twoslash
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

在 JavaScript 中，如果您访问一个不存在的属性，您将得到值`undefined`而不是运行时错误。
因此，当您 _读取_ 可选属性时，您必须在使用它之前检查`undefined`。
```ts twoslash
// @errors: 18048
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```

## 联合类型

TypeScript 的类型系统允许您使用各种运算符从现有类型构建新类型。
现在我们知道如何编写一些类型，是时候开始以有趣的方式 _组合_ 它们了。

### 定义联合类型

您可能会看到的第一种组合类型的方法是**联合类型**。
联合类型是由两个或多个其他类型组成的类型，表示可能是这些类型中的 _任何一个_ 的值。
我们将这些类型中的每一种称为工会的 _成员_。

让我们编写一个可以对字符串或数字进行操作的函数：
```ts twoslash
// @errors: 2345
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
```

### 使用联合类型

提供一个匹配联合类型的值很容易 --- 只需提供一个匹配联合的任何成员的类型。
如果你_有_一个联合类型的值，你如何使用它？

TypeScript 将只允许一个对联合体的每个成员有效的操作。
例如，如果你有联合`string | number`，您不能使用仅适用于 `string` 的方法：
```ts twoslash
// @errors: 2339
function printId(id: number | string) {
  console.log(id.toUpperCase());
}
```

解决方案是 _缩小_ 与代码的联合，就像在没有类型注释的 JavaScript 中一样。
当 TypeScript 可以根据代码结构为值推断出更具体的类型时，就会发生 _Narrowing_。

例如，TypeScript 知道只有 `string` 值才会有 `typeof` 值 `"string"`：
```ts twoslash
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

另一个例子是使用像这样的函数 `Array.isArray`:

```ts twoslash
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```
请注意，在 `else`  分支中，我们不需要做任何特殊的事情——如果  `x` 不是`string[]`，那么它一定有一个 `string`

有时你会有一个工会，其中所有成员都有一些共同点。
例如，数组和字符串都有一个 `slice` 方法。
如果联合中的每个成员都有一个共同的属性，您可以使用该属性而无需缩小：

```ts twoslash
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

> 类型的_union_似乎具有这些类型属性的 _交叉_，这可能会造成混淆。
> 这不是偶然的——_union_ 这个名字来自类型论。
> 联合`number | string` 是由每种类型的 _值_ 的并集组成的。
> 请注意，给定两个集合以及关于每个集合的相应事实，只有这些事实的 _交集_ 适用于集合本身的 _并集_。
> 例如，如果我们有一个房间是戴帽子的高个子人，另一个房间是戴帽子的说西班牙语的人，在合并这些房间之后，我们唯一知道的是 _每个人_ 都必须戴帽子。

## 类型别名

我们一直在使用对象类型和联合类型，方法是将它们直接写在类型注释中。
这很方便，但是想要多次使用同一类型并通过一个名称引用它是很常见的。

_类型别名_  --- 任何名称的类型。
类型别名的语法是：


```ts twoslash
type Point = {
  x: number;
  y: number;
};

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

实际上，您可以使用类型别名为任何类型命名，而不仅仅是对象类型。
例如，一个类型别名可以命名一个联合类型：
```ts twoslash
type ID = number | string;
```

请注意，别名只是别名——您不能使用类型别名来创建同一类型的不同/不同“版本”。
当您使用别名时，就像您编写了别名类型一样。
换句话说，这段代码可能 _看起来_ 是非法的，但根据 TypeScript 是可以的，因为这两种类型都是同一类型的别名：
```ts twoslash
declare function getInput(): string;
declare function sanitize(str: string): string;
// ---cut---
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// Create a sanitized input
let userInput = sanitizeInput(getInput());

// Can still be re-assigned with a string though
userInput = "new input";
```

## 接口

_接口声明_ 是另一种命名对象类型的方法：
```ts twoslash
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

就像我们在上面使用类型别名时一样，该示例就像我们使用匿名对象类型一样工作。
TypeScript 只关心我们传递给 `printCoord` 的值的 _结构_——它只关心它是否具有预期的属性。
只关心类型的结构和功能是我们将 TypeScript 称为 _结构类型_ 类型系统的原因。
### Type 和 Interfaces区别

类型别名和接口非常相似，在很多情况下您可以在它们之间自由选择。
`interface` 的几乎所有功能都在 `type` 中可用，关键区别在于：`type`无法重新添加属性，`interface`是可扩展的。
<table class='full-width-table'>
  <tbody>
    <tr>
      <th><code>Interface</code></th>
      <th><code>Type</code></th>
    </tr>
    <tr>
      <td>
        <p>Extending an interface</p>
        <code><pre>
interface Animal {
  name: string
}<br/>
interface Bear extends Animal {
  honey: boolean
}<br/>
const bear = getBear() 
bear.name
bear.honey
        </pre></code>
      </td>
      <td>
        <p>Extending a type via intersections</p>
        <code><pre>
type Animal = {
  name: string
}<br/>
type Bear = Animal & { 
  honey: boolean 
}<br/>
const bear = getBear();
bear.name;
bear.honey;
        </pre></code>
      </td>
    </tr>
    <tr>
      <td>
        <p>Adding new fields to an existing interface</p>
        <code><pre>
interface Window {
  title: string
}<br/>
interface Window {
  ts: TypeScriptAPI
}<br/>
const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
        </pre></code>
      </td>
      <td>
        <p>A type cannot be changed after being created</p>
        <code><pre>
type Window = {
  title: string
}<br/>
type Window = {
  ts: TypeScriptAPI
}<br/>
<span style="color: #A31515"> // Error: Duplicate identifier 'Window'.</span><br/>
        </pre></code>
      </td>
    </tr>
    </tbody>
</table>

您将在后面的章节中了解有关这些概念的更多信息，所以如果您不能立即理解所有这些，请不要担心。

- 在 TypeScript 4.2 版之前，类型别名 [_可能_ 出现在错误消息中](https://tinyurl.com/2jjdat8g)，有时会代替等效的匿名类型（可能需要也可能不需要）。 接口将始终在错误消息中命名。
- 类型别名可能不参与[声明合并，但接口可以](https://tinyurl.com/2lexbu5y)。
- 接口只能用于[声明对象的形状，而不是重命名基元](https://tinyurl.com/2hxq274q)。
- 接口名称将[_始终_ 以其原始形式出现](https://tinyurl.com/2f4x6f9y) 在错误消息中， _仅_ 当它们按名称使用时。
大多数情况下，您可以根据个人喜好进行选择，TypeScript 会告诉您是否需要另一种声明。 如果您想要启发式方法，请使用 `interface` ；否则，您需要使用  `type` 中的功能。
## 类型断言

有时，您会获得 TypeScript 无法知道的有关值类型的信息。

例如，如果您正在使用 `document.getElementById`，TypeScript 只知道这将返回几种 `HTMLElement`，但您可能知道您的页面将始终有一个带有给定 ID 的 `HTMLCanvasElement`。

在这种情况下，您可以使用 _类型断言_ 来指定更具体的类型：
```ts twoslash
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

与类型注释一样，类型断言会被编译器删除，不会影响代码的运行时行为。

您还可以使用尖括号语法（除非代码在 `.tsx` 文件中），这是等效的：
```ts twoslash
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

> 提醒：因为类型断言在编译时被移除，所以没有与类型断言关联的运行时检查。
> 如果类型断言错误，则不会产生异常或生成 `null`。

TypeScript 只允许转换为类型的 _更具体_ 或 _不具体_ 版本的类型断言。
此规则可防止“不可能”的强制转换，例如：
```ts twoslash
// @errors: 2352
const x = "hello" as number;
```

有时此规则可能过于保守，并且会禁止可能有效的更复杂的强制转换。
如果发生这种情况，您可以使用两个断言，首先是“any”（或“unknown”，我们将在后面介绍），然后是所需的类型：
```ts twoslash
declare const expr: any;
type T = { a: 1; b: 2; c: 3 };
// ---cut---
const a = (expr as any) as T;
```

## 字面量类型

除了一般类型 `string` 和 `number` 之外，我们还可以在类型位置引用具体 `string` 和 `number`类型值。

考虑这一点的一种方法是考虑 JavaScript 如何以不同的方式来声明变量。 `var` 和 `let` 都允许更改变量中保存的内容，而 `const` 则不允许。 这反映在 TypeScript 如何为文字创建类型上。
```ts twoslash
let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;
// ^?

const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;
// ^?
```

就其本身而言，文字类型不是很有价值：
```ts twoslash
// @errors: 2322
let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
```

拥有一个只能有一个值的变量并没有多大用处！

但是通过将文字组合成联合类型，您可以表达一个更有用的概念——例如，只接受一组特定已知值的函数：
```ts twoslash
// @errors: 2345
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
```

数字文字类型的工作方式相同：
```ts twoslash
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

当然，您可以将这些与非文字类型结合起来：
```ts twoslash
// @errors: 2345
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");
```

还有一种文字类型：布尔文字。
只有两种布尔文字类型，正如您可能猜到的那样，它们是类型“true”和“false”。
`boolean` 类型本身实际上只是 union `true | 的别名。 假`。
### 字面量推导

当您使用对象初始化变量时，TypeScript 假定该对象的属性稍后可能会更改值。
例如，如果您编写如下代码：
```ts twoslash
declare const someCondition: boolean;
// ---cut---
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```

TypeScript 不会假设将 `1` 分配给之前有`0`的字段是错误的。
另一种方式是 `obj.counter` 必须具有 `number` 类型，并且不是 `0`，因为类型用于确定读写行为。

这同样适用于字符串：
```ts twoslash
// @errors: 2345
declare function handleRequest(url: string, method: "GET" | "POST"): void;
// ---cut---
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
```

在上面的示例中，`req.method` 被推断为 `string`，而不是 `"GET"`。 因为可以在创建 `req` 和调用 `handleRequest` 之间评估代码，这可能会将一个新字符串（如 `"GUESS"` 分配给 `req.method`，所以 TypeScript 认为此代码有错误。

有两种方法可以解决这个问题。

1. 您可以通过在任一位置添加类型断言来更改推断：
   ```ts twoslash
   declare function handleRequest(url: string, method: "GET" | "POST"): void;
   // ---cut---
   // Change 1:
   const req = { url: "https://example.com", method: "GET" as "GET" };
   // Change 2
   handleRequest(req.url, req.method as "GET");
   ```

   Change 1 means "I dvert the entire object to be type literals:
更改 1 意味着“我打算让 `req.method` 始终具有_文字类型_ `"GET"`"，防止之后可能将 `"GUESS"` 分配给该字段。
    更改 2 表示“由于其他原因，我知道 `req.method` 的值为 `"GET"`"。

2. 你可以使用 `as const` 将整个对象转换为类型字面量：
   ```ts twoslash
   declare function handleRequest(url: string, method: "GET" | "POST"): void;
   // ---cut---
   const req = { url: "https://example.com", method: "GET" } as const;
   handleRequest(req.url, req.method);
   ```

`as const` 后缀的作用类似于 `const`，但对于类型系统而言，它确保所有属性都被赋予文字类型，而不是更通用的版本，如 `string` 或 `number`。

## `null` 和 `undefined`

JavaScript 有两个原始值用于表示值不存在或未初始化的值： `null` 和 `undefined`。

TypeScript 有两个对应的同名的类型。 这些类型的检查行为方式取决于您是否启用了 `strictNullChecks`配置选项。

## 空值检查

关闭空值检查，仍然可以正常访问可能为 `null` 或 `undefined` 的值，并且可以将值 `null` 和 `undefined` 分配给任何类型的属性 .
这类似于没有空值检查的语言（例如 C#、Java）的行为方式。
缺乏对这些值的检查往往是错误的主要来源； 我们总是建议人们打开 `strictNullChecks` 如果在他们的代码库中这样做是可行的。


开启空值检查配置项`strictNullChecks`，会对变量进行 `null` 或 `undefined` 检查 。
就像在使用可选属性之前检查 `undefined` 一样，我们可以使用 _narrowing_ 来检查可能为 `null` 的值：
```ts twoslash
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

### 非空断言 `!` 

TypeScript 还有一种特殊的语法，可以在不进行任何显式检查的情况下从类型中删除`null` 和 `undefined`。
在任何表达式后写 `!` 实际上是一种类型断言，即值不是 `null` 或 `undefined`：
```ts twoslash
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

就像其他类型断言一样，这不会改变代码的运行时行为，当值不能为`null` 或 `undefined`时使用`!`很重要。

#### `bigint`

从 ES2020 开始，JavaScript 中有一个原语用于非常大的整数，`BigInt`：
```ts twoslash
// @target: es2020

// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);

// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;
```

您可以在 **TypeScript 3.2 发行说明** 中了解有关 BigInt 的更多信息。
#### `symbol`

JavaScript原始类型，用于通过函数 `Symbol()`创建全局唯一引用：
```ts twoslash
// @errors: 2367
const firstName = Symbol("name");
const secondName = Symbol("name");

if (firstName === secondName) {
  // Can't ever happen
}
```

