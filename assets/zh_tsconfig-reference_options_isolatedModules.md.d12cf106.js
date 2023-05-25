import{_ as s,o as e,c as n,V as o}from"./chunks/framework.ced88878.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Isolated Modules","oneline":"Ensure that each file can be safely transpiled without relying on other imports."},"headers":[],"relativePath":"zh/tsconfig-reference/options/isolatedModules.md","lastUpdated":1682921420000}'),a={name:"zh/tsconfig-reference/options/isolatedModules.md"},l=o(`<p>While you can use TypeScript to produce JavaScript code from TypeScript code, it&#39;s also common to use other transpilers such as <a href="https://babeljs.io" target="_blank" rel="noreferrer">Babel</a> to do this. However, other transpilers only operate on a single file at a time, which means they can&#39;t apply code transforms that depend on understanding the full type system. This restriction also applies to TypeScript&#39;s <code>ts.transpileModule</code> API which is used by some build tools.</p><p>These limitations can cause runtime problems with some TypeScript features like <code>const enum</code>s and <code>namespace</code>s. Setting the <code>isolatedModules</code> flag tells TypeScript to warn you if you write certain code that can&#39;t be correctly interpreted by a single-file transpilation process.</p><p>It does not change the behavior of your code, or otherwise change the behavior of TypeScript&#39;s checking and emitting process.</p><p>Some examples of code which does not work when <code>isolatedModules</code> is enabled.</p><h4 id="exports-of-non-value-identifiers" tabindex="-1">Exports of Non-Value Identifiers <a class="header-anchor" href="#exports-of-non-value-identifiers" aria-label="Permalink to &quot;Exports of Non-Value Identifiers&quot;">​</a></h4><p>In TypeScript, you can import a <em>type</em> and then subsequently export it:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @noErrors</span></span>
<span class="line"><span style="color:#F286C4;">import</span><span style="color:#F6F6F4;"> { someType, someFunction } </span><span style="color:#F286C4;">from</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">someModule</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#62E884;">someFunction</span><span style="color:#F6F6F4;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> { someType, someFunction };</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @noErrors</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { someType, someFunction } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;someModule&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">someFunction</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { someType, someFunction };</span></span></code></pre></div><p>Because there&#39;s no value for <code>someType</code>, the emitted <code>export</code> will not try to export it (this would be a runtime error in JavaScript):</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> { someFunction };</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> { someFunction };</span></span></code></pre></div><p>Single-file transpilers don&#39;t know whether <code>someType</code> produces a value or not, so it&#39;s an error to export a name that only refers to a type.</p><h4 id="non-module-files" tabindex="-1">Non-Module Files <a class="header-anchor" href="#non-module-files" aria-label="Permalink to &quot;Non-Module Files&quot;">​</a></h4><p>If <code>isolatedModules</code> is set, all implementation files must be <em>modules</em> (which means it has some form of <code>import</code>/<code>export</code>). An error occurs if any file isn&#39;t a module:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @errors: 1208</span></span>
<span class="line"><span style="color:#7B7F8B;">// @isolatedModules</span></span>
<span class="line"><span style="color:#F286C4;">function</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">fn</span><span style="color:#F6F6F4;">() {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @errors: 1208</span></span>
<span class="line"><span style="color:#6A737D;">// @isolatedModules</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">() {}</span></span></code></pre></div><p>This restriction doesn&#39;t apply to <code>.d.ts</code> files.</p><h4 id="references-to-const-enum-members" tabindex="-1">References to <code>const enum</code> members <a class="header-anchor" href="#references-to-const-enum-members" aria-label="Permalink to &quot;References to \`const enum\` members&quot;">​</a></h4><p>In TypeScript, when you reference a <code>const enum</code> member, the reference is replaced by its actual value in the emitted JavaScript. Changing this TypeScript:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">declare</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">enum</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Numbers</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  Zero </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">0</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">  One </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">1</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"><span style="color:#F6F6F4;">console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(Numbers.Zero </span><span style="color:#F286C4;">+</span><span style="color:#F6F6F4;"> Numbers.One);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Numbers</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Zero</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">One</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Numbers.Zero </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> Numbers.One);</span></span></code></pre></div><p>To this JavaScript:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#7B7F8B;">// @removeComments</span></span>
<span class="line"><span style="color:#F286C4;">declare</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">enum</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Numbers</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  Zero </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">0</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">  One </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">1</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"><span style="color:#F6F6F4;">console.</span><span style="color:#62E884;">log</span><span style="color:#F6F6F4;">(Numbers.Zero </span><span style="color:#F286C4;">+</span><span style="color:#F6F6F4;"> Numbers.One);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#6A737D;">// @removeComments</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Numbers</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Zero</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">One</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(Numbers.Zero </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> Numbers.One);</span></span></code></pre></div><p>Without knowledge of the values of these members, other transpilers can&#39;t replace the references to <code>Numbers</code>, which would be a runtime error if left alone (since there are no <code>Numbers</code> object at runtime). Because of this, when <code>isolatedModules</code> is set, it is an error to reference an ambient <code>const enum</code> member.</p>`,20),p=[l];function t(c,r,i,y,d,F){return e(),n("div",null,p)}const h=s(a,[["render",t]]);export{m as __pageData,h as default};
