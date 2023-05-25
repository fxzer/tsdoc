import{_ as e,o as t,c as o,V as i}from"./chunks/framework.ced88878.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Skip Lib Check","oneline":"Skip type checking all .d.ts files."},"headers":[],"relativePath":"zh/tsconfig-reference/options/skipLibCheck.md","lastUpdated":1681915487000}'),s={name:"zh/tsconfig-reference/options/skipLibCheck.md"},n=i('<p>Skip type checking of declaration files.</p><p>This can save time during compilation at the expense of type-system accuracy. For example, two libraries could define two copies of the same <code>type</code> in an inconsistent way. Rather than doing a full check of all <code>d.ts</code> files, TypeScript will type check the code you specifically refer to in your app&#39;s source code.</p><p>A common case where you might think to use <code>skipLibCheck</code> is when there are two copies of a library&#39;s types in your <code>node_modules</code>. In these cases, you should consider using a feature like <a href="https://yarnpkg.com/lang/en/docs/selective-version-resolutions/" target="_blank" rel="noreferrer">yarn&#39;s resolutions</a> to ensure there is only one copy of that dependency in your tree or investigate how to ensure there is only one copy by understanding the dependency resolution to fix the issue without additional tooling.</p><p>Another possibility is when you are migrating between TypeScript releases and the changes cause breakages in node_modules and the JS standard libraries which you do not want to deal with during the TypeScript update.</p><p>Note, that if these issues come from the TypeScript standard library you can replace the library using <a href="https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#supporting-lib-from-node_modules" target="_blank" rel="noreferrer">TypeScript 4.5&#39;s lib replacement</a> technique.</p>',5),r=[n];function a(c,p,d,l,h,u){return t(),o("div",null,r)}const _=e(s,[["render",a]]);export{f as __pageData,_ as default};
