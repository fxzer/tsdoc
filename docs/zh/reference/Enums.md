
枚举是 TypeScript 为数不多的特性之一，它不是 JavaScript 的类型级扩展。

枚举允许开发人员定义一组命名常量。
使用枚举可以更轻松地记录意图，或创建一组不同的案例。
TypeScript 提供基于数字和字符串的枚举。

## 数字枚举

我们将首先从数字枚举开始，如果您来自其他语言，可能会更熟悉它。
可以使用 `enum` 关键字定义枚举。

```ts 
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

在上面的例子中，我们定义了一个数字枚举，其中 `Up` 的初始值为 `1`。
接下来的所有成员都将在此基础上自动递增。
换句话说，`Direction.Up` 的值为 `1`，`Down` 为 `2`，`Left` 为 `3`，`Right` 为 `4`。

如果我们想的话，完全可以省略初始值：

```ts 
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

这里，`Up` 的值将是 `0`，`Down` 的值将是 `1`，以此类推。
这种自动递增行为对于我们可能不关心成员值本身，但确实关心每个值与同一枚举中其他值不同的情况非常有用。

使用枚举很简单：只需将任何成员作为枚举本身的属性访问，并使用枚举名称声明类型：

```ts 
enum UserResponse {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: UserResponse): void {
  // ...
}

respond("Princess Caroline", UserResponse.Yes);
```

数字枚举可以与 **计算和常量成员** 混用。
简而言之，没有初始值的枚举要么需要放在最前面，要么必须放在初始化为数字常量或其他常量枚举成员的数字枚举之后。
换句话说，以下是不允许的：
```ts 
// @errors: 1061
const getSomeValue = () => 23;
// ---cut---
enum E {
  A = getSomeValue(),
  B,
}
```

## 字符串枚举

字符串枚举是类似的概念，但在运行时有一些细微的差异，如下所述的文档所示。
在字符串枚举中，每个成员必须使用字符串字面量或另一个字符串枚举成员进行常量初始化。

```ts 
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

虽然字符串枚举没有自动递增行为，但字符串枚举的好处是它们可以很好地`序列化`。
换句话说，如果您正在调试并且必须读取数字枚举的运行时值，则该值通常是不透明的 - 它本身不会传达任何有用的含义（尽管  反向映射 可以 经常帮忙）。 字符串枚举允许您在代码运行时提供有意义且可读的值，而与枚举成员本身的名称无关。

## 异构枚举

从技术上讲，枚举可以与字符串和数字成员混合使用，但不清楚为什么要这样做：

```ts 
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}
```

从技术上讲，枚举可以与字符串和数字成员混合使用，但不清楚为什么要这样做：
## 计算成员和常量成员

每个枚举成员都有一个与之关联的值，可以是 _constant_ 或 _computed_。
如果满足以下条件，则枚举成员被视为常量：

- 它是枚举中的第一个成员，并且没有初始化器，在这种情况下，它被分配了值 `0`：

  ```ts 
  // E.X is constant:
  enum E {
    X,
  }
  ```

- 它没有初始值设定项，前面的枚举成员是一个 _numeric_ 常量。
   在这种情况下，当前枚举成员的值将是前一个枚举成员的值加一。
  ```ts 
  // All enum members in 'E1' and 'E2' are constant.

  enum E1 {
    X,
    Y,
    Z,
  }

  enum E2 {
    A = 1,
    B,
    C,
  }
  ```

- 枚举成员使用常量枚举表达式进行初始化。
   常量枚举表达式是 TypeScript 表达式的子集，可以在编译时对其进行完整计算。
   一个表达式是常量枚举表达式，如果它是：

  1. 文字枚举表达式（基本上是字符串文字或数字文字）
  2. 对先前定义的常量枚举成员的引用（可以源自不同的枚举）
  3. 带括号的常量枚举表达式
  4. 应用于常量枚举表达式的 `+`、`-`、`~`一元运算符之一
  5. `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 以常量枚举表达式作为操作数的二元运算符

  It is a compile time error for constant enum expressions to be evaluated to `NaN` or `Infinity`.

In all other cases enum member is considered computed.

```ts 
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length,
}
```

## 联合枚举和枚举成员类型

常量枚举成员有一个特殊子集未计算：文字枚举成员。
文字枚举成员是没有初始化值或具有初始化为的值的常量枚举成员


常量初始化器可以是以下类型：

- 任何字符串字面量（例如 `"foo"`, `"bar"`, `"baz"`）
- 任何数字字面量（例如 `1`, `100`）
- 应用于任何数字字面量的一元负号（例如 `-1`, `-100`）

当枚举中的所有成员都具有文字枚举值时，一些特殊的语义就会发挥作用。

第一个要点是，枚举成员也成为了类型！例如，我们可以声明某些变量只能赋枚举成员的值：

```ts 
// @errors: 2322
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Square,
  radius: 100,
};
```

另一个变化是枚举类型本身实际上成为了每个枚举成员的 _联合类型_。
对于联合枚举，类型系统可以利用它知道枚举本身存在的确切值集合的事实。
由于此，TypeScript 可以捕获我们可能会错误比较值的 bug。
例如：

```ts 
// @errors: 2367
enum E {
  Foo,
  Bar,
}

function f(x: E) {
  if (x !== E.Foo || x !== E.Bar) {
    //
  }
}
```

