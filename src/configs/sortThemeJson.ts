import type { OptionsOverrides, TypedFlatConfigItem } from '../types'

export function sortThemeJson(options: OptionsOverrides = {}): TypedFlatConfigItem[] {
  const {
    overrides = {},
  } = options

  return [
    {
      files: ['**/theme.json'],
      name: 'uni-helper/sort-theme-json/rules',
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: { type: 'asc' },
            pathPattern: '^files$',
          },
        ],
        'jsonc/sort-keys': [
          'error',
          {
            order: [
              'light',
              'dark',
            ],
            pathPattern: '^$',
          },
          {
            order: { type: 'asc' },
            pathPattern: '^(light|dark)$',
          },
        ],

        ...overrides,
      },
    },
  ]
}
