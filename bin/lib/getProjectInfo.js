/*
 * @File: 获取项目配置信息
 */

import Inquirer from 'inquirer'

export default () => {
  return Inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      default: 'hello-python',
      message: '请输入项目名',
    },
    {
      type: 'input',
      name: 'description',
      default: '',
      message: '请输入项目描述',
    },
    {
      type: 'input',
      name: 'author',
      default: '',
      message: '请输入作者姓名',
    },
    {
      type: 'list',
      name: 'projectType',
      default: 'python',
      choices: [
        {
          name: 'Python',
          value: 'python'
        },
      ],
      message: '请选择项目类型'
    },
  ])
}
