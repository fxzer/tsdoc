
假设我们有一个名为 `padLeft` 的函数。
```ts 
function padLeft(padding: number | string, input: string): string {
  throw new Error("Not implemented yet!");
}
```

如果 `padding` 是一个 `number`，它会将其视为我们想要添加到 `input` 的空格数。
如果 `padding` 是一个 `string`，它应该只是将 `padding` 添加到 `input` 之前。
让我们尝试实现当 `padLeft` 被传递给 `padding` 的 `number` 时的逻辑。
```ts 
// @errors: 2345
function padLeft(padding: number | string, input: string) {
  return " ".repeat(padding) + input;
}
```

呃哦，我们在 `padding` 上遇到错误。
TypeScript 警告我们添加一个 `number | string`  到 `number` 可能不会给我们想要的，这是正确的。
换句话说，我们没有首先明确检查 `padding` 是否是一个 `number`，也没有处理它是 `string` 的情况，所以让我们就这样做吧。
```ts 
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```

如果这大部分看起来像是无趣的 JavaScript 代码，那么这就是重点。
除了我们放置的注释之外，此 TypeScript 代码看起来像 JavaScript。
这个想法是，TypeScript 的类型系统旨在尽可能轻松地编写典型的 JavaScript 代码，而无需向后弯曲以获得类型安全。

虽然它看起来可能并不多，但实际上这里有很多内容。
与 TypeScript 使用静态类型分析运行时值的方式非常相似，它将类型分析叠加在 JavaScript 的运行时控制流结构上，例如`if/else`、条件三元组、循环、真实性检查等，这些都会影响这些类型。

在我们的 if 检查中，TypeScript 看到 `typeof padding === "number"` 并将其理解为一种特殊形式的代码，称为 _类型保护_。
TypeScript 遵循可能的执行路径，我们的程序可以采用这些路径来分析给定位置的值的最具体可能类型。
它查看这些特殊检查（称为 _类型保护_）和赋值，并将类型精炼为比声明的更具体的类型的过程称为 _收窄_。
在许多编辑器中，我们可以观察这些类型的变化，我们甚至会在示例中这样做。
```ts 
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
    //                ^?
  }
  return padding + input;
  //     ^?
}
```

TypeScript 可以理解几种不同的缩小结构。
## `typeof` type guards

正如我们所见，JavaScript 支持`typeof` 运算符，它可以提供有关我们在运行时所拥有的值类型的非常基本的信息。
TypeScript 期望这会返回一组特定的字符串：
- `"string"`
- `"number"`
- `"bigint"`
- `"boolean"`
- `"symbol"`
- `"undefined"`
- `"object"`
- `"function"`

就像我们在 `padLeft` 中看到的那样，这个运算符经常出现在许多 JavaScript 库中，TypeScript 可以理解它以缩小不同分支中的类型。

在 TypeScript 中，检查 `typeof` 返回的值是一种类型保护。
因为 TypeScript 编码了`typeof`如何对不同的值进行操作，所以它知道它在 JavaScript 中的一些怪癖。
例如，请注意在上面的列表中，`typeof` 不返回字符串 `null`。
查看以下示例：
```ts 
// @errors: 2531 18047
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}
```


在 `printAll` 函数中，我们尝试检查 `strs` 是否是一个对象，看它是否是数组类型（现在可能是强调数组是 JavaScript 中的对象类型的好时机）。
但事实证明，在 JavaScript 中，`typeof null` 实际上是 `"object"`！
这是历史上那些不幸的事故之一。

有足够经验的用户可能不会感到惊讶，但并不是每个人都在 JavaScript 中遇到过这种情况； 幸运的是，TypeScript 让我们知道 `strs` 只是缩小到 `string[] | null` 而不仅仅是 `string[]`。

这可能是我们所谓的“真实性”检查的一个很好的转折点。

# 真实性缩小

Truthiness 可能不是您在字典中可以找到的一个词，但它是您在 JavaScript 中经常听到的一个词。

在 JavaScript 中，我们可以在条件语句、`&&`、`||`、`if` 语句、布尔否定 (`!`) 等中使用任何表达式。
例如，`if` 语句不期望它们的条件总是具有“boolean”类型。
```ts 
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}
```

在 JavaScript 中，像 `if` 这样的结构首先将它们的条件“强制”为`boolean`以使其有意义，然后根据结果是`true` 或 `false` 来选择它们的分支。
价值观如
- `0`
- `NaN`
- `""` (the empty string)
- `0n` (the `bigint` version of zero)
- `null`
- `undefined`

