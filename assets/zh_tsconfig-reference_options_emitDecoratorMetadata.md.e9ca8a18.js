import{_ as s,o as n,c as a,V as l}from"./chunks/framework.ced88878.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Emit Decorator Metadata","oneline":"Emit design-type metadata for decorated declarations in source files."},"headers":[],"relativePath":"zh/tsconfig-reference/options/emitDecoratorMetadata.md","lastUpdated":1682921420000}'),o={name:"zh/tsconfig-reference/options/emitDecoratorMetadata.md"},p=l(`<p>Enables experimental support for emitting type metadata for decorators which works with the module <a href="https://www.npmjs.com/package/reflect-metadata" target="_blank" rel="noreferrer"><code>reflect-metadata</code></a>.</p><p>For example, here is the TypeScript</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @experimentalDecorators</span></span>
<span class="line"><span style="color:#F286C4;">function</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">LogMethod</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">target</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">any</span><span style="color:#F6F6F4;">, </span><span style="color:#FFB86C;font-style:italic;">propertyKey</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">|</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">symbol</span><span style="color:#F6F6F4;">, </span><span style="color:#FFB86C;font-style:italic;">descriptor</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">PropertyDescriptor</span><span style="color:#F6F6F4;">) {</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(target);</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(propertyKey);</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(descriptor);</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">class</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;">Demo</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  @</span><span style="color:#62E884;font-style:italic;">LogMethod</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#F286C4;">public</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">foo</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">bar</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">) {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#7B7F8B;">// do nothing</span></span>
<span class="line"><span style="color:#F6F6F4;">  }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> demo </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;font-weight:bold;">new</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">Demo</span><span style="color:#F6F6F4;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @experimentalDecorators</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LogMethod</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">, </span><span style="color:#E36209;">propertyKey</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">symbol</span><span style="color:#24292E;">, </span><span style="color:#E36209;">descriptor</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PropertyDescriptor</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(target);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(propertyKey);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(descriptor);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Demo</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  @LogMethod</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">(</span><span style="color:#E36209;">bar</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// do nothing</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">demo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Demo</span><span style="color:#24292E;">();</span></span></code></pre></div><p>With <code>emitDecoratorMetadata</code> not set to true (default) the emitted JavaScript is:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @experimentalDecorators</span></span>
<span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#F286C4;">function</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">LogMethod</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">target</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">any</span><span style="color:#F6F6F4;">, </span><span style="color:#FFB86C;font-style:italic;">propertyKey</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">|</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">symbol</span><span style="color:#F6F6F4;">, </span><span style="color:#FFB86C;font-style:italic;">descriptor</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">PropertyDescriptor</span><span style="color:#F6F6F4;">) {</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(target);</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(propertyKey);</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(descriptor);</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">class</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;">Demo</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  @</span><span style="color:#62E884;font-style:italic;">LogMethod</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#F286C4;">public</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">foo</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">bar</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">) {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#7B7F8B;">// do nothing</span></span>
<span class="line"><span style="color:#F6F6F4;">  }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> demo </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;font-weight:bold;">new</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">Demo</span><span style="color:#F6F6F4;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @experimentalDecorators</span></span>
<span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LogMethod</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">, </span><span style="color:#E36209;">propertyKey</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">symbol</span><span style="color:#24292E;">, </span><span style="color:#E36209;">descriptor</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PropertyDescriptor</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(target);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(propertyKey);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(descriptor);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Demo</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  @LogMethod</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">(</span><span style="color:#E36209;">bar</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// do nothing</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">demo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Demo</span><span style="color:#24292E;">();</span></span></code></pre></div><p>With <code>emitDecoratorMetadata</code> set to true the emitted JavaScript is:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @experimentalDecorators</span></span>
<span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#7B7F8B;">// @emitDecoratorMetadata</span></span>
<span class="line"><span style="color:#F286C4;">function</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">LogMethod</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">target</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">any</span><span style="color:#F6F6F4;">, </span><span style="color:#FFB86C;font-style:italic;">propertyKey</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">|</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">symbol</span><span style="color:#F6F6F4;">, </span><span style="color:#FFB86C;font-style:italic;">descriptor</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">PropertyDescriptor</span><span style="color:#F6F6F4;">) {</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(target);</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(propertyKey);</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(descriptor);</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">class</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;">Demo</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  @</span><span style="color:#62E884;font-style:italic;">LogMethod</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#F286C4;">public</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">foo</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">bar</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">) {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#7B7F8B;">// do nothing</span></span>
<span class="line"><span style="color:#F6F6F4;">  }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> demo </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;font-weight:bold;">new</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">Demo</span><span style="color:#F6F6F4;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @experimentalDecorators</span></span>
<span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#6A737D;">// @emitDecoratorMetadata</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LogMethod</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">, </span><span style="color:#E36209;">propertyKey</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">symbol</span><span style="color:#24292E;">, </span><span style="color:#E36209;">descriptor</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PropertyDescriptor</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(target);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(propertyKey);</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(descriptor);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Demo</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  @LogMethod</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">(</span><span style="color:#E36209;">bar</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// do nothing</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">demo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Demo</span><span style="color:#24292E;">();</span></span></code></pre></div>`,7),e=[p];function t(c,r,y,F,i,E){return n(),a("div",null,e)}const g=s(o,[["render",t]]);export{C as __pageData,g as default};
