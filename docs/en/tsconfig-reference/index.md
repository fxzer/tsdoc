## Foreword
A TSConfig file in a directory indicates that the directory is the root of a TypeScript or JavaScript project.
The TSConfig file can be either a `tsconfig.json` or `jsconfig.json`, both have the same set of config variables.

This page covers all of the different options available inside a TSConfig file. There are over 100 options, and this page is not built to be read from top to bottom. Instead it has five main sections:

- A categorized overview of all compiler flags
- The [root fields](#Project_Files_0) for letting TypeScript know what files are available
- The [`compilerOptions`](#compilerOptions) fields, this is the majority of the document
- The [`watchOptions`](#watchOptions) fields, for tweaking the watch mode
- The [`typeAcquisition`](#typeAcquisition) fields, for tweaking the how types are added to JavaScript projects

If you are starting a TSConfig from scratch, you may want to consider using `tsc --init` to bootstrap or use a [TSConfig base](https://github.com/tsconfig/bases#centralized-recommendations-for-tsconfig-bases).


## Generating the TSConfig Reference

This "package" hosts multi-lingual docs for the TSConfig. As much as possible is based
off pulling data from `require("typescript")` then augmented with markdown from inside the
[`./copy`](./copy) folder.

Roughly:

```sh
TypeScript Compiler + `tsconfigRules.ts` -> `generateJSON.ts` -> JSON (in output) -> `generateMarkdown.ts` -> Markdown (in output)
```

This happens per-language with fallbacks to English for any missing docs.

## Contributing

To improve a single compiler option's documentation; all you need to do is go into the [`./copy`](./copy) folder and
edit the page option in markdown and send a PR. No need to leave GitHub.

Then, during a deploy, all of the markdown files are bundled together and any merged changes are uploaded.

## Contributing a new language

If you'd like to create a new language:

Create a new subfolder in `./copy` with your language code and then make sure the files you work on have the same
name as English and your changes will overwrite the English version. You will need

## Building

The TSConfig reference is created by a two step process:

- Creating the JSON dump of all the useful info via [`./scripts/generateJSON.ts`](scripts/generateJSON.ts) which you can find in [`./data`](./data).
- A script which uses the JSON, and the copy to generate per-language markdown docs which are picked up by the typescriptlang-org Gatsby site at `http://localhost:8000/tsconfig`

You can run these commands from the root of the repo:

```sh
yarn workspace tsconfig-reference run generate-json

yarn workspace tsconfig-reference run generate-markdown
```

You can validate any codeblocks which use  via the script:

```sh
yarn workspace tsconfig-reference run test

# or to just run the linter without a build
yarn workspace tsconfig-reference run lint

# or to just one one linter
yarn workspace tsconfig-reference run lint resolveJson
```

You can debug  by setting the environment var `DEBUG="*"` in all of these too.
