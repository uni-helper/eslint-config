import type { OptionsConfig as AntfuOptionsConfig, ConfigItem } from '@antfu/eslint-config'
import { antfu } from '@antfu/eslint-config'
import { uni } from './config'

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

  if (enableUni) {
    userConfigs.unshift(uni({
      overrides: overrides.uni,
    }))
  }

  return antfu(options, ...userConfigs)
}

export default uniHelper
