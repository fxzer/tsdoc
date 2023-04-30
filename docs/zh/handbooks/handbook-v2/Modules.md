
JavaScript 在处理模块化代码方面有着悠久的历史。
TypeScript 自 2012 年问世以来，已经实现了对许多此类格式的支持，但随着时间的推移，社区和 JavaScript 规范已经汇聚在一种称为 ES 模块（或 ES6 模块）的格式上。 您可能知道它是 `import`/`export` 语法。

ES 模块于 2015 年被添加到 JavaScript 规范中，到 2020 年在大多数 Web 浏览器和 JavaScript 运行时中得到广泛支持。
为了重点，该手册将涵盖 ES 模块及其流行的前体 CommonJS `module.exports =` 语法，您可以在 **Modules** 参考部分中找到有关其他模块模式的信息 。
## JS 模块定义

在 TypeScript 中，就像在 ECMAScript 2015 中一样，任何包含顶级 `import` 或  `export`的文件都被视为一个模块。

相反，没有任何顶级导入或导出声明的文件被视为一个脚本，其内容在全局范围内可用（因此也适用于模块）。

模块在它们自己的范围内执行，而不是在全局范围内。
这意味着在模块中声明的变量、函数、类等在模块外部不可见，除非使用其中一种导出形式显式导出它们。
相反，要使用从不同模块导出的变量、函数、类、接口等，必须使用其中一种导入形式导入。
## 非模块化

在我们开始之前，了解 TypeScript 认为什么是模块很重要。
JavaScript 规范声明任何没有`export` 或顶级 `await` 的 JavaScript 文件都应被视为脚本而不是模块。

在脚本文件中，变量和类型被声明为在共享的全局范围内，并且假设您将使用  `outFile` 编译器选项将多个输入文件连接到一个输出文件中， 或者在您的 HTML 中使用多个 `<script>` 标签来加载这些文件（以正确的顺序！）。

如果您有一个当前没有任何 `import` 或 `export` 的文件，但您希望将其视为一个模块，请添加以下行：
```ts twoslash
export {};
```

这会将文件更改为不导出任何内容的模块。 无论您的模块目标如何，此语法都有效。
## TS 模块化

<blockquote class='bg-reading'>
   <p>Additional Reading:<br />
   <a href='https://exploringjs.com/impatient-js/ch_modules.html#overview-syntax-of-ecmascript-modules'>Impatient JS (Modules)</a><br/>
   <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules'>MDN: JavaScript Modules</a><br/>
   </p>
</blockquote>

在 TypeScript 中编写基于模块的代码时，需要考虑三个主要事项：

- **语法**：我想使用什么语法来导入和导出东西？
- **模块解析**：模块名称（或路径）与磁盘上的文件之间的关系是什么？
- **模块输出目标**：我发出的 JavaScript 模块应该是什么样的？
### ES 模块语法

A file can declare a main export via `export default`:

```ts twoslash
// @filename: hello.ts
export default function helloWorld() {
  console.log("Hello, world!");
}
```

然后通过以下方式导入：
```ts twoslash
// @filename: hello.ts
export default function helloWorld() {
  console.log("Hello, world!");
}
// @filename: index.ts
// ---cut---
import helloWorld from "./hello.js";
helloWorld();
```

除了默认导出之外，您还可以通过省略 `default` 来通过 `export` 导出多个变量和函数：
```ts twoslash
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;

export class RandomNumberGenerator {}

export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
```

这些可以通过 `import` 语法在另一个文件中使用：
```ts twoslash
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;
export class RandomNumberGenerator {}
export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
// @filename: app.ts
// ---cut---
import { pi, phi, absolute } from "./maths.js";

console.log(pi);
const absPhi = absolute(phi);
//    ^?
```

###  额外的导入语法

可以使用类似 `import {old as new}`的格式重命名导入：
```ts twoslash
// @filename: maths.ts
export var pi = 3.14;
// @filename: app.ts
// ---cut---
import { pi as π } from "./maths.js";

console.log(π);
//          ^?
```

