import type { OptionsConfig as AntfuOptionsConfig, OptionsOverrides } from '@antfu/eslint-config'

export type { TypedFlatConfigItem, OptionsOverrides } from '@antfu/eslint-config'

export type Awaitable<T> = T | Promise<T>

export interface OptionsUni extends OptionsOverrides {}

export interface OptionsUniJson extends OptionsOverrides {}

export interface OptionsConfig extends AntfuOptionsConfig {
  uni?: boolean | OptionsUni
  uniJson?: boolean | OptionsUniJson
}
