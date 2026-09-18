# 参与贡献

感谢你对 `@uni-helper/eslint-config` 的关注！本文档将帮助你快速了解项目结构、本地开发流程、测试方式和提交规范。

## 前置条件

- Node.js 26（项目通过 `.node-version` 和 `devEngines.runtime` 固定）
- pnpm 12（项目已通过 `packageManager` 和 `devEngines.packageManager` 固定版本）
- Git（用于克隆与版本管理）

## 仓库结构

```
eslint-config/
├── src/
│   ├── index.ts                    # uniHelper() 入口：解析选项、组装配置并调用 antfu()
│   ├── types.ts                    # OptionsConfig 类型（扩展 antfu 的 uni / uniJson 选项）
│   └── configs/
│       ├── uni.ts                  # uni-app 的 Vue 规则适配
│       ├── globals.ts              # uni / wx / my / tt 等平台全局变量
│       ├── sortManifestJson.ts     # manifest.json 键排序规则
│       ├── sortPagesJson.ts        # pages.json 键排序规则
│       ├── sortThemeJson.ts        # theme.json 键排序规则
│       └── index.ts                # 配置统一导出
├── test/
│   └── fixtures.test.ts            # fixture 驱动的测试
├── fixtures/
│   ├── input/                      # 待 lint 的样例项目
│   └── output/                     # 每个 case 的期望 lint 结果
├── dist/                           # 构建产物（发布到 npm 的内容）
└── package.json
```

## 本地开发

```bash
# 1. 安装依赖
pnpm install

# 2. 构建适配器（生成 dist/，测试依赖构建产物）
pnpm run build

# 3. 监听模式开发（修改 src/ 后自动重新构建）
pnpm run dev
```

## 测试与检查

```bash
# 运行全部测试
pnpm run test            # 底层使用 vitest

# 只运行某个测试文件
pnpm run test -- test/fixtures.test.ts

# 类型检查
pnpm run typecheck       # tsc --noEmit

# 代码规范检查
pnpm run lint

# 自动修复可修复的 lint 问题
pnpm run lint:fix
```

### 测试说明

- 测试框架：[Vitest](https://vitest.dev/)
- 测试是 fixture 驱动的：把样例文件放进 `fixtures/input/`，测试会把它们复制到临时目录、用本包生成 ESLint 配置并执行 `eslint --fix`，再把结果与 `fixtures/output/{json,uni}/` 中的快照逐一对比。
- 测试执行的是构建产物（`dist/`），修改 `src/` 后请先 `pnpm run build` 再跑测试。
- 添加或修改规则时：更新 `fixtures/input/` 中的样例 → 跑测试 → 检查生成的快照是否符合预期 → 将快照作为期望结果一并提交。内容未变化的文件会以 `// unchanged` 记录。

## 提交规范

1. Fork 本仓库并克隆到本地。
2. 基于 `main` 创建功能分支：`feat/xxx`、`fix/xxx`、`docs/xxx` 等。
3. 保持提交信息清晰，可采用 [Conventional Commits](https://www.conventionalcommits.org/) 格式（如 `feat: 支持 theme.json 排序`）。
4. 提交前执行：
   ```bash
   pnpm run lint
   pnpm run test
   pnpm run typecheck
   ```
5. 推送到远端后发起 Pull Request，描述改动内容、测试结果与关联 Issue。

## Pull Request 指南

- 保持 PR 范围聚焦，一次只解决一个问题或新增一个特性。
- 若涉及 peer 依赖变化，请同步更新 `README.md` 的兼容性表格。
- 确保 CI 通过（CI 会在 Node 22/24/26 × Linux/macOS/Windows 上执行 build、lint、test、typecheck）。
- 如需讨论方案，可在 Issue 中先行沟通。

## 发布

维护者通过 `pnpm release`（[bumpp](https://github.com/antfu/bumpp)）提升版本并推送 tag；tag 推送会触发 Release workflow，创建 GitHub Release 并发布到 npm。

感谢你的贡献！如有疑问，欢迎在 [GitHub Issues](https://github.com/uni-helper/eslint-config/issues) 中提问。
