import{_ as e,o as t,c as i,V as r}from"./chunks/framework.ced88878.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Plugins","oneline":"Specify a list of language service plugins to include."},"headers":[],"relativePath":"zh/tsconfig-reference/options/plugins.md","lastUpdated":1681915487000}'),n={name:"zh/tsconfig-reference/options/plugins.md"},s=r('<p>List of language service plugins to run inside the editor.</p><p>Language service plugins are a way to provide additional information to a user based on existing TypeScript files. They can enhance existing messages between TypeScript and an editor, or to provide their own error messages.</p><p>For example:</p><ul><li><a href="https://github.com/xialvjun/ts-sql-plugin#readme" target="_blank" rel="noreferrer">ts-sql-plugin</a> — Adds SQL linting with a template strings SQL builder.</li><li><a href="https://github.com/Microsoft/typescript-styled-plugin" target="_blank" rel="noreferrer">typescript-styled-plugin</a> — Provides CSS linting inside template strings .</li><li><a href="https://github.com/Quramy/typescript-eslint-language-service" target="_blank" rel="noreferrer">typescript-eslint-language-service</a> — Provides eslint error messaging and fix-its inside the compiler&#39;s output.</li><li><a href="https://github.com/Quramy/ts-graphql-plugin" target="_blank" rel="noreferrer">ts-graphql-plugin</a> — Provides validation and auto-completion inside GraphQL query template strings.</li></ul><p>VS Code has the ability for a extension to <a href="https://code.visualstudio.com/api/references/contribution-points#contributes.typescriptServerPlugins" target="_blank" rel="noreferrer">automatically include language service plugins</a>, and so you may have some running in your editor without needing to define them in your <code>tsconfig.json</code>.</p>',5),a=[s];function o(l,p,c,g,u,d){return t(),i("div",null,a)}const _=e(n,[["render",o]]);export{f as __pageData,_ as default};
