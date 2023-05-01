
# `keyof` 类型运算符

`keyof` 运算符采用对象类型并生成其键的字符串或数字文字联合。
下面的类型P是同类型： "x" | "y"：
```ts 
type Point = { x: number; y: number };
type P = keyof Point;
//   ^?
```

如果该类型具有`string`或`number`索引签名，则`keyof`将返回这些类型：
```ts 
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
//   ^?

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
//   ^?
```

请注意，在此示例中，`M` 是`string | number`  这是因为 JavaScript 对象键总是被强制转换为字符串，所以 `obj[0]` 总是与 `obj["0"]` 相同。

`keyof` 类型在与映射类型结合使用时变得特别有用，我们将在后面详细介绍。