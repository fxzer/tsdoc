
函数是任何应用程序的基本构建块，无论它们是本地函数、从另一个模块导入的函数，还是类中的方法。
它们也是值，就像其他值一样，TypeScript 有很多方法来描述如何调用函数。
让我们学习如何编写描述函数的类型。
## 函数类型表达式

描述函数的最简单方法是使用 _函数类型表达式_。
这些类型在语法上类似于箭头函数：
```ts 
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
```

语法 `(a: string) => void` 表示“一个带有一个参数的函数，名为 `a`，类型为字符串，没有返回值”。
就像函数声明一样，如果未指定参数类型，则隐式为 `any`。

> 注意参数名称是**必填**。 函数类型 `(string) => void` 的意思是“一个带有名为 `string` 且类型为 `any` 的参数的函数”！

当然，我们可以使用类型别名来命名函数类型：
```ts 
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}
```

## 调用签名

在 JavaScript 中，函数除了可调用之外还可以具有属性。
但是，函数类型表达式语法不允许声明属性。
如果我们想描述一些可以用属性调用的东西，我们可以在对象类型中写一个 _调用签名_：
```ts 
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
```

请注意，与函数类型表达式相比，语法略有不同 - 在参数列表和返回类型之间使用`:`而不是 `=>`。
## 构建签名

JavaScript 函数也可以使用 `new` 运算符调用。
TypeScript 将它们称为_构造函数_，因为它们通常会创建一个新对象。
您可以通过在调用签名前添加 `new` 关键字来编写 _构造签名_：
```ts 
type SomeObject = any;
// ---cut---
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

某些对象，例如 JavaScript 的`Date` 对象，可以使用或不使用 `new`来调用。
您可以任意组合同一类型的调用和构造签名：
```ts 
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}
```

## 泛型函数

通常编写一个函数，其中输入类型与输出类型相关，或者两个输入的类型以某种方式相关。
让我们考虑一下返回数组第一个元素的函数：
```ts 
function firstElement(arr: any[]) {
  return arr[0];
}
```

这个函数完成了它的工作，但不幸的是它有返回类型`any`。
如果函数返回数组元素的类型会更好。

在 TypeScript 中，当我们想要描述两个值之间的对应关系时，会使用泛型。
我们通过在函数签名中声明一个 _类型参数_ 来做到这一点：
```ts 
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

通过向该函数添加一个类型参数 `Type` 并在两个地方使用它，我们在函数的输入（数组）和输出（返回值）之间创建了一个链接。
现在当我们调用它时，一个更具体的类型就出来了：
```ts 
declare function firstElement<Type>(arr: Type[]): Type | undefined;
// ---cut---
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);
```

### 接口

请注意，我们不必在此示例中指定 `Type`。
该类型由 TypeScript推断 - 自动选择。

我们也可以使用多个类型参数。
例如，独立版本的 `map` 看起来像这样：
```ts 
// prettier-ignore
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

请注意，在此示例中，TypeScript 可以推断 `Input` 类型参数的类型（从给定的`string`数组），以及基于函数表达式的返回值（`number`）的 `Input` 类型参数 ）。
### 约束

我们已经编写了一些可以对_any_ 类型的值起作用的通用函数。
有时我们想关联两个值，但只能对某个值的子集进行操作。
在这种情况下，我们可以使用 _约束_ 来限制类型参数可以接受的类型种类。

让我们编写一个返回两个值中较长值的函数。
为此，我们需要一个数字形式的`length`属性。
我们通过编写`extends` 来 _约束_ 该类型的类型参数：
```ts 
// @errors: 2345 2322
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
```

在这个例子中有一些有趣的事情需要注意。
我们允许 TypeScript 推断 `longest` 的返回类型。
返回类型推断也适用于泛型函数。

因为我们将 Type 限制为 `{ length: number }`，所以我们被允许访问` a `和` b `参数的` .length `属性。
如果没有类型约束，我们将无法访问这些属性，因为这些值可能是没有长度属性的其他类型。

`longerArray` 和 `longerString` 的类型是根据参数推断出来的。
请记住，泛型就是将两个或多个值与同一类型相关联！

最后，正如我们所希望的那样，对 `longest(10, 100)` 的调用被拒绝，因为 `number` 类型没有 `.length` 属性。

### 使用约束值

这是使用通用约束时的常见错误：
```ts 
// @errors: 2322
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
  }
}
```

看起来这个函数没问题 - `Type` 被限制为 `{length: number }`，并且该函数返回 `Type` 或与该约束匹配的值。
问题在于该函数承诺返回与传入的 _相同_ 类型的对象，而不仅仅是与约束匹配的 _某些_ 对象。
如果此代码是合法的，您可以编写肯定行不通的代码：
```ts 
declare function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type;
// ---cut---
// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0));
```

### 指定参数类型

TypeScript 通常可以在泛型调用中推断出预期的类型参数，但并非总是如此。
例如，假设您编写了一个函数来组合两个数组：
```ts 
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
```

Normally it would be an error to call this function with mismatched arrays:

```ts 
// @errors: 2322
declare function combine<Type>(arr1: Type[], arr2: Type[]): Type[];
// ---cut---
const arr = combine([1, 2, 3], ["hello"]);
```

但是，如果您打算这样做，您可以手动指定 `Type`：
```ts 
declare function combine<Type>(arr1: Type[], arr2: Type[]): Type[];
// ---cut---
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

