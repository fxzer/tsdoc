
TypeScript 的类型系统非常强大，因为它允许 _根据其他类型_ 来表达类型。

这个想法的最简单形式是泛型，我们实际上有各种各样的_type operators_可供使用。
也可以根据我们已有的_值_来表达类型。

通过组合各种类型的运算符，我们可以用简洁、可维护的方式表达复杂的操作和值。
在本节中，我们将介绍根据现有类型或值来表达新类型的方法。

- [Generics](/docs/handbook/2/generics.html) - 采用参数的类型
- [Keyof 类型运算符](/docs/handbook/2/keyof-types.html) - 使用 `keyof` 运算符创建新类型
- [Typeof 类型运算符](/docs/handbook/2/typeof-types.html) - 使用 `typeof` 运算符创建新类型
- [索引访问类型](/docs/handbook/2/indexed-access-types.html) - 使用 `Type['a']` 语法访问类型的子集
- [条件类型](/docs/handbook/2/conditional-types.html) - 类似于类型系统中的 if 语句的类型
- [映射类型](/docs/handbook/2/mapped-types.html) - 通过映射现有类型中的每个属性来创建类型
- [模板文字类型](/docs/handbook/2/template-literal-types.html) - 通过模板文字字符串更改属性的映射类型