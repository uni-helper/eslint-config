# @uni-helper/eslint-config

适用于 uni-app 的 Anthony's ESLint 配置预设

## 安装

```bash
pnpm i -D eslint @uni-helper/eslint-config
```

## 使用

### 配置文件


With CJS:

```js
// eslint.config.js
const uni = require('@uni-helper/eslint-config')

module.exports = uni()
```

With ESM:

```js
// eslint.config.js
import uni from '@uni-helper/eslint-config'

export default uni()
```

### 在 package.json 中添加 script

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## 高级

要了解更多配置及选项，查看 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 的文档，
