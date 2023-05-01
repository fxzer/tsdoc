在 JavaScript 中，我们分组和传递数据的基本方式是通过对象。
在 TypeScript 中，我们通过 _对象类型_ 来表示这些。

正如我们所见，它们可以是匿名的：
```ts 
function greet(person: { name: string; age: number }) {
  //                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  return "Hello " + person.name;
}
```

or they can be named by using either an interface

```ts 
interface Person {
  //      ^^^^^^
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.name;
}
```

或类型别名

```ts 
type Person = {
  // ^^^^^^
  name: string;
  age: number;
};

function greet(person: Person) {
  return "Hello " + person.name;
}
```

在上面的所有三个示例中，我们编写的函数采用包含属性`name` （必须是`string`）和`age` （必须是`number`）的对象。

## 属性修饰符

对象类型中的每个属性都可以指定几件事：类型、属性是否可选以及属性是否可以写入。

### 可选属性

大多数时候，我们会发现自己正在处理_可能_具有属性集的对象。
在这些情况下，我们可以通过在名称末尾添加问号 (`?`) 将这些属性标记为 _可选_。
```ts 
interface Shape {}
declare function getShape(): Shape;

// ---cut---
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  //  ^
  yPos?: number;
  //  ^
}

function paintShape(opts: PaintOptions) {
  // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

在此示例中，`xPos` 和 `yPos` 都被视为可选。
我们可以选择提供它们中的任何一个，因此上面对 `paintShape` 的每次调用都是有效的。
所有可选性真正说明的是，如果设置了属性，它最好有一个特定的类型。


我们也可以从这些属性中读取 - 但是当我们在 [`strictNullChecks`](/tsconfig#strictNullChecks) 下读取时，TypeScript 会告诉我们它们可能是 `undefined`。
```ts 
interface Shape {}
declare function getShape(): Shape;

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

// ---cut---
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos;
  //              ^?
  let yPos = opts.yPos;
  //              ^?
  // ...
}
```

在 JavaScript 中，即使该属性从未被设置，我们仍然可以访问它——它只会给我们值 `undefined`。
我们可以专门处理`undefined`。
```ts 
interface Shape {}
declare function getShape(): Shape;

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

// ---cut---
function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  //  ^?
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  //  ^?
  // ...
}
```

请注意，这种为未指定值设置默认值的模式非常普遍，以至于 JavaScript 有语法来支持它。
```ts 
interface Shape {}
declare function getShape(): Shape;

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

// ---cut---
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
  //                             ^?
  console.log("y coordinate at", yPos);
  //                             ^?
  // ...
}
```

现在 `xPos` 和 `yPos` 都明确存在于 `paintShape` 的主体中，但对于 `paintShape` 的任何调用者都是可选的。
> 请注意，目前无法在解构模式中放置类型注释。
> 这是因为以下语法在 JavaScript 中已经有不同的含义。
```ts 
// @noImplicitAny: false
// @errors: 2552 2304
interface Shape {}
declare function render(x: unknown);
// ---cut---
function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  render(shape);
  render(xPos);
}
```
在对象解构模式中，`shape: Shape` 的意思是“获取属性 `shape` 并在本地将其重新定义为名为 `Shape` 的变量。
同样，`xPos: number` 创建一个名为 `number` 的变量，其值基于参数的 `xPos`。


### `readonly` 属性

对于 TypeScript，属性也可以标记为“只读”。
虽然它不会在运行时更改任何行为，但在类型检查期间不能写入标记为“只读”的属性。
```ts 
// @errors: 2540
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // But we can't re-assign it.
  obj.prop = "hello";
}
```

使用 `readonly` 修饰符并不一定意味着一个值是完全不可变的——或者换句话说，它的内部内容不能被改变。
这只是意味着属性本身不能被重写。
```ts 
// @errors: 2540
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
    name: "Victor the Evictor",
    age: 42,
  };
}
```

管理对 readonly 含义的期望很重要。
在 TypeScript 的开发期间就应该如何使用对象发出意图信号是很有用的。
在检查这两种类型是否兼容时，TypeScript 不会考虑两种类型的属性是否为“只读”，因此“只读”属性也可以通过别名进行更改。
```ts 
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'
```
### 索引签名

有时您并不知道类型属性的所有名称，但您知道值的形状。

在这些情况下，您可以使用索引签名来描述可能值的类型，例如：
```ts 
declare function getStringArray(): StringArray;
// ---cut---
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
//     ^?
```

上面，我们有一个带有索引签名的 StringArray 接口。
这个索引签名声明当一个 `StringArray`  被一个 `number` 索引时，它会返回一个  `string` 。

索引签名属性只允许使用某些类型：`string`、`number`、`symbol`、模板字符串模式和仅包含这些的联合类型。

<details>
    <summary>支持两种类型的索引器是可能的...</summary>
    <p>It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. This is because when indexing with a <code>number</code>, JavaScript will actually convert that to a <code>string</code> before indexing into an object. That means that indexing with <code>100</code> (a <code>number</code>) is the same thing as indexing with <code>"100"</code> (a <code>string</code>), so the two need to be consistent.</p>

```ts 
// @errors: 2413
// @strictPropertyInitialization: false
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
}
```

</details>

虽然字符串索引签名是描述“字典”模式的强大方式，但它们还强制所有属性与其返回类型相匹配。
这是因为字符串索引声明 `obj.property` 也可用作 `obj["property"]`。
在下面的例子中，`name` 的类型与字符串索引的类型不匹配，类型检查器报错：
```ts 
// @errors: 2411
// @errors: 2411
interface NumberDictionary {
  [index: string]: number;

