# @uni-helper/eslint-config

Wraps `@antfu/eslint-config` with uni-app adaptations: relaxed Vue naming rules, platform globals, and JSON key sorting for `manifest.json` / `pages.json` / `theme.json`.

## Project

- **Language/runtime:** TypeScript, `"type": "module"`, ESM-only output. Dev pins Node 26 via `.node-version` and `devEngines.runtime`; no published `engines` field (CONTRIBUTING names 26 as the dev minimum).
- **Toolchain:** tsdown (build), vitest (test), @antfu/eslint-config (lint: the repo lints itself with `type: 'lib'`), pnpm 12.15.0 (pinned via `packageManager` and `devEngines.packageManager`).
- **Package:** `@uni-helper/eslint-config`. Single entry `.` exporting default `uniHelper()` plus the named export; ships `dist/index.mjs` + bundled `index.d.mts`. ESM only.
- **Peer deps:** `eslint ^10.0.0`, `@antfu/eslint-config ^10.0.0`. The README's 兼容性 table documents older pairings; every row was verified against npm-published peerDependencies.
- **Workspace:** `pnpm-workspace.yaml` has no `packages:` glob: it centralizes versions via `catalog:` and sets trust/build policy, `shellEmulator`, and `catalogMode: prefer`. The repo root is the published package.

## Commands

```bash
pnpm build       # tsdown → dist/ (ESM + dts) — required before test
pnpm dev         # tsdown --watch
pnpm test        # vitest (fixture-driven; spawns the repo-local eslint binary)
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint .
pnpm lint:fix    # eslint . --fix
pnpm release     # bumpp — pushing the tag triggers .github/workflows/release.yml (changelogithub + pnpm publish)
```

CI (`.github/workflows/ci.yml`) runs build → lint → test → typecheck on Node 22/24/26 × ubuntu/macos/windows.

## Architecture

| Module | Role |
|---|---|
| `src/index.ts` | Entry: `uniHelper(options, ...userConfigs)`. Reads `uni` / `uniJson` (both default `true`), composes configs into antfu's `antfu()` and returns the flat config array |
| `src/types.ts` | `OptionsConfig` = antfu's `OptionsConfig` + `uni` / `uniJson` (boolean or overrides object); re-declares `vue` to add the `files` key antfu's `vue()` accepts but does not type |
| `src/configs/uni.ts` | Vue rules for uni-app: turns off component-name / event-name casing rules, special-cases `singleline-html-element-content-newline` to ignore `<text>`, disables the two TypeScript rules whose fixes UTS rejects, and adds the `.uvue` globals block. Also exports `UNI_SFC_EXTS` / `GLOB_UNI_SFC` (`.nvue`, `.uvue`) and `UNI_TS_EXTS` / `GLOB_UNI_UTS` (`.uts`), which `src/index.ts` feeds into antfu's Vue and TypeScript configs |
| `src/configs/globals.ts` | Platform globals (`uni`, `wx`, `my`, `tt`, `qq`, `dd`, `ks`, …) registered through `FlatCompat` |
| `src/configs/sortManifestJson.ts` / `sortPagesJson.ts` / `sortThemeJson.ts` | `jsonc/sort-keys` (+ `jsonc/sort-array-values` for manifest `files`) encoding uni-app's official key order |
| `test/fixtures.test.ts` | Copies `fixtures/input` into a temp dir, generates an `eslint.config.js` that imports the built package, runs `eslint --fix`, and file-snapshots every result against `fixtures/output/<case>` |
| `test/uvue-globals.test.ts` | Drives the ESLint API with `typescript: false` to check the `.uvue` globals block (inclusion, scoping to `.uvue`, and that `no-undef` still fires for unknown names). The fixture suite cannot express this: its `.uvue` samples use `lang="uts"`, which espree cannot parse |

### Behavior notes

- **nvue / uvue / uts:** antfu's Vue config hardcodes `files: [GLOB_VUE]` and its `componentExts` option never reaches it, so `src/index.ts` sets `vue.files` (an `OptionsVue` key antfu's `vue()` reads but does not type) and separately extends `componentExts`, which is what puts the two SFC extensions under the TypeScript config and stops `no-undef` from reporting their globals. `.uts` only needs that second half, so it is an entry in `componentExts` too. All three live under `uni: true`; with `uni: false` no config matches them and ESLint skips them. Fixtures `page.nvue` / `page.uvue` / `util.uts` guard the moving parts: `vue.files`, `componentExts`, and the `uni()` rules glob.
- **UTS rule switches:** `ts/consistent-type-definitions` and `ts/prefer-as-const` are off for `.uts` and `.uvue`. Both rules would rewrite UTS into code the compiler rejects: object literals can only be typed with `type`, and UTS has no `as const`. Fixtures `util.uts` and `page.uvue` each keep a `type` and a literal type annotation, so the guard fails if either rule comes back.
- **`.uvue` globals:** the `**/*.uvue` block in `src/configs/uni.ts` lists the composition-API page lifecycles and UTS platform objects. It only changes output when TypeScript support is off, because `no-undef` is disabled for TypeScript files. Keep the names in sync with the uni-app x page docs.
- **Block order:** `vue/block-order` stays at antfu's default, so `<script>` precedes `<template>` in `.vue`, `.nvue` and `.uvue`. This is deliberate; do not add a uni-app override.
- `globals()` is pushed unconditionally. The `uni: false` option only drops the Vue rule adaptations. The README says this explicitly; keep the two in sync.
- Smart detection: when `@uni-helper/vite-plugin-uni-manifest` / `@uni-helper/vite-plugin-uni-pages` is installed (`local-pkg`'s `isPackageExists`), the matching JSON file is pushed onto `options.ignores` instead of getting a sort config. The user-provided `ignores` array is extended, never replaced. `theme.json` sorting depends only on `uniJson`.
- Tests execute the built `dist/` (the generated config imports `@uni-helper/eslint-config`, which resolves to `dist/`), so run `pnpm build` after changing `src/` before expecting test results to move.

## Conventions

- **Linting:** @antfu/eslint-config `type: 'lib'`, no Prettier; `fixtures/` is ignored.
- **Comments:** English, concise, explain the "why".
- **Testing:** fixture-driven. Add a case file under `fixtures/input`, run the suite, review the produced snapshots in `fixtures/output/{json,uni}`, and commit them as the expected state. Unchanged files snapshot as `// unchanged`. Behavior the fixtures cannot express goes through the ESLint API in `test/`.
- **Branches:** `feat/xxx`, `fix/xxx`, `docs/xxx`; Conventional Commits format.
- **Versioning:** each minor line pairs with specific `eslint` / `@antfu/eslint-config` peer ranges; when changing peer deps, add a row to the README 兼容性 table for the next release.
