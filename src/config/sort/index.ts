import type { ConfigItem } from '@antfu/eslint-config'
import { manifestRules } from './manifestRules'
import { pagesRules } from './pagesRules'

export function sortManifestJson(): ConfigItem[] {
  return [
    {
      files: ['**/manifest.json'],
      name: 'uni-helper:sort-manifest-json',
      rules: manifestRules,
    },
  ]
}

export function sortPagesJson(): ConfigItem[] {
  return [
    {
      files: ['**/pages.json'],
      name: 'uni-helper:sort-pages-json',
      rules: pagesRules,
    },
  ]
}
