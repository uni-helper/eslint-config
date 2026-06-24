<a href="https://uni-helper.js.org/eslint-config"><img src="./banner.svg" alt="banner" width="100%"/></a>

<p align="center">
  <a href="https://github.com/uni-helper/eslint-config/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/eslint-config?colorA=005947&colorB=eee&style=for-the-badge" alt="GitHub Stars"></a>
  <a href="https://www.npmjs.com/package/@uni-helper/eslint-config"><img src="https://img.shields.io/npm/dm/@uni-helper/eslint-config?colorA=005947&colorB=eee&style=for-the-badge" alt="npm downloads"></a>
  <a href="https://www.npmjs.com/package/@uni-helper/eslint-config"><img src="https://img.shields.io/npm/v/@uni-helper/eslint-config?colorA=005947&colorB=eee&style=for-the-badge" alt="npm version"></a>
</p>
<p align="center">
  <a href="https://deepwiki.com/uni-helper/eslint-config"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
</p>

基于 [antfu/eslint-config](https://github.com/antfu/eslint-config)，为 [uni-app](https://uniapp.dcloud.net.cn/) 项目提供开箱即用的 ESLint 配置。

- **uni-app 规则适配** — 关闭与 uni-app 冲突的 Vue 规则（如组件名大小写、自定义事件命名），自动注册 `uni`、`wx`、`my`、`tt` 等平台全局变量
- **JSON 排序** — 按 uni-app 官方规范对 `manifest.json`、`pages.json`、`theme.json` 的键进行排序，保持配置文件一致性
- **智能检测** — 安装了 `@uni-helper/vite-plugin-uni-manifest` 或 `@uni-helper/vite-plugin-uni-pages` 时，自动跳过对应 JSON 文件的排序

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
  // 启用 uni-app 规则适配和全局变量，默认 true
  uni: true,
  // 启用 JSON 排序（manifest.json / pages.json / theme.json），默认 true
  uniJson: true,
})
```

所有 [@antfu/eslint-config 选项](https://github.com/antfu/eslint-config#customization) 均可直接传递。

## 兼容性

> 建议始终使用 Node.js 最新的 LTS 版本。

| eslint | @antfu/eslint-config | @uni-helper/eslint-config | Node.js | 备注 |
|--------|----------------------|---------------------------|---------|------|
| ^10.0.0 | ^7.0.0 \|\| ^8.0.0 \|\| ^9.0.0 | ^0.7.3 | ^20.19.0 \|\| ^21.x \|\| >=23.x | 仅 ESM |
| ^10.0.0 | ^7.0.0 | ^0.7.0 | ^20.19.0 \|\| ^21.x \|\| >=23.x | 仅 ESM |
| ^9.10.0 | ^6.0.0 | ^0.6.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | 仅 ESM |
| ^9.10.0 | ^5.0.0 | ^0.5.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | 仅 ESM |
| ^9.10.0 | ^4.0.1 | ^0.4.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | 仅 ESM |
| ^9.10.0 | ^3.13.0 | ^0.3.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | |
| ^9.5.0 | ^3.0.0 ~ ^3.4.0 | ^0.2.0 | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0 | |
| ^8.40.0 | ^2.25.0 | ^0.1.0 | ^12.22.0 \|\| ^14.17.0 \|\| >=16.0.0 | |

## 相关资源

- [antfu/eslint-config](https://github.com/antfu/eslint-config) — 本配置的上游基础
- [uni-helper](https://uni-helper.js.org/) — uni-app 工具集合
- [IDE 支持（保存时自动修复）](https://github.com/antfu/eslint-config#ide-support-auto-fix-on-save)

## License

[MIT](./LICENSE) © [KeJun](https://github.com/uni-helper)
