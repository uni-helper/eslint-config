import { GLOB_VUE } from '@antfu/eslint-config'
import type { FlatConfigItem, OptionsOverrides } from '@antfu/eslint-config'

export function uni(options: OptionsOverrides = {}): FlatConfigItem[] {
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
