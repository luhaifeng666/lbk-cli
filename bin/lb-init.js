#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const tplObj = require(`${__dirname}/../template`)

program
  .usage('<template-name> [project-name]')
program.parse(process.argv)

// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()

let templateName = program.args[0]
let projectName = program.args[1]

if (!tplObj[templateName]) {
  console.log(chalk.red('\n template does not exist! \n'))
  return false
}

if (!projectName) {
  console.log(chalk.red('\n Project should not be empty! \n'))
  return false
}

url = tplObj[templateName]

console.log(chalk.white('\n Start generating... \n'))
// 出现加载图标
const spinner = ora('Downloading... \n')
spinner.start()
// 执行下载方法，传入参数
download(
  url,
  projectName,
  err => {
    if (err) {
      spinner.fail()
      console.log(chalk.red(`Generation failed! ${err}`))
      return false
    }
    // 结束加载图标
    spinner.succeed()
    console.log(chalk.green('\n Generation completed!'))
    console.log('\n To get started')
    console.log(`\n  cd ${projectName}  \n`)
  }
)