  length: number; // ok
  name: string;
}
```

但是，如果索引签名是属性类型的联合，则可以接受不同类型的属性：
```ts 
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

最后，您可以将索引签名设置为“只读”，以防止分配给它们的索引：
```ts 
declare function getReadOnlyStringArray(): ReadonlyStringArray;
// ---cut---
// @errors: 2542
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = getReadOnlyStringArray();
myArray[2] = "Mallory";
```

您不能设置`myArray[2]` ，因为索引签名是`readonly`。
## 扩展类型

拥有可能是其他类型的更具体版本的类型是很常见的。
例如，我们可能有一个 `BasicAddress` 类型，它描述了在美国发送信件和包裹所必需的字段。
```ts 
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

在某些情况下这就足够了，但如果地址处的建筑物有多个单元，地址通常会有一个与之关联的单元号。
然后我们可以描述一个 `AddressWithUnit` 。
<!-- prettier-ignore -->
```ts 
interface AddressWithUnit {
  name?: string;
  unit: string;
//^^^^^^^^^^^^^
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
```

这样可以完成工作，但这里的缺点是当我们的更改纯粹是累加时，我们不得不重复 `BasicAddress`中的所有其他字段。
相反，我们可以扩展原始的`BasicAddress`类型，只添加`AddressWithUnit`独有的新字段。
```ts 
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

`interface` 上的 `extends` 关键字允许我们有效地从其他命名类型复制成员，并添加我们想要的任何新成员。
这对于减少我们必须编写的类型声明样板的数量以及发出信号表明同一属性的多个不同声明可能相关的意图很有用。
例如，`AddressWithUnit` 不需要重复 `street` 属性，因为 `street` 源自 `BasicAddress`，读者会知道这两种类型在某种程度上是相关的。

`interface` 也可以从多种类型扩展。
```ts 
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

## 交叉类型

`interface` 允许我们通过扩展其他类型来构建新类型。
TypeScript 提供了另一种结构，称为交叉类型，主要用于组合现有的对象类型。

交集类型是使用“&”运算符定义的。
```ts 
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
```

在这里，我们将 `Colorful` 和 `Circle` 相交以生成一个新类型，它具有 `Colorful`  和  `Circle` 的所有成员。
```ts 
// @errors: 2345
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
// ---cut---
function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });

