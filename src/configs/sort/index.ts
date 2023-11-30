import type { FlatConfigItem } from '@antfu/eslint-config'
import { manifestRules } from './manifestRules'
import { pagesRules } from './pagesRules'
import { themeRules } from './themeRules'

export function sortManifestJson(): FlatConfigItem[] {
  return [
    {
      files: ['**/manifest.json'],
      name: 'uni-helper:sort-manifest-json',
      rules: manifestRules,
    },
  ]
}

export function sortPagesJson(): FlatConfigItem[] {
  return [
    {
      files: ['**/pages.json'],
      name: 'uni-helper:sort-pages-json',
      rules: pagesRules,
    },
  ]
}

export function sortThemeJson(): FlatConfigItem[] {
  return [
    {
      files: ['**/theme.json'],
      name: 'uni-helper:sort-theme-json',
      rules: themeRules,
    },
  ]
}
