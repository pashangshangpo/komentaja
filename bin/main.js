import Cli from 'commander'

import CONFIG from './config'
import Package from '../package.json'

import { resolveRoot } from './lib/util'

import getProjectInfo from './lib/getProjectInfo'
import downloadGitRepo from './lib/downloadGitRepo'
import initProjectTemplate from './lib/initProjectTemplate'

import WebpackServe from './lib/webpackServe'
import WebpackBuild from './lib/webpackBuild'

// 获取命令行配置
const getCliConfig = () => {
  // 默认指令为编译
  let commandType = 'build'

  Cli
    .version(Package.version)
    .description(Package.description)
    .option('-e, --env [env]', '设置 process.env.ENV 环境变量', 'dev')
    .option('-c, --config [config]', '脚手架配置文件', '.clirc.js')
    .option('-p, --port [port]', '设置开发服务端口号', '9023')
    .on('command:*', (commands) => {
      let tempCommandType = commands.pop()

      if (['init', 'serve', 'build'].includes(tempCommandType)) {
        commandType = tempCommandType
      } else {
        console.log('命令行参数错误，参数应该是 init、serve、build 其中之一。')

        process.exit(1)
      }
    })
    .parse()

  return {
    type: commandType,
    ...Cli.opts(),
  }
}

// 定义了不同的指令执行规则
const commandRule = {
  // 初始化项目
  init: async () => {
    const { projectName, description, author, projectType } = await getProjectInfo()

    await downloadGitRepo(
      CONFIG.gitRepoTemplate[projectType],
      projectName
    )

    await initProjectTemplate(projectName, {
      author,
      projectName,
      description,
    })
  },
  // webpack 服务
  serve: inputConfig => {
    const cliConfig = inputConfig.config

    WebpackServe(cliConfig.dev.webpackConfig, {
      env: inputConfig.env,
      port: inputConfig.port,
      devServer: cliConfig.dev.devServer || {}
    })
  },
  // webpack 打包
  build: inputConfig => {
    const cliConfig = inputConfig.config

    WebpackBuild(cliConfig.prod.webpackConfig, {
      env: inputConfig.env
    })
  }
}

const inputConfig = getCliConfig()

// 初始化配置信息
if (inputConfig.type !== 'init') {
  try {
    inputConfig.config = require(resolveRoot(inputConfig.config)).default
  } catch (err) {
    console.log(`项目中找不到 ${inputConfig.config} 配置文件`)

    process.exit(1)
  }
}

commandRule[inputConfig.type](inputConfig)
