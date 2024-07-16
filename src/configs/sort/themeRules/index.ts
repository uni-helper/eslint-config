import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export const themeRules: TypedFlatConfigItem['rules'] = {
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
}