### 编写好的泛型函数的指南

编写泛型函数很有趣，而且很容易被类型参数冲昏头脑。
拥有太多类型参数或在不需要它们的地方使用约束会降低推理的成功率，让函数的调用者感到沮丧。

#### 向下推送类型参数

这里有两种编写看起来相似的函数的方法：
```ts 
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2, 3]);
// b: any (bad)
const b = firstElement2([1, 2, 3]);
```

乍一看，它们似乎相同，但 `firstElement1` 是编写此函数的更好方法。
它的推断返回类型是 `Type`，但 firstElement2 的推断返回类型是 `any`，因为 TypeScript 必须使用约束类型解析` arr[0] `表达式，而不是在调用期间“等待”解析元素。

> **规则**：如果可能，使用类型参数本身而不是对其进行约束

#### 使用更少的类型参数

这是另一对类似的功能：
```ts 
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}
```

我们创建了一个 _不关联两个值_ 的类型参数`Func`。
这始终是一个危险信号，因为这意味着想要指定类型参数的调用者必须无缘无故地手动指定一个额外的类型参数。
`Func` 除了让函数更难阅读和推理之外什么也没做！

> **规则**：始终使用尽可能少的类型参数

#### 类型参数应该出现两次

有时我们会忘记一个函数可能不需要是泛型的：
```ts 
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}

greet("world");
```

我们可以很容易地编写一个更简单的版本：
```ts 
function greet(s: string) {
  console.log("Hello, " + s);
}
```

请记住，类型参数用于 _关联多个值的类型_。
如果类型参数在函数签名中仅使用一次，则它没有任何关联。

> **规则**：如果一个类型参数只出现在一个位置，强烈重新考虑你是否真的需要它

## 可选参数

JavaScript 中的函数通常采用可变数量的参数。
例如，`number` 的`toFixed` 方法接受一个可选的数字计数：
```ts 
function f(n: number) {
  console.log(n.toFixed()); // 0 arguments
  console.log(n.toFixed(3)); // 1 argument
}
```

我们可以通过用 `?` 将参数标记为 _可选_ 来在 TypeScript 中对其进行建模：
```ts 
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK
```

虽然参数被指定为`number`类型，但`x`参数实际上具有 `number | undefined`  是因为 JavaScript 中未指定的参数得到的值是 `undefined` 。

您还可以提供一个参数_default_：
```ts 
function f(x = 10) {
  // ...
}
```

Now in the body of `f`, `x` will have type `number` because any `undefined` argument will be replaced with `10`.
Note that when a parameter is optional, callers can always pass `undefined`, as this simply simulates a "missing" argument:

```ts 
declare function f(x?: number): void;
// cut
// All OK
f();
f(10);
f(undefined);
```

### 回调中的可选参数

一旦了解了可选参数和函数类型表达式，在编写调用回调的函数时很容易犯以下错误：
```ts 
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
}
```

人们在编写 `index?`作为可选参数时通常的意图是他们希望这两个调用都是合法的：
```ts 
// @errors: 2532 18048
declare function myForEach(
  arr: any[],
  callback: (arg: any, index?: number) => void
): void;
// ---cut---
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));
```

这_实际上 _意味着_ `callback` 可能会用一个参数调用。
换句话说，函数定义表示实现可能如下所示：
```ts 
// @errors: 2532 18048
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    // I don't feel like providing the index today
    callback(arr[i]);
  }
}
```

反过来，TypeScript 将强制执行此含义并发出实际上不可能出现的错误：
<!-- prettier-ignore -->
```ts 
// @errors: 2532 18048
declare function myForEach(
  arr: any[],
  callback: (arg: any, index?: number) => void
): void;
// ---cut---
myForEach([1, 2, 3], (a, i) => {
  console.log(i.toFixed());
});
```

在 JavaScript 中，如果你调用一个参数比参数多的函数，多余的参数将被忽略。
TypeScript 的行为方式相同。
具有较少参数（相同类型）的函数总是可以代替具有更多参数的函数。

