/*
 * @File: webpack 插件
 */

import Webpack from 'webpack'

export const pluginDev = (webpackConfig, option = {}) => {
  if (!webpackConfig.plugins) {
    webpackConfig.plugins = []
  }

  webpackConfig.plugins.unshift(
    new Webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: 'development',
        ...(option.env && {
          env: option.env,
        })
      })
    })
  )
}

export const pluginProd = (webpackConfig, option = {}) => {
  if (!webpackConfig.plugins) {
    webpackConfig.plugins = []
  }

  webpackConfig.plugins.unshift(
    new Webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: 'production',
        ...(option.env && {
          env: option.env,
        })
      })
    })
  )
}
