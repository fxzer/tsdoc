
# 泛型
软件工程的一个主要部分是构建不仅具有定义明确且一致的 API，而且还可以重用的组件。
能够处理今天和明天的数据的组件将为您提供构建大型软件系统的最灵活的功能。

在 C# 和 Java 等语言中，工具箱中用于创建可重用组件的主要工具之一是 _generics_，也就是说，能够创建一个可以处理多种类型而不是单一类型的组件。
这允许用户使用这些组件并使用他们自己的类型。

## Hello World 泛型

首先，让我们做泛型的“hello world”：恒等函数。
身份函数是一个函数，它将返回传入的任何内容。
您可以用与`echo`命令类似的方式来考虑这一点。

如果没有泛型，我们要么必须给身份函数一个特定的类型：
```ts 
function identity(arg: number): number {
  return arg;
}
```

或者，我们可以使用`any`类型来描述身份函数：
```ts 
function identity(arg: any): any {
  return arg;
}
```


虽然使用 `any`肯定是通用的，因为它会导致函数接受 `arg` 类型的任何和所有类型，但实际上我们正在丢失有关函数返回时该类型的信息。
如果我们传入一个数字，我们所拥有的唯一信息就是可以返回任何类型。

相反，我们需要一种捕获参数类型的方法，这样我们也可以用它来表示返回的内容。
在这里，我们将使用 _类型变量_，这是一种特殊类型的变量，适用于类型而不是值。
```ts 
function identity<Type>(arg: Type): Type {
  return arg;
}
```


我们现在已经向身份函数添加了一个类型变量 `Type`。
这个`Type`允许我们捕获用户提供的类型（例如  `number` ），以便我们以后可以使用该信息。
在这里，我们再次使用 `Type`作为返回类型。 通过检查，我们现在可以看到相同的类型用于参数和返回类型。
这允许我们在函数的一侧传输该类型的信息，并在另一侧传输。

我们说这个版本的`identity`函数是通用的，因为它适用于一系列类型。
与使用 `any`, 不同，它与第一个使用数字作为参数和返回类型的 `identity` 函数一样精确（即，它不会丢失任何信息）。

一旦我们编写了通用身份函数，我们就可以通过两种方式之一调用它。
第一种方法是将所有参数（包括类型参数）传递给函数：
```ts 
function identity<Type>(arg: Type): Type {
  return arg;
}
// ---cut---
let output = identity<string>("myString");
//       ^?
```

在这里，我们明确地将 `Type` 设置为 `string` 作为函数调用的参数之一，在参数周围使用 `<>` 而不是 `()` 来表示。

第二种方式也许也是最常见的。 这里我们使用 _类型参数推理_ ——也就是说，我们希望编译器根据我们传入的参数类型自动为我们设置 Type 的值：
```ts 
function identity<Type>(arg: Type): Type {
  return arg;
}
// ---cut---
let output = identity("myString");
//       ^?
```

请注意，我们不必在尖括号 (`<>`) 中显式传递类型； 编译器只查看值  `"myString"`，并将`Type`设置为其类型。
虽然类型参数推断可以成为使代码更短和更易读的有用工具，但当编译器无法推断类型时，您可能需要像我们在上一个示例中所做的那样显式传递类型参数，这在更复杂的示例中可能会发生 .
## 使用通用类型变量

当您开始使用泛型时，您会注意到，当您创建像 `identity` 这样的泛型函数时，编译器会强制您在函数主体中正确使用任何泛型类型的参数。
也就是说，您实际上将这些参数视为它们可以是任何类型和所有类型。

让我们使用之前的`identity` 函数：

```ts 
function identity<Type>(arg: Type): Type {
  return arg;
}
```

如果我们还想在每次调用时将参数`arg`的长度记录到控制台怎么办？
我们可能会忍不住这样写：
```ts 
// @errors: 2339
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}
```


当我们这样做时，编译器会给我们一个错误，说我们正在使用 `arg` 的`.length` 成员，但我们没有在任何地方说 `arg` 有这个成员。
请记住，我们之前说过，这些类型变量代表任何类型和所有类型，因此使用此函数的人可能会传入一个没有`.length`成员的`number`。

假设我们实际上打算让这个函数在 `Type` 的数组上工作，而不是直接在 `Type` 上工作。 由于我们正在使用数组，因此 `.length` 成员应该可用。
我们可以像创建其他类型的数组一样描述它：

```ts  {1} 
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}
```

