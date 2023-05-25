import{_ as s,o as n,c as a,V as o}from"./chunks/framework.ced88878.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zh/tsconfig-reference/options/typeAcquisition/include.md","lastUpdated":1682672128000}'),e={name:"zh/tsconfig-reference/options/typeAcquisition/include.md"},p=o(`<p>如果您有一个 JavaScript 项目，其中 TypeScript 需要额外的指导来理解全局依赖关系，或者通过 <a href="#disableFilenameBasedTypeAcquisition"><code>disableFilenameBasedTypeAcquisition</code></a> 禁用了内置推理。 您可以使用 <code>include</code> 来指定应该使用 DefinitelyTyped 中的哪些类型：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F6F6F4;">{</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">typeAcquisition</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">include</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> [</span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">jquery</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">]</span></span>
<span class="line"><span style="color:#F6F6F4;">  }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;typeAcquisition&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;include&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;jquery&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,2),l=[p];function t(c,i,r,y,d,u){return n(),a("div",null,l)}const E=s(e,[["render",t]]);export{_ as __pageData,E as default};
