import{_ as s,o as n,c as a,V as e}from"./chunks/framework.ced88878.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Include","oneline":"Specify a list of glob patterns that match files to be included in compilation."},"headers":[],"relativePath":"zh/tsconfig-reference/options/include.md","lastUpdated":1681915487000}'),l={name:"zh/tsconfig-reference/options/include.md"},p=e(`<p>Specifies an array of filenames or patterns to include in the program. These filenames are resolved relative to the directory containing the <code>tsconfig.json</code> file.</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F6F6F4;">{</span></span>
<span class="line"><span style="color:#F6F6F4;">  </span><span style="color:#97E2F2;">&quot;</span><span style="color:#97E1F1;">include</span><span style="color:#97E2F2;">&quot;</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> [</span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">src/**/*</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">, </span><span style="color:#DEE492;">&quot;</span><span style="color:#E7EE98;">tests/**/*</span><span style="color:#DEE492;">&quot;</span><span style="color:#F6F6F4;">]</span></span>
<span class="line"><span style="color:#F6F6F4;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;include&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;src/**/*&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;tests/**/*&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>Which would include:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#f6f6f4;">.</span></span>
<span class="line"><span style="color:#f6f6f4;">├── scripts                ⨯</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── lint.ts            ⨯</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── update_deps.ts     ⨯</span></span>
<span class="line"><span style="color:#f6f6f4;">│   └── utils.ts           ⨯</span></span>
<span class="line"><span style="color:#f6f6f4;">├── src                    ✓</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── client             ✓</span></span>
<span class="line"><span style="color:#f6f6f4;">│   │    ├── index.ts      ✓</span></span>
<span class="line"><span style="color:#f6f6f4;">│   │    └── utils.ts      ✓</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── server             ✓</span></span>
<span class="line"><span style="color:#f6f6f4;">│   │    └── index.ts      ✓</span></span>
<span class="line"><span style="color:#f6f6f4;">├── tests                  ✓</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── app.test.ts        ✓</span></span>
<span class="line"><span style="color:#f6f6f4;">│   ├── utils.ts           ✓</span></span>
<span class="line"><span style="color:#f6f6f4;">│   └── tests.d.ts         ✓</span></span>
<span class="line"><span style="color:#f6f6f4;">├── package.json</span></span>
<span class="line"><span style="color:#f6f6f4;">├── tsconfig.json</span></span>
<span class="line"><span style="color:#f6f6f4;">└── yarn.lock</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">├── scripts                ⨯</span></span>
<span class="line"><span style="color:#24292e;">│   ├── lint.ts            ⨯</span></span>
<span class="line"><span style="color:#24292e;">│   ├── update_deps.ts     ⨯</span></span>
<span class="line"><span style="color:#24292e;">│   └── utils.ts           ⨯</span></span>
<span class="line"><span style="color:#24292e;">├── src                    ✓</span></span>
<span class="line"><span style="color:#24292e;">│   ├── client             ✓</span></span>
<span class="line"><span style="color:#24292e;">│   │    ├── index.ts      ✓</span></span>
<span class="line"><span style="color:#24292e;">│   │    └── utils.ts      ✓</span></span>
<span class="line"><span style="color:#24292e;">│   ├── server             ✓</span></span>
<span class="line"><span style="color:#24292e;">│   │    └── index.ts      ✓</span></span>
<span class="line"><span style="color:#24292e;">├── tests                  ✓</span></span>
<span class="line"><span style="color:#24292e;">│   ├── app.test.ts        ✓</span></span>
<span class="line"><span style="color:#24292e;">│   ├── utils.ts           ✓</span></span>
<span class="line"><span style="color:#24292e;">│   └── tests.d.ts         ✓</span></span>
<span class="line"><span style="color:#24292e;">├── package.json</span></span>
<span class="line"><span style="color:#24292e;">├── tsconfig.json</span></span>
<span class="line"><span style="color:#24292e;">└── yarn.lock</span></span></code></pre></div><p><code>include</code> and <code>exclude</code> support wildcard characters to make glob patterns:</p><ul><li><code>*</code> matches zero or more characters (excluding directory separators)</li><li><code>?</code> matches any one character (excluding directory separators)</li><li><code>**/</code> matches any directory nested to any level</li></ul><p>If a glob pattern doesn&#39;t include a file extension, then only files with supported extensions are included (e.g. <code>.ts</code>, <code>.tsx</code>, and <code>.d.ts</code> by default, with <code>.js</code> and <code>.jsx</code> if <a href="#allowJs"><code>allowJs</code></a> is set to true).</p>`,7),o=[p];function t(c,i,r,d,f,y){return n(),a("div",null,o)}const _=s(l,[["render",t]]);export{h as __pageData,_ as default};
