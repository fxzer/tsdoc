import{_ as s,o as n,c as a,V as p}from"./chunks/framework.ced88878.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Declaration Dir","oneline":"Specify the output directory for generated declaration files."},"headers":[],"relativePath":"en/tsconfig-reference/options/declarationDir.md","lastUpdated":1681915487000}'),l={name:"en/tsconfig-reference/options/declarationDir.md"},e=p(`<p>Offers a way to configure the root directory for where declaration files are emitted.</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#f6f6f4;">example</span></span>
<span class="line"><span style="color:#f6f6f4;">├── index.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">├── package.json</span></span>
<span class="line"><span style="color:#f6f6f4;">└── tsconfig.json</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">example</span></span>
<span class="line"><span style="color:#24292e;">├── index.ts</span></span>
<span class="line"><span style="color:#24292e;">├── package.json</span></span>
<span class="line"><span style="color:#24292e;">└── tsconfig.json</span></span></code></pre></div><p>with this <code>tsconfig.json</code>:</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F6F6F4;">{</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">compilerOptions</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">declaration</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">true</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">declarationDir</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">./types</span><span style="color:#DEE492;">&quot;</span></span>
<span class="line"><span style="color:#F6F6F4;">  }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;compilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;declaration&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;declarationDir&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;./types&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Would place the d.ts for the <code>index.ts</code> in a <code>types</code> folder:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#f6f6f4;">example</span></span>
<span class="line"><span style="color:#f6f6f4;">├── index.js</span></span>
<span class="line"><span style="color:#f6f6f4;">├── index.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">├── package.json</span></span>
<span class="line"><span style="color:#f6f6f4;">├── tsconfig.json</span></span>
<span class="line"><span style="color:#f6f6f4;">└── types</span></span>
<span class="line"><span style="color:#f6f6f4;">    └── index.d.ts</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">example</span></span>
<span class="line"><span style="color:#24292e;">├── index.js</span></span>
<span class="line"><span style="color:#24292e;">├── index.ts</span></span>
<span class="line"><span style="color:#24292e;">├── package.json</span></span>
<span class="line"><span style="color:#24292e;">├── tsconfig.json</span></span>
<span class="line"><span style="color:#24292e;">└── types</span></span>
<span class="line"><span style="color:#24292e;">    └── index.d.ts</span></span></code></pre></div>`,6),o=[e];function t(c,r,i,d,y,f){return n(),a("div",null,o)}const g=s(l,[["render",t]]);export{u as __pageData,g as default};
