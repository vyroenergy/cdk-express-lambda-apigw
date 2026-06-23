# Biome — the linter & formatter

[Biome](https://biomejs.dev) is the **single** formatter, import organiser, and linter for
this repo. **ESLint and Prettier have been removed.** This mirrors the org-wide Biome
configuration rolled out in `core`.

## Commands

```bash
pnpm biome          # check formatting + imports + lint, no writes (what CI runs)
pnpm biome:fix      # apply safe fixes (format + organise imports + safe lint)
pnpm lint           # biome lint .
pnpm lint:fix       # biome lint --write .
pnpm format         # format only, write in place
pnpm format:check   # format check only, no writes
```

CI runs `biome ci .` via [`.github/workflows/biome.yml`](../../.github/workflows/biome.yml)
on every PR, using the official `biomejs/setup-biome` action (no install needed).

## Config

`biome.json` uses Biome's `recommended` preset. The high-volume, judgement-heavy rules
(`noArrayIndexKey`, `useExhaustiveDependencies`, `noNonNullAssertion`, the `a11y` group,
etc.) are set to `warn` so they're visible without blocking; everything else is an error.
Promote `warn` rules to `error` as the codebase is cleaned up.

## ⚠️ This PR does not reformat the codebase

This migration adds the Biome config + CI and removes ESLint/Prettier, but it does **not**
run Biome's auto-fix. CI (`biome ci .`) will fail until the code is formatted. To make it
green, run locally and commit the result:

```bash
pnpm install
pnpm biome:fix
```

## Editor

`.vscode/extensions.json` recommends the `biomejs.biome` extension. Set Biome as your
default formatter with format-on-save and organise-imports-on-save.