> 为回调编写函数类型时，_切勿_ 编写可选参数，除非您打算 _调用_ 函数而不传递该参数

## 函数重载

可以在各种参数计数和类型中调用某些 JavaScript 函数。
例如，您可以编写一个函数来生成一个带有时间戳（一个参数）或月/日/年规范（三个参数）的`Date` 。

在 TypeScript 中，我们可以通过编写 _签名重写_ 来指定一个可以以不同方式调用的函数。
为此，编写一些函数签名（通常是两个或更多），然后是函数体：
```ts 
// @errors: 2575
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
```

在这个例子中，我们写了两个重载：一个接受一个参数，另一个接受三个参数。
前两个签名称为 _过载签名_。

然后，我们编写了一个具有兼容签名的函数实现。
函数有一个实施签名，但不能直接调用这个签名。
即使我们在必需的参数之后编写了一个带有两个可选参数的函数，也不能用两个参数调用它！

### 重载签名和实现签名

这是一个常见的混淆来源。
通常人们会写这样的代码并且不明白为什么会出错：
```ts 
// @errors: 2554
function fn(x: string): void;
function fn() {
  // ...
}
// Expected to be able to call with zero arguments
fn();
```

同样，用于编写函数体的签名不能从外部“看到”。

> 实施签名从外部是不可见的。
> 当写一个重载函数时，你应该总是在函数的实现之上有 _两个_ 或更多的签名。

实现签名也必须与重载签名 _兼容_。
例如，这些函数有错误，因为实现签名不以正确的方式匹配重载：
```ts 
// @errors: 2394
function fn(x: boolean): void;
// Argument type isn't right
function fn(x: string): void;
function fn(x: boolean) {}
```

```ts 
// @errors: 2394
function fn(x: string): string;
// Return type isn't right
function fn(x: number): boolean;
function fn(x: string | number) {
  return "oops";
}
```

### 编写良好的重载

与泛型一样，在使用函数重载时也应遵循一些准则。
遵循这些原则会让你的函数更容易调用，更容易理解，更容易实现。

让我们考虑一个返回字符串或数组长度的函数：
```ts 
function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}
```

这个功能很好； 我们可以用字符串或数组调用它。
但是，我们不能使用可能是字符串或数组的值来调用它，因为 TypeScript 只能将函数调用解析为单个重载：
```ts 
// @errors: 2769
declare function len(s: string): number;
declare function len(arr: any[]): number;
// ---cut---
len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]);
```

因为两个重载具有相同的参数计数和相同的返回类型，我们可以改为编写函数的非重载版本：
```ts 
function len(x: any[] | string) {
  return x.length;
}
```

这好多了！
调用者可以使用任何一种值来调用它，作为额外的好处，我们不必找出正确的实现签名。

> 在可能的情况下，始终优先选择具有联合类型的参数而不是重载

### 在函数中声明 `this`

TypeScript 将通过代码流分析推断函数中的 `this` 应该是什么，例如：
```ts 
const user = {
  id: 123,

  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};
```

