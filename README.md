<a href="https://uni-helper.js.org/eslint-config"><img src="https://cdn.jsdelivr.net/gh/uni-helper/eslint-config@main/banner.svg" alt="banner" width="100%"/></a>

# @uni-helper/eslint-config

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/uni-helper/eslint-config@main/logo.svg" alt="logo" width="256" height="256" />
</p>

<p align="center">
  <a href="https://github.com/uni-helper/eslint-config/blob/main/LICENSE"><img src="https://img.shields.io/github/license/uni-helper/eslint-config?style=for-the-badge&labelColor=005947&color=eee" alt="License"></a>
  <a href="https://github.com/uni-helper/eslint-config/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/eslint-config?style=for-the-badge&labelColor=005947&color=eee" alt="GitHub Stars"></a>
  <a href="https://npmx.dev/package/@uni-helper/eslint-config"><img src="https://img.shields.io/npm/v/@uni-helper/eslint-config?style=for-the-badge&labelColor=005947&color=eee" alt="NPM version"></a>
  <a href="https://npmx.dev/package/@uni-helper/eslint-config"><img src="https://img.shields.io/npm/dm/@uni-helper/eslint-config?style=for-the-badge&labelColor=005947&color=eee" alt="npm downloads"></a>
</p>
<p align="center">
  <a href="https://github.com/kejunmao"><img src="https://img.shields.io/badge/Author-KeJun-blue?style=for-the-badge" alt="Author"></a>
  <a href="https://github.com/ModyQyW"><img src="https://img.shields.io/badge/Maintainer-ModyQyW-blue?style=for-the-badge" alt="Maintainer"></a>
</p>

