/*
 * @File: webpack serve
 */

import WebPack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import GetIp from 'get-ip'

import CONFIG from '../config'
import { pluginDev } from './webpackPlugin'

export default (webpackConfig, option) => {
  console.log('正在启动环境...\n')

  pluginDev(webpackConfig, option)

  const ip = GetIp()[0]
  const compiler = WebPack(webpackConfig)
  const devServerConfig = Object.assign(
    CONFIG.devServer,
    {
      host: ip
    },
    option.devServer,
  )
  const server = new WebpackDevServer(compiler, devServerConfig)

  server.listen(option.port, ip, () => {
    console.log(`\n开发环境地址：http://${ip}:${option.port}\n`)
  })
}
