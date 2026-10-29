import type { OptionsConfig as AntfuOptionsConfig, OptionsOverrides, OptionsVue } from '@antfu/eslint-config'

export type { OptionsOverrides, TypedFlatConfigItem } from '@antfu/eslint-config'

export type Awaitable<T> = T | Promise<T>

export interface OptionsUni extends OptionsOverrides {}

export interface OptionsUniJson extends OptionsOverrides {}

export interface OptionsConfig extends AntfuOptionsConfig {
  uni?: boolean | OptionsUni
  uniJson?: boolean | OptionsUniJson
  // `files` is missing from antfu's `OptionsVue` type but its `vue()` reads it
  // and antfu passes the object through, so it works here. uni-app appends the
  // .nvue and .uvue globs to it.
  vue?: boolean | (OptionsVue & { files?: string[] })
}
