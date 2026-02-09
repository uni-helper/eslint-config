import type { OptionsOverrides, TypedFlatConfigItem } from '../types'
import { GLOB_VUE } from '@antfu/eslint-config'

export function uni(options: OptionsOverrides = {}): TypedFlatConfigItem[] {
  const {
    overrides = {},
  } = options

  return [
    {
      files: [GLOB_VUE],
      name: 'uni-helper/vue/rules',
      rules: {
        // Origin
        // 'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        // 'vue/component-options-name-casing': ['error', 'PascalCase'],
        // 'vue/custom-event-name-casing': ['error', 'camelCase'],

        // For uni-app
        'vue/component-name-in-template-casing': 'off',
        'vue/component-options-name-casing': 'off',
        'vue/custom-event-name-casing': 'off',
        'vue/singleline-html-element-content-newline': [
          'error',
          {
            externalIgnores: ['text'],
          },
        ],

        ...overrides,
      },
    },
  ]
}
