import type { OptionsOverrides, TypedFlatConfigItem } from '../types'
import { GLOB_VUE } from '@antfu/eslint-config'

// uni-app also uses .nvue and .uvue SFCs, which antfu's Vue config does not cover.
export const UNI_SFC_EXTS = ['nvue', 'uvue']

export const GLOB_UNI_SFC = UNI_SFC_EXTS.map(ext => `**/*.${ext}`)

// Standalone .uts modules are TypeScript-flavoured and not SFCs, so they only
// need the TypeScript config.
export const UNI_TS_EXTS = ['uts']

export const GLOB_UNI_UTS = UNI_TS_EXTS.map(ext => `**/*.${ext}`)

// uni-app x injects these into every .uvue script. They only change output when
// TypeScript support is off, because that is when `no-undef` runs. Names come from
// https://doc.dcloud.net.cn/uni-app-x/page.html (composition API column) and
// https://doc.dcloud.net.cn/uni-app-x/uts/
const UVUE_GLOBALS = {
  UTSAndroid: 'readonly',
  UTSHarmony: 'readonly',
  UTSJSONObject: 'readonly',
  UTSiOS: 'readonly',
  onAddToFavorites: 'readonly',
  onBackPress: 'readonly',
  onInit: 'readonly',
  onLoad: 'readonly',
  onNavigationBarButtonTap: 'readonly',
  onNavigationBarSearchInputChanged: 'readonly',
  onNavigationBarSearchInputClicked: 'readonly',
  onNavigationBarSearchInputConfirmed: 'readonly',
  onPageHide: 'readonly',
  onPageScroll: 'readonly',
  onPageShow: 'readonly',
  onPullDownRefresh: 'readonly',
  onReachBottom: 'readonly',
  onReady: 'readonly',
  onResize: 'readonly',
  onShareAppMessage: 'readonly',
  onShareTimeline: 'readonly',
  onTabItemTap: 'readonly',
  onUnload: 'readonly',
} as const

export function uni(options: OptionsOverrides = {}): TypedFlatConfigItem[] {
  const {
    overrides = {},
  } = options

  return [
    {
      files: [GLOB_VUE, ...GLOB_UNI_SFC],
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
    {
      files: ['**/*.uvue', ...GLOB_UNI_UTS],
      name: 'uni-helper/uts/rules',
      rules: {
        // Following either rule rewrites UTS into code the compiler rejects:
        // object literals can only be typed with `type`, and UTS has no `as const`.
        // https://doc.dcloud.net.cn/uni-app-x/uts/uts_diff_ts.html
        'ts/consistent-type-definitions': 'off',
        'ts/prefer-as-const': 'off',
      },
    },
    {
      files: ['**/*.uvue'],
      name: 'uni-helper/uvue/globals',
      languageOptions: {
        globals: UVUE_GLOBALS,
      },
    },
  ]
}
