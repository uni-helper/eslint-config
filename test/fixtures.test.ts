import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { OptionsConfig } from './../src/types'
import { cp, readFile, rm, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { x } from 'tinyexec'
import { glob } from 'tinyglobby'
import { afterAll, beforeAll, it } from 'vitest'

beforeAll(async () => {
  await rm('_fixtures', { recursive: true, force: true })
})
afterAll(async () => {
  await rm('_fixtures', { recursive: true, force: true })
})

runWithConfig('json', {
  uni: false,
})

runWithConfig('uni', {})

function runWithConfig(name: string, configs: OptionsConfig, ...items: TypedFlatConfigItem[]) {
  it.concurrent(name, async ({ expect }) => {
    const from = resolve('fixtures/input')
    const output = resolve('fixtures/output', name)
    const target = resolve('_fixtures', name)

    await cp(from, target, {
      recursive: true,
      filter: (src) => {
        return !src.includes('node_modules')
      },
    })
    await writeFile(join(target, 'eslint.config.js'), `
// @eslint-disable
import uni from '@uni-helper/eslint-config'

export default uni(
  ${JSON.stringify(configs)},
  ...${JSON.stringify(items) ?? []},
)
  `)

    // Spawn the repo-local eslint via the current node instead of `npx`:
    // npm 11+ hard-fails on the repo's devEngines.packageManager (pnpm)
    // because npx itself runs under npm
    await x(process.execPath, [resolve('node_modules/eslint/bin/eslint.js'), '.', '--fix'], {
      nodeOptions: { cwd: target },
      throwOnError: true,
    })

    const files = await glob('**/*', {
      ignore: [
        'node_modules',
        'eslint.config.js',
      ],
      cwd: target,
    })

    await Promise.all(files.map(async (file) => {
      let content = await readFile(join(target, file), 'utf-8')
      const source = await readFile(join(from, file), 'utf-8')
      if (content === source)
        content = '// unchanged\n'
      await expect.soft(content).toMatchFileSnapshot(join(output, file))
    }))
  }, 30_000)
}
