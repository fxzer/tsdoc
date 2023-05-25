import{_ as s,o as n,c as a,V as l}from"./chunks/framework.ced88878.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Strip Internal","oneline":"Disable emitting declarations that have `@internal` in their JSDoc comments."},"headers":[],"relativePath":"zh/tsconfig-reference/options/stripInternal.md","lastUpdated":1682921420000}'),p={name:"zh/tsconfig-reference/options/stripInternal.md"},o=l(`<p>Do not emit declarations for code that has an <code>@internal</code> annotation in its JSDoc comment. This is an internal compiler option; use at your own risk, because the compiler does not check that the result is valid. If you are searching for a tool to handle additional levels of visibility within your <code>d.ts</code> files, look at <a href="https://api-extractor.com" target="_blank" rel="noreferrer">api-extractor</a>.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">/**</span></span>
<span class="line"><span style="color:#7B7F8B;"> * Days available in a week</span></span>
<span class="line"><span style="color:#7B7F8B;"> * </span><span style="color:#F286C4;">@internal</span></span>
<span class="line"><span style="color:#7B7F8B;"> */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> daysInAWeek </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">7</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/** Calculate how much someone earns in a week */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">function</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">weeklySalary</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">dayRate</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">) {</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#F286C4;">return</span><span style="color:#F6F6F4;"> daysInAWeek </span><span style="color:#F286C4;">*</span><span style="color:#F6F6F4;"> dayRate;</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Days available in a week</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@internal</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">daysInAWeek</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">7</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/** Calculate how much someone earns in a week */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">weeklySalary</span><span style="color:#24292E;">(</span><span style="color:#E36209;">dayRate</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> daysInAWeek </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> dayRate;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>With the flag set to <code>false</code> (default):</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @showEmittedFile: index.d.ts</span></span>
<span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#7B7F8B;">// @declaration</span></span>
<span class="line"><span style="color:#7B7F8B;">/**</span></span>
<span class="line"><span style="color:#7B7F8B;"> * Days available in a week</span></span>
<span class="line"><span style="color:#7B7F8B;"> * </span><span style="color:#F286C4;">@internal</span></span>
<span class="line"><span style="color:#7B7F8B;"> */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> daysInAWeek </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">7</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/** Calculate how much someone earns in a week */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">function</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">weeklySalary</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">dayRate</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">) {</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#F286C4;">return</span><span style="color:#F6F6F4;"> daysInAWeek </span><span style="color:#F286C4;">*</span><span style="color:#F6F6F4;"> dayRate;</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @showEmittedFile: index.d.ts</span></span>
<span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#6A737D;">// @declaration</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Days available in a week</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@internal</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">daysInAWeek</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">7</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/** Calculate how much someone earns in a week */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">weeklySalary</span><span style="color:#24292E;">(</span><span style="color:#E36209;">dayRate</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> daysInAWeek </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> dayRate;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>With <code>stripInternal</code> set to <code>true</code> the <code>d.ts</code> emitted will be redacted.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @stripinternal</span></span>
<span class="line"><span style="color:#7B7F8B;">// @showEmittedFile: index.d.ts</span></span>
<span class="line"><span style="color:#7B7F8B;">// @showEmit</span></span>
<span class="line"><span style="color:#7B7F8B;">// @declaration</span></span>
<span class="line"><span style="color:#7B7F8B;">/**</span></span>
<span class="line"><span style="color:#7B7F8B;"> * Days available in a week</span></span>
<span class="line"><span style="color:#7B7F8B;"> * </span><span style="color:#F286C4;">@internal</span></span>
<span class="line"><span style="color:#7B7F8B;"> */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> daysInAWeek </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">7</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/** Calculate how much someone earns in a week */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">function</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">weeklySalary</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">dayRate</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">) {</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#F286C4;">return</span><span style="color:#F6F6F4;"> daysInAWeek </span><span style="color:#F286C4;">*</span><span style="color:#F6F6F4;"> dayRate;</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @stripinternal</span></span>
<span class="line"><span style="color:#6A737D;">// @showEmittedFile: index.d.ts</span></span>
<span class="line"><span style="color:#6A737D;">// @showEmit</span></span>
<span class="line"><span style="color:#6A737D;">// @declaration</span></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Days available in a week</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@internal</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">daysInAWeek</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">7</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/** Calculate how much someone earns in a week */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">weeklySalary</span><span style="color:#24292E;">(</span><span style="color:#E36209;">dayRate</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> daysInAWeek </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> dayRate;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>The JavaScript output is still the same.</p>`,7),e=[o];function t(c,r,y,i,F,d){return n(),a("div",null,e)}const A=s(p,[["render",t]]);export{C as __pageData,A as default};
