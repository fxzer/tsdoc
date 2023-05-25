import{_ as s,o,c as n,V as l}from"./chunks/framework.ced88878.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Inline Source Map","oneline":"Include sourcemap files inside the emitted JavaScript."},"headers":[],"relativePath":"en/tsconfig-reference/options/inlineSourceMap.md","lastUpdated":1682921420000}'),a={name:"en/tsconfig-reference/options/inlineSourceMap.md"},e=l(`<p>When set, instead of writing out a <code>.js.map</code> file to provide source maps, TypeScript will embed the source map content in the <code>.js</code> files. Although this results in larger JS files, it can be convenient in some scenarios. For example, you might want to debug JS files on a webserver that doesn&#39;t allow <code>.map</code> files to be served.</p><p>Mutually exclusive with <a href="#sourceMap"><code>sourceMap</code></a>.</p><p>For example, with this TypeScript:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> helloWorld </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">hi</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(helloWorld);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">helloWorld</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hi&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(helloWorld);</span></span></code></pre></div><p>Converts to this JavaScript:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> helloWorld </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">hi</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(helloWorld);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">helloWorld</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hi&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(helloWorld);</span></span></code></pre></div><p>Then enable building it with <code>inlineSourceMap</code> enabled there is a comment at the bottom of the file which includes a source-map for the file.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @inlineSourceMap</span></span>
<span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> helloWorld </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">hi</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(helloWorld);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @inlineSourceMap</span></span>
<span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">helloWorld</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hi&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(helloWorld);</span></span></code></pre></div>`,8),p=[e];function t(c,r,i,y,d,h){return o(),n("div",null,p)}const E=s(a,[["render",t]]);export{u as __pageData,E as default};
