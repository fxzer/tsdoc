import{_ as s,o as a,c as n,V as o}from"./chunks/framework.ced88878.js";const C=JSON.parse('{"title":"keyof 类型运算符","description":"","frontmatter":{},"headers":[],"relativePath":"zh/handbooks/handbook-v2/Type Manipulation/Keyof Type Operator.md","lastUpdated":1682921420000}'),l={name:"zh/handbooks/handbook-v2/Type Manipulation/Keyof Type Operator.md"},p=o(`<h1 id="keyof-类型运算符" tabindex="-1"><code>keyof</code> 类型运算符 <a class="header-anchor" href="#keyof-类型运算符" aria-label="Permalink to &quot;\`keyof\` 类型运算符&quot;">​</a></h1><p><code>keyof</code> 运算符采用对象类型并生成其键的字符串或数字文字联合。 下面的类型P是同类型： &quot;x&quot; | &quot;y&quot;：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">type</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Point</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> { x</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">; y</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;"> };</span></span>
<span class="line"><span style="color:#F286C4;">type</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">P</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">keyof</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Point</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#7B7F8B;">//   ^?</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Point</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { </span><span style="color:#E36209;">x</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">; </span><span style="color:#E36209;">y</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> };</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">P</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">keyof</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Point</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">//   ^?</span></span></code></pre></div><p>如果该类型具有<code>string</code>或<code>number</code>索引签名，则<code>keyof</code>将返回这些类型：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula-soft vp-code-dark"><code><span class="line"><span style="color:#F286C4;">type</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Arrayish</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> { [</span><span style="color:#FFB86C;font-style:italic;">n</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">number</span><span style="color:#F6F6F4;">]</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">unknown</span><span style="color:#F6F6F4;"> };</span></span>
<span class="line"><span style="color:#F286C4;">type</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">A</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">keyof</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Arrayish</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#7B7F8B;">//   ^?</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F286C4;">type</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Mapish</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> { [</span><span style="color:#FFB86C;font-style:italic;">k</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">string</span><span style="color:#F6F6F4;">]</span><span style="color:#F286C4;">:</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">boolean</span><span style="color:#F6F6F4;"> };</span></span>
<span class="line"><span style="color:#F286C4;">type</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">M</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">=</span><span style="color:#F6F6F4;"> </span><span style="color:#F286C4;">keyof</span><span style="color:#F6F6F4;"> </span><span style="color:#97E1F1;font-style:italic;">Mapish</span><span style="color:#F6F6F4;">;</span></span>
<span class="line"><span style="color:#7B7F8B;">//   ^?</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Arrayish</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { [</span><span style="color:#E36209;">n</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">unknown</span><span style="color:#24292E;"> };</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">A</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">keyof</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Arrayish</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">//   ^?</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Mapish</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { [</span><span style="color:#E36209;">k</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">]</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">boolean</span><span style="color:#24292E;"> };</span></span>
<span class="line"><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">M</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">keyof</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Mapish</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">//   ^?</span></span></code></pre></div><p>请注意，在此示例中，<code>M</code> 是<code>string | number</code> 这是因为 JavaScript 对象键总是被强制转换为字符串，所以 <code>obj[0]</code> 总是与 <code>obj[&quot;0&quot;]</code> 相同。</p><p><code>keyof</code> 类型在与映射类型结合使用时变得特别有用，我们将在后面详细介绍。</p>`,7),e=[p];function t(c,r,y,F,i,d){return a(),n("div",null,e)}const f=s(l,[["render",t]]);export{C as __pageData,f as default};
