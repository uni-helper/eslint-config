import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import { antfu, GLOB_VUE } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import { GLOB_UNI_SFC, globals, sortManifestJson, sortPagesJson, sortThemeJson, uni, UNI_SFC_EXTS, UNI_TS_EXTS } from './configs'

export * from './types'

// eslint-disable-next-line ts/explicit-function-return-type
export function uniHelper(
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
) {
  const {
    uni: uniOptions = true,
    uniJson: uniJsonOptions = true,
  } = options

  // `false` disables; an overrides object implies enabled
  const enableUni = uniOptions !== false
  const enableUniJson = uniJsonOptions !== false
  const uniOverrides = typeof uniOptions === 'boolean'
    ? {}
    : uniOptions.overrides
  const uniJsonOverrides = typeof uniJsonOptions === 'boolean'
    ? {}
    : uniJsonOptions.overrides

  const ignoreManifestJSON = isPackageExists('@uni-helper/vite-plugin-uni-manifest') || !enableUniJson
  const ignorePagesJSON = isPackageExists('@uni-helper/vite-plugin-uni-pages') || !enableUniJson
  options.ignores = options.ignores || []

  if (ignoreManifestJSON)
    options.ignores.push('**/manifest.json')
  else
    userConfigs.unshift(sortManifestJson({ overrides: uniJsonOverrides }))

  if (ignorePagesJSON)
    options.ignores.push('**/pages.json')
  else
    userConfigs.unshift(sortPagesJson({ overrides: uniJsonOverrides }))

  if (enableUniJson)
    userConfigs.unshift(sortThemeJson({ overrides: uniJsonOverrides }))

  if (enableUni) {
    // Force enable vue
    options.vue = options.vue || true

    const vueOptions = typeof options.vue === 'object'
      ? options.vue
      : {}
    // antfu's Vue config hardcodes `files: [GLOB_VUE]`; its `componentExts`
    // never reaches it, so the extension globs have to be injected here
    options.vue = {
      ...vueOptions,
      files: [
        ...(vueOptions.files ?? [GLOB_VUE]),
        ...GLOB_UNI_SFC,
      ],
    }
    // `componentExts` feeds the TypeScript config's files globs and
    // `extraFileExtensions`: it gives `.nvue` / `.uvue` the TypeScript parser and
    // rules, and is the only thing that makes `.uts` match a config at all.
    options.componentExts = [
      ...new Set([
        ...(options.componentExts ?? []),
        ...UNI_SFC_EXTS,
        ...UNI_TS_EXTS,
      ]),
    ]

    userConfigs.unshift(uni({ overrides: uniOverrides }))
  }

  userConfigs.push(globals())

  return antfu(options, ...userConfigs)
}

export default uniHelper
