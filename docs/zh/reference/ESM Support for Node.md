
在过去的几年中，Node.js一直致力于支持运行ECMAScript模块(ESM)。
这是一个很难支持的特性，因为Node.js生态系统的基础构建在一个名为CommonJS(CJS)的不同模块系统上。
两个模块系统之间的互操作带来了巨大的挑战，有许多新的功能需要处理；
然而，Node.js中对ESM的支持现在在Node.js中实现，并且尘埃落定。

这就是为什么TypeScript引入了两个新的 `module` 和 `moduleResolution` 设置：`node16` 和 `nodenext`。

```json tsconfig
{
    "compilerOptions": {
        "module": "nodenext",
    }
}
```

这些新的模式引入了一些高级功能，我们将在此处探讨。

### `package.json` 中的 `type` 和新扩展名

Node.js支持在 `package.json` 中的 [一个新设置](https://nodejs.org/api/packages.html#packages_package_json_and_file_extensions)，叫做 `type`。
`"type"` 可以设置为 `"module"` 或 `"commonjs"`。

```json tsconfig
{
    "name": "my-package",
    "type": "module",

    "//": "...",
    "dependencies": {
    }
}
```

此设置控制 `.js` 和 `.d.ts` 文件是解释为ES模块还是CommonJS模块，并在未设置时默认为CommonJS。
当一个文件被视为ES模块时，与CommonJS相比，会出现一些不同的规则：

* 可以使用 `import` / `export` 语句和顶级 `await`
* 相对导入路径需要全扩展名（例如，我们必须写成 `import "./foo.js"` 而不是 `import "./foo"`）
* 导入可能与 `node_modules` 中的依赖项不同
* 一些类似全局变量的值，如 `require()` 和 `__dirname`，不能直接使用
* CommonJS模块根据特定的规则被导入

我们稍后会回到其中一些问题。

为了覆盖TypeScript在此系统中的工作方式，`.ts` 和 `.tsx` 文件现在以相同的方式工作。
当TypeScript找到一个 `.ts`、`.tsx`、`.js` 或 `.jsx` 文件时，它会向上查找一个 `package.json`，看看那个文件是否是一个ES模块，并使用它来确定：

* 如何找到该文件导入的其他模块
* 如果生成输出，则如何转换该文件

当一个 `.ts` 文件被编译为ES模块时，ECMAScript `import` / `export` 语法在 `.js` 输出中保持不变；
当它被编译为CommonJS模块时，它将生成与今天在 [`module`](/tsconfig#module) 下获得的相同输出：`commonjs`。

这也意味着，在 `.ts` 文件是ES模块和CJS模块之间解析路径的方式不同。
例如，假设您今天有以下代码：

```ts
// ./foo.ts
export function helper() {
    // ...
}

// ./bar.ts
import { helper } from "./foo"; // 仅在CJS中起作用

helper();
```

这段代码在CommonJS模块中工作，但在ES模块中会失败，因为相对导入路径需要使用扩展名。

因此，它将不得不重写以使用`foo.ts`的*输出*的扩展名-因此，`bar.ts`将不得不从`./foo.js`导入。

```ts
// ./bar.ts
import { helper } from "./foo.js"; // works in ESM & CJS

helper();
```

这可能一开始会有点繁琐，但像自动导入和路径补全这样的 TypeScript 工具通常会自动为您完成这些操作。

另一个需要提到的事情是这也适用于 `.d.ts` 文件。当 TypeScript 在一个包中找到一个 `.d.ts` 文件时，它是作为 ESM 或 CommonJS 文件处理还是基于包含该文件的包来决定的。

### 新文件扩展名

`package.json` 中的 `type` 字段很好用，因为它允许我们继续使用 `.ts` 和 `.js` 文件扩展名，这很方便。但是，您偶尔需要编写与 `type` 指定的不同的文件。您也可能更喜欢始终明确地指定。

Node.js 支持两个扩展名来帮助处理这个问题：`.mjs` 和 `.cjs`。`.mjs` 文件始终是 ES 模块，`.cjs` 文件始终是 CommonJS 模块，并且没有办法覆盖这些设置。

另外，TypeScript 还支持两个新的源文件扩展名：`.mts` 和 `.cts`。当 TypeScript 将这些文件编译为 JavaScript 文件时，它们将分别编译为 `.mjs` 和 `.cjs`。

此外，TypeScript 还支持两个新的声明文件扩展名：`.d.mts` 和 `.d.cts`。当 TypeScript 为 `.mts` 和 `.cts` 生成声明文件时，它们对应的扩展名将是 `.d.mts` 和 `.d.cts`。

使用这些扩展名是完全可选的，但即使您选择不将它们作为主要工作流程的一部分使用，它们通常也会很有用。

### CommonJS 互操作性

Node.js 允许 ES 模块导入 CommonJS 模块，就像它们是带有默认导出的 ES 模块一样。

```ts twoslash
// @module: nodenext
// @filename: helper.cts
export function helper() {
    console.log("hello world!");
}

// @filename: index.mts
import foo from "./helper.cjs";

// 输出 "hello world!"
foo.helper();
```

在某些情况下，Node.js 还从 CommonJS 模块中合成命名导出，这可能更方便。在这些情况下，ES 模块可以使用“命名空间式”导入（即 `import * as foo from "..."`），或使用命名导入（即 `import { helper } from "..."`）。

```ts twoslash
// @module: nodenext
// @filename: helper.cts
export function helper() {
    console.log("hello world!");
}

// @filename: index.mts
import { helper } from "./helper.cjs";

// 输出 "hello world!"
helper();
```


TypeScript并不总是能够知道这些命名导入是否会被合成，但当从绝对是一个CommonJS模块的文件导入时，TypeScript会出于容错考虑并使用一些启发式方法。

关于交互操作，有一个TypeScript特定的语法如下所示：

```ts
import foo = require("foo");
```

在一个CommonJS模块中，这只是一个`require()`调用，而在ES模块中，它导入[`createRequire`](https://nodejs.org/api/module.html#module_module_createrequire_filename) 来实现同样的功能。这将使代码在不支持`require()`的运行时，如浏览器中，不太可移植，但通常用于交互操作。因此，您可以使用以下语法编写上面的示例：

```ts twoslash
// @module: nodenext
// @filename: helper.cts
export function helper() {
    console.log("hello world!");
}

// @filename: index.mts
import foo = require("./foo.cjs");

foo.helper()
```

最后，值得注意的是，从CJS模块中导入ESM文件的唯一方法是使用动态的`import()`调用。这可能会带来一些挑战，但是这是Node.js的行为。

您可以[在此处阅读有关Node.js中ESM / CommonJS交互操作的更多信息](https://nodejs.org/api/esm.html#esm_interoperability_with_commonjs)。

### `package.json` 中的导出、导入和自引用

Node.js 支持在 `package.json` 中定义入口点的新字段，称为 `"exports"`。该字段是定义 `package.json` 中 `"main"` 的更强大的替代方案，可以控制向使用者公开包的哪些部分。

以下是一个支持 CommonJS 和 ESM 分别设置入口点的 `package.json` 示例：

```json5
// package.json
{
    "name": "my-package",
    "type": "module",
    "exports": {
        ".": {
            // 在 ESM 中 `import "my-package"` 的入口点
            "import": "./esm/index.js",

            // 在 CJS 中 `require("my-package")` 的入口点
            "require": "./commonjs/index.cjs",
        },
    },

    // 为旧版本的 Node.js 提供 CJS 的后备
    "main": "./commonjs/index.cjs",
}
```

这个功能很强大，您可以在 [Node.js 文档中阅读更多内容](https://nodejs.org/api/packages.html)。在此，我们将着重介绍 TypeScript 如何支持它。

在 TypeScript 的原始 Node 支持中，它会查找 `"main"` 字段，然后查找与该入口对应的声明文件。例如，如果 `"main"` 指向 `./lib/index.js`，TypeScript 会查找名为 `./lib/index.d.ts` 的文件。包的作者可以通过指定单独的字段 `"types"` 来覆盖此行为（例如 `"types": "./types/index.d.ts"`）。

新的支持使用 [导入条件](https://nodejs.org/api/packages.html) 类似地工作。默认情况下，TypeScript 使用相同的导入条件规则 - 如果您从一个 ESM 模块导入，它会查找 `import` 字段，如果您从一个 CommonJS 模块导入，则会查找 `require` 字段。如果找到它们，它将查找相应的声明文件。如果您需要指向不同位置的类型声明，则可以添加 `"types"` 导入条件。


```json5
// package.json
{
    "name": "my-package",
    "type": "module",
    "exports": {
        ".": {
            // Entry-point for `import "my-package"` in ESM
            "import": {
                // Where TypeScript will look.
                "types": "./types/esm/index.d.ts",

                // Where Node.js will look.
                "default": "./esm/index.js"
            },
            // Entry-point for `require("my-package") in CJS
            "require": {
                // Where TypeScript will look.
                "types": "./types/commonjs/index.d.cts",

                // Where Node.js will look.
                "default": "./commonjs/index.cjs"
            },
        }
    },

    // Fall-back for older versions of TypeScript
    "types": "./types/index.d.ts",

    // CJS fall-back for older versions of Node.js
    "main": "./commonjs/index.cjs"
}
```
> `"types"` 条件应该始终放在 `"exports"` 的第一位。

需要注意的是，CommonJS 入口点和 ES 模块入口点每个都需要自己的声明文件，即使它们之间的内容相同。
每个声明文件都根据其文件扩展名和 `package.json` 中的 `"type"` 字段被解释为 CommonJS 模块或 ES 模块，检测到的模块类型必须与 Node 检测到的相应 JavaScript 文件的模块类型匹配，以确保类型检查的正确性。
尝试使用单个 `.d.ts` 文件为 ES 模块入口点和 CommonJS 入口点同时提供类型信息将导致 TypeScript 认为这两个入口点中只存在一个，从而导致使用该包的用户出现编译器错误。

TypeScript 还以类似的方式支持 `package.json` 中的 `"imports"` 字段（在相应文件旁查找声明文件），并支持 [包自引用](https://nodejs.org/api/packages.html#packages_self_referencing_a_package_using_its_name) 这一特性。这些功能通常不是很复杂，但是被支持。