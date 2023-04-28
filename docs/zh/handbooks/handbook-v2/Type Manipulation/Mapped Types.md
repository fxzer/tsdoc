
当您不想重复自己时，有时一种类型需要基于另一种类型。

映射类型建立在索引签名的语法之上，用于声明未提前声明的属性类型：
```ts twoslash
type Horse = {};
// ---cut---
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};
```

映射类型是一种通用类型，它使用 `PropertyKey` 的联合（经常[通过 `keyof`](/docs/handbook/2/indexed-access-types.html) 创建）来遍历键以创建 类型：
```ts twoslash
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
```

在此示例中，`OptionsFlags` 将从类型`Type`中获取所有属性，并将它们的值更改为布尔值。
```ts twoslash
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
// ---cut---
type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
//   ^?
```

### 映射修饰符

在映射期间可以应用两个额外的修饰符：`readonly` 和 `?`，它们分别影响可变性和可选性。

您可以通过在 `-` 或 `+` 前加上前缀来删除或添加这些修饰符。 如果您不添加前缀，则假定为`+`。
```ts twoslash
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;
//   ^?
```

```ts twoslash
// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>;
//   ^?
```

## 通过 as 映射重新映射

在 `TypeScript 4.1 `及更高版本中，您可以使用映射类型中的 as 子句重新映射映射类型中的键：
```ts
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties]
}
```

您可以利用 [模版字面量](/docs/handbook/2/template-literal-types.html) 等功能从先前的属性名称创建新的属性名称：
```ts twoslash
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person {
    name: string;
    age: number;
    location: string;
}

type LazyPerson = Getters<Person>;
//   ^?
```

您可以通过条件类型生成`never` 来过滤掉键：
```ts twoslash
// Remove the 'kind' property
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
    kind: "circle";
    radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
//   ^?
```

您可以映射任意联合，而不仅仅是  `string | number | symbol`，但任何类型的联合：
```ts twoslash
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>
//   ^?
```

### 进一步探索


映射类型与此类型操作部分中的其他功能配合得很好，例如这里是[使用条件类型的映射类型](/docs/handbook/2/conditional-types.html)，它返回 `true` or `false`  取决于对象是否将属性 `pii` 设置为字面量 `true`：
```ts twoslash
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
//   ^?
```
