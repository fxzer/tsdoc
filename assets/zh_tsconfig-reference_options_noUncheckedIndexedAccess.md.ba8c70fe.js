import{_ as s,o as n,c as a,V as l}from"./chunks/framework.ced88878.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{"display":"noUncheckedIndexedAccess","oneline":"Add `undefined` to a type when accessed using an index."},"headers":[],"relativePath":"zh/tsconfig-reference/options/noUncheckedIndexedAccess.md","lastUpdated":1682921420000}'),p={name:"zh/tsconfig-reference/options/noUncheckedIndexedAccess.md"},o=l(`<p>TypeScript has a way to describe objects which have unknown keys but known values on an object, via index signatures.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">interface</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">EnvironmentVars</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  NAME</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">  OS</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#7B7F8B;">// Unknown properties are covered by this index signature.</span></span>
<span class="line"><span style="color:#F6F6F4;">  [</span><span style="color:#FFB86C;font-style:italic;">propName</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">]</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">declare</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> env</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">EnvironmentVars</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">// Declared as existing</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> sysName </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> env.</span><span style="color:#BF9EEE;">NAME</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> os </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> env.</span><span style="color:#BF9EEE;">OS</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#7B7F8B;">//    ^?</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">// Not declared, but because of the index</span></span>
<span class="line"><span style="color:#7B7F8B;">// signature, then it is considered a string</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> nodeEnv </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> env.</span><span style="color:#BF9EEE;">NODE_ENV</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#7B7F8B;">//    ^?</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EnvironmentVars</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">NAME</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">OS</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Unknown properties are covered by this index signature.</span></span>
<span class="line"><span style="color:#24292E;">  [</span><span style="color:#E36209;">propName</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">env</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EnvironmentVars</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Declared as existing</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">sysName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> env.</span><span style="color:#005CC5;">NAME</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">os</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> env.</span><span style="color:#005CC5;">OS</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">//    ^?</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Not declared, but because of the index</span></span>
<span class="line"><span style="color:#6A737D;">// signature, then it is considered a string</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nodeEnv</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">//    ^?</span></span></code></pre></div><p>Turning on <code>noUncheckedIndexedAccess</code> will add <code>undefined</code> to any un-declared field in the type.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">interface</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">EnvironmentVars</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">  NAME</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">  OS</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#7B7F8B;">// Unknown properties are covered by this index signature.</span></span>
<span class="line"><span style="color:#F6F6F4;">  [</span><span style="color:#FFB86C;font-style:italic;">propName</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">]</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"><span style="color:#7B7F8B;">// @noUncheckedIndexedAccess</span></span>
<span class="line"><span style="color:#7B7F8B;">// ---cut---</span></span>
<span class="line"><span style="color:#F286C4;">declare</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> env</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">EnvironmentVars</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">// Declared as existing</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> sysName </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> env.</span><span style="color:#BF9EEE;">NAME</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> os </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> env.</span><span style="color:#BF9EEE;">OS</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#7B7F8B;">//    ^?</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">// Not declared, but because of the index</span></span>
<span class="line"><span style="color:#7B7F8B;">// signature, then it is considered a string</span></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> nodeEnv </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> env.</span><span style="color:#BF9EEE;">NODE_ENV</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#7B7F8B;">//    ^?</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EnvironmentVars</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">NAME</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">OS</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Unknown properties are covered by this index signature.</span></span>
<span class="line"><span style="color:#24292E;">  [</span><span style="color:#E36209;">propName</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// @noUncheckedIndexedAccess</span></span>
<span class="line"><span style="color:#6A737D;">// ---cut---</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">env</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EnvironmentVars</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Declared as existing</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">sysName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> env.</span><span style="color:#005CC5;">NAME</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">os</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> env.</span><span style="color:#005CC5;">OS</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">//    ^?</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Not declared, but because of the index</span></span>
<span class="line"><span style="color:#6A737D;">// signature, then it is considered a string</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nodeEnv</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">//    ^?</span></span></code></pre></div>`,4),e=[o];function c(t,r,y,F,i,E){return n(),a("div",null,e)}const A=s(p,[["render",c]]);export{C as __pageData,A as default};
