import{_ as s,o as e,c as n,V as a}from"./chunks/framework.ced88878.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Root Dir","oneline":"Specify the root folder within your source files."},"headers":[],"relativePath":"en/tsconfig-reference/options/rootDir.md","lastUpdated":1681915487000}'),o={name:"en/tsconfig-reference/options/rootDir.md"},p=a(`<p><strong>Default</strong>: The longest common path of all non-declaration input files. If <a href="#composite"><code>composite</code></a> is set, the default is instead the directory containing the <code>tsconfig.json</code> file.</p><p>When TypeScript compiles files, it keeps the same directory structure in the output directory as exists in the input directory.</p><p>For example, let&#39;s say you have some input files:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#f6f6f4;">MyProj</span></span>
<span class="line"><span style="color:#f6f6f4;">├── tsconfig.json</span></span>
<span class="line"><span style="color:#f6f6f4;">├── core</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── a.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── b.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── sub</span></span>
<span class="line"><span style="color:#f6f6f4;">│   │   ├── c.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">├── types.d.ts</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">MyProj</span></span>
<span class="line"><span style="color:#24292e;">├── tsconfig.json</span></span>
<span class="line"><span style="color:#24292e;">├── core</span></span>
<span class="line"><span style="color:#24292e;">│   ├── a.ts</span></span>
<span class="line"><span style="color:#24292e;">│   ├── b.ts</span></span>
<span class="line"><span style="color:#24292e;">│   ├── sub</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── c.ts</span></span>
<span class="line"><span style="color:#24292e;">├── types.d.ts</span></span></code></pre></div><p>The inferred value for <code>rootDir</code> is the longest common path of all non-declaration input files, which in this case is <code>core/</code>.</p><p>If your <a href="#outDir"><code>outDir</code></a> was <code>dist</code>, TypeScript would write this tree:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#f6f6f4;">MyProj</span></span>
<span class="line"><span style="color:#f6f6f4;">├── dist</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── a.js</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── b.js</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── sub</span></span>
<span class="line"><span style="color:#f6f6f4;">│   │   ├── c.js</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">MyProj</span></span>
<span class="line"><span style="color:#24292e;">├── dist</span></span>
<span class="line"><span style="color:#24292e;">│   ├── a.js</span></span>
<span class="line"><span style="color:#24292e;">│   ├── b.js</span></span>
<span class="line"><span style="color:#24292e;">│   ├── sub</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── c.js</span></span></code></pre></div><p>However, you may have intended for <code>core</code> to be part of the output directory structure. By setting <code>rootDir: &quot;.&quot;</code> in <code>tsconfig.json</code>, TypeScript would write this tree:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#f6f6f4;">MyProj</span></span>
<span class="line"><span style="color:#f6f6f4;">├── dist</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── core</span></span>
<span class="line"><span style="color:#f6f6f4;">│   │   ├── a.js</span></span>
<span class="line"><span style="color:#f6f6f4;">│   │   ├── b.js</span></span>
<span class="line"><span style="color:#f6f6f4;">│   │   ├── sub</span></span>
<span class="line"><span style="color:#f6f6f4;">│   │   │   ├── c.js</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">MyProj</span></span>
<span class="line"><span style="color:#24292e;">├── dist</span></span>
<span class="line"><span style="color:#24292e;">│   ├── core</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── a.js</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── b.js</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── sub</span></span>
<span class="line"><span style="color:#24292e;">│   │   │   ├── c.js</span></span></code></pre></div><p>Importantly, <code>rootDir</code> <strong>does not affect which files become part of the compilation</strong>. It has no interaction with the <a href="#include"><code>include</code></a>, <code>exclude</code>, or <a href="#files"><code>files</code></a> <code>tsconfig.json</code> settings.</p><p>Note that TypeScript will never write an output file to a directory outside of <a href="#outDir"><code>outDir</code></a>, and will never skip emitting a file. For this reason, <code>rootDir</code> also enforces that all files which need to be emitted are underneath the <code>rootDir</code> path.</p><p>For example, let&#39;s say you had this tree:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#f6f6f4;">MyProj</span></span>
<span class="line"><span style="color:#f6f6f4;">├── tsconfig.json</span></span>
<span class="line"><span style="color:#f6f6f4;">├── core</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── a.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── b.ts</span></span>
<span class="line"><span style="color:#f6f6f4;">├── helpers.ts</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">MyProj</span></span>
<span class="line"><span style="color:#24292e;">├── tsconfig.json</span></span>
<span class="line"><span style="color:#24292e;">├── core</span></span>
<span class="line"><span style="color:#24292e;">│   ├── a.ts</span></span>
<span class="line"><span style="color:#24292e;">│   ├── b.ts</span></span>
<span class="line"><span style="color:#24292e;">├── helpers.ts</span></span></code></pre></div><p>It would be an error to specify <code>rootDir</code> as <code>core</code> <em>and</em> <a href="#include"><code>include</code></a> as <code>*</code> because it creates a file (<code>helpers.ts</code>) that would need to be emitted <em>outside</em> the <a href="#outDir"><code>outDir</code></a> (i.e. <code>../helpers.js</code>).</p>`,14),l=[p];function c(t,i,r,d,f,y){return e(),n("div",null,l)}const g=s(o,[["render",c]]);export{u as __pageData,g as default};
