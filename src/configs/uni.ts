import { GLOB_VUE } from '@antfu/eslint-config'
import type { ConfigItem, OptionsOverrides } from '@antfu/eslint-config'

export function uni(options: OptionsOverrides = {}): ConfigItem[] {
  const {
    overrides = {},
  } = options

  return [
    {
      files: [GLOB_VUE],
      name: 'uni:vue:rules',
      rules: {
        ...overrides,
      },
    },
  ]
}
