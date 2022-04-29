const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')
const resolve = dir => path.join(__dirname, '.', dir)

module.exports = override(
  addWebpackAlias({
    ['@']: resolve('src'),
    ['@v']: resolve('src/views'),
    ['@c']: resolve('src/components'),
    ['@t']: resolve('src/types'),
    ['@a']: resolve('src/assets'),
    ['@h']: resolve('src/http')
  })
)