基于 [antfu/eslint-config](https://github.com/antfu/eslint-config)，为 [uni-app](https://uniapp.dcloud.net.cn/) 项目提供开箱即用的 ESLint 配置。

不想看文档？直接问 AI 🤖 <a href="https://deepwiki.com/uni-helper/eslint-config"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>

> **请考虑持续[赞助](https://github.com/ModyQyW/sponsors)以维持该项目的持续健康发展，非常感谢！🙏**

- **uni-app 规则适配**：关闭与 uni-app 冲突的 Vue 规则（如组件名大小写、自定义事件命名）
- **nvue / uvue / uts 支持**：`.nvue`、`.uvue` 与 `.vue` 共用同一套 Vue 规则，`<script lang="uts">` 和 `.uts` 文件按 TypeScript 解析，`.uvue` 的页面生命周期与 UTS 平台对象注册为全局变量
- **平台全局变量**：自动注册 `uni`、`wx`、`my`、`tt` 等平台全局变量
- **JSON 排序**：按 uni-app 官方规范对 `manifest.json`、`pages.json`、`theme.json` 的键进行排序，保持配置文件一致性
- **智能检测**：安装了 `@uni-helper/vite-plugin-uni-manifest` 或 `@uni-helper/vite-plugin-uni-pages` 时，自动跳过对应 JSON 文件的排序

## 安装

```bash
pnpm i -D eslint @antfu/eslint-config @uni-helper/eslint-config
```

## 使用

在项目根目录创建 `eslint.config.mjs`：

```js
// eslint.config.mjs
import uniHelper from '@uni-helper/eslint-config'

export default uniHelper()
```

在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### 选项

```js
export default uniHelper({
  // 启用 uni-app 规则适配，默认 true。开启时会强制启用 Vue 支持，
  // 并把 Vue 配置的覆盖范围扩展到 .nvue / .uvue
  uni: true,
  // 启用 JSON 排序（manifest.json / pages.json / theme.json），默认 true
  uniJson: true,
})
```

平台全局变量的注册不受 `uni` 选项影响，始终启用。

两个选项也接受对象形式，在保持开启的同时覆盖对应配置内部的规则：

```js
export default uniHelper({
  // 覆盖 uni-app 的 Vue 规则适配
  uni: {
    overrides: { 'vue/singleline-html-element-content-newline': 'off' }
  },
  // 覆盖 JSON 排序规则
  uniJson: {
    overrides: { 'jsonc/sort-keys': 'off' }
  },
})
```

对象形式同样表示启用，只有显式传 `false` 才会关闭对应功能。

所有 [@antfu/eslint-config 选项](https://github.com/antfu/eslint-config#customization) 均可直接传递。

### nvue / uvue / uts

`uni` 开启时（默认），`.nvue` 和 `.uvue` 用和 `.vue` 相同的解析器与规则，`<script lang="uts">` 交给 TypeScript 解析器处理。独立的 `.uts` 文件同样按 TypeScript 解析，传了 `typescript: false` 时不处理。`<script>` 要写在 `<template>` 前面，沿用 antfu 的默认顺序。

`.uvue` 里可以直接调用页面生命周期，比如 `onLoad`、`onPageShow`、`onBackPress`，也能直接用 `UTSAndroid`、`UTSiOS`、`UTSHarmony`、`UTSJSONObject`，不用额外声明，完整名单见 [uni-app x 页面文档](https://doc.dcloud.net.cn/uni-app-x/page.html)。这些全局变量只对 `.uvue` 生效。

`ts/consistent-type-definitions` 和 `ts/prefer-as-const` 对 `.uts` 和 `.uvue` 关闭。这两条规则要求的写法 UTS 编译器不接受：对象字面量只能用 `type` 声明，`as const` 断言不支持。

0.8.0 起 `.nvue`、`.uvue`、`.uts` 才进入 lint 范围，老项目升级后 CI 可能冒出一批新问题，建议单独提一个 PR 修。

## 兼容性

> 建议始终使用 Node.js 最新的 LTS 版本。

| eslint | @antfu/eslint-config | @uni-helper/eslint-config | Node.js | 备注 |
|--------|----------------------|---------------------------|---------|------|
| ^10.0.0 | ^10.0.0 | ^0.8.0 | ^20.19.0 \|\| ^22.13.0 \|\| >=24 | 仅 ESM |
| ^10.0.0 | ^7.0.0 \|\| ^8.0.0 \|\| ^9.0.0 \|\| ^10.0.0 | ^0.7.6 | ^20.19.0 \|\| ^22.13.0 \|\| >=24 | 仅 ESM |
| ^10.0.0 | ^7.0.0 \|\| ^8.0.0 \|\| ^9.0.0 | ^0.7.4 | ^20.19.0 \|\| ^22.13.0 \|\| >=24 | 仅 ESM |
| ^10.0.0 | ^5.0.0 \|\| ^6.0.0 \|\| ^7.0.0 | 0.7.1 | ^20.19.0 \|\| ^22.13.0 \|\| >=24 | 仅 ESM |
| ^9.10.0 | ^5.0.0 \|\| ^6.0.0 | ^0.6.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | 仅 ESM |
| ^9.10.0 | ^5.0.0 | ^0.5.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | 仅 ESM |
| ^9.10.0 | ^4.0.1 | ^0.4.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | 仅 ESM |
| ^9.10.0 | ^3.13.0 | ^0.3.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | |
| ^9.5.0 | ^3.0.0（v0.2.2 起 ^3.4.1） | ^0.2.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | |
| >=8.40.0 | ^2.25.0 | ^0.1.0 | ^12.22.0 \|\| ^14.17.0 \|\| >=16.0.0 | |

## 相关资源

- [antfu/eslint-config](https://github.com/antfu/eslint-config)：本配置的上游基础
- [uni-helper](https://uni-helper.js.org/)：uni-app 工具集合
- [IDE 支持（保存时自动修复）](https://github.com/antfu/eslint-config#ide-support-auto-fix-on-save)

## 参与贡献

欢迎通过 Issue 或 Pull Request 参与改进本项目。开始前请阅读 [CONTRIBUTING.md](./CONTRIBUTING.md)，了解项目结构、本地开发流程、测试方式与提交规范。

## License

[MIT](https://github.com/uni-helper/eslint-config/blob/main/LICENSE) © [KeJun](https://github.com/kejunmao)
