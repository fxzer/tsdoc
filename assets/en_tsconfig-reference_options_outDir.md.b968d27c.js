import{_ as s,o as n,c as a,V as p}from"./chunks/framework.ced88878.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Out Dir","oneline":"Specify an output folder for all emitted files."},"headers":[],"relativePath":"en/tsconfig-reference/options/outDir.md","lastUpdated":1681915487000}'),l={name:"en/tsconfig-reference/options/outDir.md"},o=p(`<p>If specified, <code>.js</code> (as well as <code>.d.ts</code>, <code>.js.map</code>, etc.) files will be emitted into this directory. The directory structure of the original source files is preserved; see <a href="#rootDir"><code>rootDir</code></a> if the computed root is not what you intended.</p><p>If not specified, <code>.js</code> files will be emitted in the same directory as the <code>.ts</code> files they were generated from:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">tsc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F6F6F4;">example</span></span>
<span class="line"><span style="color:#F6F6F4;">├── </span><span style="color:#E7EE98;">index.js</span></span>
<span class="line"><span style="color:#F6F6F4;">└── </span><span style="color:#E7EE98;">index.ts</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tsc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">example</span></span>
<span class="line"><span style="color:#6F42C1;">├──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.js</span></span>
<span class="line"><span style="color:#6F42C1;">└──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.ts</span></span></code></pre></div><p>With a <code>tsconfig.json</code> like this:</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F6F6F4;">{</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">compilerOptions</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">outDir</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">dist</span><span style="color:#DEE492;">&quot;</span></span>
<span class="line"><span style="color:#F6F6F4;">  }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;compilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;outDir&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;dist&quot;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Running <code>tsc</code> with these settings moves the files into the specified <code>dist</code> folder:</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">tsc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F6F6F4;">example</span></span>
<span class="line"><span style="color:#F6F6F4;">├── </span><span style="color:#E7EE98;">dist</span></span>
<span class="line"><span style="color:#F6F6F4;">│   </span><span style="color:#E7EE98;">└──</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">index.js</span></span>
<span class="line"><span style="color:#F6F6F4;">├── </span><span style="color:#E7EE98;">index.ts</span></span>
<span class="line"><span style="color:#F6F6F4;">└── </span><span style="color:#E7EE98;">tsconfig.json</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tsc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">example</span></span>
<span class="line"><span style="color:#6F42C1;">├──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">dist</span></span>
<span class="line"><span style="color:#6F42C1;">│</span><span style="color:#24292E;">   </span><span style="color:#032F62;">└──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.js</span></span>
<span class="line"><span style="color:#6F42C1;">├──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">index.ts</span></span>
<span class="line"><span style="color:#6F42C1;">└──</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tsconfig.json</span></span></code></pre></div>`,7),e=[o];function t(c,r,i,d,y,F){return n(),a("div",null,e)}const h=s(l,[["render",t]]);export{u as __pageData,h as default};
