#!/usr/bin/env node
/**
 * @author lihaibo <lihaibochina@gmail.com>
 * @date 2018-11-02
 * @git https://github.com/haiboli/git-branch-del
 */

let args = process.argv
let program = require('commander'),
  chalk = require('chalk'),
  shell = require('shelljs');
/**
 * git 批量删除
 */
program
  .version('0.1.0')
  .option('-a, --all', 'delete all branch exclude master')
  .option('-e, --exclude', 'delete exclude branch')
  .option('-i, --include', 'delete include branch')
  .description('批量操作git')
  .parse(args)

args = args.filter((item) => {
  return item.indexOf('-') !== 0
})
let partten = args[2]
if (program.all) {
  console.log(chalk.blue('开始删除除master以外所有分支'))
  let res = shell.exec(`git branch | grep -vE master`)
    .stdout
  delBranchs(res)
}
if (program.include) {
  console.log(chalk.blue('开始批量删除分支'))
  let res = shell.exec(`git branch`)
    .stdout
  let branchs = getBranchs(res, partten)
  branchs.map((item) => {
    console.log(item.indexOf('*'))
    if(item.indexOf('*') === 0) {
      console.log(chalk.red(`${item}分支正在被使用, 请切到其他分支再进行删除`))
    }else {
      shell.exec(`git branch -D ${item}`)
    }
  })
}
if (program.exclude) {
  console.log(chalk.blue('开始批量删除其他分支'))
  let res = shell.exec(`git branch`)
    .stdout
  let branchs = getBranchs(res, partten, true)
  branchs.map((item) => {
    if(item.indexOf('*') === 0) {
      console.log(chalk.red(`${item}分支正在被使用, 请切到其他分支再进行删除`))
    }else {
      shell.exec(`git branch -D ${item}`)
    }
  })
}

/*////////////// helper methods ///////////////////////*/

function delBranchs(res) {
  if (res) {
    let arr = res.split('\n')
      .map((item) => {
        item = item.replace(/(\s)/g, '')
        if (item) {
          if(item.indexOf('*') === 0) {
            console.log(chalk.red(`${item}分支正在被使用, 请切到其他分支再进行删除`))
          }else {
            shell.exec(`git branch -D ${item}`)
          }
        }
      })
  }
}
/**
 * @param {Object} res - array for branchs
 * @param {String} partten - partten to filter branch
 * @param {Boolean} flag - isExcludes ? , default: false
 *
 */
function getBranchs(res, partten, flag = false) {
  if (res) {
    let arr = res.split('\n')
      .map((item) => {
        item = item.replace(/(\s)/g, '')
        return item
      })
      .filter(function (t){
        let item = t.replace(/\*/g, '')
        let reg = new RegExp(`^${partten.replace('*', '.')}$`, 'gi')
        return (flag ? !reg.test(item) : reg.test(item)) && item
      })
    return arr
  } else {
    return []
  }
}
