import{_ as e,o as t,c as s,V as a}from"./chunks/framework.ced88878.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/handbooks/handbook-v2/Type Manipulation/_Creating Types from Types.md","lastUpdated":1682670826000}'),o={name:"en/handbooks/handbook-v2/Type Manipulation/_Creating Types from Types.md"},p=a('<p>TypeScript&#39;s type system is very powerful because it allows expressing types <em>in terms of other types</em>.</p><p>The simplest form of this idea is generics, we actually have a wide variety of <em>type operators</em> available to use. It&#39;s also possible to express types in terms of <em>values</em> that we already have.</p><p>By combining various type operators, we can express complex operations and values in a succinct, maintainable way. In this section we&#39;ll cover ways to express a new type in terms of an existing type or value.</p><ul><li><a href="/tsdoc-vitepress/docs/handbook/2/generics.html">Generics</a> - Types which take parameters</li><li><a href="/tsdoc-vitepress/docs/handbook/2/keyof-types.html">Keyof Type Operator</a> - Using the <code>keyof</code> operator to create new types</li><li><a href="/tsdoc-vitepress/docs/handbook/2/typeof-types.html">Typeof Type Operator</a> - Using the <code>typeof</code> operator to create new types</li><li><a href="/tsdoc-vitepress/docs/handbook/2/indexed-access-types.html">Indexed Access Types</a> - Using <code>Type[&#39;a&#39;]</code> syntax to access a subset of a type</li><li><a href="/tsdoc-vitepress/docs/handbook/2/conditional-types.html">Conditional Types</a> - Types which act like if statements in the type system</li><li><a href="/tsdoc-vitepress/docs/handbook/2/mapped-types.html">Mapped Types</a> - Creating types by mapping each property in an existing type</li><li><a href="/tsdoc-vitepress/docs/handbook/2/template-literal-types.html">Template Literal Types</a> - Mapped types which change properties via template literal strings</li></ul>',4),i=[p];function r(n,c,l,d,y,h){return t(),s("div",null,i)}const f=e(o,[["render",r]]);export{_ as __pageData,f as default};
