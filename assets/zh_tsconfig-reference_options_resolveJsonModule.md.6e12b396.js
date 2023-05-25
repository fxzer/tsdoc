import{_ as s,o as n,c as a,V as l}from"./chunks/framework.ced88878.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Resolve JSON Module","oneline":"Enable importing .json files."},"headers":[],"relativePath":"zh/tsconfig-reference/options/resolveJsonModule.md","lastUpdated":1682921420000}'),p={name:"zh/tsconfig-reference/options/resolveJsonModule.md"},o=l(`<p>Allows importing modules with a &#39;.json&#39; extension, which is a common practice in node projects. This includes generating a type for the <code>import</code> based on the static JSON shape.</p><p>TypeScript does not support resolving JSON files by default:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @errors: 2732</span></span>
<span class="line"><span style="color:#7B7F8B;">// @filename: settings.json</span></span>
<span class="line"><span style="color:#F6F6F4;">{</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">repo</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">: </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">TypeScript</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">dry</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">: </span><span style="color:#BF9EEE;">false</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">debug</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">: </span><span style="color:#BF9EEE;">false</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"><span style="color:#7B7F8B;">// @filename: index.ts</span></span>
<span class="line"><span style="color:#F286C4;">import</span><span style="color:#F6F6F4;"> settings </span><span style="color:#F286C4;">from</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">./settings.json</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F6F6F4;">settings.debug </span><span style="color:#F286C4;">===</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">true</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">settings.dry </span><span style="color:#F286C4;">===</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">2</span><span style="color:#F6F6F4;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @errors: 2732</span></span>
<span class="line"><span style="color:#6A737D;">// @filename: settings.json</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;repo&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;TypeScript&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;dry&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;debug&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// @filename: index.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> settings </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./settings.json&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">settings.debug </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">settings.dry </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span></code></pre></div><p>Enabling the option allows importing JSON, and validating the types in that JSON file.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @errors: 2367</span></span>
<span class="line"><span style="color:#7B7F8B;">// @resolveJsonModule</span></span>
<span class="line"><span style="color:#7B7F8B;">// @module: commonjs</span></span>
<span class="line"><span style="color:#7B7F8B;">// @moduleResolution: node</span></span>
<span class="line"><span style="color:#7B7F8B;">// @filename: settings.json</span></span>
<span class="line"><span style="color:#F6F6F4;">{</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">repo</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">: </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">TypeScript</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">dry</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">: </span><span style="color:#BF9EEE;">false</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">debug</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">: </span><span style="color:#BF9EEE;">false</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"><span style="color:#7B7F8B;">// @filename: index.ts</span></span>
<span class="line"><span style="color:#F286C4;">import</span><span style="color:#F6F6F4;"> settings </span><span style="color:#F286C4;">from</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">./settings.json</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F6F6F4;">settings.debug </span><span style="color:#F286C4;">===</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">true</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">settings.dry </span><span style="color:#F286C4;">===</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">2</span><span style="color:#F6F6F4;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @errors: 2367</span></span>
<span class="line"><span style="color:#6A737D;">// @resolveJsonModule</span></span>
<span class="line"><span style="color:#6A737D;">// @module: commonjs</span></span>
<span class="line"><span style="color:#6A737D;">// @moduleResolution: node</span></span>
<span class="line"><span style="color:#6A737D;">// @filename: settings.json</span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;repo&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;TypeScript&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;dry&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;debug&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// @filename: index.ts</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> settings </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./settings.json&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">settings.debug </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">settings.dry </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span></code></pre></div>`,5),e=[o];function t(c,r,y,i,F,E){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{d as __pageData,g as default};
