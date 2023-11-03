import type { ConfigItem } from '@antfu/eslint-config'

export function sortManifestJson(): ConfigItem[] {
  return [
    {
      files: ["**/manifest.json"],
      name: 'uni-helper:sort-manifest-json',
      rules: {
        'jsonc/sort-array-values': [
          'error',
          {
            order: {type: 'asc'},
            pathPattern: '^files$',
          },
        ],
        'jsonc/sort-keys': [
          'error',
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
              'mp-kuaishou'
            ],
            pathPattern: '^$'
          },
          {
            order: [
              'request',
              'connectSocket',
              'uploadFile',
              'downloadFile'
            ],
            pathPattern: '^networkTimeout$'
          },
          {
            order: [
              'splashscreen',
              'screenOrientation',
              'modules',
              'distribute'
            ],
            pathPattern: '^app-plus$'
          }
        ]
      }
    }
  ]
}
