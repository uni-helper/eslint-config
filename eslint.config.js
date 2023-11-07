import jiti from 'jiti'

const uni = jiti(null, {
  esmResolve: true,
  interopDefault: true,
})('./src/index.ts')

export default uni({
  ignores: [
    'fixtures',
    '_fixtures',
  ],
})
