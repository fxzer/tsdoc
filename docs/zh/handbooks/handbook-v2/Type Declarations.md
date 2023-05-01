
在你目前阅读的所有部分中，我们一直在使用所有 JavaScript 运行时中存在的内置函数来演示基本的 TypeScript 概念。
然而，如今几乎所有 JavaScript 都包含许多库来完成常见任务。
为你的应用程序中_不是_你的代码的部分设置类型将极大地改善你的 TypeScript 体验。
这些类型从何而来？
## 什么是类型声明？
假设你写了一些这样的代码：
```ts 
// @errors: 2339
const k = Math.max(5, 6);
const j = Math.mix(7, 8);
```
即使 `Math` 的实现不是您的代码的一部分，TypeScript 是如何知道存在 `max` 而不是 `mix` 的？

答案是有描述这些内置对象的 _声明文件_。
声明文件提供了一种方法来 _声明_ 某些类型或值的存在，而无需实际提供这些值的实现。

## `.d.ts` 声明文件
TypeScript 有两种主要的文件。
`.ts` 文件是包含类型和可执行代码的 _实现_ 文件。
这些是产生 `.js` 输出的文件，也是您通常编写代码的地方。

`.d.ts` 文件只包含类型信息的 **声明** 文件。
这些文件不会产生 .js 输出； 它们仅用于类型检查。
稍后我们将详细了解如何编写自己的声明文件。
## 内置类型定义
TypeScript 包含 JavaScript 运行时中可用的所有标准化内置 API 的声明文件。
这包括诸如`string`或`function`等内置类型的方法和属性、`Math`和`Object`等顶级名称及其相关类型。
默认情况下，TypeScript 还包括在浏览器中运行时可用的类型，例如`window`和`document`； 这些统称为 DOM API。

TypeScript 使用 `lib.[something].d.ts` 模式命名这些声明文件。
如果您导航到具有该名称的文件，您可以知道您正在处理平台的某些内置部分，而不是用户代码。
### `target`设置

您可以使用的方法、属性和函数实际上根据运行代码的 JavaScript 的 _版本_ 而有所不同。
例如，字符串的 startsWith 方法仅适用于称为 _ECMAScript 6_ 的 JavaScript 版本。

了解您的代码最终运行的 JavaScript 版本很重要，因为您不想使用来自比您部署到的平台更新版本的 API。
 有关详细信息，请参阅  tsconfig  文档页面。

TypeScript 通过根据您的 `target` 设置改变默认包含哪些  `lib`  文件来帮助解决这个问题。
例如，如果 `target`  是 ES5，您在尝试使用 `startsWith`  方法时会看到错误，因为该方法仅在 ES6 或更高版本中可用。
### `lib` 设置

 `lib` 设置允许更细粒度地控制哪些内置声明文件被认为在您的程序中可用。
有关详细信息，请参阅  tsconfig  文档页面。
## 额外声明

对于非内置 API，您可以通过多种方式获取声明文件。
你如何做到这一点取决于你为哪个库获取类型。
### 捆绑类型

如果您使用的库作为 npm 包发布，它可能已经包含类型声明文件作为其分发的一部分。
您可以阅读项目的文档来找出答案，或者只是尝试导入包并查看 TypeScript 是否能够自动为您解析类型。

如果您是考虑将类型定义与您的包捆绑在一起的包作者，您可以阅读我们关于 捆绑类型定义 。
### 确定类型 / `@types`

[DefinitelyTyped 存储库](https://github.com/DefinitelyTyped/DefinitelyTyped/) 是一个集中式存储库，用于存储数千个库的声明文件。
绝大多数常用库在 DefinitelyTyped 上都有可用的声明文件。

DefinitelyTyped 上的定义也会自动发布到 `@types` 范围内的 npm。
类型包的名称始终与底层包本身的名称相同。
例如，如果你安装了 `react` npm 包，你可以通过运行来安装它对应的类型
```sh
npm install --save-dev @types/react
```
TypeScript 会自动在 `node_modules/@types` 下查找类型定义，因此无需其他步骤即可在您的程序中使用这些类型。
### 自定义声明文件

在库没有捆绑自己的类型并且没有关于 DefinitelyTyped 的定义的罕见情况下，您可以自己编写一个声明文件。
有关指南，请参阅附录  **声明文件** 编写 

如果您想在不编写声明文件的情况下消除有关特定模块的警告，您还可以通过在项目的 .d.ts 文件中放置一个空声明来快速将该模块声明为类型 any 。
例如，如果你想使用一个名为“some-untyped-module”但没有定义的模块，你可以这样写：
```ts 
declare module "some-untyped-module";
```
