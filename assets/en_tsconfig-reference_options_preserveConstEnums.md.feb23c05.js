import{_ as s,o as n,c as a,V as l}from"./chunks/framework.ced88878.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Preserve Const Enums","oneline":"Disable erasing `const enum` declarations in generated code."},"headers":[],"relativePath":"en/tsconfig-reference/options/preserveConstEnums.md","lastUpdated":1682921420000}'),o={name:"en/tsconfig-reference/options/preserveConstEnums.md"},p=l(`<p>Do not erase <code>const enum</code> declarations in generated code. <code>const enum</code>s provide a way to reduce the overall memory footprint of your application at runtime by emitting the enum value instead of a reference.</p><p>For example with this TypeScript:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">enum</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Album</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  JimmyEatWorldFutures </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">1</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">  TubRingZooHypothesis </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">2</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">  DogFashionDiscoAdultery </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">3</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> selectedAlbum </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> Album.JimmyEatWorldFutures;</span></span>
<span class="line"><span style="color:#F286C4;">if</span><span style="color:#F6F6F4;"> (selectedAlbum </span><span style="color:#F286C4;">===</span><span style="color:#F6F6F4;"> Album.JimmyEatWorldFutures) {</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(</span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">That is a great choice.</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">);</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Album</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">JimmyEatWorldFutures</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">TubRingZooHypothesis</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">DogFashionDiscoAdultery</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">selectedAlbum</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Album.JimmyEatWorldFutures;</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (selectedAlbum </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> Album.JimmyEatWorldFutures) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;That is a great choice.&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>The default <code>const enum</code> behavior is to convert any <code>Album.Something</code> to the corresponding number literal, and to remove a reference to the enum from the JavaScript completely.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">enum</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Album</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  JimmyEatWorldFutures </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">1</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">  TubRingZooHypothesis </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">2</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">  DogFashionDiscoAdultery </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">3</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> selectedAlbum </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> Album.JimmyEatWorldFutures;</span></span>
<span class="line"><span style="color:#F286C4;">if</span><span style="color:#F6F6F4;"> (selectedAlbum </span><span style="color:#F286C4;">===</span><span style="color:#F6F6F4;"> Album.JimmyEatWorldFutures) {</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(</span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">That is a great choice.</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">);</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Album</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">JimmyEatWorldFutures</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">TubRingZooHypothesis</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">DogFashionDiscoAdultery</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">selectedAlbum</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Album.JimmyEatWorldFutures;</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (selectedAlbum </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> Album.JimmyEatWorldFutures) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;That is a great choice.&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>With <code>preserveConstEnums</code> set to <code>true</code>, the <code>enum</code> exists at runtime and the numbers are still emitted.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @preserveConstEnums: true</span></span>
<span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">enum</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Album</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  JimmyEatWorldFutures </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">1</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">  TubRingZooHypothesis </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">2</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">  DogFashionDiscoAdultery </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">3</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> selectedAlbum </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> Album.JimmyEatWorldFutures;</span></span>
<span class="line"><span style="color:#F286C4;">if</span><span style="color:#F6F6F4;"> (selectedAlbum </span><span style="color:#F286C4;">===</span><span style="color:#F6F6F4;"> Album.JimmyEatWorldFutures) {</span></span>
<span class="line"><span style="color:#F6F6F4;">  console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(</span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">That is a great choice.</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">);</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @preserveConstEnums: true</span></span>
<span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Album</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">JimmyEatWorldFutures</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">TubRingZooHypothesis</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">DogFashionDiscoAdultery</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">selectedAlbum</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Album.JimmyEatWorldFutures;</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (selectedAlbum </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> Album.JimmyEatWorldFutures) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;That is a great choice.&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>This essentially makes such <code>const enums</code> a source-code feature only, with no runtime traces.</p>`,8),e=[p];function t(c,r,y,F,i,E){return n(),a("div",null,e)}const m=s(o,[["render",t]]);export{d as __pageData,m as default};
