import{_ as s,o,c as n,V as a}from"./chunks/framework.ced88878.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Inline Sources","oneline":"Include source code in the sourcemaps inside the emitted JavaScript."},"headers":[],"relativePath":"zh/tsconfig-reference/options/inlineSources.md","lastUpdated":1682921420000}'),e={name:"zh/tsconfig-reference/options/inlineSources.md"},l=a(`<p>When set, TypeScript will include the original content of the <code>.ts</code> file as an embedded string in the source map (using the source map&#39;s <code>sourcesContent</code> property). This is often useful in the same cases as <a href="#inlineSourceMap"><code>inlineSourceMap</code></a>.</p><p>Requires either <a href="#sourceMap"><code>sourceMap</code></a> or <a href="#inlineSourceMap"><code>inlineSourceMap</code></a> to be set.</p><p>For example, with this TypeScript:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> helloWorld </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">hi</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(helloWorld);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">helloWorld</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hi&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(helloWorld);</span></span></code></pre></div><p>By default converts to this JavaScript:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> helloWorld </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">hi</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(helloWorld);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">helloWorld</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hi&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(helloWorld);</span></span></code></pre></div><p>Then enable building it with <code>inlineSources</code> and <a href="#inlineSourceMap"><code>inlineSourceMap</code></a> enabled there is a comment at the bottom of the file which includes a source-map for the file. Note that the end is different from the example in <a href="#inlineSourceMap"><code>inlineSourceMap</code></a> because the source-map now contains the original source code also.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @inlineSources</span></span>
<span class="line"><span style="color:#7B7F8B;">// @inlineSourceMap</span></span>
<span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> helloWorld </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">hi</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(helloWorld);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @inlineSources</span></span>
<span class="line"><span style="color:#6A737D;">// @inlineSourceMap</span></span>
<span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">helloWorld</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hi&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(helloWorld);</span></span></code></pre></div>`,8),p=[l];function c(t,r,i,d,y,h){return o(),n("div",null,p)}const E=s(e,[["render",c]]);export{F as __pageData,E as default};
