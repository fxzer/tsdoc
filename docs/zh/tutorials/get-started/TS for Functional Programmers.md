
TypeScript 的诞生是为了尝试引入传统的面向对象类型
到 JavaScript 以便 Microsoft 的程序员可以将
传统的面向对象程序到网络。 随着它的发展，TypeScript 的类型
系统已经发展到可以为原生 JavaScript 编写的代码建模。 这
由此产生的系统是强大的、有趣的和凌乱的。

本简介专为工作的 Haskell 或 ML 程序员设计
想学习 TypeScript 的人。 它描述了类型系统如何
TypeScript 不同于 Haskell 的类型系统。 它还描述了
TypeScript 类型系统的独特特性源于其
JavaScript 代码建模。

本简介不包括面向对象编程。 在
实际上，TypeScript 中的面向对象程序类似于那些
在其他具有 OO 特性的流行语言中。

## 先决条件

在本介绍中，我假设您了解以下内容：

- 如何用 JavaScript 编程，好的部分。
- C 语言后裔的类型语法。

如果您需要学习 JavaScript 的优点，请阅读
[JavaScript：好的部分](https://shop.oreilly.com/product/9780596517748.do)。
如果你知道如何编写程序，你可以跳过这本书
一种按值调用的词法范围语言，具有很多可变性和
没有别的了。
[R<sup>4</sup>RS 方案](https://people.csail.mit.edu/jaffer/r4rs.pdf) 就是一个很好的例子。

[C++ 编程语言](http://www.stroustrup.com/4th.html) 是
学习 C 风格类型语法的好地方。 与 C++ 不同，
TypeScript 使用后缀类型，例如：`x: string` 而不是 `string x`。

##  区别于Haskell概念

## 内置类型

JavaScript 定义了 8 种内置类型：

| 类型         | 说明                    |
| ----------- | -----------------------|
| `Number`    | 双精度 IEEE754浮点数     |
| `String`    | 一个不可变的UTF-16 字符串  |
| `BigInt`    | 任意精度格式的整数         |
| `Boolean`   | `true` 和 `false`       |
| `Symbol`    | 通常用作键的唯一值         |
| `Null`      | 空值                    |
| `Undefined` | 未定义                  |
| `Object`    | 对象类型                 |
[有关详细信息，请参阅MDN页面](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures).

TypeScript 为内置类型提供了相应的原始类型：

- `number`
- `string`
- `bigint`
- `boolean`
- `symbol`
- `null`
- `undefined`
- `object`

### 其他重要的 TypeScript 类型

|  类型           | 说明                              |
| -------------- | -------------------------------  |
| `unknown`      | 顶级类型                           |
| `never`        | 底部类型                           |
| object literal | 例如： `{ property: Type }`        |
| `void`         | `undefined` 的子类型，用作返回类型。   |
| `T[]`          | 可变数组，也写成 `Array<T>`           |
| `[T, T]`       | 元组，固定长度但可变的                 |
| `(t: T) => U`  | 函数                                |

Notes:

1. 函数语法包括参数名称。 这很难习惯！

   ```ts
   let fst: (a: any, b: any) => any = (a, b) => a;

   // or more precisely:

   let fst: <T, U>(a: T, b: U) => T = (a, b) => a;
   ```

2. 对象字面量类型语法与对象字面量值语法非常相似：

   ```ts
   let o: { n: number; xs: object[] } = { n: 1, xs: [] };
   ```

3. `[T, T]` 是 `T[]` 的子类型。 这与 Haskell 不同，在 Haskell 中，元组与列表无关。

### 包装类型

JavaScript 有基本类型的盒装等价物，其中包含
程序员与这些类型关联的方法。 打字稿
反映这一点，例如，原语之间的差异
输入 `number` 和盒装类型 `Number`。 盒装类型很少
需要，因为他们的方法返回原语。

```ts
(1).toExponential();
// equivalent to
Number.prototype.toExponential.call(1);
```

请注意，在数字文字上调用方法需要它在
括号来帮助解析器。
## 渐进类型

TypeScript 在无法分辨类型的时候使用 any 类型
一个表达式应该是。 与 `Dynamic` 相比，将 `any` 称为类型
是夸大其词。 它只是关闭类型检查器
无论它出现在哪里。 例如，您可以将任何值压入
`any[]` 不以任何方式标记值：

```ts 
// with "noImplicitAny": false in tsconfig.json, anys: any[]
const anys = [];
anys.push(1);
anys.push("oh no");
anys.push({ anything: "goes" });
```

你可以在任何地方使用 `any` 类型的表达式：

```ts
anys.map(anys[1]); // oh no, "oh no" is not a function
```

`any` 也具有传染性 &mdash; 如果你用一个初始化一个变量
类型为 `any` 的表达式，变量的类型也为 any 。

```ts
let sepsis = anys[0] + anys[1]; // this could mean anything
```

当 TypeScript 出现`any`错误，请使用
`"noImplicitAny": true`, or `"strict": true` in `tsconfig.json`.

## 结构类型

结构类型对大多数函数式用户来说是一个熟悉的概念
程序员，尽管 Haskell 和大多数 ML 不是
结构类型。 它的基本形式非常简单：

```ts
// @strict: false
let o = { x: "hi", extra: 1 }; // ok
let o2: { x: string } = o; // ok
```

这里，对象文字 `{ x: "hi", extra: 1 }` 有一个匹配
文字类型 `{ x: string, extra: number }`。 那
类型可分配给 `{ x: string }` 因为
它具有所有必需的属性，并且这些属性具有
可分配的类型。 额外的属性不会阻止分配，它
只是使它成为 `{ x: string }` 的子类型。

命名类型只是给一个类型起一个名字； 出于可转让性目的
类型别名“One”和接口之间没有区别
在下面输入“两个”。 它们都有一个属性 `p: string`。 （类型别名
在递归方面与接口的行为不同
但是，定义和类型参数。）
```ts 
// @errors: 2322
type One = { p: string };
interface Two {
  p: string;
}
class Three {
  p = "Hello";
}

let x: One = { p: "hi" };
let two: Two = x;
two = new Three();
```

## 联合类型

在 TypeScript 中，联合类型是未标记的。 换句话说，他们不是
区分联合，例如 Haskell 中的“数据”。 但是，您可以经常
使用内置标签或其他属性区分联合中的类型。
```ts 
function start(
  arg: string | string[] | (() => string) | { s: string }
): string {
  // this is super common in JavaScript
  if (typeof arg === "string") {
    return commonCase(arg);
  } else if (Array.isArray(arg)) {
    return arg.map(commonCase).join(",");
  } else if (typeof arg === "function") {
    return commonCase(arg());
  } else {
    return commonCase(arg.s);
  }

  function commonCase(s: string): string {
    // finally, just convert a string to another string
    return s;
  }
}
```

`string`、`Array` 和 `Function` 有内置的类型谓词，
方便地将对象类型留给 else 分支。 这是
然而，可能产生难以建立的工会
在运行时区分。 对于新代码，最好只构建
受歧视的工会。

以下类型具有内置谓词：

| Type      | Predicate                          |
| --------- | ---------------------------------- |
| string    | `typeof s === "string"`            |
| number    | `typeof n === "number"`            |
| bigint    | `typeof m === "bigint"`            |
| boolean   | `typeof b === "boolean"`           |
| symbol    | `typeof g === "symbol"`            |
| undefined | `typeof undefined === "undefined"` |
| function  | `typeof f === "function"`          |
| array     | `Array.isArray(a)`                 |
| object    | `typeof o === "object"`            |

请注意，函数和数组在运行时是对象，但有它们的自己的谓词。
### 交叉类型

除了并集，TypeScript 还有交集：

```ts 
type Combined = { a: number } & { b: string };
type Conflicting = { a: number } & { a: string };
```

`Combined` 有两个属性，`a` 和 `b`，就好像它们已经被
写成一个对象字面量类型。 交集和并集是
在冲突的情况下递归，所以 `Conflicting.a: number & string`。

## 单元类型

单元类型是原始类型的子类型，只包含一个
原始值。 例如，字符串 `"foo"` 的类型是
`“富”`。 由于 JavaScript 没有内置枚举，因此通常使用一组
众所周知的字符串。 字符串文字类型的联合允许
用于键入此模式的 TypeScript：

```ts 
declare function pad(s: string, n: number, direction: "left" | "right"): string;
pad("hi", 10, "left");
```
需要时，编译器会 _加宽_ &mdash; 转换为
超类型—— 单元类型到原始类型，例如 `"foo"`
到 `string`。 使用可变性时会发生这种情况，这可能会妨碍一些
可变变量的使用：

```ts 
// @errors: 2345
declare function pad(s: string, n: number, direction: "left" | "right"): string;
// ---cut---
let s = "right";
pad("hi", 10, s); // error: 'string' is not assignable to '"left" | "right"'
```

Here's how the error happens:

- `"right": "right"`
- `s: string` because `"right"` widens to `string` on assignment to a mutable variable.
- `string` is not assignable to `"left" | "right"`

您可以使用 `s` 的类型注释来解决这个问题，但是
反过来防止对非类型变量的 `s` 赋值`"left" | "right"`.

```ts 
declare function pad(s: string, n: number, direction: "left" | "right"): string;
// ---cut---
let s: "left" | "right" = "right";
pad("hi", 10, s);
```

## 类似于Haskell的概念

## 推断类型

TypeScript 有一些明显的地方可以推断类型，比如
变量声明：:

```ts 
let s = "I'm a string!";
```

但它也在其他一些您可能没有想到的地方推断出类型
如果您使用过其他 C 语法语言：

```ts 
declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];
let sns = map((n) => n.toString(), [1, 2, 3]);
```

这里，这个例子中的 `n: number`，尽管`T` 和 `U`
调用前未被推断。 事实上，在 `[1,2,3]` 之后
用于推断 `T=number`，`n => n.toString()` 的返回类型
用于推断 `U=string`，导致 `sns` 具有类型
`字符串[]`。

请注意，推理可以按任何顺序进行，但智能感知只会
从左到右工作，所以 TypeScript 更喜欢用
数组优先：
```ts 
declare function map<T, U>(ts: T[], f: (t: T) => U): U[];
```

上下文类型也通过对象文字递归地工作，并且
在否则会被推断为“字符串”或
`数字`。 它可以从上下文推断返回类型：

```ts 
declare function run<T>(thunk: (t: T) => void): T;
let i: { inference: string } = run((o) => {
  o.inference = "INSERT STATE HERE";
});
```


`o` 的类型被确定为 `{ inference: string }` 因为

1. 声明初始值设定项由
    声明的类型：`{推断：字符串}`。
2.调用的返回类型使用上下文类型进行推理，
    所以编译器推断 T={ inference: string }`。
3.箭头函数使用上下文类型来键入它们的参数，
    所以编译器给出 `o: { inference: string }`。

它会在你打字的时候这样做，所以在打字“o.”之后，你
获取属性“inference”的完成，以及任何其他
您在真实程序中拥有的属性。
总而言之，这个特性可以让 TypeScript 的推理看起来有点
就像一个统一的类型推理引擎，但它不是。
## 类型别名

类型别名只是别名，就像 Haskell 中的 `type` 一样。 这
编译器将尝试在其中使用的任何地方使用别名
源代码，但并不总是成功。

```ts 
type Size = [number, number];
let x: Size = [101.1, 999.9];
```

最接近于 `newtype` 的是 a _tagged intersection_:

```ts
type FString = string & { __compileTimeOnly: any };
```

`FString` 就像一个普通的字符串，除了编译器
认为它有一个名为“__compileTimeOnly”的属性
实际存在。 这意味着仍然可以将 `FString` 分配给
`string`，但反之则不然。
## 可区分联合

与 data 最接近的等价物是具有判别式的类型联合
属性，在 TypeScript 中通常称为可区分联合：

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
```

与 Haskell 不同，标记或判别式只是每个中的一个属性
对象类型。 每个变体都具有相同的属性和不同的
单位类型。 这仍然是一个普通的联合类型； 领先的`|`是
联合类型语法的可选部分。 你可以区分
使用普通 JavaScript 代码的联盟成员：

```ts 
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

function area(s: Shape) {
  if (s.kind === "circle") {
    return Math.PI * s.radius * s.radius;
  } else if (s.kind === "square") {
    return s.x * s.x;
  } else {
    return (s.x * s.y) / 2;
  }
}
```

请注意，“area”的返回类型被推断为“number”，因为
TypeScript 知道这个函数是完整的。 如果某些变体不是
覆盖，`area` 的返回类型将是 `number | undefined` 代替。

此外，与 Haskell 不同的是，公共属性出现在任何联合中，所以你
可以有效地区分工会的多个成员：

```ts 
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
// ---cut---
function height(s: Shape) {
  if (s.kind === "circle") {
    return 2 * s.radius;
  } else {
    // s.kind: "square" | "triangle"
    return s.x;
  }
}
```

## 类型参数

与 C 语言一样，TypeScript 需要声明
类型参数：

```ts
function liftArray<T>(t: T): Array<T> {
  return [t];
}
```

没有大小写要求，但是类型参数是约定俗成的
单个大写字母。 类型参数也可以限制为
类型，其行为有点像类型类约束：

```ts
function firstish<T extends { length: number }>(t1: T, t2: T): T {
  return t1.length > t2.length ? t1 : t2;
}
```
TypeScript 通常可以根据调用从调用中推断类型参数
参数的类型，因此通常不需要类型参数。

因为 TypeScript 是结构化的，所以它不需要类型参数
就像名义系统一样。 具体来说，他们不需要做一个
函数多态。 类型参数应该只用于
_propagate_ 类型信息，例如约束参数是
同一类型：
```ts
function length<T extends ArrayLike<unknown>>(t: T): number {}

function length(t: ArrayLike<unknown>): number {}
```
在第一个`length`中，T不是必需的； 请注意，这只是
被引用一次，所以它不被用来约束
返回值或其他参数。

### 高等类型

TypeScript 没有更高种类的类型，所以以下是不合法的：

```ts
function length<T extends ArrayLike<unknown>, U>(m: T<U>) {}
```

### 无点编程

无点编程—— 大量使用柯里化和函数
构图&mdash; 在 JavaScript 中是可能的，但可能会很冗长。
在 TypeScript 中，对于 point-free 程序类型推断经常失败，所以
您最终将指定类型参数而不是值参数。 这
结果是如此冗长，通常最好避免无点
编程。

## 模块系统

JavaScript 的现代模块语法有点像 Haskell，除了
任何带有 `import` 或 `export` 的文件都是隐式模块：

```ts
import { value, Type } from "npm-package";
import { other, Types } from "./local-package";
import * as prefix from "../lib/third-package";
```

您还可以导入 commonjs 模块 &mdash; 使用 node.js 编写的模块
模块系统：

```ts
import f = require("single-function-package");
```

您可以使用导出列表导出：

```ts
export { f };

function f() {
  return g();
}
function g() {} // g is not exported
```

或者通过单独标记每个导出：

```ts
export function f { return g() }
function g() { }
```

后一种风格更常见，但两者都是允许的，即使在同一个
文件。

## 只读与常量
>`readonly` and `const`

在 JavaScript 中，可变性是默认设置，尽管它允许变量
使用 `const` 声明 _reference_ 是
不可变的。 引用对象仍然是可变的：

```js
const a = [1, 2, 3];
a.push(102); // ):
a[0] = 101; // D:
```

TypeScript 还具有属性的 `readonly` 修饰符。
```ts
interface Rx {
  readonly x: number;
}
let rx: Rx = { x: 1 };
rx.x = 12; // error
```
它还附带一个映射类型 `Readonly<T>`，这使得
所有属性 `readonly`:

```ts
interface X {
  x: number;
}
let rx: Readonly<X> = { x: 1 };
rx.x = 12; // error
```

它有一个特定的`ReadonlyArray<T>`  类型，可以删除
副作用方法并阻止写入数组的索引，
以及这种类型的特殊语法：
```ts
let a: ReadonlyArray<number> = [1, 2, 3];
let b: readonly number[] = [1, 2, 3];
a.push(102); // error
b[0] = 101; // error
```

您还可以使用 `const` 断言，它对数组进行操作，
对象文字：
```ts
let a = [1, 2, 3] as const;
a.push(102); // error
a[0] = 101; // error
```

但是，这些选项都不是默认选项，因此它们不是
在 TypeScript 代码中一致使用。

## 下一步
本文档是对您在日常代码中使用的语法和类型的高级概述。 从这里你应该：

-  <a href="/handbooks/handbook-v2/Basics">阅读完整手册</a>
-  [案例探索](https://www.typescriptlang.org/play#show-examples)
