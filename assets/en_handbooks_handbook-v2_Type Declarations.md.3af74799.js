import{_ as e,o as a,c as o,V as s}from"./chunks/framework.ced88878.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/handbooks/handbook-v2/Type Declarations.md","lastUpdated":1682921420000}'),t={name:"en/handbooks/handbook-v2/Type Declarations.md"},n=s('<p>Throughout the sections you&#39;ve read so far, we&#39;ve been demonstrating basic TypeScript concepts using the built-in functions present in all JavaScript runtimes. However, almost all JavaScript today includes many libraries to accomplish common tasks. Having types for the parts of your application that <em>aren&#39;t</em> your code will greatly improve your TypeScript experience. Where do these types come from?</p><h2 id="what-do-type-declarations-look-like" tabindex="-1">What Do Type Declarations Look Like? <a class="header-anchor" href="#what-do-type-declarations-look-like" aria-label="Permalink to &quot;What Do Type Declarations Look Like?&quot;">​</a></h2><p>Let&#39;s say you write some code like this:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#7B7F8B;">// @errors: 2339</span></span>\n<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> k </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> Math.</span><span style="color:#62E884;">max</span><span style="color:#F6F6F4;">(</span><span style="color:#BF9EEE;">5</span><span style="color:#F6F6F4;">, </span><span style="color:#BF9EEE;">6</span><span style="color:#F6F6F4;">);</span></span>\n<span class="line"><span style="color:#F286C4;">const</span><span style="color:#F6F6F4;"> j </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> Math.</span><span style="color:#62E884;">mix</span><span style="color:#F6F6F4;">(</span><span style="color:#BF9EEE;">7</span><span style="color:#F6F6F4;">, </span><span style="color:#BF9EEE;">8</span><span style="color:#F6F6F4;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// @errors: 2339</span></span>\n<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">k</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">max</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">6</span><span style="color:#24292E;">);</span></span>\n<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">j</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">mix</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">7</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">8</span><span style="color:#24292E;">);</span></span></code></pre></div><p>How did TypeScript know that <code>max</code> was present but not <code>mix</code>, even though <code>Math</code>&#39;s implementation wasn&#39;t part of your code?</p><p>The answer is that there are <em>declaration files</em> describing these built-in objects. A declaration file provides a way to <em>declare</em> the existence of some types or values without actually providing implementations for those values.</p><h2 id="d-ts-files" tabindex="-1"><code>.d.ts</code> files <a class="header-anchor" href="#d-ts-files" aria-label="Permalink to &quot;`.d.ts` files&quot;">​</a></h2><p>TypeScript has two main kinds of files. <code>.ts</code> files are <em>implementation</em> files that contain types and executable code. These are the files that produce <code>.js</code> outputs, and are where you&#39;d normally write your code.</p><p><code>.d.ts</code> files are <em>declaration</em> files that contain <em>only</em> type information. These files don&#39;t produce <code>.js</code> outputs; they are only used for typechecking. We&#39;ll learn more about how to write our own declaration files later.</p><h2 id="built-in-type-definitions" tabindex="-1">Built-in Type Definitions <a class="header-anchor" href="#built-in-type-definitions" aria-label="Permalink to &quot;Built-in Type Definitions&quot;">​</a></h2><p>TypeScript includes declaration files for all of the standardized built-in APIs available in JavaScript runtimes. This includes things like methods and properties of built-in types like <code>string</code> or <code>function</code>, top-level names like <code>Math</code> and <code>Object</code>, and their associated types. By default, TypeScript also includes types for things available when running inside the browser, such as <code>window</code> and <code>document</code>; these are collectively referred to as the DOM APIs.</p><p>TypeScript names these declaration files with the pattern <code>lib.[something].d.ts</code>. If you navigate into a file with that name, you can know that you&#39;re dealing with some built-in part of the platform, not user code.</p><h3 id="target-setting" tabindex="-1"><code>target</code> setting <a class="header-anchor" href="#target-setting" aria-label="Permalink to &quot;`target` setting&quot;">​</a></h3><p>The methods, properties, and functions available to you actually vary based on the <em>version</em> of JavaScript your code is running on. For example, the <code>startsWith</code> method of strings is available only starting with the version of JavaScript referred as <em>ECMAScript 6</em>.</p><p>Being aware of what version of JavaScript your code ultimately runs on is important because you don&#39;t want to use APIs that are from a newer version than the platform you deploy to. This is one function of the <a href="/tsdoc-vitepress/tsconfig#target"><code>target</code></a> compiler setting.</p><p>TypeScript helps with this problem by varying which <code>lib</code> files are included by default based on your <a href="/tsdoc-vitepress/tsconfig#target"><code>target</code></a> setting. For example, if <a href="/tsdoc-vitepress/tsconfig#target"><code>target</code></a> is <code>ES5</code>, you will see an error if trying to use the <code>startsWith</code> method, because that method is only available in <code>ES6</code> or later.</p><h3 id="lib-setting" tabindex="-1"><code>lib</code> setting <a class="header-anchor" href="#lib-setting" aria-label="Permalink to &quot;`lib` setting&quot;">​</a></h3><p>The <a href="/tsdoc-vitepress/tsconfig#lib"><code>lib</code></a> setting allows more fine-grained control of which built-in declaration files are considered available in your program. See the documentation page on <a href="/tsdoc-vitepress/tsconfig#lib"><code>lib</code></a> for more information.</p><h2 id="external-definitions" tabindex="-1">External Definitions <a class="header-anchor" href="#external-definitions" aria-label="Permalink to &quot;External Definitions&quot;">​</a></h2><p>For non-built-in APIs, there are a variety of ways you can get declaration files. How you do this depends on exactly which library you&#39;re getting types for.</p><h3 id="bundled-types" tabindex="-1">Bundled Types <a class="header-anchor" href="#bundled-types" aria-label="Permalink to &quot;Bundled Types&quot;">​</a></h3><p>If a library you&#39;re using is published as an npm package, it may include type declaration files as part of its distribution already. You can read the project&#39;s documentation to find out, or simply try importing the package and see if TypeScript is able to automatically resolve the types for you.</p><p>If you&#39;re a package author considering bundling type definitions with your package, you can read our guide on <a href="/tsdoc-vitepress/docs/handbook/declaration-files/publishing.html#including-declarations-in-your-npm-package">bundling type definitions</a>.</p><h3 id="definitelytyped-types" tabindex="-1">DefinitelyTyped / <code>@types</code> <a class="header-anchor" href="#definitelytyped-types" aria-label="Permalink to &quot;DefinitelyTyped / `@types`&quot;">​</a></h3><p>The <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/" target="_blank" rel="noreferrer">DefinitelyTyped repository</a> is a centralized repo storing declaration files for thousands of libraries. The vast majority of commonly-used libraries have declaration files available on DefinitelyTyped.</p><p>Definitions on DefinitelyTyped are also automatically published to npm under the <code>@types</code> scope. The name of the types package is always the same as the name of the underlying package itself. For example, if you installed the <code>react</code> npm package, you can install its corresponding types by running</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F6F6F4;">npm </span><span style="color:#E7EE98;">install</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--save-dev</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">@types/react</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">npm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">install</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--save-dev</span><span style="color:#24292E;"> </span><span style="color:#032F62;">@types/react</span></span></code></pre></div><p>TypeScript automatically finds type definitions under <code>node_modules/@types</code>, so there&#39;s no other step needed to get these types available in your program.</p><h3 id="your-own-definitions" tabindex="-1">Your Own Definitions <a class="header-anchor" href="#your-own-definitions" aria-label="Permalink to &quot;Your Own Definitions&quot;">​</a></h3><p>In the uncommon event that a library didn&#39;t bundle its own types and didn&#39;t have a definition on DefinitelyTyped, you can write a declaration file yourself. See the appendix <a href="/tsdoc-vitepress/docs/handbook/declaration-files/introduction.html">Writing Declaration Files</a> for a guide.</p><p>If you want to silence warnings about a particular module without writing a declaration file, you can also quick declare the module as type <code>any</code> by putting an empty declaration for it in a <code>.d.ts</code> file in your project. For example, if you wanted to use a module named <code>some-untyped-module</code> without having definitions for it, you would write:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">declare</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">module</span><span style="color:#F6F6F4;"> </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">some-untyped-module</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">declare</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">module</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;some-untyped-module&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div>',32),i=[n];function l(r,p,c,d,y,h){return a(),o("div",null,i)}const m=e(t,[["render",l]]);export{f as __pageData,m as default};
