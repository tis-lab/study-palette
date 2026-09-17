# UI Components

ReactJS front end for Study Palette — semantic search, query builder, visualizations, and data actions.

See the [Front End](../ARCHITECTURE.md#front-end-reactjs) section of the architecture reference for component details.

## Publishing

This package is published to GitHub Packages, which requires authentication.

1. Create a personal access token (classic) at
   <https://github.com/settings/tokens> with the **`write:packages`** scope.

2. Add it to your **`~/.npmrc`** — your home directory, never this repository:

   ```text
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
   ```

Never commit a token. GitHub automatically revokes tokens it finds in pushed
code. The `.npmrc` committed here contains only the scope-to-registry mapping,
which is not a secret.

```bash
npm version <patch|minor|major>
npm publish
```

Published versions are **immutable** — a version number cannot be reused even
after deleting it, so bump rather than republish.

