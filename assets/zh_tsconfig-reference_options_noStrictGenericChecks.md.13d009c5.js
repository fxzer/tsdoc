import{_ as s,o as n,c as a,V as l}from"./chunks/framework.ced88878.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{"display":"No Strict Generic Checks","oneline":"Disable strict checking of generic signatures in function types."},"headers":[],"relativePath":"zh/tsconfig-reference/options/noStrictGenericChecks.md","lastUpdated":1682921420000}'),o={name:"zh/tsconfig-reference/options/noStrictGenericChecks.md"},p=l(`<p>TypeScript will unify type parameters when comparing two generic functions.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @errors: 2322</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">type</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">A</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> &lt;</span><span style="color:#FFB86C;font-style:italic;">T</span><span style="color:#F6F6F4;">, </span><span style="color:#FFB86C;font-style:italic;">U</span><span style="color:#F6F6F4;">&gt;(</span><span style="color:#FFB86C;font-style:italic;">x</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">T</span><span style="color:#F6F6F4;">, </span><span style="color:#FFB86C;font-style:italic;">y</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">U</span><span style="color:#F6F6F4;">) </span><span style="color:#F286C4;">=&gt;</span><span style="color:#F6F6F4;"> [</span><span style="color:#97E1F1;font-style:italic;">T</span><span style="color:#F6F6F4;">, </span><span style="color:#97E1F1;font-style:italic;">U</span><span style="color:#F6F6F4;">];</span></span>
<span class="line"><span style="color:#F286C4;">type</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">B</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> &lt;</span><span style="color:#FFB86C;font-style:italic;">S</span><span style="color:#F6F6F4;">&gt;(</span><span style="color:#FFB86C;font-style:italic;">x</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">S</span><span style="color:#F6F6F4;">, </span><span style="color:#FFB86C;font-style:italic;">y</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">S</span><span style="color:#F6F6F4;">) </span><span style="color:#F286C4;">=&gt;</span><span style="color:#F6F6F4;"> [</span><span style="color:#97E1F1;font-style:italic;">S</span><span style="color:#F6F6F4;">, </span><span style="color:#97E1F1;font-style:italic;">S</span><span style="color:#F6F6F4;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">function</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">f</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">a</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">A</span><span style="color:#F6F6F4;">, </span><span style="color:#FFB86C;font-style:italic;">b</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">B</span><span style="color:#F6F6F4;">) {</span></span>
<span class="line"><span style="color:#F6F6F4;">  b </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> a; </span><span style="color:#7B7F8B;">// Ok</span></span>
<span class="line"><span style="color:#F6F6F4;">  a </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> b; </span><span style="color:#7B7F8B;">// Error</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @errors: 2322</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">A</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> &lt;</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">U</span><span style="color:#24292E;">&gt;(</span><span style="color:#E36209;">x</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">, </span><span style="color:#E36209;">y</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">U</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> [</span><span style="color:#6F42C1;">T</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">U</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">B</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> &lt;</span><span style="color:#6F42C1;">S</span><span style="color:#24292E;">&gt;(</span><span style="color:#E36209;">x</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">S</span><span style="color:#24292E;">, </span><span style="color:#E36209;">y</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">S</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> [</span><span style="color:#6F42C1;">S</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">S</span><span style="color:#24292E;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">f</span><span style="color:#24292E;">(</span><span style="color:#E36209;">a</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">A</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">B</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> a; </span><span style="color:#6A737D;">// Ok</span></span>
<span class="line"><span style="color:#24292E;">  a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> b; </span><span style="color:#6A737D;">// Error</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>This flag can be used to remove that check.</p>`,3),t=[p];function e(c,r,y,F,i,E){return n(),a("div",null,t)}const d=s(o,[["render",e]]);export{f as __pageData,d as default};
