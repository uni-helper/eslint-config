import type { OptionsConfig as AntfuOptionsConfig, ConfigItem } from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'
import { sortManifestJson, sortPagesJson, sortThemeJson, uni } from './config'

type OptionsConfigOverrides = AntfuOptionsConfig['overrides'] & {
  uni?: ConfigItem['rules']
}

export interface OptionsConfig extends AntfuOptionsConfig {
  uni?: boolean
  uniJson?: boolean
  overrides?: OptionsConfigOverrides
}

export function uniHelper(options: OptionsConfig & ConfigItem = {}, ...userConfigs: (ConfigItem | ConfigItem[])[]) {
  const {
    uni: enableUni = true,
    uniJson = true,
    overrides = {},
    typescript: enableTypeScript = isPackageExists('typescript'),
  } = options

  const stylisticOptions = options.stylistic === false
    ? false
    : typeof options.stylistic === 'object'
      ? options.stylistic
      : {}
  if (stylisticOptions && !('jsx' in stylisticOptions))
    stylisticOptions.jsx = options.jsx ?? true

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
    // force disable vue
    options.vue = false
    userConfigs.unshift(uni({
      overrides: overrides.uni,
      typescript: !!enableTypeScript,
      stylistic: stylisticOptions,
    }))
  }

  const config = antfu(options, ...userConfigs)

  return config
}

export default uniHelper