在上面的例子中，我们首先检查 `x` 是否不等于 `E.Foo`。
如果检查成功，那么我们的 `||` 将会短路，并执行 `if` 的主体部分。
但是，如果检查失败，那么 `x` 只能是 `E.Foo`，所以检查它是否等于 `E.Bar` 没有意义。这种情况在使用联合枚举时可以被 TypeScript 捕捉到，因为 TypeScript 知道哪些值是可能的，能够帮助开发者避免一些错误。

## 运行时枚举

枚举是在运行时存在的真实对象。例如，下面的枚举：

```ts 
enum E {
  X,
  Y,
  Z,
}
```

枚举是在运行时存在的真正的对象。
例如，下面的枚举：

```ts 
enum E {
  X,
  Y,
  Z,
}

function f(obj: { X: number }) {
  return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.
f(E);
```

## 编译时枚举

虽然枚举是在运行时存在的真正对象，但 `keyof` 关键字的工作方式与您可能期望的典型对象不同。而是使用 `keyof typeof` 获取表示所有枚举键的字符串的类型。

```ts 
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}
printImportant("ERROR", "This is a message");
```

### 反向映射

除了为成员创建属性名称的对象之外，数值枚举成员还会获得从枚举值到枚举名称的反向映射。例如，在此示例中：

```ts 
enum Enum {
  A,
}

let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```

TypeScript编译成以下JavaScript代码：

```ts 
// @showEmit
enum Enum {
  A,
}

let a = Enum.A;
let nameOfA = Enum[a]; // "A"
```


在生成的 JavaScript 代码中，枚举被编译成一个对象，该对象存储了正向 (`name` -> `value`) 和反向 (`value` -> `name`) 映射。对其他枚举成员的引用始终作为属性访问进行发出，而不是内联。需要注意的是，字符串枚举成员根本不会生成反向映射。

###  常量`const`枚举

在大多数情况下，枚举是一种完全有效的解决方案。
但有时要求更加严格。
为了避免支付额外的生成代码成本和访问枚举值时的额外间接性，可以使用`const`枚举。
使用`const`修饰符来定义`const`枚举：
```ts 
const enum Enum {
  A = 1,
  B = A * 2,
}
```

常量枚举只能使用常量枚举表达式，与常规枚举不同，它们在编译过程中完全被删除。
常量枚举成员会在使用处被内联。
这是因为常量枚举不能有计算成员。

```ts 
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];
```

in generated code will become

```ts 
// @showEmit
const enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];
```

#### 常量枚举陷阱

将枚举值内联化起初是很简单的，但却带来了微妙的影响。这些陷阱仅适用于环境常量枚举（即 `.d.ts` 文件中的常量枚举）以及在项目之间共享它们，但如果您发布或使用 `.d.ts` 文件，则这些陷阱可能适用于您，因为 `tsc --declaration` 将 `.ts` 文件转换为 `.d.ts` 文件。

1. 基于 [`isolatedModules` 文档](/tsconfig#references-to-const-enum-members) 中提出的原因，该模式基本上与环境常量枚举不兼容。
   这意味着，如果您发布环境常量枚举，下游消费者将无法同时使用 [`isolatedModules`](/tsconfig#isolatedModules) 和那些枚举值。
2. 您可以在编译时轻松地内联版本 A 中的值，并在运行时导入版本 B。
   如果您不非常小心，A 和 B 的枚举值可能不同，导致 [令人惊讶的错误](https://github.com/microsoft/TypeScript/issues/5219#issue-110947903)，例如执行错误的 `if` 语句分支。
   这些错误特别难以处理，因为通常在构建项目时，自动运行测试与依赖版本相同，完全忽略了这些错误。
3. [`importsNotUsedAsValues: "preserve"`](/tsconfig#importsNotUsedAsValues) 不会删除用作值的常量枚举的导入，但环境常量枚举不能保证运行时的 `.js` 文件存在。
   无法解析的导入会在运行时引发错误。
   通常取消模棱两可的导入的方法，[只导入类型](/reference/Modules#importing-types) [不允许常量枚举值](https://github.com/microsoft/TypeScript/issues/40344)。

以下是避免这些陷阱的两种方法：

A. 完全不使用环境常量枚举。
   您可以借助一个 Linter 轻松地 [禁止环境常量枚举](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#how-can-i-ban-specific-language-feature)。
   显然，这避免了任何与环境常量枚举有关的问题，但会阻止您的项目内联其自己的枚举。
   与内联来自其他项目的枚举不同，内联一个项目自己的枚举并不会有问题，并且具有性能影响。
B. 通过使用 [`preserveConstEnums`](/tsconfig#preserveConstEnums) 来去除环境常量枚举的 `const`，从而不发布环境常量

## 环境枚举

环境枚举用于描述已经存在的枚举类型的形状。

```ts 
declare enum Enum {
  A = 1,
  B,
  C = 2,
}
```

环境枚举和非环境枚举之间的一个重要区别是，在常规枚举中，如果其前面的枚举成员被视为常量，则没有初始值设定项的成员将被视为常量。
相比之下，没有初始值设定项的环境（和非常量）枚举成员 _always_ 被认为是已计算的。
## 对象与枚举

在现代的 TypeScript 中，如果一个带有 as const 的对象能够满足需求，那么你可能就不需要使用枚举了。

```ts 
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

EDirection.Up;
//         ^?

ODirection.Up;
//         ^?

// Using the enum as a parameter
function walk(dir: EDirection) {}

// It requires an extra line to pull out the values
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);
```

支持这种格式而不是 TypeScript 的`枚举`的最大论点是它使您的代码库与 JavaScript 的状态保持一致，并且 [when/if](https://github.com/rbuckton/proposal-enum) 添加了枚举 到 JavaScript 然后你可以移动到额外的语法。
