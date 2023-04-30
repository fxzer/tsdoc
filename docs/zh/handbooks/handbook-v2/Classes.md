

TypeScript 全面支持 ES2015 中引入的`class`关键字。

与其他 JavaScript 语言功能一样，TypeScript 添加了类型注释和其他语法，以允许您表达类和其他类型之间的关系。
## 类成员

这是最基本的类——一个空类：
```ts twoslash
class Point {}
```

这个类还不是很有用，所以让我们开始添加一些成员。

### 字段

字段声明在类上创建一个公共可写属性：
```ts twoslash
// @strictPropertyInitialization: false
class Point {
  x: number;
  y: number;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;
```

与其他位置一样，类型注释是可选的，但如果未指定，则将是隐式的`any`。

字段也可以有初始值设定项； 这些将在实例化类时自动运行：
```ts twoslash
class Point {
  x = 0;
  y = 0;
}

const pt = new Point();
// Prints 0, 0
console.log(`${pt.x}, ${pt.y}`);
```

就像 `const`、`let` 和 `var` 一样，类属性的初始值设定项将用于推断其类型：
```ts twoslash
// @errors: 2322
class Point {
  x = 0;
  y = 0;
}
// ---cut---
const pt = new Point();
pt.x = "0";
```

#### `--strictPropertyInitialization`

 `strictPropertyInitialization`可控制类字段是否需要在构造函数中初始化。

```ts twoslash
// @errors: 2564
class BadGreeter {
  name: string;
}
```

```ts twoslash
class GoodGreeter {
  name: string;

  constructor() {
    this.name = "hello";
  }
}
```

请注意，该字段需要 _在构造函数本身_ 中初始化。
TypeScript 不会分析您从构造函数调用的方法来检测初始化，因为派生类可能会覆盖这些方法并且无法初始化成员。

如果你打算通过构造函数以外的方式明确地初始化一个字段（例如，可能一个外部库正在为你填充你的类的一部分），你可以使用 _明确赋值断言运算符_，`!`：
```ts twoslash
class OKGreeter {
  // Not initialized, but no error
  name!: string;
}
```

### `readonly`

字段可以以 `readonly` 修饰符为前缀。
这可以防止对构造函数之外的字段进行赋值。
```ts twoslash
// @errors: 2540 2540
class Greeter {
  readonly name: string = "world";

  constructor(otherName?: string) {
    if (otherName !== undefined) {
      this.name = otherName;
    }
  }

  err() {
    this.name = "not ok";
  }
}
const g = new Greeter();
g.name = "also not ok";
```

### 构造函数


类构造函数与函数非常相似。
您可以添加带有类型注释、默认值和重载的参数：
```ts twoslash
class Point {
  x: number;
  y: number;

  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
```

```ts twoslash
class Point {
  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}
```

类构造函数签名和函数签名之间只有一些区别：

- 构造函数不能有类型参数 - 这些属于外部类声明，我们稍后会了解
- 构造函数不能有返回类型注释 - 类实例类型总是返回的

#### 超级调用

就像在 JavaScript 中一样，如果您有基类，则需要在构造函数主体中调用 `super();` 在使用任何 `this.`成员之前：
```ts twoslash
// @errors: 17009
class Base {
  k = 4;
}

class Derived extends Base {
  constructor() {
    // Prints a wrong value in ES5; throws exception in ES6
    console.log(this.k);
    super();
  }
}
```

忘记调用 `super` 是 JavaScript 中很容易犯的错误，但 TypeScript 会在必要时告诉您。
### 方法


类的函数属性称为 _方法_。
方法可以使用所有与函数和构造函数相同的类型注释：
```ts twoslash
class Point {
  x = 10;
  y = 10;

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
```

除了标准的类型注释，TypeScript 没有向方法中添加任何其他新内容。

请注意，在方法体内，仍然必须通过 `this.`访问字段和其他方法。
方法主体中的非限定名称将始终引用封闭范围内的内容：
```ts twoslash
// @errors: 2322
let x: number = 0;

class C {
  x: string = "hello";

  m() {
    // This is trying to modify 'x' from line 1, not the class property
    x = "world";
  }
}
```

