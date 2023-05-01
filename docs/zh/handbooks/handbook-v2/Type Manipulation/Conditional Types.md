
# 条件类型


在最有用的程序的核心，我们必须根据输入做出决定。
JavaScript 程序没有什么不同，但考虑到值可以很容易地自省这一事实，这些决定也基于输入的类型。
_条件类型_ 有助于描述输入和输出类型之间的关系。

```ts 
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
//   ^?

type Example2 = RegExp extends Animal ? number : string;
//   ^?
```

条件类型的形式看起来有点像 JavaScript 中的条件表达式（`condition ? trueExpression : falseExpression`）：
```ts 
type SomeType = any;
type OtherType = any;
type TrueType = any;
type FalseType = any;
type Stuff =
  // ---cut---
  SomeType extends OtherType ? TrueType : FalseType;
```

当 `extends` 左侧的类型可分配给右侧的类型时，您将在第一个分支（“真实”分支）中获得该类型； 否则，您将在后一个分支（“假”分支）中获得类型。

从上面的示例中，条件类型可能不会立即看起来有用 - 我们可以告诉自己是否 `Dog extends Animal` 并选择 `number` 或 `string`！
但条件类型的强大之处在于将它们与泛型一起使用。

例如，让我们采用以下`createLabel` 函数：
```ts 
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
```

createLabel 的这些重载描述了一个 JavaScript 函数，该函数根据其输入的类型做出选择。 注意几点：

1. 如果一个库必须在其 API 中一遍又一遍地做出相同的选择，这将变得很麻烦。
2. 我们必须创建三个重载：一个用于我们_确定_类型的每种情况（一个用于 `string`，一个用于 `number`），一个用于最一般的情况（采用 `string | number` ）. 对于 createLabel 可以处理的每一种新类型，重载的数量都会呈指数级增长。

相反，我们可以将该逻辑编码为条件类型：

```ts 
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
// ---cut---
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
```

然后我们可以使用该条件类型将我们的重载简化为没有重载的单个函数。
```ts 
interface IdLabel {
  id: number /* some fields */;
}
interface NameLabel {
  name: string /* other fields */;
}
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
// ---cut---
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabel("typescript");
//  ^?

let b = createLabel(2.8);
//  ^?

let c = createLabel(Math.random() ? "hello" : 42);
//  ^?
```

### 条件类型约束

通常，条件类型的检查会为我们提供一些新信息。
就像使用类型保护进行缩小可以为我们提供更具体的类型一样，条件类型的真正分支将通过我们检查的类型进一步限制泛型。

例如，让我们采取以下内容：

```ts 
// @errors: 2536
type MessageOf<T> = T["message"];
```

在此示例中，TypeScript 出错是因为不知道`T`具有名为`message`的属性。
我们可以约束 `T`，TypeScript 将不再报错：
```ts 
type MessageOf<T extends { message: unknown }> = T["message"];

interface Email {
  message: string;
}

type EmailMessageContents = MessageOf<Email>;
//   ^?
```

但是，如果我们希望`MessageOf` 采用任何类型，并且在`message` 属性不可用时默认为 `never`之类的东西怎么办？
我们可以通过移出约束并引入条件类型来做到这一点：
```ts 
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;
//   ^?

type DogMessageContents = MessageOf<Dog>;
//   ^?
```

在 true 分支中，TypeScript 知道 `T` _will_ 有一个 `message` 属性。

作为另一个示例，我们还可以编写一个名为`Flatten`的类型，将数组类型展平为它们的元素类型，但除此之外别管它们：
```ts 
type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
type Str = Flatten<string[]>;
//   ^?

// Leaves the type alone.
type Num = Flatten<number>;
//   ^?
```

当 `Flatten` 被赋予一个数组类型时，它使用带有 `number` 的索引访问来获取 `string[]` 的元素类型。
否则，它只返回给定的类型。

### 在条件类型中进行推断

我们只是发现自己使用条件类型来应用约束，然后提取类型。
这最终成为一种常见的操作，条件类型使它变得更容易。

条件类型为我们提供了一种方法，可以使用 `infer` 关键字从我们在 true 分支中比较的类型进行推断。
例如，我们可以推断出 `Flatten` 中的元素类型，而不是使用索引访问类型“手动”取出它：
```ts 
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
```

在这里，我们使用 `infer` 关键字以声明方式引入一个名为 `Item` 的新泛型类型变量，而不是指定如何在 true 分支中检索 `T` 的元素类型。
这使我们不必考虑如何深入挖掘和剖析我们感兴趣的类型的结构。

我们可以使用 `infer` 关键字编写一些有用的辅助类型别名。
例如，对于简单的情况，我们可以从函数类型中提取返回类型：

```ts 
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num = GetReturnType<() => number>;
//   ^?

type Str = GetReturnType<(x: string) => string>;
//   ^?

type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
//   ^?
```

当从具有多个调用签名的类型（例如重载函数的类型）推断时，推断是从 _last_ 签名进行的（这大概是最宽松的包罗万象的情况）。 不可能根据参数类型列表执行重载决策。
```ts 
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;
//   ^?
```

## 分布式条件类型

当条件类型作用于泛型类型时，它们在给定联合类型时变为 _distributive_。
例如，采用以下内容：
```ts 
type ToArray<Type> = Type extends any ? Type[] : never;
```

如果我们将联合类型插入到`ToArray`中，则条件类型将应用于该联合的每个成员。
```ts 
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;
//   ^?
```

这里发生的是 `StrArrOrNumArr` 分布在：
```ts 
type StrArrOrNumArr =
  // ---cut---
  string | number;
```

并将联合的每个成员类型映射到有效的：

```ts 
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr =
  // ---cut---
  ToArray<string> | ToArray<number>;
```

which leaves us with:

```ts 
type StrArrOrNumArr =
  // ---cut---
  string[] | number[];
```

通常，分配性是所需的行为。
为避免这种行为，您可以用方括号将 `extends` 关键字的每一侧括起来。
```ts 
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr = ToArrayNonDist<string | number>;
//   ^?
```