TypeScript 理解函数 `user.becomeAdmin` 有一个对应的 this 是外部对象 user。 `this`，在很多情况下就足够了，但是在很多情况下，您需要更多地控制 `this` 代表的对象。 JavaScript 规范声明你不能有一个名为`this`的参数，因此 TypeScript 使用该语法空间让你在函数体中声明“this”的类型。
```ts 
interface User {
  id: number;
  admin: boolean;
}
declare const getDB: () => DB;
// ---cut---
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

这种模式在回调式 API 中很常见，在这种情况下，另一个对象通常会控制何时调用您的函数。 请注意，您需要使用 `function` 而不是箭头函数来获得此行为：
```ts 
// @errors: 7041 7017
interface User {
  id: number;
  isAdmin: boolean;
}
declare const getDB: () => DB;
// ---cut---
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const db = getDB();
const admins = db.filterUsers(() => this.admin);
```

## 其他需要了解的类型

在使用函数类型时，您需要识别一些经常出现的其他类型。
与所有类型一样，您可以在任何地方使用它们，但它们在函数上下文中尤为重要。

### `void`

`void` 表示不返回值的函数的返回值。
只要函数没有任何`return`语句，或者不从这些 `return` 语句返回任何显式值，它就是推断类型：
```ts 
// The inferred return type is void
function noop() {
  return;
}
```

在 JavaScript 中，不返回任何值的函数将隐式返回值 `undefined`。
然而，`void` 和 `undefined` 在 TypeScript 中不是一回事。
本章末尾有更多详细信息。

> `void` 与 `undefined` 不同。

### `object`

特殊类型`object`指的是任何不是原始类型的值（`string`, `number`, `bigint`, `boolean`, `symbol`, `null`, or `undefined`）。
这不同于 _空对象类型_ `{ }`，也不同于全局类型 `Object`。
您很可能永远不会使用 `Object`。

> `object` 不是 `Object`。 **总是**使用`object`！

请注意，在 JavaScript 中，函数也是对象：它们具有属性， `instanceof Object`得到的原型对象等于`Object.prototype`， 可以调用`Object.keys`，等等。
因此，函数类型在 TypeScript 中被视为 `object`。

### `unknown`

`unknown` 类型表示_any_ 值。
这类似于 `any` 类型，但更安全，因为使用 `unknown` 值做任何事情都是不合法的：

```ts 
// @errors: 2571 18046
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
}
```

这在描述函数类型时很有用，因为您可以描述接受任何值的函数，而无需在函数主体中包含“任何”值。

相反，您可以描述一个返回未知类型值的函数：
```ts 
declare const someRandomString: string;
// ---cut---
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);
```

### `never`

有些函数_从不_具有返回值：
```ts 
function fail(msg: string): never {
  throw new Error(msg);
}
```

`never` 类型表示从未观察到的值。
在返回类型中，这意味着函数抛出异常或终止程序的执行。

当 TypeScript 确定联合中没有任何内容时，也会出现`never` 。
```ts 
function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```

### `Function`

全局类型 `Function` 描述了 `bind`、`call`、`apply` 和其他存在于 JavaScript 中所有函数值上的属性。
它还有一个特殊的属性，即总是可以调用 `Function` 类型的值； 这些调用返回 `any`：
```ts 
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

这是一个 _未被定义函数调用_，通常最好避免，因为返回类型不安全的`any` 。

如果您需要接受一个任意函数但不打算调用它，类型 `() => void` 通常更安全。

### 剩余参数

除了使用可选参数或重载来制作可以接受各种固定参数计数的函数外，我们还可以使用 _剩余参数_ 定义带有 _若干_ 个参数的函数。

其余参数出现在所有其他参数之后，并使用“...”语法：
```ts 
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```
在 TypeScript 中，这些参数的类型注释是隐式的`any[]`  而不是 `any`，并且给定的任何类型注释必须是 `Array<T>`或`T[]`形式，或者元组类型（ 我们稍后会了解）。

相反，我们可以使用扩展语法从数组中 _提供_ 可变数量的参数。
例如，数组的 `push` 方法接受任意数量的参数：
```ts 
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

请注意，通常，TypeScript 不会假定数组是不可变的。
这可能会导致一些令人惊讶的行为：
```ts 
// @errors: 2556
// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
const angle = Math.atan2(...args);
```

这种情况的最佳解决方案在一定程度上取决于您的代码，但通常 `const` 上下文是最直接的解决方案：
```ts 
// Inferred as 2-length tuple
const args = [8, 5] as const;
// OK
const angle = Math.atan2(...args);
```

在针对较旧的运行时时，使用剩余参数可能需要打开 `downlevelIteration` 。
<!-- TODO link to downlevel iteration -->

## 参数解构


您可以使用参数解构来方便地将作为参数提供的对象解包到函数体中的一个或多个局部变量中。
在 JavaScript 中，它看起来像这样：
```js
function sum({ a, b, c }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
```

对象的类型注释在解构语法之后：
```ts 
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
```

这看起来有点冗长，但您也可以在此处使用命名类型：
```ts 
// Same as prior example
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

## 函数的可分配性

### 返回类型 `void`

函数的 `void` 返回类型会产生一些不寻常但符合预期的行为。

返回类型为 `void` 的上下文类型不会**不**强制函数**不**返回某些东西。 另一种说法是具有“void”返回类型的上下文函数类型（`type vf = () => void`），在实现时可以返回_任何_其他值，但它将被忽略。

因此，以下 `() => void` 类型的实现是有效的：
```ts 
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
  return true;
};
```

而当其中一个函数的返回值赋值给另一个变量时，它会保留 `void` 的类型：
```ts 
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
  return true;
};
// ---cut---
const v1 = f1();

const v2 = f2();

const v3 = f3();
```

这种行为的存在使得以下代码有效，即使  `Array.prototype.push`  返回一个数字并且`Array.prototype.forEach` 方法需要一个返回类型为 void 的函数。
```ts 
const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));
```

还有一个需要注意的特殊情况，当文字函数定义具有 `void` 返回类型时，该函数必须**不**返回任何东西。
```ts 
function f2(): void {
  // @ts-expect-error
  return true;
}

const f3 = function (): void {
  // @ts-expect-error
  return true;
};
```

