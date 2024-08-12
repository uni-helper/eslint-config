import type { OptionsOverrides, TypedFlatConfigItem } from '../types'

export function sortManifestJson(options: OptionsOverrides = {}): TypedFlatConfigItem[] {
  const {
    overrides = {},
  } = options

  return [
    {
      files: ['**/manifest.json'],
      name: 'uni-helper/sort-manifest-json/rules',
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
          // root
          {
            order: [
              'name',
              'appid',
              'description',
              'locale',
              'versionName',
              'versionCode',
              'networkTimeout',
              'debug',
              'uniStatistics',
              'app-plus',
              'h5',
              'quickapp',
              'mp-weixin',
              'mp-alipay',
              'mp-baidu',
              'mp-toutiao',
              'mp-lark',
              'mp-qq',
              'mp-kuaishou',
            ],
            pathPattern: '^$',
          },
          // network timeout
          {
            order: [
              'request',
              'connectSocket',
              'uploadFile',
              'downloadFile',
            ],
            pathPattern: '^networkTimeout$',
          },
          // app-plus
          {
            order: [
              'splashscreen',
              'screenOrientation',
              'modules',
              'distribute',
              'nvueCompiler',
              'nvueStyleCompiler',
              'renderer',
              'nvueLaunchMode',
              'nvue',
              'optimization',
              'runmode',
              'uniStatistics',
              'webView',
            ],
            pathPattern: '^app-plus$',
          },
        ],

        ...overrides,
      },
    },
  ]
}
