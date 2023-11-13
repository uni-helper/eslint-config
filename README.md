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

## 定制化

通常你只需要导入 `uniHelper` 预设：

```js
// eslint.config.js
import uni from '@uni-helper/eslint-config'

export default uni()
```

如果你想调整 `uniHelper` 预设可以这样做：

```js
// eslint.config.js
import uni from '@uni-helper/eslint-config'

export default uni({
  // 启用 stylistic 格式化规则
  // stylistic: true,

  // 自定义 stylistic 规则
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript 和 Vue 是自动检测的，你也可以显式启用它们:
  typescript: true,
  vue: true,

  // 禁用 json 和 yaml 支持
  jsonc: false,
  yaml: false,

  // 在 Flat 配置中不再支持 `.eslintignore`，请使用 `ignores` 代替
  ignores: [
    './fixtures',
    // ...globs
  ]
})
```

你还可以自定义任意规则以覆盖默认规则:

```js
// eslint.config.js
import uni from '@uni-helper/eslint-config'

export default uni(
  {
    // 为 uniHelper 配置规则
  },

  // 从第二个参数开始，为 ESLint Flat 配置，它可以存在多个
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
)
```

## 高级

要了解更多配置及选项，查看 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 的文档，
