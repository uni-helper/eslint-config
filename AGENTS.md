# @uni-helper/eslint-config

Wraps `@antfu/eslint-config` with uni-app adaptations: relaxed Vue naming rules, platform globals, and JSON key sorting for `manifest.json` / `pages.json` / `theme.json`.

## Project

- **Language/runtime:** TypeScript, `"type": "module"`, ESM-only output. Dev pins Node 26 via `.node-version` and `devEngines.runtime`; no published `engines` field (CONTRIBUTING names 26 as the dev minimum).
- **Toolchain:** tsdown (build), vitest (test), @antfu/eslint-config (lint — the repo lints itself with `type: 'lib'`), pnpm 12.3.4 (pinned via `packageManager` and `devEngines.packageManager`).
- **Package:** `@uni-helper/eslint-config` — single entry `.` exporting default `uniHelper()` plus the named export; ships `dist/index.mjs` + bundled `index.d.mts`. ESM only.
- **Peer deps:** `eslint ^10.0.0`, `@antfu/eslint-config ^7.0.0 || ^8.0.0 || ^9.0.0`. The README's 兼容性 table documents older pairings; every row was verified against npm-published peerDependencies.
- **Workspace:** `pnpm-workspace.yaml` has no `packages:` glob — it only centralizes versions via `catalog:` and sets trust/build policy. The repo root is the published package.

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
| `src/index.ts` | Entry — `uniHelper(options, ...userConfigs)`. Reads `uni` / `uniJson` (both default `true`), composes configs into antfu's `antfu()` and returns the flat config array |
| `src/types.ts` | `OptionsConfig` = antfu's `OptionsConfig` + `uni` / `uniJson` (boolean or overrides object) |
| `src/configs/uni.ts` | Vue rules for uni-app: turns off component-name / event-name casing rules, special-cases `singleline-html-element-content-newline` to ignore `<text>` |
| `src/configs/globals.ts` | Platform globals (`uni`, `wx`, `my`, `tt`, `qq`, `dd`, `ks`, …) registered through `FlatCompat` |
| `src/configs/sortManifestJson.ts` / `sortPagesJson.ts` / `sortThemeJson.ts` | `jsonc/sort-keys` (+ `jsonc/sort-array-values` for manifest `files`) encoding uni-app's official key order |
| `test/fixtures.test.ts` | Copies `fixtures/input` into a temp dir, generates an `eslint.config.js` that imports the built package, runs `eslint --fix`, and file-snapshots every result against `fixtures/output/<case>` |

### Behavior notes

- `globals()` is pushed unconditionally — the `uni: false` option only drops the Vue rule adaptations. The README says this explicitly; keep the two in sync.
- Smart detection: when `@uni-helper/vite-plugin-uni-manifest` / `@uni-helper/vite-plugin-uni-pages` is installed (`local-pkg`'s `isPackageExists`), the matching JSON file is pushed onto `options.ignores` instead of getting a sort config. The user-provided `ignores` array is extended, never replaced. `theme.json` sorting depends only on `uniJson`.
- Tests execute the built `dist/` (the generated config imports `@uni-helper/eslint-config`, which resolves to `dist/`), so run `pnpm build` after changing `src/` before expecting test results to move.

## Conventions

- **Linting:** @antfu/eslint-config `type: 'lib'`, no Prettier; `fixtures/` is ignored.
- **Comments:** English, concise, explain the "why".
- **Testing:** fixture-driven — add a case file under `fixtures/input`, run the suite, review the produced snapshots in `fixtures/output/{json,uni}`, and commit them as the expected state. Unchanged files snapshot as `// unchanged`.
- **Branches:** `feat/xxx`, `fix/xxx`, `docs/xxx`; Conventional Commits format.
- **Versioning:** each minor line pairs with specific `eslint` / `@antfu/eslint-config` peer ranges; when changing peer deps, add a row to the README 兼容性 table for the next release.