// oops
draw({ color: "red", raidus: 42 });
```

## 接口与交叉类型

我们刚刚研究了两种组合类型的方法，它们相似，但实际上有细微差别。
通过接口，我们可以使用`extends` 子句从其他类型进行扩展，并且我们能够对交集做类似的事情，并用类型别名命名结果。
两者之间的主要区别在于如何处理冲突，而这种区别通常是您在接口和交集类型的类型别名之间选择一个而不是另一个的主要原因之一。
<!--
For example, two types can declare the same property in an interface.

TODO -->

## 泛型对象

Let's imagine a `Box` type that can contain any value - `string`s, `number`s, `Giraffe`s, whatever.

```ts 
interface Box {
  contents: any;
}
```

现在，`contents` 属性的类型为 `any`，这可以工作，但可能会导致事故发生。

我们可以改为使用“未知”，但这意味着在我们已经知道`contents`类型的情况下，我们需要进行预防性检查，或使用容易出错的类型断言
```ts 
interface Box {
  contents: unknown;
}

let x: Box = {
  contents: "hello world",
};

// we could check 'x.contents'
if (typeof x.contents === "string") {
  console.log(x.contents.toLowerCase());
}

// or we could use a type assertion
console.log((x.contents as string).toLowerCase());
```

一种类型安全的方法是为每种类型的`contents`搭建不同的 `Box` 类型。
```ts 
// @errors: 2322
interface NumberBox {
  contents: number;
}

interface StringBox {
  contents: string;
}

interface BooleanBox {
  contents: boolean;
}
```

但这意味着我们必须创建不同的函数或函数重载来对这些类型进行操作。
```ts 
interface NumberBox {
  contents: number;
}

interface StringBox {
  contents: string;
}

interface BooleanBox {
  contents: boolean;
}
// ---cut---
function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: any }, newContents: any) {
  box.contents = newContents;
}
```

这是很多样板。 此外，我们以后可能需要引入新的类型和重载。
这是令人沮丧的，因为我们的框类型和重载实际上都是相同的。

相反，我们可以创建一个泛型 `Box` 类型，它声明一个 _参数类型_。
```ts 
interface Box<Type> {
  contents: Type;
}
```

你可能会把它读作 一个`Type` 的 ‘Box’ 是它的 `contents`  有`Type`类型的东西 。
稍后，当我们引用 `Box` 时，我们必须给出一个参数类型来代替 `Type`。
```ts 
interface Box<Type> {
  contents: Type;
}
// ---cut---
let box: Box<string>;
```

将 `Box` 视为真实类型的模板，其中 `Type` 是将被其他类型替换的占位符。
当 TypeScript 看到 `Box<string>` 时，它会将 `Box<Type>` 中的每个 `Type` 实例替换为 `string`，并最终使用类似 `{contents: string}` 的东西。
换句话说，`Box<string>` 和我们之前的 `StringBox` 工作相同。
```ts 
interface Box<Type> {
  contents: Type;
}
interface StringBox {
  contents: string;
}

let boxA: Box<string> = { contents: "hello" };
boxA.contents;
//   ^?

let boxB: StringBox = { contents: "world" };
boxB.contents;
//   ^?
```

`Box` 是可重复使用的，因为 `Type` 可以用任何东西代替。 这意味着当我们需要一个新类型的盒子时，我们根本不需要声明一个新的 `Box` 类型（尽管如果我们愿意的话我们当然可以）。
```ts 
interface Box<Type> {
  contents: Type;
}

interface Apple {
  // ....
}

// Same as '{ contents: Apple }'.
type AppleBox = Box<Apple>;
```

This also means that we can avoid overloads entirely by instead using [generic functions](/docs/handbook/2/functions.html#generic-functions).

```ts 
interface Box<Type> {
  contents: Type;
}

