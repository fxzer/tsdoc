import{_ as s,o as n,c as a,V as l}from"./chunks/framework.ced88878.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zh/declaration-files/templates/module-plugin.md","lastUpdated":1682668835000}'),p={name:"zh/declaration-files/templates/module-plugin.md"},o=l(`<div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]</span></span>
<span class="line"><span style="color:#7B7F8B;">// Project: [~THE PROJECT NAME~]</span></span>
<span class="line"><span style="color:#7B7F8B;">// Definitions by: [~YOUR NAME~] &lt;[~A URL FOR YOU~]&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ This is the module plugin template file. You should rename it to index.d.ts</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ and place it in a folder with the same name as the module.</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ For example, if you were writing a file for &quot;super-greeter&quot;, this</span></span>
<span class="line"><span style="color:#7B7F8B;"> *~ file should be &#39;super-greeter/index.d.ts&#39;</span></span>
<span class="line"><span style="color:#7B7F8B;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ On this line, import the module which this module adds to */</span></span>
<span class="line"><span style="color:#F286C4;">import</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">*</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">as</span><span style="color:#F6F6F4;"> m </span><span style="color:#F286C4;">from</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&#39;</span><span style="color:#E7EE98;">someModule</span><span style="color:#DEE492;">&#39;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ You can also import other modules if needed */</span></span>
<span class="line"><span style="color:#F286C4;">import</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">*</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">as</span><span style="color:#F6F6F4;"> other </span><span style="color:#F286C4;">from</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&#39;</span><span style="color:#E7EE98;">anotherModule</span><span style="color:#DEE492;">&#39;</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7B7F8B;">/*~ Here, declare the same module as the one you imported above */</span></span>
<span class="line"><span style="color:#F286C4;">declare</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">module</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&#39;</span><span style="color:#E7EE98;">someModule</span><span style="color:#DEE492;">&#39;</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#7B7F8B;">/*~ Inside, add new function, classes, or variables. You can use</span></span>
<span class="line"><span style="color:#7B7F8B;">     *~ unexported types from the original module if needed. */</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">function</span><span style="color:#F6F6F4;"> </span><span style="color:#62E884;">theNewMethod</span><span style="color:#F6F6F4;">(</span><span style="color:#FFB86C;font-style:italic;">x</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">m</span><span style="color:#F6F6F4;">.</span><span style="color:#97E1F1;font-style:italic;">foo</span><span style="color:#F6F6F4;">)</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">other</span><span style="color:#F6F6F4;">.</span><span style="color:#97E1F1;font-style:italic;">bar</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#7B7F8B;">/*~ You can also add new properties to existing interfaces from</span></span>
<span class="line"><span style="color:#7B7F8B;">     *~ the original module by writing interface augmentations */</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">interface</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">SomeModuleOptions</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">        someModuleSetting</span><span style="color:#F286C4;">?:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#7B7F8B;">/*~ New types can also be declared and will appear as if they</span></span>
<span class="line"><span style="color:#7B7F8B;">     *~ are in the original module */</span></span>
<span class="line"><span style="color:#F6F6F4;">    </span><span style="color:#F286C4;">export</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">interface</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">MyModulePluginOptions</span><span style="color:#F6F6F4;"> {</span></span>
<span class="line"><span style="color:#F6F6F4;">        size</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#F6F6F4;">    }</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]</span></span>
<span class="line"><span style="color:#6A737D;">// Project: [~THE PROJECT NAME~]</span></span>
<span class="line"><span style="color:#6A737D;">// Definitions by: [~YOUR NAME~] &lt;[~A URL FOR YOU~]&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ This is the module plugin template file. You should rename it to index.d.ts</span></span>
<span class="line"><span style="color:#6A737D;"> *~ and place it in a folder with the same name as the module.</span></span>
<span class="line"><span style="color:#6A737D;"> *~ For example, if you were writing a file for &quot;super-greeter&quot;, this</span></span>
<span class="line"><span style="color:#6A737D;"> *~ file should be &#39;super-greeter/index.d.ts&#39;</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ On this line, import the module which this module adds to */</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> m </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;someModule&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ You can also import other modules if needed */</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> other </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;anotherModule&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/*~ Here, declare the same module as the one you imported above */</span></span>
<span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">module</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;someModule&#39;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*~ Inside, add new function, classes, or variables. You can use</span></span>
<span class="line"><span style="color:#6A737D;">     *~ unexported types from the original module if needed. */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">theNewMethod</span><span style="color:#24292E;">(</span><span style="color:#E36209;">x</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">m</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">other</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">bar</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*~ You can also add new properties to existing interfaces from</span></span>
<span class="line"><span style="color:#6A737D;">     *~ the original module by writing interface augmentations */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SomeModuleOptions</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">someModuleSetting</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/*~ New types can also be declared and will appear as if they</span></span>
<span class="line"><span style="color:#6A737D;">     *~ are in the original module */</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyModulePluginOptions</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">size</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,1),e=[o];function t(c,r,i,y,F,d){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{u as __pageData,m as default};
