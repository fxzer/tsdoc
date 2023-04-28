对于习惯于使用其他静态类型语言（例如 C# 和 Java）的程序员来说，TypeScript 是一个流行的选择。

TypeScript 的类型系统提供了许多相同的好处，例如更好的代码完成、更早的错误检测以及程序各部分之间更清晰的通信。
虽然 TypeScript 为这些开发人员提供了许多熟悉的功能，但值得回头看看 JavaScript（以及 TypeScript）与传统 OOP 语言有何不同。
了解这些差异将帮助您编写更好的 JavaScript 代码，并避免直接从 C#/Java 转到 TypeScript 的程序员可能掉入的常见陷阱。

## 共同学习 JavaScript

如果您已经熟悉 JavaScript 但主要是 Java 或 C# 程序员，则此介绍性页面可以帮助解释您可能容易陷入的一些常见误解和陷阱。
TypeScript 建模类型的一些方式与 Java 或 C# 完全不同，在学习 TypeScript 时记住这些很重要。

如果您是一般不熟悉 JavaScript 的 Java 或 C# 程序员，我们建议您先学习一些 _without_ 类型的 JavaScript，以了解 JavaScript 的运行时行为。
因为 TypeScript 不会改变您的代码_运行_的方式，您仍然需要学习 JavaScript 的工作原理才能编写真正执行某些操作的代码！

重要的是要记住 TypeScript 使用与 JavaScript 相同的_runtime_，因此关于如何完成特定运行时行为（将字符串转换为数字、显示警报、将文件写入磁盘等）的任何资源都将始终同样适用于 打字稿程序。
不要将自己局限于特定于 TypeScript 的资源！

## 重新思考类

C# 和 Java 是我们所说的_强制性 OOP_ 语言。
在这些语言中，类是代码组织的基本单位，也是运行时所有数据和行为的基本容器。
强制将所有功能和数据保存在类中可能是解决某些问题的良好域模型，但并非每个域都_需要_以这种方式表示。

### 免费函数和数据

在 JavaScript 中，函数可以存在于任何地方，数据可以自由传递，而无需在预定义的“类”或“结构”中。
这种灵活性非常强大。
在没有隐含的 OOP 层次结构的情况下处理数据的“自由”函数（那些与类无关的函数）往往是用 JavaScript 编写程序的首选模型。

### 静态类

此外，TypeScript 中不需要来自 C# 和 Java 的某些构造，例如单例和静态类。

## TypeScript 中的 OOP

也就是说，如果您愿意，您仍然可以使用课程！
有些问题很适合通过传统的 OOP 层次结构来解决，而 TypeScript 对 JavaScript 类的支持将使这些模型更加强大。
TypeScript 支持许多常见模式，例如实现接口、继承和静态方法。

我们将在本指南的后面介绍类。

## 重新思考类型

TypeScript 对 _type_ 的理解实际上与 C# 或 Java 有很大不同。
让我们探讨一些差异。

### 标称具体化类型系统

在 C# 或 Java 中，任何给定的值或对象都具有一种确切的类型——“null”、原始类型或已知类类型。
我们可以调用 `value.GetType()` 或 `value.getClass()` 之类的方法来在运行时查询确切的类型。
这种类型的定义将驻留在某个具有某个名称的类中，我们不能使用两个具有相似形状的类来代替彼此，除非存在显式继承关系或共同实现的接口。

这些方面描述了一个_具体化的、名义上的_类型系统。
我们在代码中编写的类型在运行时存在，类型通过它们的声明而不是它们的结构相关。

### 类型作为集合

在 C# 或 Java 中，考虑运行时类型与其编译时声明之间的一对一对应关系是有意义的。

在 TypeScript 中，最好将类型视为具有共同点的_一组值_。
因为类型只是集合，所以一个特定的值可以同时属于_许多_集合。

一旦开始将类型视为集合，某些操作就会变得非常自然。
例如，在 C# 中，传递 _either_ `string` 或 `int` 的值是很尴尬的，因为没有一种类型可以表示这种值。

