<a href="https://uni-helper.js.org/eslint-config"><img src="./banner.svg" alt="banner" width="100%"/></a>

<a href="https://github.com/uni-helper/eslint-config/stargazers"><img src="https://img.shields.io/github/stars/uni-helper/eslint-config?colorA=005947&colorB=eee&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@uni-helper/eslint-config"><img src="https://img.shields.io/npm/dm/@uni-helper/eslint-config?colorA=005947&colorB=eee&style=for-the-badge"></a>
<a href="https://www.npmjs.com/package/@uni-helper/eslint-config"><img src="https://img.shields.io/npm/v/@uni-helper/eslint-config?colorA=005947&colorB=eee&style=for-the-badge"></a>
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/uni-helper/eslint-config)
<br/>

基于 [Anthony's ESLint Config](https://github.com/antfu/eslint-config)、适用于 uni-app 项目的 ESLint Config。

- 支持 uni-app 项目
- 支持对 manifest.json 排序
- 支持对 pages.json 排序
- 支持对 theme.json 排序

| eslint         | @antfu/eslint-config | @uni-helper/eslint-config  | Node 要求（总是建议使用最新的 LTS 版本）     |  备注           |
|----------------|----------------------|----------------------------|-----------------------------------------|----------------|
| ^8.40.0        | ^2.25.0              | ^0.1.0                     | ^12.22.0 \|\| ^14.17.0 \|\| >=16.0.0    |                |
| ^9.5.0         | ^3.0.0               | ^0.2.0                     | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0     |                |
| ^9.10.0        | ^3.4.0               | ^0.2.0                     | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0     |                |
| ^9.10.0        | ^3.13.0              | ^0.3.0                     | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0     |                |
| ^9.10.0        | ^4.0.1               | ^0.4.0                     | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0     |  没有 CJS 支持  |
| ^9.10.0        | ^5.0.0               | ^0.5.0                     | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0     |  没有 CJS 支持  |
| ^9.10.0        | ^6.0.0               | ^0.6.0                     | ^18.18.0 \|\| ^20.9.0 \|\| >=21.1.0     |  没有 CJS 支持  |
| ^10.0.0        | ^7.0.0               | ^0.7.0                     | ^20.19.0 \|\| ^21.x.x \|\| >=23.x.x     |  没有 CJS 支持  |
| ^10.0.0        | ^7.0.0 \|\| ^8.0.0               | ^0.7.3                     | ^20.19.0 \|\| ^21.x.x \|\| >=23.x.x     |  没有 CJS 支持  |

## 用法

### 手动安装

```bash
pnpm i -D eslint @antfu/eslint-config @uni-helper/eslint-config
```

在项目根目录创建 `eslint.config.mjs`：

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
