import{_ as s,o as n,c as a,V as o}from"./chunks/framework.ced88878.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Exclude","oneline":"Specify a list of modules which to exclude from type acquisition."},"headers":[],"relativePath":"en/tsconfig-reference/options/typeAcquisition/exclude.md","lastUpdated":1681915487000}'),e={name:"en/tsconfig-reference/options/typeAcquisition/exclude.md"},p=o(`<p>Offers a config for disabling the type-acquisition for a certain module in JavaScript projects. This can be useful for projects which include other libraries in testing infrastructure which aren&#39;t needed in the main application.</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F6F6F4;">{</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">typeAcquisition</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">exclude</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> [</span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">jest</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">, </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">mocha</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">]</span></span>
<span class="line"><span style="color:#F6F6F4;">  }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;typeAcquisition&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">&quot;exclude&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;jest&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;mocha&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,2),l=[p];function t(c,r,i,u,y,d){return n(),a("div",null,l)}const _=s(e,[["render",t]]);export{E as __pageData,_ as default};
