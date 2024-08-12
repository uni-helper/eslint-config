import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import type { Linter } from 'eslint'
import { antfu } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import { sortManifestJson, sortPagesJson, sortThemeJson, uni } from './configs'

type OptionsConfigOverrides = AntfuOptionsConfig['overrides'] & {
  uni?: FlatConfigItem['rules']
}

export interface OptionsConfig extends AntfuOptionsConfig {
  uni?: boolean
  uniJson?: boolean
  overrides?: OptionsConfigOverrides
}

export function uniHelper(
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
) {
  const {
    uni: enableUni = true,
    uniJson = true,
    overrides = {},
  } = options

  const ignoreManifestJSON = isPackageExists('@uni-helper/vite-plugin-uni-manifest') || uniJson === false
  const ignorePagesJSON = isPackageExists('@uni-helper/vite-plugin-uni-pages') || uniJson === false
  options.ignores = options.ignores || []

  if (ignoreManifestJSON)
    options.ignores.push('**/manifest.json')

  else
    userConfigs.unshift(sortManifestJson())

  if (ignorePagesJSON)
    options.ignores.push('**/pages.json')
  else
    userConfigs.unshift(sortPagesJson())

  if (uniJson)
    userConfigs.unshift(sortThemeJson())

  if (enableUni) {
    // force enable vue
    options.vue = true
    userConfigs.unshift(uni({
      overrides: overrides.uni,
    }))
  }

  return antfu(options, ...userConfigs)
}

export default uniHelper