您可以将上述语法混合并匹配到单个`import`中：
```ts twoslash
// @filename: maths.ts
export const pi = 3.14;
export default class RandomNumberGenerator {}

// @filename: app.ts
import RandomNumberGenerator, { pi as π } from "./maths.js";

RandomNumberGenerator;
// ^?

console.log(π);
//          ^?
```

您可以获取所有导出的对象，并使用`* as name`将它们放入单个命名空间中：
```ts twoslash
// @filename: maths.ts
export var pi = 3.14;
export let squareTwo = 1.41;
export const phi = 1.61;

export function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}
// ---cut---
// @filename: app.ts
import * as math from "./maths.js";

console.log(math.pi);
const positivePhi = math.absolute(math.phi);
//    ^?
```

您可以导入一个文件，_不_ 通过 `import "./file"` 将任何变量包含到您当前的模块中：
```ts twoslash
// @filename: maths.ts
export var pi = 3.14;
// ---cut---
// @filename: app.ts
import "./maths.js";

console.log("3.14");
```

在这种情况下， `import` 什么都不做。 但是，对 `maths.ts` 中的所有代码进行了评估，这可能会触发影响其他对象的副作用。
#### TypeScript的 特定模块语法

可以使用与 JavaScript 值相同的语法导出和导入类型：
```ts twoslash
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };

export interface Dog {
  breeds: string[];
  yearOfBirth: number;
}

// @filename: app.ts
import { Cat, Dog } from "./animal.js";
type Animals = Cat | Dog;
```

TypeScript 使用两个概念扩展了  `import` 语法，用于声明类型的导入：
###### `import type`

Which is an import statement which can _only_ import types:

```ts twoslash
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
export type Dog = { breeds: string[]; yearOfBirth: number };
export const createCatName = () => "fluffy";

// @filename: valid.ts
import type { Cat, Dog } from "./animal.js";
export type Animals = Cat | Dog;

// @filename: app.ts
// @errors: 1361
import type { createCatName } from "./animal.js";
const name = createCatName();
```

######  内联导入

TypeScript 4.5 还允许单独的导入以 `type` 为前缀，以指示导入的引用是一种类型：
```ts twoslash
// @filename: animal.ts
export type Cat = { breed: string; yearOfBirth: number };
export type Dog = { breeds: string[]; yearOfBirth: number };
export const createCatName = () => "fluffy";
// ---cut---
// @filename: app.ts
import { createCatName, type Cat, type Dog } from "./animal.js";

export type Animals = Cat | Dog;
const name = createCatName();
```

这些一起允许非 TypeScript 转译器（如 Babel、swc 或 esbuild）知道可以安全删除哪些导入。
#### 具有 CommonJS 行为的 ES 模块语法

TypeScript 具有 ES 模块语法，它 _直接_ 关联到 CommonJS 和 AMD `require`。 使用 ES 模块的导入 _在大多数情况下_ 与这些环境中的 `require` 相同，但此语法可确保您的 TypeScript 文件与 CommonJS 输出一一对应：
```ts twoslash
/// <reference types="node" />
// @module: commonjs
// ---cut---
import fs = require("fs");
const code = fs.readFileSync("hello.ts", "utf8");
```

您可以在 **模块参考页面**  中了解有关此语法的更多信息。
## CommonJS 语法

CommonJS 是 npm 上大多数模块的交付格式。即使您使用上面的 ES 模块语法编写代码，简要了解 CommonJS 语法的工作原理也会帮助您更轻松地进行调试。
#### 导出

通过在名为`module`的全局变量上设置 `exports` 属性来导出标识符。
```ts twoslash
/// <reference types="node" />
// ---cut---
function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}

module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
```

然后可以通过 `require` 语句导入这些文件：
```ts twoslash
// @module: commonjs
// @filename: maths.ts
/// <reference types="node" />
function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}

module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
// @filename: index.ts
// ---cut---
const maths = require("maths");
maths.pi;
//    ^?
```

