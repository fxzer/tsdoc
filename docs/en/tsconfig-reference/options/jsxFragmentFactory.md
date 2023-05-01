---
display: "jsxFragmentFactory"
oneline: "Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'."
---

Specify the JSX fragment factory function to use when targeting react JSX emit with [`jsxFactory`](#jsxFactory) compiler option is specified, e.g. `Fragment`.

For example with this TSConfig:

```json tsconfig
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  }
}
```

This TSX file:

```tsx
import { h, Fragment } from "preact";

const HelloWorld = () => (
  <>
    <div>Hello</div>
  </>
);
```

Would look like:

```tsx 
// @showEmit
// @showEmittedFile: index.js
// @jsxFactory: h
// @jsxFragmentFactory: Fragment
// @noErrors
// @target: esnext
// @module: commonjs

import { h, Fragment } from "preact";

const HelloWorld = () => (
  <>
    <div>Hello</div>
  </>
);
```

This option can be used on a per-file basis too similar to [Babel's `/* @jsxFrag h */` directive](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#fragments).

For example:

```tsx 
/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from "preact";

const HelloWorld = () => (
  <>
    <div>Hello</div>
  </>
);
```
