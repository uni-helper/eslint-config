import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import { manifestRules } from './manifestRules'
import { pagesRules } from './pagesRules'
import { themeRules } from './themeRules'

export function sortManifestJson(): TypedFlatConfigItem[] {
  return [
    {
      files: ['**/manifest.json'],
      name: 'uni-helper:sort-manifest-json',
      rules: manifestRules,
    },
  ]
}

export function sortPagesJson(): TypedFlatConfigItem[] {
  return [
    {
      files: ['**/pages.json'],
      name: 'uni-helper:sort-pages-json',
      rules: pagesRules,
    },
  ]
}

export function sortThemeJson(): TypedFlatConfigItem[] {
  return [
    {
      files: ['**/theme.json'],
      name: 'uni-helper:sort-theme-json',
      rules: themeRules,
    },
  ]
}
