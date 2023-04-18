export default function getNavs() {
  return [
    { text: "GetStarted", link: "/get-started/TS for Functional Programmers" },
    { text: "Tutorials", link: "/tutorials/ASP.NET Core" },
    { text: "HandBooks", link: "/handbooks/handbook-v2/Basics", },
    { text: "DeclarationFiles", link: "/declaration-files/By Example", },
    { text: "ProjectConfig", link: "/project-config/Compiler Options in MSBuild", },
    { text: "Reference", link: "/reference/Advanced Types" },
    { text: "Javascript", link: "/javascript/Creating DTS files From JS" },
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