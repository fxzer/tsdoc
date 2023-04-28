export default function getNavs() {
  return [
    { text: "辅助教程", link: "/zh/tutorials/ASP.NET Core" },
    { text: "手册指南", link: "/zh/handbooks/handbook-v2/Basics", },
    { text: "声明文件", link: "/zh/declaration-files/By Example", },
    { text: "参考文献", link: "/zh/reference/Advanced Types" },
    { text: "项目配置", link: "/zh/tsconfig-reference/" },
    { text: "发布版本", link: "/zh/release-notes/TypeScript[5.0]" },
    {
      text: "在线练习",
      items: [
        { text: 'TS Official', link: 'https://www.typescriptlang.org/play' },
        { text: 'StackBlitz', link: 'https://stackblitz.com/edit/typescript-d6x1ga?file=index.ts' },
        { text: 'TS Lint', link: 'https://typescript-eslint.io/play/' },
        { text: 'SoloLearn', link: 'https://www.sololearn.com/compiler-playground/typescript' },
      ],
    },

  ]
}