import type { OptionsOverrides, TypedFlatConfigItem } from '../types'

export function sortPagesJson(options: OptionsOverrides = {}): TypedFlatConfigItem[] {
  const {
    overrides = {},
  } = options

  return [
    {
      files: ['**/pages.json'],
      name: 'uni-helper/sort-pages-json/rules',
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
              'pages',
              'condition',
              'globalStyle',
              'tabBar',
              'easycom',
              'topWindow',
              'leftWindow',
              'rightWindow',
              'subPackages',
              'preloadRule',
              'workers',
              'uniIdRouter',
              'entryPagePath',
            ],
            pathPattern: '^$',
          },
        ],

        ...overrides,
      },
    },
  ]
}
