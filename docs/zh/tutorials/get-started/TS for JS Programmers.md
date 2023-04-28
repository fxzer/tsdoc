
TypeScript 与 JavaScript 有着不同寻常的关系。 TypeScript 提供了 JavaScript 的所有功能，以及在这些功能之上的附加层：TypeScript 的类型系统。

例如，JavaScript 提供了诸如“string”和“number”之类的语言原语，但它不会检查你是否一致地分配了这些。 TypeScript 可以。

这意味着您现有的工作 JavaScript 代码也是 TypeScript 代码。 TypeScript 的主要好处是它可以突出显示代码中的意外行为，从而降低出现错误的可能性。

本教程简要概述了 TypeScript，重点介绍了它的类型系统。

## 类型推导

TypeScript 了解 JavaScript 语言，并会在许多情况下为您生成类型。
例如，在创建变量并将其分配给特定值时，TypeScript 将使用该值作为其类型。

```ts twoslash
let helloWorld = "Hello World";
//  ^?
```

通过了解 JavaScript 的工作原理，TypeScript 可以构建一个接受 JavaScript 代码但具有类型的类型系统。 这提供了一个类型系统，无需添加额外的字符来在代码中明确显示类型。 在上面的例子中，TypeScript 就是这样知道 `helloWorld` 是一个 `string` 的。

您可能已经在 Visual Studio Code 中编写过 JavaScript，并且具有编辑器自动完成功能。 Visual Studio Code 在底层使用 TypeScript 来简化 JavaScript 的使用。

## 定义类型


您可以在 JavaScript 中使用多种设计模式。 但是，某些设计模式使得自动推断类型变得困难（例如，使用动态编程的模式）。 为了涵盖这些情况，TypeScript 支持 JavaScript 语言的扩展，它为您提供了告诉 TypeScript 类型应该是什么的地方。

例如，要创建一个包含 `name: string` and `id: number` 的推断类型的对象，您可以这样写：

```ts twoslash
const user = {
  name: "Hayes",
  id: 0,
};
```

您可以使用 `interface` 声明明确描述此对象的形状：
```ts twoslash
interface User {
  name: string;
  id: number;
}
```

然后，您可以通过在变量声明后使用类似 `: TypeName` 的语法来声明 JavaScript 对象符合新的 `interface` 的形状：
```ts twoslash
interface User {
  name: string;
  id: number;
}
// ---cut---
const user: User = {
  name: "Hayes",
  id: 0,
};
```

如果你提供的对象与你提供的接口不匹配，TypeScript 会警告你：

```ts twoslash
// @errors: 2322
interface User {
  name: string;
  id: number;
}

const user: User = {
  username: "Hayes",
  id: 0,
};
```

由于 JavaScript 支持类和面向对象编程，因此 TypeScript 也支持。 您可以对类使用接口声明：

```ts twoslash
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```

您可以使用接口来注释参数并将值返回给函数：

```ts twoslash
// @noErrors
interface User {
  name: string;
  id: number;
}
// ---cut---
function getAdminUser(): User {
  //...
}

function deleteUser(user: User) {
  // ...
}
```


JavaScript 中已经有一小部分原始类型可用：`boolean`、`bigint`、`null`、`number`、`string`、`symbol` 和 `undefined`，您可以在接口中使用它们。 TypeScript 用更多的东西扩展了这个列表，比如 `any`（允许任何东西），[`unknown`](https://www.typescriptlang.org/play#example/unknown-and-never)（确保有人使用这个 type 声明了类型是什么），[`never`](https://www.typescriptlang.org/play#example/unknown-and-never)（这种类型不可能发生），以及 `void` ( 返回“未定义”或没有返回值的函数)。

您会看到构建类型有两种语法：[接口和类型](https://www.typescriptlang.org/play?e=83#example/types-vs-interfaces)。 你应该更喜欢`interface`。 当您需要特定功能时，请使用 `type`。
## 组合类型

使用 TypeScript，您可以通过组合简单类型来创建复杂类型。 有两种流行的方法可以做到这一点：联合和泛型。

### 联合类型

使用联合，您可以声明一个类型可以是多种类型之一。 例如，您可以将 `boolean` 类型描述为 `true` 或 `false`：
```ts twoslash
type MyBool = true | false;
```

如果将鼠标悬停在上面的`MyBool`上，您会看到它被归类为 `boolean`。 这是结构类型系统的一个属性。 更多内容请见下文。

```ts twoslash
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

联合也提供了一种处理不同类型的方法。 例如，您可能有一个接受`array` 和 `string`:的函数：
```ts twoslash
function getLength(obj: string | string[]) {
  return obj.length;
}
```

To learn the type of a variable, use `typeof`:

| Type      | Predicate                          |
| --------- | ---------------------------------- |
| string    | `typeof s === "string"`            |
| number    | `typeof n === "number"`            |
| boolean   | `typeof b === "boolean"`           |
| undefined | `typeof undefined === "undefined"` |
| function  | `typeof f === "function"`          |
| array     | `Array.isArray(a)`                 |

例如，您可以根据传递给函数的是字符串还是数组来使函数返回不同的值：

<!-- prettier-ignore -->
```ts twoslash
function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
//          ^?
  }
  return obj;
}
```

### 泛型

泛型为类型提供变量。 一个常见的例子是数组。 没有泛型的数组可以包含任何东西。 具有泛型的数组可以描述数组包含的值。

```ts
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

您可以声明自己的使用泛型的类型：

```ts twoslash
// @errors: 2345
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

// This line is a shortcut to tell TypeScript there is a
// constant called `backpack`, and to not worry about where it came from.
declare const backpack: Backpack<string>;

// object is a string, because we declared it above as the variable part of Backpack.
const object = backpack.get();

// Since the backpack variable is a string, you can't pass a number to the add function.
backpack.add(23);
```

## 结构类型系统

TypeScript 的核心原则之一是类型检查侧重于值具有的 _shape_。 这有时被称为 "duck typing" 或 "structural typing"。

在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型。
```ts twoslash
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// logs "12, 26"
const point = { x: 12, y: 26 };
logPoint(point);
```

`point` 变量永远不会声明为 `Point` 类型。 但是，TypeScript 在类型检查中将 `point` 的形状与 `Point` 的形状进行比较。 它们具有相同的形状，因此代码通过。

形状匹配只需要匹配对象字段的一个子集。
```ts twoslash
// @errors: 2345
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
// ---cut---
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

const color = { hex: "#187ABF" };
logPoint(color);
```

类和对象如何符合形状之间没有区别：
```ts twoslash
// @errors: 2345
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
// ---cut---
class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
logPoint(newVPoint); // logs "13, 56"
```

如果对象或类具有所有必需的属性，TypeScript 会说它们匹配，而不管实现细节如何。

## 下一步

这是对日常 TypeScript 中使用的语法和工具的简要概述。 从这里，您可以：

- <a href="/handbooks/handbook-v2/Basics">阅读完整手册</a>
- [案例探索](https://www.typescriptlang.org/play#show-examples)
