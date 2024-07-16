import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import {
  appPlusOder,
  networkTimeoutOder,
  rootOder,
} from './order'

export const manifestRules: TypedFlatConfigItem['rules'] = {
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
