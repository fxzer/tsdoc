export default function getNavs() {
  return [
    { text: "Tutorials", link: "/tutorials/ASP.NET Core" },
    { text: "HandBooks", link: "/handbooks/handbook-v2/Basics", },
    { text: "DeclarationFiles", link: "/declaration-files/By Example", },
    { text: "Reference", link: "/reference/Advanced Types" },
    { text: "TSConfig", link: "/tsconfig-reference/" },
    { text: "ReleaseNotes", link: "/release-notes/TypeScript[5.0]" },
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