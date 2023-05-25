import{_ as s,o as a,c as n,V as p}from"./chunks/framework.ced88878.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{"display":"List Files","oneline":"Print all of the files read during the compilation."},"headers":[],"relativePath":"zh/tsconfig-reference/options/listFiles.md","lastUpdated":1681915487000}'),e={name:"zh/tsconfig-reference/options/listFiles.md"},l=p(`<p>Print names of files part of the compilation. This is useful when you are not sure that TypeScript has included a file you expected.</p><p>For example:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#f6f6f4;">example</span></span>
<span class="line"><span style="color:#f6f6f4;">├── index.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">├── package.json</span></span>
<span class="line"><span style="color:#f6f6f4;">└── tsconfig.json</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">example</span></span>
<span class="line"><span style="color:#24292e;">├── index.ts</span></span>
<span class="line"><span style="color:#24292e;">├── package.json</span></span>
<span class="line"><span style="color:#24292e;">└── tsconfig.json</span></span></code></pre></div><p>With:</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F6F6F4;">{</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">compilerOptions</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">listFiles</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">true</span></span>
<span class="line"><span style="color:#F6F6F4;">  }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;compilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;listFiles&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Would echo paths like:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#f6f6f4;">$ npm run tsc</span></span>
<span class="line"><span style="color:#f6f6f4;">path/to/example/node_modules/typescript/lib/lib.d.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">path/to/example/node_modules/typescript/lib/lib.es5.d.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">path/to/example/node_modules/typescript/lib/lib.dom.d.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">path/to/example/node_modules/typescript/lib/lib.webworker.importscripts.d.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">path/to/example/node_modules/typescript/lib/lib.scripthost.d.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">path/to/example/index.ts</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ npm run tsc</span></span>
<span class="line"><span style="color:#24292e;">path/to/example/node_modules/typescript/lib/lib.d.ts</span></span>
<span class="line"><span style="color:#24292e;">path/to/example/node_modules/typescript/lib/lib.es5.d.ts</span></span>
<span class="line"><span style="color:#24292e;">path/to/example/node_modules/typescript/lib/lib.dom.d.ts</span></span>
<span class="line"><span style="color:#24292e;">path/to/example/node_modules/typescript/lib/lib.webworker.importscripts.d.ts</span></span>
<span class="line"><span style="color:#24292e;">path/to/example/node_modules/typescript/lib/lib.scripthost.d.ts</span></span>
<span class="line"><span style="color:#24292e;">path/to/example/index.ts</span></span></code></pre></div><p>Note if using TypeScript 4.2, prefer <a href="#explainFiles"><code>explainFiles</code></a> which offers an explanation of why a file was added too.</p>`,8),o=[l];function t(c,i,r,d,y,f){return a(),n("div",null,o)}const m=s(e,[["render",t]]);export{h as __pageData,m as default};
