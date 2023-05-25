import{_ as e,o,c as t,V as c}from"./chunks/framework.ced88878.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{"display":"moduleDetection","oneline":"Control what method is used to detect the whether a JS file is a module."},"headers":[],"relativePath":"zh/tsconfig-reference/options/moduleDetection.md","lastUpdated":1681915487000}'),d={name:"zh/tsconfig-reference/options/moduleDetection.md"},n=c('<p>There are three choices:</p><ul><li><p><code>&quot;auto&quot;</code> (default) - TypeScript will not only look for import and export statements, but it will also check whether the <code>&quot;type&quot;</code> field in a <code>package.json</code> is set to <code>&quot;module&quot;</code> when running with <a href="#module"><code>module</code></a>: <code>nodenext</code> or <code>node16</code>, and check whether the current file is a JSX file when running under <a href="#jsx"><code>jsx</code></a>: <code>react-jsx</code>.</p></li><li><p><code>&quot;legacy&quot;</code> - The same behavior as 4.6 and prior, usings import and export statements to determine whether a file is a module.</p></li><li><p><code>&quot;force&quot;</code> - Ensures that every non-declaration file is treated as a module.</p></li></ul>',2),a=[n];function i(r,s,l,u,h,p){return o(),t("div",null,a)}const f=e(d,[["render",i]]);export{m as __pageData,f as default};