全部强制为 `false`，其他值强制为`true`。
您始终可以通过“布尔”函数运行值或使用更短的双布尔否定来将值强制转换为“布尔值”。 （后者的优点是 TypeScript 推断出一个窄文字布尔类型 `true`，而将第一个推断为类型 `boolean`。）
```ts 
// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true,    value: true
```

利用这种行为是相当流行的，特别是为了防止像 `null` or `undefined`这样的值。
例如，让我们尝试将它用于我们的 `printAll`  函数。
```ts 
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```
您会注意到我们通过检查 `strs` 是否为真消除了上述错误。
这至少可以防止我们在运行代码时遇到可怕的错误，例如：

```
类型错误：null 不可迭代
```

请记住，对原语的真实性检查通常很容易出错。
例如，考虑另一种编写  `printAll` 的尝试
```ts  {class: "do-not-do-this"}
function printAll(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}
```

我们将函数的整个主体包裹在真实检查中，但这有一个微妙的缺点：我们可能不再正确处理空字符串的情况。

TypeScript 在这里根本不会伤害我们，但如果您不太熟悉 JavaScript，这是值得注意的行为。
TypeScript 通常可以帮助您尽早发现错误，但如果您选择对一个值 _什么都不_ 做，它只能做这么多，而不会过于规范。
如果需要，您可以确保使用 linter 来处理此类情况。

关于真实性缩小的最后一个词是布尔否定与 `!` 从否定分支中过滤掉。
```ts 
function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
```

## 平等收窄

TypeScript 还使用 `switch` 语句和等式检查，例如 `===`、`!==`、`==` 和 `!=` 来缩小类型。
例如：
```ts 
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
    // ^?
    y.toLowerCase();
    // ^?
  } else {
    console.log(x);
    //          ^?
    console.log(y);
    //          ^?
  }
}
```


当我们在上面的示例中检查“x”和“y”是否相等时，TypeScript 知道它们的类型也必须相等。
由于 `string`是`x`和`y`都可以采用的唯一常见类型，因此 TypeScript 知道`x`和 `y` 在第一个分支中必须是 `string`。

检查特定的文字值（而不是变量）也可以。
在我们关于真实性缩小的部分中，我们编写了一个容易出错的 `printAll` 函数，因为它意外地没有正确处理空字符串。
相反，我们可以做一个特定的检查来阻止 `null`，并且 TypeScript 仍然正确地从 `strs` 的类型中删除 `null`。
```ts 
function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const s of strs) {
        //            ^?
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
      //          ^?
    }
  }
}
```

JavaScript 对 `==` 和 `!=` 的宽松相等性检查也得到了正确的缩小。
如果你不熟悉，那么检查 something `== null` 实际上不仅检查它是否是特定值 `null` - 它还检查它是否可能是 `undefined`。
这同样适用于 `== undefined`：它检查一个值是 `null` 还是 `undefined`。
```ts 
interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);
    //                    ^?

    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}
```

## `in` 操作符收窄

JavaScript 有一个运算符来确定对象是否具有名称的属性：`in` 运算符。
TypeScript 将这一点作为缩小潜在类型的一种方式。

例如，使用代码：`"value" in x`。 其中 `"value"` 是字符串文字，而 `x` 是联合类型。
“true”分支缩小了具有可选或必需属性“值”的“x”类型，“false”分支缩小了具有可选或缺失属性“值”的类型。
```ts 
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}
```

重申可选属性将存在于缩小的两侧，例如，人可以游泳和飞行（使用合适的设备），因此应该出现在 `in`检查的两侧：
<!-- prettier-ignore -->
```ts 
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;
//  ^?
  } else {
    animal;
//  ^?
  }
}
```

## `instanceof` 缩小

JavaScript 有一个运算符来检查一个值是否是另一个值的“实例”。
更具体地说，在 JavaScript 中，`x instanceof Foo` 检查 `x` 的_prototype chain_ 是否包含 `Foo.prototype`。
虽然我们不会在这里深入探讨，当我们进入类时你会看到更多，但它们对于大多数可以用 `new` 构造的值仍然有用。
正如您可能已经猜到的那样，`instanceof` 也是一种类型保护，并且 TypeScript 缩小了由 `instanceof` 保护的分支。
```ts 
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
    //          ^?
  } else {
    console.log(x.toUpperCase());
    //          ^?
  }
}
```

## 作业

