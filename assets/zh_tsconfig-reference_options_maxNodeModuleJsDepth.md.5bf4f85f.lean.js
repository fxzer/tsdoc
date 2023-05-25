import{_ as t,o as a,c as s,z as e,a as o}from"./chunks/framework.ced88878.js";const x=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Max Node Module JS Depth","oneline":"Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with [`allowJs`](#allowJs)."},"headers":[],"relativePath":"zh/tsconfig-reference/options/maxNodeModuleJsDepth.md","lastUpdated":1681915487000}'),l={name:"zh/tsconfig-reference/options/maxNodeModuleJsDepth.md"},d=e("p",null,[o("The maximum dependency depth to search under "),e("code",null,"node_modules"),o(" and load JavaScript files.")],-1),n=e("p",null,[o("This flag is can only be used when "),e("a",{href:"#allowJs"},[e("code",null,"allowJs")]),o(" is enabled, and is used if you want to have TypeScript infer types for all of the JavaScript inside your "),e("code",null,"node_modules"),o(".")],-1),i=e("p",null,[o("Ideally this should stay at 0 (the default), and "),e("code",null,"d.ts"),o(" files should be used to explicitly define the shape of modules. However, there are cases where you may want to turn this on at the expense of speed and potential accuracy.")],-1),c=[d,n,i];function r(p,h,u,f,m,_){return a(),s("div",null,c)}const J=t(l,[["render",r]]);export{x as __pageData,J as default};