// ---cut---
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}
```

值得注意的是，类型别名也可以是通用的。 我们可以定义新的 `Box<Type>` 接口，它是：
```ts 
interface Box<Type> {
  contents: Type;
}
```

by using a type alias instead:

```ts 
type Box<Type> = {
  contents: Type;
};
```

由于类型别名与接口不同，它可以描述的不仅仅是对象类型，我们还可以使用它们来编写其他类型的通用帮助类型。
```ts 
// @errors: 2575
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
//   ^?

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;
//   ^?
```

We'll circle back to type aliases in just a little bit.

### 数组

通用对象类型通常是某种容器类型，其工作独立于它们包含的元素类型。
数据结构以这种方式工作是非常理想的，这样它们就可以跨不同的数据类型重复使用。

事实证明，在本手册中，我们一直在使用一种类型：`Array` 类型。
每当我们写出像 `number[]` 或 `string[]` 这样的类型时，这实际上只是 `Array<number>` 和 `Array<string>` 的简写。
```ts 
function doSomething(value: Array<string>) {
  // ...
}

let myArray: string[] = ["hello", "world"];

// either of these work!
doSomething(myArray);
doSomething(new Array("hello", "world"));
```

与上面的 `Box` 类型非常相似，`Array` 本身就是一个泛型类型。
```ts 
// @noLib: true
interface Number {}
interface String {}
interface Boolean {}
interface Symbol {}
// ---cut---
interface Array<Type> {
  /**
   * Gets or sets the length of the array.
   */
  length: number;

  /**
   * Removes the last element from an array and returns it.
   */
  pop(): Type | undefined;

  /**
   * Appends new elements to an array, and returns the new length of the array.
   */
  push(...items: Type[]): number;

  // ...
}
```

现代 JavaScript 还提供了其他通用的数据结构，例如 `Map<K, V>`、`Set<T>` 和 `Promise<T>`。
这一切的真正含义是，由于 `Map`、`Set` 和 `Promise` 的行为方式，它们可以与任何类型集一起工作。
### 只读数组

`ReadonlyArray` 是一种特殊类型，用于描述不更改的数组。
```ts 
// @errors: 2339
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  values.push("hello!");
}
```

就像属性的 `readonly`修饰符一样，它主要是我们可以用于意图的工具。
当我们看到一个返回 ReadonlyArray 的函数时，它告诉我们根本不打算更改内容，当我们看到一个使用 `ReadonlyArray` 的函数时，它告诉我们可以将任何数组传递给 该功能而不必担心它会改变其内容。

与 `Array` 不同，没有我们可以使用的 `ReadonlyArray` 构造函数。
```ts 
// @errors: 2693
new ReadonlyArray("red", "green", "blue");
```

Instead, we can assign regular `Array`s to `ReadonlyArray`s.

```ts 
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
```

正如 TypeScript 为带有 `Type[]` 的 `Array<Type>` 提供了简写语法一样，它也为带有 `readonly Type[]` 的 `ReadonlyArray<Type>` 提供了简写语法。
```ts 
// @errors: 2339
function doStuff(values: readonly string[]) {
  //                     ^^^^^^^^^^^^^^^^^
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ...but we can't mutate 'values'.
  values.push("hello!");
}
```

最后要注意的是，与 `readonly` 属性修饰符不同，可分配性在常规 `Array` 和 `ReadonlyArray` 之间不是双向的。
```ts 
// @errors: 4104
let x: readonly string[] = [];
let y: string[] = [];

x = y;
y = x;
```

### 元组类型

元组类型是另一种数组类型，它确切地知道它包含多少元素，以及它在特定位置包含哪些类型。
```ts 
type StringNumberPair = [string, number];
//                      ^^^^^^^^^^^^^^^^
```

Here, `StringNumberPair` is a tuple type of `string` and `number`.
Like `ReadonlyArray`, it has no representation at runtime, but is significant to TypeScript.
To the type system, `StringNumberPair` describes arrays whose `0` index contains a `string` and whose `1` index contains a `number`.

```ts 
function doSomething(pair: [string, number]) {
  const a = pair[0];
  //    ^?
  const b = pair[1];
  //    ^?
  // ...
}

