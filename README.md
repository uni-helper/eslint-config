# @uni-helper/eslint-config

<div style="display: flex; justify-content: center; align-items: center; gap: 8px;">

[![License](https://img.shields.io/github/license/uni-helper/eslint-config?style=for-the-badge)](https://github.com/uni-helper/eslint-config/blob/main/LICENSE)

[![npm](https://img.shields.io/npm/v/%40uni-helper%2Feslint-config?style=for-the-badge)](https://www.npmjs.com/package/@uni-helper/eslint-config)

[![npm downloads](https://img.shields.io/npm/dm/%40uni-helper%2Feslint-config?style=for-the-badge)](https://www.npmjs.com/package/@uni-helper/eslint-config)

</div>

基于 [Anthony's ESLint Config](https://github.com/antfu/eslint-config)、适用于 uni-app 项目的 ESLint Config。

- 支持 uni-app 项目
- 支持对 manifest.json 排序
- 支持对 pages.json 排序
- 支持对 theme.json 排序

## 用法

### 手动安装

```bash
pnpm i -D eslint @antfu/eslint-config @uni-helper/eslint-config
```

不要忘了在项目根目录创建 `eslint.config.mjs`：

```js
// eslint.config.mjs
import uniHelper from '@uni-helper/eslint-config'

export default uniHelper()
```

### 修改 package.json scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

更多配置及选项请查看 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 的文档，如：

- [IDE 支持](https://github.com/antfu/eslint-config#ide-support-auto-fix-on-save)
- [定制化](https://github.com/antfu/eslint-config#customization)
