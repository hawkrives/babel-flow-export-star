In `typedef.js`, I have a flow type.

```js
// @flow

export type Base = {str: string};
```

In `export.js`, I want to export all of the types from `typedef.js`, without naming them individually.

```js
// @flow

export type * from './typedef.js';
```

In `index.js`, which could be another package entirely, I want to use one of the types exported by `export.js`.

```js
// @flow

import {type Base} from './export';

let dog: Base = {str: "a string"};

// $FlowExpectedError
let cat: Base = {str: Infinity};
```

---

Flow supports this, as of v0.58 at least:

```ShellSession
$ npm run flow

> babel-flow-export-star@1.0.0 flow ~example/babel-flow-export-star
> flow

No errors!
```

However, Babel does not (v6.26.0):

```ShellSession
npm run babel

> babel-flow-export-star@1.0.0 babel ~example/babel-flow-export-star
> babel *.js --out-dir compiled/

SyntaxError: export.js: Unexpected token (3:12)
  1 | // @flow
  2 |
> 3 | export type * from './typedef.js';
    |             ^
  4 |
```

---

I haven't found documentation for this on the Flow side, but I attempted it because it seemed to mirror the ES2017 proposed import/export extensions.

If you remove the `// $FlowExpectedError` comment in `index.js`, you will see that flow is indeed type checking everything.

You can also replace `export type * from './typedef.js';` with the equivalent Flow comment syntax, `/*:: export type * from './typedef.js'; */`; then, both Babel and Flow are happy.
