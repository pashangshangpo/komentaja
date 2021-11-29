/*
 * @File: webpack 编译
 */

import WebPack from 'webpack'

import { pluginProd } from './webpackPlugin'

export default (webpackConfig, option) => {
  console.log('代码打包中...\n')

  pluginProd(webpackConfig, option)

  WebPack(webpackConfig, (err, stats) => {
    if (err) {
      throw new Error(err)
    }

    console.log(stats.toString({
      all: false,
      assets: true,
      colors: true,
      errors: true,
      errorDetails: true,
      warnings: true,
    }))

    console.log('\n代码打包完成...')
  })
}
