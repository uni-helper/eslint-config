import type { TypedFlatConfigItem } from '@antfu/eslint-config'
// @ts-expect-error The types are conflicting with the latest eslint version.
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export function globals(): TypedFlatConfigItem[] {
  return compat.config({
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
  })
}
