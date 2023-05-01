
##  `typeof` 类型操作符

JavaScript 已经有一个 `typeof` 运算符，您可以在**表达上下文**中使用：
```ts 
// Prints "string"
console.log(typeof "Hello world");
```

TypeScript 添加了一个 `typeof`运算符，您可以在类型上下文中使用它来引用变量或属性的类型：
```ts 
let s = "hello";
let n: typeof s;
//  ^?
```

这对基本类型不是很有用，但结合其他类型运算符，您可以使用 `typeof`方便地表达许多模式。
例如，让我们从查看预定义类型 `ReturnType<T>`开始。
它接受一个 _函数类型_ 并产生它的返回类型：
```ts 
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
//   ^?
```

如果我们尝试在函数名称上使用`ReturnType` ，我们会看到一个指导性错误：
```ts 
// @errors: 2749
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<f>;
```

请记住，_values_ 和 _types_ 不是一回事。
要引用  _value `f`_ 的 _types_，我们使用 `typeof`：
```ts 
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
//   ^?
```

### 限制

TypeScript 有意限制了可以使用 `typeof` 的表达式的种类。
具体来说，只有在标识符（即变量名）或其属性上使用 `typeof` 才是合法的。
这有助于避免编写您认为正在执行但实际上不是的代码的混乱陷阱：
```ts 
// @errors: 1005
declare const msgbox: () => boolean;
// type msgbox = any;
// ---cut---
// Meant to use = ReturnType<typeof msgbox>
let shouldContinue: typeof msgbox("Are you sure you want to continue?");
```
