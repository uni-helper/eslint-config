import { GLOB_VUE } from '@antfu/eslint-config'
import type { ConfigItem, OptionsOverrides } from '@antfu/eslint-config'
import { isPackageExists } from 'local-pkg'

export function uni(options: OptionsOverrides = {}): ConfigItem[] {
  const {
    overrides = {},
  } = options

  const ignoreManifestJSON = isPackageExists('@uni-helper/vite-plugin-uni-manifest')
  const ignorePagesJSON = isPackageExists('@uni-helper/vite-plugin-uni-pages')

  return [
    {
      name: 'uni:json:ignores',
      ignores: [
        ignoreManifestJSON && '**/manifest.json',
        ignorePagesJSON && '**/pages.json',
      ].filter(Boolean) as string[],
    },
    {
      files: [GLOB_VUE],
      name: 'uni:vue:rules',
      rules: {
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
          registeredComponentsOnly: false,
          ignores: [
          // 视图
            'view',
            'scroll-view',
            'swiper',
            'match-media',
            'movable-area',
            'movable-view',
            'cover-view',
            'cover-image',
            // 基础
            'icon',
            'text',
            'rich-text',
            'progress',
            // 表单
            'editor',
            'picker',
            'picker-view',
            'slider',
            // 路由
            'navigator',
            // 媒体
            'animation-view',
            'camera',
            'image',
            'live-player',
            'live-pusher',
            // 地图
            'map',
            // 画布
            // webview
            'web-view',
            // TODO: 广告
            'ad',
            'ad-rewarded-video',
            'ad-fullscreen-video',
            'ad-interstitial',
            'ad-draw',
            'ad-content-page',
            // 云数据库
            'unicloud-db',
            // 页面配置
            'page-meta',
            'navigation-bar',
            'custom-tab-bar',
            // nvue 组件
            'barcode',
            'list',
            'cell',
            'recycle-list',
            'waterfall',
            'refresh',
            // 小程序组件
            'official-account',
            'open-data',
          ],
        }],
        ...overrides,
      },
    },
  ]
}
