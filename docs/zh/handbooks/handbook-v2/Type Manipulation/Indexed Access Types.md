
# 索引访问类型
我们可以使用**索引访问类型**来查找另一种类型的特定属性：
```ts twoslash
type Person = { age: number; name: string; alive: boolean };
type Age = Person["age"];
//   ^?
```

索引类型本身就是一种类型，因此我们可以完全使用联合、`keyof` 或其他类型：
```ts twoslash
type Person = { age: number; name: string; alive: boolean };
// ---cut---
type I1 = Person["age" | "name"];
//   ^?

type I2 = Person[keyof Person];
//   ^?

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];
//   ^?
```

如果您尝试索引一个不存在的属性，您甚至会看到一个错误：
```ts twoslash
// @errors: 2339
type Person = { age: number; name: string; alive: boolean };
// ---cut---
type I1 = Person["alve"];
```

使用任意类型进行索引的另一个示例是使用 `number` 来获取数组元素的类型。
我们可以将其与 `typeof` 结合使用，以方便地捕获数组文字的元素类型：
```ts twoslash
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = typeof MyArray[number];
//   ^?
type Age = typeof MyArray[number]["age"];
//   ^?
// Or
type Age2 = Person["age"];
//   ^?
```

您只能在索引时使用类型，这意味着您不能使用 `const` 来进行变量引用：
```ts twoslash
// @errors: 2538 2749
type Person = { age: number; name: string; alive: boolean };
// ---cut---
const key = "age";
type Age = Person[key];
```

但是，您可以为类似风格的重构使用类型别名：
```ts twoslash
type Person = { age: number; name: string; alive: boolean };
// ---cut---
type key = "age";
type Age = Person[key];
```
