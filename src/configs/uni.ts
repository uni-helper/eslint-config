import { GLOB_VUE } from '@antfu/eslint-config'
import type { OptionsOverrides, TypedFlatConfigItem } from '@antfu/eslint-config'

export function uni(options: OptionsOverrides = {}): TypedFlatConfigItem[] {
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
