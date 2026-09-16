# UI Components

ReactJS front end for Study Palette — semantic search, query builder, visualizations, and data actions.

See the [Front End](../ARCHITECTURE.md#front-end-reactjs) section of the architecture reference for component details.

## Setup

This package depends on `@tis-lab/context-providers`, which is hosted on
GitHub Packages. GitHub requires authentication even for public packages, so
`npm install` fails with a `401` until a token is configured. This is a
one-time setup per machine.

1. Create a personal access token (classic) at
   <https://github.com/settings/tokens> with the **`read:packages`** scope.

2. Add it to your **`~/.npmrc`** — your home directory, never this repository:

   ```text
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
   ```

Never commit a token. GitHub automatically revokes tokens it finds in pushed
code. The `.npmrc` committed here contains only the scope-to-registry mapping,
which is not a secret.

```bash
npm install
npm run dev
```

