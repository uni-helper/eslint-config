import { join, resolve } from 'node:path'
import { afterAll, beforeAll, it } from 'vitest'
import fs from 'fs-extra'
import { execa } from 'execa'
import fg from 'fast-glob'

beforeAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})
afterAll(async () => {
  await fs.rm('_fixtures', { recursive: true, force: true })
})

runWithConfig('manifest')
runWithConfig('pages')

function runWithConfig(name: string) {
  it.concurrent(name, async ({ expect }) => {
    const from = resolve('fixtures/input', name)
    const output = resolve('fixtures/output', name)
    const target = resolve('_fixtures', name)

    await fs.copy(from, target, {
      filter: (src) => {
        return !src.includes('node_modules')
      },
    })
    await fs.writeFile(join(target, 'eslint.config.js'), `
// @eslint-disable
import uni from '@uni-helper/eslint-config'

export default uni()
`)

    await execa('npx', ['eslint', '.', '--fix'], {
      cwd: target,
      stdio: 'pipe',
    })

    const files = await fg('**/*', {
      ignore: [
        'node_modules',
        'eslint.config.js',
      ],
      cwd: target,
    })

    await Promise.all(files.map(async (file) => {
      let content = await fs.readFile(join(target, file), 'utf-8')
      const source = await fs.readFile(join(from, file), 'utf-8')
      if (content === source)
        content = '// unchanged\n'
      await expect.soft(content).toMatchFileSnapshot(join(output, file))
    }))
  }, 30_000)
}
