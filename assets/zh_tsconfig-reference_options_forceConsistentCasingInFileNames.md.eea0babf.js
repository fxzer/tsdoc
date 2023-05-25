import{_ as t,o as i,c as n,z as e,a as s}from"./chunks/framework.ced88878.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"display":"Force Consistent Casing In File Names","oneline":"Ensure that casing is correct in imports."},"headers":[],"relativePath":"zh/tsconfig-reference/options/forceConsistentCasingInFileNames.md","lastUpdated":1681915487000}'),o={name:"zh/tsconfig-reference/options/forceConsistentCasingInFileNames.md"},a=e("p",null,[s("TypeScript follows the case sensitivity rules of the file system it's running on. This can be problematic if some developers are working in a case-sensitive file system and others aren't. If a file attempts to import "),e("code",null,"fileManager.ts"),s(" by specifying "),e("code",null,"./FileManager.ts"),s(" the file will be found in a case-insensitive file system, but not on a case-sensitive file system.")],-1),r=e("p",null,"When this option is set, TypeScript will issue an error if a program tries to include a file by a casing different from the casing on disk.",-1),c=[a,r];function l(f,p,d,m,h,_){return i(),n("div",null,c)}const y=t(o,[["render",l]]);export{u as __pageData,y as default};
