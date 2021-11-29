/*
 * @File: 下载 git 仓库
 */
import DownloadGitRepo from 'download-git-repo'
import Ora from 'ora'

export default (url, targetPath) => {
  const spinner = Ora('正在初始化项目').start()

  return new Promise(resolve => {
    DownloadGitRepo(
      `direct:${url}`,
      targetPath,
      {
        clone: true
      },
      err => {
        if (err) {
          console.log('项目初始化失败：', err)

          process.exit(1)
        }

        spinner.succeed('项目初始化成功！')

        resolve()
      }
    )
  })
}
