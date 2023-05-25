import{_ as s,o as n,c as a,V as l}from"./chunks/framework.ced88878.js";const m=JSON.parse('{"title":"global-modifying-module.d.ts","description":"","frontmatter":{},"headers":[],"relativePath":"en/declaration-files/templates/global-modifying-module.md","lastUpdated":1682670826000}'),o={name:"en/declaration-files/templates/global-modifying-module.md"},e=l(`<h1 id="global-modifying-module-d-ts" tabindex="-1">global-modifying-module.d.ts <a class="header-anchor" href="#global-modifying-module-d-ts" aria-label="Permalink to &quot;global-modifying-module.d.ts&quot;">​</a></h1><h2 id="global-modifying-modules" tabindex="-1"><em>Global-modifying Modules</em> <a class="header-anchor" href="#global-modifying-modules" aria-label="Permalink to &quot;_Global-modifying Modules_&quot;">​</a></h2><p>A <em>global-modifying module</em> alters existing values in the global scope when they are imported. For example, there might exist a library which adds new members to <code>String.prototype</code> when imported. This pattern is somewhat dangerous due to the possibility of runtime conflicts, but we can still write a declaration file for it.</p><h2 id="identifying-global-modifying-modules" tabindex="-1">Identifying global-modifying modules <a class="header-anchor" href="#identifying-global-modifying-modules" aria-label="Permalink to &quot;Identifying global-modifying modules&quot;">​</a></h2><p>Global-modifying modules are generally easy to identify from their documentation. In general, they&#39;re similar to global plugins, but need a <code>require</code> call to activate their effects.</p><p>You might see documentation like this:</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// &#39;require&#39; call that doesn&#39;t use its return value</span></span>
<span class="line"><span style="color:#F286C4;">var</span><span style="color:#F6F6F4;"> unused </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">require</span><span style="color:#F6F6F4;">(</span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">magic-string-time</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">);</span></span>
<span class="line"><span style="color:#7B7F8B;">/* or */</span></span>
<span class="line"><span style="color:#62E884;">require</span><span style="color:#F6F6F4;">(</span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">magic-string-time</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">var</span><span style="color:#F6F6F4;"> x </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">hello, world</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#7B7F8B;">// Creates new methods on built-in types</span></span>
<span class="line"><span style="color:#F6F6F4;">console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(x.</span><span style="color:#62E884;">startsWithHello</span><span style="color:#F6F6F4;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">var</span><span style="color:#F6F6F4;"> y </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> [</span><span style="color:#BF9EEE;">1</span><span style="color:#F6F6F4;">, </span><span style="color:#BF9EEE;">2</span><span style="color:#F6F6F4;">, </span><span style="color:#BF9EEE;">3</span><span style="color:#F6F6F4;">];</span></span>
<span class="line"><span style="color:#7B7F8B;">// Creates new methods on built-in types</span></span>
<span class="line"><span style="color:#F6F6F4;">console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(y.</span><span style="color:#62E884;">reverseAndSort</span><span style="color:#F6F6F4;">());</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// &#39;require&#39; call that doesn&#39;t use its return value</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> unused </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;magic-string-time&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">/* or */</span></span>
<span class="line"><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;magic-string-time&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> x </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;hello, world&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">// Creates new methods on built-in types</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(x.</span><span style="color:#6F42C1;">startsWithHello</span><span style="color:#24292E;">());</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> y </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#6A737D;">// Creates new methods on built-in types</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(y.</span><span style="color:#6F42C1;">reverseAndSort</span><span style="color:#24292E;">());</span></span></code></pre></div><p>Here is an example</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]</span></span>
<span class="line"><span style="color:#7B7F8B;">// Project: [~THE PROJECT NAME~]</span></span>
<span class="line"><span style="color:#7B7F8B;">// Definitions by: [~YOUR NAME~] &lt;[~A URL FOR YOU~]&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ This is the global-modifying module template file. You should rename it to index.d.ts</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ and place it in a folder with the same name as the module.</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ For example, if you were writing a file for &quot;super-greeter&quot;, this</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ file should be &#39;super-greeter/index.d.ts&#39;</span></span>
<span class="line"><span style="color:#7B7F8B;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ Note: If your global-modifying module is callable or constructable, you&#39;ll</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ need to combine the patterns here with those in the module-class or module-function</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ template files</span></span>
<span class="line"><span style="color:#7B7F8B;"> */</span></span>
<span class="line"><span style="color:#F286C4;">declare</span><span style="color:#F6F6F4;"> global {</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#7B7F8B;">/*~ Here, declare things that go in the global namespace, or augment</span></span>
<span class="line"><span style="color:#7B7F8B;">   *~ existing declarations in the global namespace</span></span>
<span class="line"><span style="color:#7B7F8B;">   */</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#F286C4;">interface</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">String</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#62E884;">fancyFormat</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">opts</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">StringFormatOptions</span><span style="color:#F6F6F4;">)</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">  }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ If your module exports types or values, write them as usual */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">interface</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">StringFormatOptions</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  fancinessLevel</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ For example, declaring a method on the module (in addition to its global side effects) */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">function</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">doSomething</span><span style="color:#F6F6F4;">()</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">void</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ If your module exports nothing, you&#39;ll need this line. Otherwise, delete it */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> {};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]</span></span>
<span class="line"><span style="color:#6A737D;">// Project: [~THE PROJECT NAME~]</span></span>
<span class="line"><span style="color:#6A737D;">// Definitions by: [~YOUR NAME~] &lt;[~A URL FOR YOU~]&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ This is the global-modifying module template file. You should rename it to index.d.ts</span></span>
<span class="line"><span style="color:#6A737D;"> *~ and place it in a folder with the same name as the module.</span></span>
<span class="line"><span style="color:#6A737D;"> *~ For example, if you were writing a file for &quot;super-greeter&quot;, this</span></span>
<span class="line"><span style="color:#6A737D;"> *~ file should be &#39;super-greeter/index.d.ts&#39;</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ Note: If your global-modifying module is callable or constructable, you&#39;ll</span></span>
<span class="line"><span style="color:#6A737D;"> *~ need to combine the patterns here with those in the module-class or module-function</span></span>
<span class="line"><span style="color:#6A737D;"> *~ template files</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> global {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/*~ Here, declare things that go in the global namespace, or augment</span></span>
<span class="line"><span style="color:#6A737D;">   *~ existing declarations in the global namespace</span></span>
<span class="line"><span style="color:#6A737D;">   */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">fancyFormat</span><span style="color:#24292E;">(</span><span style="color:#E36209;">opts</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StringFormatOptions</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ If your module exports types or values, write them as usual */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">StringFormatOptions</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">fancinessLevel</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ For example, declaring a method on the module (in addition to its global side effects) */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ If your module exports nothing, you&#39;ll need this line. Otherwise, delete it */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> {};</span></span></code></pre></div>`,9),p=[e];function t(c,r,i,y,F,d){return n(),a("div",null,p)}const g=s(o,[["render",t]]);export{m as __pageData,g as default};
