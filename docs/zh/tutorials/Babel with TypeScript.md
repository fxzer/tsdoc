使用Babel和TypeScript

## TypeScript中的Babel和`tsc`的比较

当创建一个现代化的JavaScript项目时，你可能会问自己，将TypeScript文件转换为JavaScript的正确方式是什么？

很多时候，答案是“这取决于情况”，或者“有人可能已经为你做出了决定”，这取决于项目。如果你正在使用像[tsdx](https://tsdx.io)、[Angular](https://angular.io/)、[NestJS](https://nestjs.com/)或[Getting Started](/docs/home)中提到的任何框架构建你的项目，那么这个决定已经为你处理好了。

然而，一个有用的启发式可能是：

- 你的构建输出是否与你的源输入文件大致相同？使用`tsc`
- 你需要一个有多个潜在输出的构建管道？使用`babel`进行转换和`ts`进行类型检查

## 使用Babel进行转换，使用`tsc`进行类型检查

这是一个常见的模式，适用于已经从JavaScript代码库转移到TypeScript的具有现有构建基础设施的项目。

这种技术是一种混合方法，使用Babel的[preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)生成你的JS文件，然后使用TypeScript进行类型检查和`.d.ts`文件生成。

通过使用babel对TypeScript的支持，你可以使用现有的构建管道，并更有可能具有更快的JS发射时间，因为Babel不会对你的代码进行类型检查。

#### 类型检查和d.ts文件生成

使用babel的缺点是，在从TS到JS的转换过程中，你不会得到类型检查。这可能意味着你在编辑器中错过的类型错误可能会在生产代码中出现。

除此之外，Babel无法为你的TypeScript创建`.d.ts`文件，这可能会使与库项目的工作变得更加困难。

为了解决这些问题，你可能需要设置一个命令来使用TSC对你的项目进行类型检查。这可能意味着将一些你的babel配置复制到相应的[`tsconfig.json`](/tsconfig)中，并确保启用了这些标志：

```json tsconfig
"compilerOptions": {
  // 确保tsc创建.d.ts文件，但不创建.js文件
  "declaration": true,
  "emitDeclarationOnly": true,
  // 确保Babel可以安全地转换TypeScript项目中的文件
  "isolatedModules": true
}
```

有关这些标志的更多信息：

- [`isolatedModules`](/tsconfig#isolatedModules)
- [`declaration`](/tsconfig#declaration), [`emitDeclarationOnly`](/tsconfig#emitDeclarationOnly)