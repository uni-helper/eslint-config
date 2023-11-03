import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  ignores: [
    'fixtures',
    '_fixtures',
  ],
})
