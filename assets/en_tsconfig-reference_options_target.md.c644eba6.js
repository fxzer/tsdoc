import{_ as e,o as t,c as o,V as a}from"./chunks/framework.ced88878.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Target","oneline":"Set the JavaScript language version for emitted JavaScript and include compatible library declarations."},"headers":[],"relativePath":"en/tsconfig-reference/options/target.md","lastUpdated":1681915487000}'),r={name:"en/tsconfig-reference/options/target.md"},n=a('<p>Modern browsers support all ES6 features, so <code>ES6</code> is a good choice. You might choose to set a lower target if your code is deployed to older environments, or a higher target if your code is guaranteed to run in newer environments.</p><p>The <code>target</code> setting changes which JS features are downleveled and which are left intact. For example, an arrow function <code>() =&gt; this</code> will be turned into an equivalent <code>function</code> expression if <code>target</code> is ES5 or lower.</p><p>Changing <code>target</code> also changes the default value of <a href="#lib"><code>lib</code></a>. You may &quot;mix and match&quot; <code>target</code> and <code>lib</code> settings as desired, but you could just set <code>target</code> for convenience.</p><p>For developer platforms like Node there are baselines for the <code>target</code>, depending on the type of platform and its version. You can find a set of community organized TSConfigs at <a href="https://github.com/tsconfig/bases#centralized-recommendations-for-tsconfig-bases" target="_blank" rel="noreferrer">tsconfig/bases</a>, which has configurations for common platforms and their versions.</p><p>The special <code>ESNext</code> value refers to the highest version your version of TypeScript supports. This setting should be used with caution, since it doesn&#39;t mean the same thing between different TypeScript versions and can make upgrades less predictable.</p>',5),s=[n];function i(c,d,l,p,f,h){return t(),o("div",null,s)}const m=e(r,[["render",i]]);export{u as __pageData,m as default};
