import type { FlatConfigItem } from '@antfu/eslint-config'
import {
  appPlusOder,
  networkTimeoutOder,
  rootOder,
} from './order'

export const manifestRules: FlatConfigItem['rules'] = {
  'jsonc/sort-array-values': [
    'error',
    {
      order: { type: 'asc' },
      pathPattern: '^files$',
    },
  ],
  'jsonc/sort-keys': [
    'error',
    rootOder,
    networkTimeoutOder,
    appPlusOder,
  ],
}
