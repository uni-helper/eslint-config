import { defineBuildConfig } from 'unbuild'
import { readFileSync, writeFileSync } from 'node:fs'

export default defineBuildConfig({
  entries: ['src/index'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  failOnWarn: false,
  hooks: {
    'build:done'(ctx) {
      if (ctx.options.stub) return
      let file = 'dist/index.cjs'

      let code = readFileSync(file, 'utf8')
      code = code.replace('exports.default =', 'module.exports =')
      code += 'exports.default = module.exports;'
      writeFileSync(file, code)
      file = 'dist/index.d.ts'
      code = readFileSync(file, 'utf8')
      code += 'export = uniHelper'
      writeFileSync(file, code)
      writeFileSync('dist/index.d.cts', code)
    },
  }
})