或者，您可以使用 JavaScript 中的解构功能稍微简化一下：
```ts twoslash
// @module: commonjs
// @filename: maths.ts
/// <reference types="node" />
function absolute(num: number) {
  if (num < 0) return num * -1;
  return num;
}

module.exports = {
  pi: 3.14,
  squareTwo: 1.41,
  phi: 1.61,
  absolute,
};
// @filename: index.ts
// ---cut---
const { squareTwo } = require("maths");
squareTwo;
// ^?
```



### CommonJS 和 ES 模块互操作

关于默认导入和模块命名空间对象导入之间的区别，CommonJS 和 ES 模块之间的功能不匹配。 TypeScript 有一个编译器标志，可以减少两组不同约束与 [`esModuleInterop`](/tsconfig#esModuleInterop) 之间的摩擦。

## TypeScript 的模块解析选项

模块解析是从 `import` 或 `require` 语句中获取字符串并确定该字符串引用的文件的过程。

TypeScript 包括两种解析策略：Classic 和 Node。 Classic，当编译器选项 `module`   不是 `commonjs` 时的默认值，包含在内是为了向后兼容。
Node 策略复制了 Node.js 在 CommonJS 模式下的工作方式，并附加了对 .ts 和 .d.ts 的检查。

有许多 TSConfig 标志会影响 TypeScript 中的模块策略： `moduleResolution` 、 `baseUrl` 、 `paths` 、  `rootDirs` 。

有关这些策略如何工作的完整详细信息，您可以查阅  `Module Resolution` 。

## TypeScript 的模块输出选项

有两个选项会影响发出的 JavaScript 输出：

-  `target` 确定哪些 JS 功能被降级（转换为在旧的 JavaScript 运行时运行）以及哪些保持不变
-  `module`  确定模块之间使用什么代码进行交互

您使用哪个  `target`  取决于您希望在其中运行 TypeScript 代码的 JavaScript 运行时中可用的功能。这可能是：您支持的最旧的 Web 浏览器，最低版本的 Node。 您希望运行的 js 或可能来自运行时的独特约束 - 例如 Electron。

模块之间的所有通信都通过模块加载器进行，编译器选项  `module`  决定使用哪个模块。
在运行时，模块加载器负责在执行模块之前定位并执行模块的所有依赖项。

例如，这是一个使用 ES 模块语法的 TypeScript 文件，展示了  `module`  的几个不同选项：
```ts twoslash
// @filename: constants.ts
export const valueOfPi = 3.142;
// @filename: index.ts
// ---cut---
import { valueOfPi } from "./constants.js";

export const twoPi = valueOfPi * 2;
```

#### `ES2020`

```ts twoslash
// @showEmit
// @module: es2020
// @noErrors
import { valueOfPi } from "./constants.js";

export const twoPi = valueOfPi * 2;
```

#### `CommonJS`

```ts twoslash
// @showEmit
// @module: commonjs
// @noErrors
import { valueOfPi } from "./constants.js";

export const twoPi = valueOfPi * 2;
```

#### `UMD`

```ts twoslash
// @showEmit
// @module: umd
// @noErrors
import { valueOfPi } from "./constants.js";

export const twoPi = valueOfPi * 2;
```

> 请注意，ES2020 实际上与原始 `index.ts` 相同。

您可以参考 TSConfig 中的 `module` 所有可用选项以及它们发出的 JavaScript 代码的样子。

## TypeScript 命名空间

TypeScript 有自己的模块格式，称为 “*命名空间*”，它早于 ES 模块标准。 这种语法对于创建复杂的定义文件有很多有用的特性，并且仍然在  in DefinitelyTyped 中得到积极使用。 虽然没有弃用，但命名空间中的大部分功能都存在于 ES 模块中，我们建议您使用它来与 JavaScript 的方向保持一致。 您可以在 **命名空间参考页**  中了解有关命名空间的更多信息。