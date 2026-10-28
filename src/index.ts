import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import { antfu } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import { globals, sortManifestJson, sortPagesJson, sortThemeJson, uni } from './configs'

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
    userConfigs.unshift(uni({ overrides: uniOverrides }))
  }

  userConfigs.push(globals())

  return antfu(options, ...userConfigs)
}

export default uniHelper
