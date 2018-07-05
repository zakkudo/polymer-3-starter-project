# src

This folder contains the primary modules of the project.  The lib library could easily be spun out into it's own share libarary.  They all use webpack aliases so you can reference them using imports like:

```js
import Toggle from 'lib/components/Toggle';
```

It's best to use a babel plugin like babel-plugin-relative-import <https://github.com/mgcrea/babel-plugin-relative-import> to convert the webpack paths to standard paths before deploying to an npm repository.
