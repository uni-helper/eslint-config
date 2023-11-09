import type { ConfigItem, OptionsHasTypeScript, OptionsOverrides, OptionsStylistic } from '@antfu/eslint-config'
import { pluginVue, vue } from '@antfu/eslint-config'
import { GLOB_UNI } from '../globs'

export function uni(options: OptionsHasTypeScript & OptionsOverrides & OptionsStylistic = {}): ConfigItem[] {
  const {
    overrides = {},
  } = options
  const vueConfig = vue({ ...options })

  const setup = vueConfig.find(v => v.name === 'antfu:vue:setup')!
  const rules = vueConfig.find(v => v.name === 'antfu:vue:rules')!

  setup.name = 'uni:vue:setup'
  setup.plugins = {
    vue: pluginVue,
  }
  rules.name = 'uni:vue:rules'
  rules.files = [GLOB_UNI]
  rules.rules = {
    ...rules.rules,
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false,
    }],
    ...overrides,
  }

  return [
    setup,
    rules,
  ]
}
