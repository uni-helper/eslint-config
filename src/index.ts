import type { OptionsConfig as AntfuOptionsConfig, ConfigItem } from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import { sortManifestJson, sortPagesJson, uni } from './config'

type OptionsConfigOverrides = AntfuOptionsConfig['overrides'] & {
  uni?: ConfigItem['rules']
}

export interface OptionsConfig extends AntfuOptionsConfig {
  uni?: boolean
  overrides?: OptionsConfigOverrides
}

export function uniHelper(options: OptionsConfig & ConfigItem = {}, ...userConfigs: (ConfigItem | ConfigItem[])[]) {
  const {
    uni: enableUni = true,
    overrides = {},
  } = options

  const ignoreManifestJSON = isPackageExists('@uni-helper/vite-plugin-uni-manifest')
  const ignorePagesJSON = isPackageExists('@uni-helper/vite-plugin-uni-pages')
  options.ignores = options.ignores || []

  if (ignoreManifestJSON)
    options.ignores.push('**/manifest.json')

  else
    userConfigs.unshift(sortManifestJson())

  if (ignorePagesJSON)
    options.ignores.push('**/pages.json')
  else
    userConfigs.unshift(sortPagesJson())

  if (enableUni) {
    userConfigs.unshift(uni({
      overrides: overrides.uni,
    }))
  }

  return antfu(options, ...userConfigs)
}

export default uniHelper
