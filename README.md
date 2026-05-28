# @acamarata/tsconfig

Shared TypeScript configs for acamarata packages. Four variants covering the common cases: a strict base, a publishable library, a Node.js tool, and a React app.

## Install

```sh
pnpm add -D @acamarata/tsconfig
```

## Variants

| Config | Extends | Use case |
|--------|---------|----------|
| `tsconfig.base.json` | — | Strict base. All other variants extend this. Use it directly only if none of the others fit. |
| `tsconfig.library.json` | base | Publishable npm libraries. ESNext modules, `declaration: true`, `declarationMap: true`, `sourceMap: true`. |
| `tsconfig.node.json` | base | Node.js tools and scripts. CommonJS output, `@types/node` included. |
| `tsconfig.react.json` | base | React apps. Adds `jsx: react-jsx` and the DOM lib. |

## Usage

In your `tsconfig.json`, set `extends` to the variant that matches your project:

```json
{
  "extends": "@acamarata/tsconfig/tsconfig.library.json",
  "compilerOptions": {
    "rootDir": "src"
  },
  "include": ["src"]
}
```

For a Node.js CLI tool:

```json
{
  "extends": "@acamarata/tsconfig/tsconfig.node.json",
  "compilerOptions": {
    "rootDir": "src"
  },
  "include": ["src"]
}
```

For a React app:

```json
{
  "extends": "@acamarata/tsconfig/tsconfig.react.json",
  "include": ["src"]
}
```

## What the base config enables

- `strict: true` — the full strict family of checks
- `skipLibCheck: true` — skips checking declaration files in `node_modules`
- `noUncheckedIndexedAccess: true` — array index access includes `undefined` in the type
- `exactOptionalPropertyTypes: true` — distinguishes `{ x?: string }` from `{ x: string | undefined }`
- `target: ES2022` — modern output; no polyfill overhead for `async/await`, `class fields`, `at()`
- `moduleResolution: bundler` — resolves `.ts` extensions naturally in bundler pipelines (tsup, Vite, esbuild)

## License

MIT
