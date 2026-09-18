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
npm version <patch|minor|major> --no-git-tag-version
git tag study-palette-ui-v<new version>
npm publish
```

`npm version` tags the whole repository, not `ui/`. Since this is one package
inside a larger repo, `--no-git-tag-version` keeps it from creating a bare
`v0.1.2` tag at the root, which would collide with releases of the repo itself;
the namespaced tag matches the existing `synthetic-corpus-v*` convention.

Published versions are **immutable** — a version number cannot be reused even
after deleting it, so bump rather than republish.

