/*
 * @File: 初始化项目模板
 */

import Gulp from 'gulp'
import Through2 from 'through2'
import Template from 'art-template'

// 修改默认界定符，防止 {{ 与 JavaScript 中的字符串模板语法冲突
const templateRule = Template.defaults.rules[1]

templateRule.test = new RegExp(
  templateRule.test.source.replace('{{', '<\\\?').replace('}}', '\\\?>')
)

const initProjectTemplate = (projectTemplatePath, templateData) => () => {
  return Gulp
    .src([`${projectTemplatePath}/**/*.?(js|jsx|ts|tsx|html|json|md)`])
    .pipe(Through2.obj(function (file, _, cb) {
      // 使用数据替换模板占位符
      const content = file.contents.toString()

      if (content) {
        file.contents = Buffer.from(Template.render(content, templateData))
      }

      this.push(file)

      cb()
    }))
    .pipe(Gulp.dest(projectTemplatePath))
}

export default (projectTemplatePath, templateData) => {
  return new Promise(resolve => {
    Gulp.parallel([
      initProjectTemplate(projectTemplatePath, templateData)
    ])(() => {
      resolve()
    })
  })
}
