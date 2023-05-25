import{_ as s,o as n,c as a,V as l}from"./chunks/framework.ced88878.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zh/declaration-files/templates/module-class.md","lastUpdated":1682668835000}'),p={name:"zh/declaration-files/templates/module-class.md"},e=l(`<p>示例，当你想要处理如下的 JavaScriptr 的代码时：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> Greeter </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">require</span><span style="color:#F6F6F4;">(</span><span style="color:#DEE492;">&#39;</span><span style="color:#E7EE98;">super-greeter</span><span style="color:#DEE492;">&#39;</span><span style="color:#F6F6F4;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> greeter </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;font-weight:bold;">new</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">Greeter</span><span style="color:#F6F6F4;">();</span></span>
<span class="line"><span style="color:#F6F6F4;">greeter.</span><span style="color:#62E884;">greet</span><span style="color:#F6F6F4;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Greeter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;super-greeter&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">greeter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Greeter</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">greeter.</span><span style="color:#6F42C1;">greet</span><span style="color:#24292E;">();</span></span></code></pre></div><p>能够同时处理UMD导入和模块导入：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]</span></span>
<span class="line"><span style="color:#7B7F8B;">// Project: [~THE PROJECT NAME~]</span></span>
<span class="line"><span style="color:#7B7F8B;">// Definitions by: [~YOUR NAME~] &lt;[~A URL FOR YOU~]&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ This is the module template file for class modules.</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ For example, if you were writing a file for &quot;super-greeter&quot;, this</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ file should be &#39;super-greeter/index.d.ts&#39;</span></span>
<span class="line"><span style="color:#7B7F8B;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">// Note that ES6 modules cannot directly export class objects.</span></span>
<span class="line"><span style="color:#7B7F8B;">// This file should be imported using the CommonJS-style:</span></span>
<span class="line"><span style="color:#7B7F8B;">//   import x = require(&#39;[~THE MODULE~]&#39;);</span></span>
<span class="line"><span style="color:#7B7F8B;">//</span></span>
<span class="line"><span style="color:#7B7F8B;">// Alternatively, if --allowSyntheticDefaultImports or</span></span>
<span class="line"><span style="color:#7B7F8B;">// --esModuleInterop is turned on, this file can also be</span></span>
<span class="line"><span style="color:#7B7F8B;">// imported as a default import:</span></span>
<span class="line"><span style="color:#7B7F8B;">//   import x from &#39;[~THE MODULE~]&#39;;</span></span>
<span class="line"><span style="color:#7B7F8B;">//</span></span>
<span class="line"><span style="color:#7B7F8B;">// Refer to the TypeScript documentation at</span></span>
<span class="line"><span style="color:#7B7F8B;">// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require</span></span>
<span class="line"><span style="color:#7B7F8B;">// to understand common workarounds for this limitation of ES6 modules.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ If this module is a UMD module that exposes a global variable &#39;myClassLib&#39; when</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ loaded outside a module loader environment, declare that global here.</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ Otherwise, delete this declaration.</span></span>
<span class="line"><span style="color:#7B7F8B;"> */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">as</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">namespace</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">myClassLib</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ This declaration specifies that the class constructor function</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ is the exported object from the file</span></span>
<span class="line"><span style="color:#7B7F8B;"> */</span></span>
<span class="line"><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> MyClass;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ Write your module&#39;s methods and properties in this class */</span></span>
<span class="line"><span style="color:#F286C4;">declare</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">class</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;">MyClass</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#F286C4;">constructor</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">customGreeting</span><span style="color:#F286C4;">?:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F6F6F4;">    greet</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">void</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#62E884;">myMethod</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">opts</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">MyClass</span><span style="color:#F6F6F4;">.</span><span style="color:#97E1F1;font-style:italic;">MyClassMethodOptions</span><span style="color:#F6F6F4;">)</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ If you want to expose types from your module as well, you can</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ place them in this block.</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ Note that if you decide to include this namespace, the module can be</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ incorrectly imported as a namespace object, unless</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ --esModuleInterop is turned on:</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~   import * as x from &#39;[~THE MODULE~]&#39;; // WRONG! DO NOT DO THIS!</span></span>
<span class="line"><span style="color:#7B7F8B;"> */</span></span>
<span class="line"><span style="color:#F286C4;">declare</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">namespace</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">MyClass</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">interface</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">MyClassMethodOptions</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">        width</span><span style="color:#F286C4;">?:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">        height</span><span style="color:#F286C4;">?:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">    }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]</span></span>
<span class="line"><span style="color:#6A737D;">// Project: [~THE PROJECT NAME~]</span></span>
<span class="line"><span style="color:#6A737D;">// Definitions by: [~YOUR NAME~] &lt;[~A URL FOR YOU~]&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ This is the module template file for class modules.</span></span>
<span class="line"><span style="color:#6A737D;"> *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.</span></span>
<span class="line"><span style="color:#6A737D;"> *~ For example, if you were writing a file for &quot;super-greeter&quot;, this</span></span>
<span class="line"><span style="color:#6A737D;"> *~ file should be &#39;super-greeter/index.d.ts&#39;</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// Note that ES6 modules cannot directly export class objects.</span></span>
<span class="line"><span style="color:#6A737D;">// This file should be imported using the CommonJS-style:</span></span>
<span class="line"><span style="color:#6A737D;">//   import x = require(&#39;[~THE MODULE~]&#39;);</span></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#6A737D;">// Alternatively, if --allowSyntheticDefaultImports or</span></span>
<span class="line"><span style="color:#6A737D;">// --esModuleInterop is turned on, this file can also be</span></span>
<span class="line"><span style="color:#6A737D;">// imported as a default import:</span></span>
<span class="line"><span style="color:#6A737D;">//   import x from &#39;[~THE MODULE~]&#39;;</span></span>
<span class="line"><span style="color:#6A737D;">//</span></span>
<span class="line"><span style="color:#6A737D;">// Refer to the TypeScript documentation at</span></span>
<span class="line"><span style="color:#6A737D;">// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require</span></span>
<span class="line"><span style="color:#6A737D;">// to understand common workarounds for this limitation of ES6 modules.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ If this module is a UMD module that exposes a global variable &#39;myClassLib&#39; when</span></span>
<span class="line"><span style="color:#6A737D;"> *~ loaded outside a module loader environment, declare that global here.</span></span>
<span class="line"><span style="color:#6A737D;"> *~ Otherwise, delete this declaration.</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">namespace</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">myClassLib</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ This declaration specifies that the class constructor function</span></span>
<span class="line"><span style="color:#6A737D;"> *~ is the exported object from the file</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> MyClass;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ Write your module&#39;s methods and properties in this class */</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyClass</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">constructor</span><span style="color:#24292E;">(</span><span style="color:#E36209;">customGreeting</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">greet</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">void</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">myMethod</span><span style="color:#24292E;">(</span><span style="color:#E36209;">opts</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyClass</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">MyClassMethodOptions</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ If you want to expose types from your module as well, you can</span></span>
<span class="line"><span style="color:#6A737D;"> *~ place them in this block.</span></span>
<span class="line"><span style="color:#6A737D;"> *~</span></span>
<span class="line"><span style="color:#6A737D;"> *~ Note that if you decide to include this namespace, the module can be</span></span>
<span class="line"><span style="color:#6A737D;"> *~ incorrectly imported as a namespace object, unless</span></span>
<span class="line"><span style="color:#6A737D;"> *~ --esModuleInterop is turned on:</span></span>
<span class="line"><span style="color:#6A737D;"> *~   import * as x from &#39;[~THE MODULE~]&#39;; // WRONG! DO NOT DO THIS!</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">namespace</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyClass</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyClassMethodOptions</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">width</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">height</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,4),o=[e];function t(c,r,i,y,F,d){return n(),a("div",null,o)}const E=s(p,[["render",t]]);export{m as __pageData,E as default};
