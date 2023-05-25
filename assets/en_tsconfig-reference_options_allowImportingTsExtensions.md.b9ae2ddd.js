import{_ as e,o,c as t,V as s}from"./chunks/framework.ced88878.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Allow Importing TS Extensions","oneline":"Allow imports to include TypeScript file extensions."},"headers":[],"relativePath":"en/tsconfig-reference/options/allowImportingTsExtensions.md","lastUpdated":1681915487000}'),n={name:"en/tsconfig-reference/options/allowImportingTsExtensions.md"},i=s("<p><code>--allowImportingTsExtensions</code> allows TypeScript files to import each other with a TypeScript-specific extension like <code>.ts</code>, <code>.mts</code>, or <code>.tsx</code>.</p><p>This flag is only allowed when <code>--noEmit</code> or <code>--emitDeclarationOnly</code> is enabled, since these import paths would not be resolvable at runtime in JavaScript output files. The expectation here is that your resolver (e.g. your bundler, a runtime, or some other tool) is going to make these imports between <code>.ts</code> files work.</p>",2),r=[i];function c(a,l,p,d,_,m){return o(),t("div",null,r)}const T=e(n,[["render",c]]);export{h as __pageData,T as default};
