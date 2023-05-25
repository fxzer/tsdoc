import{_ as s,o as a,c as e,V as t}from"./chunks/framework.ced88878.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"zh/tutorials/Babel with TypeScript.md","lastUpdated":1682668835000}'),o={name:"zh/tutorials/Babel with TypeScript.md"},l=t(`<p>使用Babel和TypeScript</p><h2 id="typescript中的babel和tsc的比较" tabindex="-1">TypeScript中的Babel和<code>tsc</code>的比较 <a class="header-anchor" href="#typescript中的babel和tsc的比较" aria-label="Permalink to &quot;TypeScript中的Babel和\`tsc\`的比较&quot;">​</a></h2><p>当创建一个现代化的JavaScript项目时，你可能会问自己，将TypeScript文件转换为JavaScript的正确方式是什么？</p><p>很多时候，答案是“这取决于情况”，或者“有人可能已经为你做出了决定”，这取决于项目。如果你正在使用像<a href="https://tsdx.io" target="_blank" rel="noreferrer">tsdx</a>、<a href="https://angular.io/" target="_blank" rel="noreferrer">Angular</a>、<a href="https://nestjs.com/" target="_blank" rel="noreferrer">NestJS</a>或<a href="/tsdoc-vitepress/docs/home">Getting Started</a>中提到的任何框架构建你的项目，那么这个决定已经为你处理好了。</p><p>然而，一个有用的启发式可能是：</p><ul><li>你的构建输出是否与你的源输入文件大致相同？使用<code>tsc</code></li><li>你需要一个有多个潜在输出的构建管道？使用<code>babel</code>进行转换和<code>ts</code>进行类型检查</li></ul><h2 id="使用babel进行转换-使用tsc进行类型检查" tabindex="-1">使用Babel进行转换，使用<code>tsc</code>进行类型检查 <a class="header-anchor" href="#使用babel进行转换-使用tsc进行类型检查" aria-label="Permalink to &quot;使用Babel进行转换，使用\`tsc\`进行类型检查&quot;">​</a></h2><p>这是一个常见的模式，适用于已经从JavaScript代码库转移到TypeScript的具有现有构建基础设施的项目。</p><p>这种技术是一种混合方法，使用Babel的<a href="https://babeljs.io/docs/en/babel-preset-typescript" target="_blank" rel="noreferrer">preset-typescript</a>生成你的JS文件，然后使用TypeScript进行类型检查和<code>.d.ts</code>文件生成。</p><p>通过使用babel对TypeScript的支持，你可以使用现有的构建管道，并更有可能具有更快的JS发射时间，因为Babel不会对你的代码进行类型检查。</p><h4 id="类型检查和d-ts文件生成" tabindex="-1">类型检查和d.ts文件生成 <a class="header-anchor" href="#类型检查和d-ts文件生成" aria-label="Permalink to &quot;类型检查和d.ts文件生成&quot;">​</a></h4><p>使用babel的缺点是，在从TS到JS的转换过程中，你不会得到类型检查。这可能意味着你在编辑器中错过的类型错误可能会在生产代码中出现。</p><p>除此之外，Babel无法为你的TypeScript创建<code>.d.ts</code>文件，这可能会使与库项目的工作变得更加困难。</p><p>为了解决这些问题，你可能需要设置一个命令来使用TSC对你的项目进行类型检查。这可能意味着将一些你的babel配置复制到相应的<a href="/tsdoc-vitepress/tsconfig"><code>tsconfig.json</code></a>中，并确保启用了这些标志：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">compilerOptions</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">: {</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#7B7F8B;">// 确保tsc创建.d.ts文件，但不创建.js文件</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">declaration</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">true</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">emitDeclarationOnly</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">true</span><span style="color:#F6F6F4;">,</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#7B7F8B;">// 确保Babel可以安全地转换TypeScript项目中的文件</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">isolatedModules</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">true</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;compilerOptions&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 确保tsc创建.d.ts文件，但不创建.js文件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;declaration&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;emitDeclarationOnly&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 确保Babel可以安全地转换TypeScript项目中的文件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;isolatedModules&quot;</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>有关这些标志的更多信息：</p><ul><li><a href="/tsdoc-vitepress/tsconfig#isolatedModules"><code>isolatedModules</code></a></li><li><a href="/tsdoc-vitepress/tsconfig#declaration"><code>declaration</code></a>, <a href="/tsdoc-vitepress/tsconfig#emitDeclarationOnly"><code>emitDeclarationOnly</code></a></li></ul>`,17),p=[l];function n(c,r,i,d,y,F){return a(),e("div",null,p)}const h=s(o,[["render",n]]);export{b as __pageData,h as default};
