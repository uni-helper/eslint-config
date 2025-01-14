import type { Linter } from 'eslint'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import { antfu } from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'
import { isPackageExists } from 'local-pkg'
import { sortManifestJson, sortPagesJson, sortThemeJson, uni } from './configs'

const compat = new FlatCompat()

export * from './types'

export function uniHelper(
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
) {
  const {
    uni: enableUni = true,
    uniJson = true,
  } = options

  const ignoreManifestJSON = isPackageExists('@uni-helper/vite-plugin-uni-manifest') || uniJson === false
  const ignorePagesJSON = isPackageExists('@uni-helper/vite-plugin-uni-pages') || uniJson === false
  options.ignores = options.ignores || []

  if (ignoreManifestJSON)
    options.ignores.push('**/manifest.json')
  else
    userConfigs.unshift(sortManifestJson())

  if (ignorePagesJSON)
    options.ignores.push('**/pages.json')
  else
    userConfigs.unshift(sortPagesJson())

  if (uniJson)
    userConfigs.unshift(sortThemeJson())

  if (enableUni) {
    // Force enable vue
    options.vue = options.vue || true
    userConfigs.unshift(uni())
  }

  userConfigs.push(compat.config({
    globals: {
      dd: 'readonly', // https://open.dingtalk.com/
      jd: 'readonly', // https://mp.jd.com/
      ks: 'readonly', // https://mp.kuaishou.com/
      my: 'readonly', // https://opendocs.alipay.com/mini
      plus: 'readonly', // http://www.html5plus.org/doc/h5p.html
      qh: 'readonly', // https://mp.360.cn/
      qq: 'readonly', // https://q.qq.com/
      swan: 'readonly', // https://smartprogram.baidu.com/docs
      tt: 'readonly', // https://developer.open-douyin.com/ https://open.feishu.cn/
      uni: 'readonly', // https://uniapp.dcloud.io/
      uniCloud: 'readonly', // https://uniapp.dcloud.io
      weex: 'readonly', // https://weex.apache.org/
      wx: 'readonly', // https://developers.weixin.qq.com/miniprogram/dev/framework/
    },
  }))

  return antfu(options, ...userConfigs)
}

export default uniHelper