### Getters / Setters

Classes can also have _accessors_:

```ts twoslash
class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}
```

> 请注意，没有额外逻辑的字段支持的 get/set 对在 JavaScript 中很少有用。
> 如果您不需要在 get/set 操作期间添加额外的逻辑，那么公开公共字段是可以的。

TypeScript 对访问器有一些特殊的推理规则：

- 如果 `get` 存在但没有 `set`，该属性自动为 `readonly`
- 如果未指定setter参数的类型，则根据getter的返回类型推断
- Getters and setters  必须具有相同可见的成员

自 [TypeScript 4.3](https://devblogs.microsoft.com/typescript/announcing-typescript-4-3/) 起，可以使用不同类型的访问器来获取和设置。
```ts twoslash
class Thing {
  _size = 0;

  get size(): number {
    return this._size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);

    // Don't allow NaN, Infinity, etc

    if (!Number.isFinite(num)) {
      this._size = 0;
      return;
    }

    this._size = num;
  }
}
```

### 索引签名

类可以声明索引签名类似对象类型的索引签名：
```ts twoslash
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  check(s: string) {
    return this[s] as boolean;
  }
}
```

因为索引签名类型还需要捕获方法的类型，所以要有效地使用这些类型并不容易。
通常最好将索引数据存储在另一个地方而不是类实例本身。


### 接口实现`implements`

您可以使用 `implements` 子句来检查类是否满足特定的 `interface`。
如果类未能正确实现它，将发出错误：
```ts twoslash
// @errors: 2420
interface Pingable {
  ping(): void;
}

class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}

class Ball implements Pingable {
  pong() {
    console.log("pong!");
  }
}
```

类也可以实现多个接口，例如 `C 类实现 A，B {`。

#### 注意事项

重要的是要理解 `implements` 子句只是检查该类是否可以被视为接口类型。
它根本不改变类的类型或其方法。
一个常见的错误来源是假设 `implements` 子句会改变类类型 - 它不会！
```ts twoslash
// @errors: 7006
interface Checkable {
  check(name: string): boolean;
}

class NameChecker implements Checkable {
  check(s) {
    // Notice no error here
    return s.toLowercse() === "ok";
    //         ^?
  }
}
```

在这个例子中，我们可能期望 `s` 的类型会受到 `check` 的 `name: string` 参数的影响。
它不是 - `implements` 子句不会改变类主体的检查方式或其类型的推断方式。

同样，实现带有可选属性的接口不会创建该属性：
```ts twoslash
// @errors: 2339
interface A {
  x: number;
  y?: number;
}
class C implements A {
  x = 0;
}
const c = new C();
c.y = 10;
```

### 类的继承`extends`


类可以从基类`extend`。
派生类具有其基类的所有属性和方法，还定义了额外的成员。
```ts twoslash
class Animal {
  move() {
    console.log("Moving along!");
  }
}

class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}

const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);
```

#### 方法重写


派生类也可以覆盖基类的字段或属性。
您可以使用 `super.` 语法来访问基类方法。

TypeScript 强制派生类始终是其基类的子类型。

例如，这是一种覆盖方法的合法方法：
```ts twoslash
class Base {
  greet() {
    console.log("Hello, world!");
  }
}

class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

const d = new Derived();
d.greet();
d.greet("reader");
```

派生类遵循其基类契约很重要。
请记住，通过基类引用来引用派生类实例是很常见的（而且总是合法的！）：
```ts twoslash
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
declare const d: Base;
// ---cut---
// Alias the derived instance through a base class reference
const b: Base = d;
// No problem
b.greet();
```

What if `Derived` didn't follow `Base`'s contract?

```ts twoslash
// @errors: 2416
class Base {
  greet() {
    console.log("Hello, world!");
  }
}

class Derived extends Base {
  // Make this parameter required
  greet(name: string) {
    console.log(`Hello, ${name.toUpperCase()}`);
  }
}
```

如果我们不顾错误地编译这段代码，那么这个示例就会崩溃：
```ts twoslash
declare class Base {
  greet(): void;
}
declare class Derived extends Base {}
// ---cut---
const b: Base = new Derived();
// Crashes because "name" will be undefined
b.greet();
```

####  仅类型字段声明

当 `target >= ES2022` 或 `useDefineForClassFields` 为 `true` 时，类字段在父类构造函数完成后初始化，覆盖父类设置的任何值。 当您只想为继承的字段重新声明更准确的类型时，这可能会成为问题。 要处理这些情况，您可以编写 `declare` 以向 TypeScript 指示此字段声明不应有运行时影响。
```ts twoslash
interface Animal {
  dateOfBirth: any;
}

interface Dog extends Animal {
  breed: any;
}

class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}
```

####  初始化顺序

在某些情况下，JavaScript 类初始化的顺序可能会令人惊讶。
让我们考虑一下这段代码：
```ts twoslash
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}

class Derived extends Base {
  name = "derived";
}

// Prints "base", not "derived"
const d = new Derived();
```

这里发生了什么？

JavaScript 定义的类初始化顺序是：

- 初始化基类字段
- 基类构造函数运行
- 派生类字段被初始化
- 派生类构造函数运行

这意味着基类构造函数在其自己的构造函数中看到了它自己的 name 值，因为派生类字段初始化尚未运行。
#### 继承内置类型

> 注意：如果你不打算继承内置类型，如 `Array`、`Error`、`Map` 等，或者您的编译目标明确设置为 `ES6`/`ES2015` 或更高版本，您 可以跳过这一部分

在 ES2015 中，返回对象的构造函数隐式地将 this 的值替换为 `super(...)` 的任何调用者。
生成的构造函数代码有必要捕获 `super(...)` 的任何潜在返回值并将其替换为 `this`。

因此，子类化 `Error`、`Array` 和其他类可能不再按预期工作。
这是因为 `Error`、`Array` 等构造函数使用 ECMAScript 6 的 `new.target` 来调整原型链；
但是，在 ECMAScript 5 中调用构造函数时无法确保  `new.target` 的值。
默认情况下，其他下层编译器通常具有相同的限制。

对于像下面这样的子类：
```ts twoslash
class MsgError extends Error {
  constructor(m: string) {
    super(m);
  }
  sayHello() {
    return "hello " + this.message;
  }
}
```

你可能会发现：

- 构造这些子类返回的对象上的方法可能是“未定义的”，因此调用“sayHello”将导致错误。
- `instanceof` 将在子类的实例及其实例之间中断，因此 `(new MsgError()) instanceof MsgError` 将返回 `false`。

作为建议，您可以在任何 `super(...)` 调用后立即手动调整原型。
```ts twoslash
class MsgError extends Error {
  constructor(m: string) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MsgError.prototype);
  }

  sayHello() {
    return "hello " + this.message;
  }
}
```

但是，`MsgError`的任何子类也必须手动设置原型。
对于不支持 [`Object.setPrototypeOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 的运行时，您可以改为 使用 [`__proto__`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)。

不幸的是，[这些变通办法不适用于 Internet Explorer 10 及更早版本](<https://msdn.microsoft.com/en-us/library/s4esdbwz(v=vs.94).aspx>)。
可以手动将原型中的方法复制到实例本身（即 `MsgError.prototype` 到 `this`），但原型链本身无法修复。
## 权限访问符

您可以使用 TypeScript 来控制某些方法或属性是否对类外部的代码可见。
### `public`

The default visibility of class members is `public`.
A `public` member can be accessed anywhere:

```ts twoslash
class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();
```

因为 `public` 已经是默认的可见性修饰符，所以您永远 _不需要_ 将它写在类成员上，但出于样式/可读性原因可能会选择这样做
### `protected`

`protected` 成员只对声明它们的类的子类可见。

```ts twoslash
// @errors: 2445
class Greeter {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}

class SpecialGreeter extends Greeter {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
    //                          ^^^^^^^^^^^^^^
  }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName();
```

#### 暴露`protected`成员

派生类需要遵循它们的基类契约，但可以选择公开具有更多功能的基类的子类型。
这包括让`protected`成员成为`public`：
```ts twoslash
class Base {
  protected m = 10;
}
class Derived extends Base {
  // No modifier, so default is 'public'
  m = 15;
}
const d = new Derived();
console.log(d.m); // OK
```

请注意，`Derived` 已经能够自由读写 `m`，因此这不会显着改变这种情况的“安全性”。
这里要注意的主要事情是，在派生类中，如果这种暴露不是故意的，我们需要小心重复 `protected` 修饰符。

#### 跨层级`protected` 访问

不同的 OOP 语言对于通过基类引用访问“受保护”成员是否合法存在分歧：
```ts twoslash
// @errors: 2446
class Base {
  protected x: number = 1;
}
class Derived1 extends Base {
  protected x: number = 5;
}
class Derived2 extends Base {
  f1(other: Derived2) {
    other.x = 10;
  }
  f2(other: Base) {
    other.x = 10;
  }
}
```

例如，Java 认为这是合法的。
另一方面，C# 和 C++ 选择此代码应该是非法的。

TypeScript 在这里支持 C# 和 C++，因为访问 Derived2 中的 x 应该只在 Derived2 的子类中是合法的，而 Derived1 不是其中之一。
此外，如果通过 `Derived1` 引用访问 `x` 是非法的（这当然应该是！），那么通过基类引用访问它永远不会改善这种情况。

另请参阅 [为什么我不能从派生类访问受保护的成员？](https://blogs.msdn.microsoft.com/ericlippert/2005/11/09/why-cant-i-access-a-protected-member-from-a-derived-class/) 解释了更多 C# 的推理。
### `private`

`private` 类似于 `protected`, 但不允许从子类访问该成员:

```ts twoslash
// @errors: 2341
class Base {
  private x = 0;
}
const b = new Base();
// Can't access from outside the class
console.log(b.x);
```

```ts twoslash
// @errors: 2341
class Base {
  private x = 0;
}
// ---cut---
class Derived extends Base {
  showX() {
    // Can't access in subclasses
    console.log(this.x);
  }
}
```

因为 `private` 成员对派生类不可见，派生类不能增加它的可见性：
```ts twoslash
// @errors: 2415
class Base {
  private x = 0;
}
class Derived extends Base {
  x = 1;
}
```

#### 跨实例`private`访问

不同的 OOP 语言对于同一类的不同实例是否可以访问彼此的“私有”成员存在分歧。
虽然 Java、C#、C++、Swift 和 PHP 等语言允许这样做，但 Ruby 不允许。

TypeScript 确实允许跨实例的`private`访问：
```ts twoslash
class A {
  private x = 10;

  public sameAs(other: A) {
    // No error
    return other.x === this.x;
  }
}
```

#### 注意事项

与 TypeScript 类型系统的其他方面一样，`private` 和 `protected` [仅在类型检查期间强制执行](https://tinyurl.com/2kmvwt84)。

这意味着像 `in` 或简单的属性查找这样的 JavaScript 运行时构造仍然可以访问 `private` 或 `protected` 成员：
```ts twoslash
class MySafe {
  private secretKey = 12345;
}
```

```js
// In a JavaScript file...
const s = new MySafe();
// Will print 12345
console.log(s.secretKey);
```

`private` 还允许在类型检查期间使用括号表示法进行访问。 这使得 `private` 声明的字段可能更容易访问单元测试之类的东西，缺点是这些字段是_软私有_并且不严格执行隐私。
```ts twoslash
// @errors: 2341
class MySafe {
  private secretKey = 12345;
}

const s = new MySafe();

// Not allowed during type checking
console.log(s.secretKey);

// OK
console.log(s["secretKey"]);
```

与 TypeScripts 的`private`不同，JavaScript 的[私有字段](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields) (`#`) 在编译后保持私有并且不会 提供前面提到的逃生舱口，如括号表示法访问，使它们 _严格私有_。
```ts twoslash
class Dog {
  #barkAmount = 0;
  personality = "happy";

  constructor() {}
}
```

```ts twoslash
// @target: esnext
// @showEmit
class Dog {
  #barkAmount = 0;
  personality = "happy";

  constructor() {}
}
```

当编译为 ES2021 或更低版本时，TypeScript 将使用 WeakMaps 代替 `#`
```ts twoslash
// @target: es2015
// @showEmit
class Dog {
  #barkAmount = 0;
  personality = "happy";

  constructor() {}
}
```

如果您需要保护您的类中的值免受恶意行为者的侵害，您应该使用提供硬性运行时隐私的机制，例如闭包、WeakMaps 或私有字段。 请注意，这些在运行时添加的隐私检查可能会影响性能。
## 静态成员

Classes may have `static` members.
These members aren't associated with a particular instance of the class.
They can be accessed through the class constructor object itself:

```ts twoslash
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
console.log(MyClass.x);
MyClass.printX();
```

静态成员也可以使用相同的 `public`, `protected`,  `private`可见性修饰符：
```ts twoslash
// @errors: 2341
class MyClass {
  private static x = 0;
}
console.log(MyClass.x);
```

Static members are also inherited:

```ts twoslash
class Base {
  static getGreeting() {
    return "Hello world";
  }
}
class Derived extends Base {
  myGreeting = Derived.getGreeting();
}
```

### 特殊静态名称

从`Function`原型覆盖属性通常是不安全/不可能的。
因为类本身是可以用 `new` 调用的函数，所以不能使用某些 `static` 名称。
`name`、`length` 和 `call` 等函数属性不能定义为 `static` 成员：
```ts twoslash
// @errors: 2699
class S {
  static name = "S!";
}
```

### 为什么没有静态类？

TypeScript（和 JavaScript）没有像 C# 那样的名为“静态类”的结构。

这些构造_only_ 存在是因为这些语言强制所有数据和函数都在一个类中； 因为 TypeScript 中不存在该限制，所以不需要它们。
只有一个实例的类在 JavaScript/TypeScript 中通常只表示为一个普通的_object_。

例如，我们不需要 TypeScript 中的“静态类”语法，因为常规对象（甚至顶级函数）也可以完成这项工作：
```ts twoslash
// Unnecessary "static" class
class MyStaticClass {
  static doSomething() {}
}

// Preferred (alternative 1)
function doSomething() {}

// Preferred (alternative 2)
const MyHelperObject = {
  dosomething() {},
};
```

## 静态块

静态块允许您编写一系列具有自己范围的语句，这些语句可以访问包含类中的私有字段。 这意味着我们可以编写具有编写语句的所有功能的初始化代码，不会泄漏变量，并且可以完全访问我们类的内部结构。
```ts twoslash
declare function loadLastInstances(): any[]
// ---cut---
class Foo {
    static #count = 0;

    get count() {
        return Foo.#count;
    }

    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch {}
    }
}
```

## 泛型类

类，很像接口，可以是通用的。
当使用 new 实例化泛型类时，其类型参数的推断方式与函数调用中的方式相同：类可以像接口一样使用通用约束和默认值。
```ts twoslash
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}

const b = new Box("hello!");
//    ^?
```


### 静态成员中的类型参数

此代码不合法，原因可能并不明显：
```ts twoslash
// @errors: 2302
class Box<Type> {
  static defaultValue: Type;
}
```

请记住，类型总是被完全擦除！
在运行时，只有 _一个_ `Box.defaultValue` 属性槽。
这意味着设置 `Box<string>.defaultValue`（如果可能的话）也会改变 `Box<number>.defaultValue` - 不好。
泛型类的“静态”成员永远不能引用类的类型参数。
## 类中运行时的 `this`

重要的是要记住 TypeScript 不会改变 JavaScript 的运行时行为，并且 JavaScript 以具有一些特殊的运行时行为而闻名。

JavaScript 对 `this` 的处理确实不寻常：
```ts twoslash
class MyClass {
  name = "MyClass";
  getName() {
    return this.name;
  }
}
const c = new MyClass();
const obj = {
  name: "obj",
  getName: c.getName,
};

// Prints "obj", not "MyClass"
console.log(obj.getName());
```

长话短说，默认情况下，函数内部 `this` 的值取决于 _调用函数的方式_。
在这个例子中，因为函数是通过 `obj` 引用调用的，所以它的 `this` 的值是 `obj` 而不是类实例。

这很少是您想发生的事情！
TypeScript 提供了一些方法来减轻或防止这种错误。
### 箭头函数


如果你有一个经常以失去 this 上下文的方式调用的函数，那么使用箭头函数属性而不是方法定义是有意义的：
```ts twoslash
class MyClass {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}
const c = new MyClass();
const g = c.getName;
// Prints "MyClass" instead of crashing
console.log(g());
```

这有一些权衡：

- `this` 值保证在运行时是正确的，即使对于未使用 TypeScript 检查的代码也是如此
- 这将使用更多的内存，因为每个类实例都会有自己的每个以此方式定义的函数的副本
- 你不能在派生类中使用 `super.getName`，因为原型链中没有条目可以从中获取基类方法
### `this` 参数

在方法或函数定义中，名为`this`的初始参数在 TypeScript 中具有特殊含义。
这些参数在编译期间被删除：
```ts twoslash
type SomeType = any;
// ---cut---
// TypeScript input with 'this' parameter
function fn(this: SomeType, x: number) {
  /* ... */
}
```

```js
// JavaScript output
function fn(x) {
  /* ... */
}
```

TypeScript 检查调用带有“this”参数的函数是否是在正确的上下文中完成的。
除了使用箭头函数，我们还可以在方法定义中添加一个 this 参数来静态强制方法被正确调用：
```ts twoslash
// @errors: 2684
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();
// OK
c.getName();

// Error, would crash
const g = c.getName;
console.log(g());
```

此方法与箭头函数方法进行了相反的权衡：

- JavaScript 调用者可能仍然在没有意识到的情况下错误地使用类方法
- 每个类定义只分配一个函数，而不是每个类实例分配一个
- 仍然可以通过 `super` 调用基方法定义。
## `this` 类型

在类中，一种称为`this`的特殊类型 _动态地_ 引用当前类的类型。
让我们看看这有什么用：
<!-- prettier-ignore -->
```ts twoslash
class Box {
  contents: string = "";
  set(value: string) {
//  ^?
    this.contents = value;
    return this;
  }
}
```

在这里，TypeScript 将 `set` 的返回类型推断为 `this`，而不是 `Box`。
现在让我们创建 `Box` 的子类：
```ts twoslash
class Box {
  contents: string = "";
  set(value: string) {
    this.contents = value;
    return this;
  }
}
// ---cut---
class ClearableBox extends Box {
  clear() {
    this.contents = "";
  }
}

const a = new ClearableBox();
const b = a.set("hello");
//    ^?
```

您还可以在参数类型注释中使用 `this`：
```ts twoslash
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}
```

这与写 `other: Box` 不同——如果你有一个派生类，它的 `sameAs` 方法现在将只接受同一个派生类的其他实例：
```ts twoslash
// @errors: 2345
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}

class DerivedBox extends Box {
  otherContent: string = "?";
}

const base = new Box();
const derived = new DerivedBox();
derived.sameAs(base);
```

### `this`基类守卫

您可以在类和接口中的方法的返回位置使用`this is Type` 。
当与类型缩小（例如 `if` 语句）混合使用时，目标对象的类型将缩小为指定的 `Type`。
<!-- prettier-ignore -->
```ts twoslash
// @strictPropertyInitialization: false
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}

class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}

class Directory extends FileSystemObject {
  children: FileSystemObject[];
}

interface Networked {
  host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
  fso.content;
// ^?
} else if (fso.isDirectory()) {
  fso.children;
// ^?
} else if (fso.isNetworked()) {
  fso.host;
// ^?
}
```

基于 this 的类型保护的一个常见用例是允许对特定字段进行惰性验证。 例如，当 `hasValue`被验证为 true 时，这种情况会从 box 中保存的值中删除一个 `undefined` ：
```ts twoslash
class Box<T> {
  value?: T;

  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

const box = new Box();
box.value = "Gameboy";

box.value;
//  ^?

if (box.hasValue()) {
  box.value;
  //  ^?
}
```

## 参数属性

TypeScript 提供了将构造函数参数转换为具有相同名称和值的类属性的特殊语法。
这些称为 _参数属性_，是通过在构造函数参数前加上可见性修饰符`public`, `private`, `protected`,   `readonly`.之一来创建的。
结果字段获得这些修饰符：
```ts twoslash
// @errors: 2341
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a = new Params(1, 2, 3);
console.log(a.x);
//            ^?
console.log(a.z);
```

## 类表达式


类表达式与类声明非常相似。
唯一真正的区别是类表达式不需要名称，尽管我们可以通过它们最终绑定到的任何标识符来引用它们：
```ts twoslash
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};

const m = new someClass("Hello, world");
//    ^?
```

## 抽象类和成员

TypeScript 中的类、方法和字段可能是_抽象的_。

_抽象方法_ 或 _抽象字段_ 是尚未提供实现的方法。
这些成员必须存在于不能直接实例化的 _抽象类_ 中。

抽象类的作用是作为实现所有抽象成员的子类的基类。
当一个类没有任何抽象成员时，它被称 _具体_。

让我们看一个例子：
```ts twoslash
// @errors: 2511
abstract class Base {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

const b = new Base();
```

我们不能用 `new` 实例化 `Base` 因为它是抽象的。
相反，我们需要创建一个派生类并实现抽象成员：
```ts twoslash
abstract class Base {
  abstract getName(): string;
  printName() {}
}
// ---cut---
class Derived extends Base {
  getName() {
    return "world";
  }
}

const d = new Derived();
d.printName();
```

请注意，如果我们忘记实现基类的抽象成员，则会出现错误：
```ts twoslash
// @errors: 2515
abstract class Base {
  abstract getName(): string;
  printName() {}
}
// ---cut---
class Derived extends Base {
  // forgot to do anything
}
```

### 抽象构造签名

有时你想接受一些类构造函数，它产生一个派生自某个抽象类的类的实例。

例如，您可能想编写以下代码：
```ts twoslash
// @errors: 2511
abstract class Base {
  abstract getName(): string;
  printName() {}
}
class Derived extends Base {
  getName() {
    return "";
  }
}
// ---cut---
function greet(ctor: typeof Base) {
  const instance = new ctor();
  instance.printName();
}
```

TypeScript 正确地告诉您您正在尝试实例化一个抽象类。
毕竟，鉴于 `greet` 的定义，编写这段代码是完全合法的，它最终会构造一个抽象类：
```ts twoslash
declare const greet: any, Base: any;
// ---cut---
// Bad!
greet(Base);
```

相反，您想编写一个接受带有构造签名的东西的函数：
```ts twoslash
// @errors: 2345
abstract class Base {
  abstract getName(): string;
  printName() {}
}
class Derived extends Base {
  getName() {
    return "";
  }
}
// ---cut---
function greet(ctor: new () => Base) {
  const instance = new ctor();
  instance.printName();
}
greet(Derived);
greet(Base);
```

现在 TypeScript 正确地告诉您可以调用哪些类构造函数 - `Derived` 可以，因为它是具体的，但 `Base` 不能。

## 类之间的关系

在大多数情况下，TypeScript 中的类在结构上进行比较，与其他类型相同。

例如，这两个类可以代替彼此使用，因为它们是相同的：
```ts twoslash
class Point1 {
  x = 0;
  y = 0;
}

class Point2 {
  x = 0;
  y = 0;
}

// OK
const p: Point1 = new Point2();
```

同样，即使没有显式继承，类之间的子类型关系也存在：
```ts twoslash
// @strict: false
class Person {
  name: string;
  age: number;
}

class Employee {
  name: string;
  age: number;
  salary: number;
}

// OK
const p: Person = new Employee();
```
这听起来很简单，但有些情况似乎比其他情况更奇怪。
空类没有成员。
在结构类型系统中，没有成员的类型通常是其他任何类型的超类型。
所以如果你写一个空类（不要！），任何东西都可以用来代替它：
```ts twoslash
class Empty {}

function fn(x: Empty) {
  // can't do anything with 'x', so I won't
}

// All OK!
fn(window);
fn({});
fn(fn);
```
