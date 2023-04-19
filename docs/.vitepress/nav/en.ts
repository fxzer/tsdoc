export default function getNavs() {
  return [
    { text: "Tutorials", link: "/en/tutorials/ASP.NET Core" },
    { text: "HandBooks", link: "/en/handbooks/handbook-v2/Basics", },
    { text: "DeclarationFiles", link: "/en/declaration-files/By Example", },
    { text: "Reference", link: "/en/reference/Advanced Types" },
    { text: "TSConfig", link: "/en/tsconfig-reference/" },
    { text: "ReleaseNotes", link: "/en/release-notes/TypeScript[5.0]" },
    {
      text: "PlayGround",
      items: [
        { text: 'TS Official', link: 'https://www.typescriptlang.org/play' },
        { text: 'StackBlitz', link: 'https://stackblitz.com/edit/typescript-d6x1ga?file=index.ts' },
        { text: 'TS Lint', link: 'https://typescript-eslint.io/play/' },
        { text: 'SoloLearn', link: 'https://www.sololearn.com/compiler-playground/typescript' },
      ],
    },

  ]
}