您可以将 `loggingIdentity` 的类型解读为 通用函数  `loggingIdentity` 接受一个类型参数`Type`和一个参数 `arg`，它是一个 `Type` 数组，并返回一个`Type`数组 
如果我们传入一个数字数组，我们将返回一个数字数组，因为`Type` 将绑定到`number`。
这允许我们将泛型类型变量 `Type` 用作我们正在使用的类型的一部分，而不是整个类型，从而为我们提供了更大的灵活性。

我们也可以这样编写示例：

```ts  {1}
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // 数组length属性，所以不再有错误
  return arg;
}
```

You may already be familiar with this style of type from other languages.
In the next section, we'll cover how you can create your own generic types like `Array<Type>`.

## 泛型类型

在前面的部分中，我们创建了适用于一系列类型的通用身份函数。
在本节中，我们将探讨函数本身的类型以及如何创建通用接口。

泛型函数的类型与非泛型函数的类型一样，首先列出类型参数，类似于函数声明：

```ts 
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;
```

我们也可以为类型中的泛型类型参数使用不同的名称，只要类型变量的数量和类型变量的使用方式一致即可。

```ts 
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Input>(arg: Input) => Input = identity;
```

我们还可以将泛型类型写成对象字面量类型的调用签名：

```ts 
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: { <Type>(arg: Type): Type } = identity;
```

这导致我们编写了第一个通用接口。
让我们把前面例子中的对象字面量移到一个接口中：

```ts 
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

在类似的示例中，我们可能希望将通用参数移动为整个接口的参数。
这让我们看到我们泛型的类型（例如，`Dictionary<string>` 而不仅仅是 `Dictionary`）。
这使得类型参数对接口的所有其他成员可见。
```ts 
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

请注意，我们的示例已更改为略有不同。
我们现在没有描述泛型函数，而是有一个非泛型函数签名，它是泛型类型的一部分。
当我们使用 `GenericIdentityFn` 时，我们现在还需要指定相应的类型参数（此处：`number`），有效地锁定底层调用签名将使用的内容。
了解何时将类型参数直接放在调用签名上以及何时将其放在接口本身上将有助于描述类型的哪些方面是通用的。

除了泛型接口，我们还可以创建泛型类。
请注意，无法创建通用枚举和命名空间。
## 泛型类

泛型类具有与泛型接口相似的形状。
泛型类在类名后面的尖括号 (`<>`) 中有一个泛型类型参数列表。
```ts 
// @strict: false
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

这是对 `GenericNumber`  类的直接使用，但您可能已经注意到没有任何限制它只能使用 `number`  类型。
我们本可以改用 `string` 或更复杂的对象。
```ts 
// @strict: false
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
// ---cut---
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

就像接口一样，将类型参数放在类本身上可以让我们确保类的所有属性都使用相同的类型。

正如我们在类部分中所述，类的类型有两个部分：**静态部分 和 实例部分**。

泛型类仅在其实例端而非静态端是泛型的，因此在使用类时，静态成员不能使用类的类型参数。

## 泛型约束

如果您还记得之前的示例，您有时可能想要编写一个适用于一组类型的泛型函数，您 _一些_ 了解这组类型将具有的功能。
在我们的`loggingIdentity`示例中，我们希望能够访问`arg`的 `.length`属性，但编译器无法证明每个类型都有一个 `.length`属性，所以它警告我们不能做这个假设。
```ts 
// @errors: 2339
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}
```

我们不想使用任何类型，而是希望将此函数限制为使用*还*具有 `.length` 属性的所有类型。
只要类型有这个成员，我们就允许它，但它至少需要有这个成员。
为此，我们必须将我们的要求列为对  `Type`可以是什么的约束。

为此，我们将创建一个描述约束的接口。
在这里，我们将创建一个具有单个 `.length` 属性的接口，然后我们将使用该接口和 `extends`关键字来表示我们的约束：
```ts 
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
```
因为泛型函数现在受到约束，所以它不再适用于所有类型：


```ts 
// @errors: 2345
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}
// ---cut---
loggingIdentity(3);
```

相反，我们需要传入其类型具有所有必需属性的值：
```ts 
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}
// ---cut---
loggingIdentity({ length: 10, value: 3 });
```

##  约束类型参数

您可以声明一个受另一个类型参数约束的类型参数。
例如，在这里我们想从给定名称的对象中获取属性。
我们想确保我们不会意外获取 `obj` 上不存在的属性，因此我们将在两种类型之间放置一个约束：
```ts 
// @errors: 2345
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m");
```

## 类中使用泛型

在 TypeScript 中使用泛型创建工厂时，需要通过构造函数来引用类类型。 例如，
```ts 
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

一个更高级的示例使用原型属性来推断和约束构造函数与类类型的实例端之间的关系。
```ts 
// @strict: false
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

此模式用于为混合设计模式提供动力。