正如我们之前提到的，当我们为任何变量赋值时，TypeScript 会查看赋值的右侧并适当缩小左侧。
```ts 
let x = Math.random() < 0.5 ? 10 : "hello world!";
//  ^?
x = 1;

console.log(x);
//          ^?
x = "goodbye!";

console.log(x);
//          ^?
```

请注意，这些分配中的每一个都是有效的。
即使在我们第一次分配后观察到的 `x` 类型变为 `number`，我们仍然能够将 `string` 分配给 `x`。
这是因为 `x` 的_声明类型_ - `x` 开头的类型 - 是 `string | number`，并且始终根据声明的类型检查可分配性。

如果我们给 `x` 分配了一个 `boolean`，我们就会看到一个错误，因为它不是声明类型的一部分。
```ts 
// @errors: 2322
let x = Math.random() < 0.5 ? 10 : "hello world!";
//  ^?
x = 1;

console.log(x);
//          ^?
x = true;

console.log(x);
//          ^?
```

## 控制流分析

到目前为止，我们已经通过一些基本示例了解了 TypeScript 如何在特定分支中缩小范围。
但是除了从每个变量向上走并在`if`、`while`、条件等中寻找类型保护之外，还有更多的事情要做。
例如
```ts 
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```
`padLeft` 从它的第一个 `if` 块中返回。
TypeScript 能够分析此代码并发现正文的其余部分（`return padding + input;`）在 `padding` 是 `number` 的情况下 _未定义的_。
结果，它能够从函数的其余部分的 `padding` 类型中删除 `number`（从 `string | number` 缩小到 `string`）。

这种基于可达性的代码分析称为“控制流分析”，TypeScript 在遇到类型保护和赋值时使用这种流分析来缩小类型。
当分析一个变量时，控制流可以一次又一次地分离和重新合并，并且可以观察到该变量在每个点都有不同的类型。
```ts 
function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;

  console.log(x);
  //          ^?

  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
    //          ^?
  } else {
    x = 100;
    console.log(x);
    //          ^?
  }

  return x;
  //     ^?
}
```

## 使用类型谓词
到目前为止，我们已经使用现有的 JavaScript 构造来处理缩小，但有时您希望更直接地控制类型在整个代码中的变化方式。

要定义用户定义的类型保护，我们只需要定义一个返回类型为 _类型谓词_ 的函数：
```ts 
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
// ---cut---
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

`pet is Fish` 是我们在这个例子中的类型谓词。
谓词采用`parameterName is Type` 的形式，其中 `parameterName`必须是当前函数签名中参数的名称。

任何时候使用某个变量调用 `isFish` 时，如果原始类型兼容，TypeScript 都会将该变量 _缩小_ 到该特定类型。
```ts 
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
// ---cut---
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```
请注意，TypeScript 不仅知道 `pet` 是 `if` 分支中的 `Fish`；
它还知道在 `else` 分支中，你 _没有_ `Fish` ，所以你必须有一个 `Bird`

你可以使用类型保护 `isFish` 来过滤一个数组 `Fish | Bird` 并获取一组 `Fish`：
```ts 
type Fish = { swim: () => void; name: string };
type Bird = { fly: () => void; name: string };
declare function getSmallPet(): Fish | Bird;
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
// ---cut---
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
```


# 区别联合


到目前为止，我们看过的大多数示例都集中在缩小具有简单类型（如“string”、“boolean”和“number”）的单个变量。
虽然这很常见，但大多数时候在 JavaScript 中我们会处理稍微复杂的结构。

出于某种动机，让我们假设我们正在尝试对圆形和正方形等形状进行编码。
圆形记录它们的半径，正方形记录它们的边长。
我们将使用一个名为“kind”的字段来判断我们正在处理的是哪种形状。
这是定义 Shape 的第一次尝试。
```ts 
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}
```

请注意，我们正在使用字符串文字类型的联合：`"circle"` 和 `"square"` 来告诉我们应该分别将形状视为圆形还是正方形。
通过使用`"circle" | “square”` 而不是 `string`，我们可以避免拼写错误问题。
```ts 
// @errors: 2367
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

// ---cut---
function handleShape(shape: Shape) {
  // oops!
  if (shape.kind === "rect") {
    // ...
  }
}
```

我们可以编写一个 `getArea`函数，根据它处理的是圆形还是方形来应用正确的逻辑。
我们将首先尝试处理圆圈。
```ts 
// @errors: 2532 18048
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

// ---cut---
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
}
```

在  `strictNullChecks` 下给我们一个错误 - 这是适当的，因为可能没有定义 radius。
但是，如果我们对“kind”属性执行适当的检查会怎样呢？
```ts 
// @errors: 2532 18048
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