doSomething(["hello", 42]);
```

如果我们试图索引超过元素的数量，我们会得到一个错误。
```ts 
// @errors: 2493
function doSomething(pair: [string, number]) {
  // ...

  const c = pair[2];
}
```

We can also [destructure tuples](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) using JavaScript's array destructuring.

```ts 
function doSomething(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;

  console.log(inputString);
  //          ^?

  console.log(hash);
  //          ^?
}
```

> 元组类型在高度基于约定的 API 中很有用，其中每个元素的含义都是“显而易见的”。
> 这让我们在解构变量时可以灵活地命名变量。
> 在上面的示例中，我们能够将元素“0”和“1”命名为我们想要的任何名称。
>
> 但是，由于并非每个用户都对显而易见的事物持有相同的看法，因此可能值得重新考虑使用具有描述性属性名称的对象是否更适合您的 API。

除了那些长度检查之外，像这样的简单元组类型等同于声明特定索引属性的`Array`版本的类型，以及使用数字文字类型声明`length` 的类型。
```ts 
interface StringNumberPair {
  // specialized properties
  length: 2;
  0: string;
  1: number;

  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>;
}
```

您可能感兴趣的另一件事是，元组可以通过写出问号（元素类型后的 `?` ）来拥有可选属性。
可选的元组元素只能出现在末尾，也会影响 `length` 的类型。
```ts 
type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  //           ^?

  console.log(`Provided coordinates had ${coord.length} dimensions`);
  //                                            ^?
}
```

Tuples can also have rest elements, which have to be an array/tuple type.

```ts 
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
```

- `StringNumberBooleans` 描述了一个元组，其前两个元素分别是 `string` 和 `number`，但后面可能有任意数量的 `boolean`。
- `StringBooleansNumber` 描述了一个元组，其第一个元素是 `string`，然后是任意数量的 `boolean`，并以 `number` 结尾。
- `BooleansStringNumber` 描述了一个元组，其起始元素是任意数量的 `boolean` 并以 `string` 结尾，然后是 `number`。

带有剩余元素的元组没有设置“长度”——它只有一组位于不同位置的众所周知的元素。
```ts 
type StringNumberBooleans = [string, number, ...boolean[]];
// ---cut---
const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];
```

为什么 可选 和 剩余 元素可能有用？
好吧，它允许 TypeScript 将元组与参数列表对应起来。
```ts 
function readButtonInput(...args: [string, number, ...boolean[]]) {
  const [name, version, ...input] = args;
  // ...
}
```

is basically equivalent to:

```ts 
function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}
```

当您想使用剩余参数获取可变数量的参数，并且需要最少数量的元素，但又不想引入中间变量时，这很方便。
<!--
TODO do we need this example?

For example, imagine we need to write a function that adds up `number`s based on arguments that get passed in.

```ts 
function sum(...args: number[]) {
    // ...
}
```

We might feel like it makes little sense to take any fewer than 2 elements, so we want to require callers to provide at least 2 arguments.
A first attempt might be

```ts 
function foo(a: number, b: number, ...args: number[]) {
    args.unshift(a, b);

    let result = 0;
    for (const value of args) {
        result += value;
    }
    return result;
}
```

-->

### 只读元素类型

关于元组类型的最后一点注意事项——元组类型具有`readonly` 变体，并且可以通过在它们前面添加一个`readonly` 修饰符来指定——就像数组速记语法一样。
```ts 
function doSomething(pair: readonly [string, number]) {
  //                       ^^^^^^^^^^^^^^^^^^^^^^^^^
  // ...
}
```

如您所料，TypeScript 不允许写入`readonly` 元组的任何属性。
```ts 
// @errors: 2540
function doSomething(pair: readonly [string, number]) {
  pair[0] = "hello!";
}
```

在大多数代码中，元组往往会被创建并保持不变，因此在可能的情况下将类型注释为`readonly` 元组是一个很好的默认值。
这也很重要，因为带有 `const` 断言的数组文字将被推断为 `readonly` 元组类型。
```ts 
// @errors: 2345
let point = [3, 4] as const;

function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin(point);
```

在这里，`distanceFromOrigin` 从不修改它的元素，而是需要一个可变的元组。
由于 `point` 的类型被推断为 `readonly [3, 4]`，因此它与 `[number, number]` 不兼容，因为该类型不能保证 `point` 的元素不会是变异了。
