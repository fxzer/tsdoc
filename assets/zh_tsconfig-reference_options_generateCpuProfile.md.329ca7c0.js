import{_ as e,o,c as s,V as n}from"./chunks/framework.ced88878.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Generate CPU Profile","oneline":"Emit a v8 CPU profile of the compiler run for debugging."},"headers":[],"relativePath":"zh/tsconfig-reference/options/generateCpuProfile.md","lastUpdated":1681915487000}'),r={name:"zh/tsconfig-reference/options/generateCpuProfile.md"},t=n('<p>This option gives you the chance to have TypeScript emit a v8 CPU profile during the compiler run. The CPU profile can provide insight into why your builds may be slow.</p><p>This option can only be used from the CLI via: <code>--generateCpuProfile tsc-output.cpuprofile</code>.</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F6F6F4;">npm </span><span style="color:#E7EE98;">run</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">tsc</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--generateCpuProfile</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">tsc-output.cpuprofile</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">run</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tsc</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--generateCpuProfile</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tsc-output.cpuprofile</span></span></code></pre></div><p>This file can be opened in a chromium based browser like Chrome or Edge Developer in <a href="https://developers.google.com/web/tools/chrome-devtools/rendering-tools/js-execution" target="_blank" rel="noreferrer">the CPU profiler</a> section. You can learn more about understanding the compilers performance in the <a href="https://github.com/microsoft/TypeScript/wiki/Performance" target="_blank" rel="noreferrer">TypeScript wiki section on performance</a>.</p>',4),a=[t];function p(l,c,i,d,u,f){return o(),s("div",null,a)}const _=e(r,[["render",p]]);export{g as __pageData,_ as default};
