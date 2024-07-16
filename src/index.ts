import type { OptionsConfig as AntfuOptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import { sortManifestJson, sortPagesJson, sortThemeJson, uni } from './configs'

interface OptionsOverrides {
  overrides?: TypedFlatConfigItem['rules']
}

interface OptionsConfigOverrides extends NonNullable<AntfuOptionsConfig['overrides']> {
  uni?: TypedFlatConfigItem['rules']
}
export interface OptionsConfig extends AntfuOptionsConfig {
  uni?: boolean | OptionsOverrides
  uniJson?: boolean
  /**
   * Provide overrides for rules for each integration.
   *
   * @deprecated use `overrides` option in each integration key instead
   */
  overrides?: OptionsConfigOverrides
}

export function uniHelper(options: OptionsConfig & TypedFlatConfigItem = {}, ...userConfigs: (TypedFlatConfigItem | TypedFlatConfigItem[])[]): FlatConfigComposer<TypedFlatConfigItem, string> {
  const overrides = {
    vue: typeof options.vue === 'object' ? Object.assign(options.overrides?.vue ?? {}, options.vue) : undefined,
    uni: typeof options.uni === 'object' ? Object.assign(options.overrides?.uni ?? {}, options.uni) : undefined,
  }
  const ignoreManifestJSON = isPackageExists('@uni-helper/vite-plugin-uni-manifest') || options.uniJson === false
  const ignorePagesJSON = isPackageExists('@uni-helper/vite-plugin-uni-pages') || options.uniJson === false
  options.ignores = options.ignores || []

  if (ignoreManifestJSON)
    options.ignores.push('**/manifest.json')

  else
    userConfigs.unshift(sortManifestJson())

  if (ignorePagesJSON)
    options.ignores.push('**/pages.json')
  else
    userConfigs.unshift(sortPagesJson())

  if (options.uniJson)
    userConfigs.unshift(sortThemeJson())

  if (options.uni) {
    // force enable vue
    if (!options.vue){
      options.vue = true
    }
    userConfigs.unshift(uni(
      Object.assign(overrides.vue ?? {}, overrides.uni),
    ))
  }

  return antfu(options, ...userConfigs)
}
export default uniHelper