// ---cut---
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
}
```

嗯，TypeScript 仍然不知道在这里做什么。
我们已经达到了比类型检查器更了解我们的价值观的地步。
我们可以尝试使用非空断言（`shape.radius` 之后的 `!`）来说明 `radius` 确实存在。
```ts 
interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

// ---cut---
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
}
```

但这感觉并不理想。
我们不得不用那些非空断言 (`!`) 对类型检查器大喊大叫，以说服它定义了 `shape.radius`，但如果我们开始移动代码，这些断言很容易出错。
此外，在 [`strictNullChecks`](/tsconfig#strictNullChecks) 之外，我们无论如何都可以意外访问这些字段中的任何一个（因为可选属性只是假定在读取它们时始终存在）。
我们绝对可以做得更好。

这种 Shape 编码的问题在于，类型检查器无法根据 `kind` 属性知道是否存在 `radius` 或 `sideLength`。
我们需要将我们知道的信息传达给类型检查器。
考虑到这一点，让我们再来定义 `Shape`。
```ts 
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
```

在这里，我们已经将 Shape 适当地分成两种类型，它们的 `kind` 属性具有不同的值，但是 `radius` 和 `sideLength` 在它们各自的类型中被声明为必需的属性。

让我们看看当我们尝试访问 `Shape` 的 `radius` 时会发生什么。
```ts 
// @errors: 2339
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

// ---cut---
function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
}
```

与我们对 Shape 的第一个定义一样，这仍然是一个错误。
当 `radius` 是可选的时，我们会收到一个错误（启用 `strictNullChecks` ，因为 TypeScript 无法判断该属性是否存在。
现在 `Shape` 是一个联合体，TypeScript 告诉我们 `shape` 可能是一个 `Square`，而 `Square` 没有定义 `radius`！
两种解释都是正确的，但是无论[`strictNullChecks`](/tsconfig#strictNullChecks)如何配置，只有`Shape`的联合编码会导致错误。

但是，如果我们再次尝试检查 `kind` 属性呢？
```ts 
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

// ---cut---
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
    //               ^?
  }
}
```

那摆脱了错误！
当联合中的每个类型都包含具有文字类型的公共属性时，TypeScript 认为这是一个_discriminated union_，并且可以缩小联合的成员范围。

在这种情况下，`kind` 是公共属性（这被认为是 `Shape` 的 判别式属性）。
检查 `kind` 属性是否为 `"circle"` 去掉了 `Shape` 中没有 `kind` 属性的类型为 `"circle"` 的所有类型。
这将 `shape` 缩小为 `Circle` 类型。

同样的检查也适用于 `switch` 语句。
现在我们可以尝试编写完整的 getArea 而不使用任何讨厌的 ! 非空断言。
```ts 
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

// ---cut---
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    //                 ^?
    case "square":
      return shape.sideLength ** 2;
    //       ^?
  }
}
```

这里重要的是 `Shape` 的编码。
向 TypeScript 传达正确的信息——`Circle` 和 `Square`实际上是具有特定`kind`字段的两个独立类型——至关重要。
这样做让我们可以编写类型安全的 TypeScript 代码，看起来与我们以其他方式编写的 JavaScript 没有什么不同。
从那里开始，类型系统能够做“正确”的事情，并在我们的 `switch `语句的每个分支中找出类型。

> 顺便说一句，尝试使用上面的示例并删除一些 return 关键字。
> 您会发现类型检查有助于避免在 `switch` 语句中不小心遇到不同子句时出现错误。

有区别的联合不仅仅用于谈论圆和正方形。
它们适用于在 JavaScript 中表示任何类型的消息传递方案，例如通过网络发送消息（客户端/服务器通信）或在状态管理框架中编码突变。

# `never` 类型

缩小时，您可以将并集的选项减少到您已经删除所有可能性并且什么都没有留下的程度。
在这些情况下，TypeScript 将使用“never”类型来表示不应该存在的状态。

# 穷举检查

`never` 类型可分配给每种类型； 然而，没有类型可以分配给 `never`（除了 `never` 本身）。 这意味着您可以使用 narrowing 并依靠 `never` turning up 在 switch 语句中进行详尽检查。

例如，向我们的 getArea 函数添加一个 `default` 尝试将形状分配给 `never`，当每种可能的情况都没有被处理时将引发。
```ts 
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}
// ---cut---
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

将新成员添加到  `Shape`  联合会导致 TypeScript 错误：
```ts 
// @errors: 2322
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}
// ---cut---
interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```
