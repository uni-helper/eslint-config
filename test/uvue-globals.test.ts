import uniHelper from '@uni-helper/eslint-config'
import { ESLint } from 'eslint'
import { it } from 'vitest'

// `no-undef` only runs when TypeScript support is off, so this is the one path
// where the `.uvue` globals block matters. Fixtures cannot cover it: their
// `.uvue` samples use `lang="uts"`, which espree cannot parse.
// The list mirrors the composition API column of
// https://doc.dcloud.net.cn/uni-app-x/page.html plus https://doc.dcloud.net.cn/uni-app-x/uts/
const UNI_APP_X_GLOBALS = [
  'UTSAndroid',
  'UTSHarmony',
  'UTSJSONObject',
  'UTSiOS',
  'onAddToFavorites',
  'onBackPress',
  'onInit',
  'onLoad',
  'onNavigationBarButtonTap',
  'onNavigationBarSearchInputChanged',
  'onNavigationBarSearchInputClicked',
  'onNavigationBarSearchInputConfirmed',
  'onPageHide',
  'onPageScroll',
  'onPageShow',
  'onPullDownRefresh',
  'onReachBottom',
  'onReady',
  'onResize',
  'onShareAppMessage',
  'onShareTimeline',
  'onTabItemTap',
  'onUnload',
]

function noUndefMessages(messages: { message: string, ruleId?: string | null }[]) {
  return messages
    .filter(message => message.ruleId === 'no-undef')
    .map(message => message.message)
}

async function lintTSOff(code: string, filePath: string) {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: await uniHelper({ typescript: false }),
  })
  const [{ messages }] = await eslint.lintText(code, { filePath })
  return noUndefMessages(messages)
}

it('registers uni-app x globals for .uvue', async ({ expect }) => {
  // `console.log` also trips `no-console`; only `no-undef` is asserted here
  const messages = await lintTSOff(`
<script setup>
console.log(${UNI_APP_X_GLOBALS.join(', ')}, notAUvueGlobal)
</script>

<template>
  <view />
</template>
`, 'page.uvue')

  expect(messages).toHaveLength(1)
  expect(messages[0]).toContain('notAUvueGlobal')
})

it('keeps the globals out of .vue', async ({ expect }) => {
  const messages = await lintTSOff(`
<script setup>
onLoad(() => {})
</script>

<template>
  <div />
</template>
`, 'page.vue')

  expect(messages).toHaveLength(1)
  expect(messages[0]).toContain('onLoad')
})