在 TypeScript 中，一旦你意识到每个类型只是一个集合，这就变得很自然了。
您如何描述属于 `string` 集合或 `number` 集合的值？
它只是属于这些集合的_union_：`string | number`。

TypeScript 提供了许多机制来以集合论的方式处理类型，如果您将类型视为集合，您会发现它们更直观。

### 擦除的结构类型

在 TypeScript 中，对象_不_属于单一的确切类型。
例如，如果我们构造一个满足接口的对象，我们可以在需要该接口的地方使用该对象，即使两者之间没有声明关系。

```ts twoslash
interface Pointlike {
  x: number;
  y: number;
}
interface Named {
  name: string;
}

function logPoint(point: Pointlike) {
  console.log("x = " + point.x + ", y = " + point.y);
}

function logName(x: Named) {
  console.log("Hello, " + x.name);
}

const obj = {
  x: 0,
  y: 0,
  name: "Origin",
};

logPoint(obj);
logName(obj);
```

TypeScript 的类型系统是 _structural_，而不是名义上的：我们可以将 `obj` 用作 `Pointlike`，因为它具有 `x` 和 `y` 属性，它们都是数字。
类型之间的关系取决于它们包含的属性，而不是它们是否被声明为具有某种特定关系。

TypeScript 的类型系统也是 _not reified_：运行时没有任何东西可以告诉我们 `obj` 是 `Pointlike`。
事实上，`Pointlike` 类型在运行时_以任何形式_不存在。

回到 _types as sets_ 的想法，我们可以将 obj 视为 Pointlike 值集和 Named 值集的成员。

### 结构类型的后果

OOP 程序员经常对结构类型的两个特定方面感到惊讶。

#### 空类型

首先是 _empty type_ 似乎出乎意料：

```ts twoslash
class Empty {}

function fn(arg: Empty) {
  // do something?
}

// No error, but this isn't an 'Empty' ?
fn({ k: 10 });
```

TypeScript 通过查看提供的参数是否为有效的“Empty”来确定此处对“fn”的调用是否有效。
它通过检查 `{ k: 10 }` 和 `class Empty { }` 的结构来做到这一点。
我们可以看到 `{ k: 10 }` 具有 `Empty` 的_所有_属性，因为 `Empty` 没有属性。
因此，这是一个有效的调用！

这可能看起来令人惊讶，但它最终与名义 OOP 语言中强制执行的关系非常相似。
子类不能_删除_其基类的属性，因为这样做会破坏派生类与其基类之间的自然子类型关系。
结构类型系统通过根据具有兼容类型的属性来描述子类型来简单地隐式识别这种关系。

#### 相同类型

另一个经常出人意料的来源是相同的类型：

```ts
class Car {
  drive() {
    // hit the gas
  }
}
class Golfer {
  drive() {
    // hit the ball far
  }
}

// No error?
let w: Car = new Golfer();
```

同样，这不是错误，因为这些类的_结构_是相同的。
虽然这看起来像是一个潜在的混淆来源，但在实践中，不应该相关的相同类并不常见。

我们将在“类”一章中详细了解类之间的关系。

### 反射

OOP 程序员习惯于能够查询任何值的类型，甚至是通用值：

```csharp
// C#
static void LogType<T>() {
    Console.WriteLine(typeof(T).Name);
}
```

由于 TypeScript 的类型系统已被完全删除，因此有关例如 泛型类型参数的实例化在运行时不可用。

JavaScript 确实有一些有限的原语，如 typeof 和 instanceof，但请记住，这些运算符仍在处理类型擦除输出代码中存在的值。
例如，`typeof (new Car())` 将是 `"object"`，而不是 `Car` 或 `"Car"`。
## 下一步

这是对日常 TypeScript 中使用的语法和工具的简要概述。 从这里，您可以：

- <a href="/handbooks/handbook-v2/Basics">阅读完整手册</a>
- [案例探索](https://www.typescriptlang.org/play#show-examples)
