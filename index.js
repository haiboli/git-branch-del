#!/usr/bin/env node
let args = process.argv
let cmd = require('commander'),
  chalk = require('chalk'),
  shell = require('shelljs');
/**
 * git 批量删除
 */
cmd
  .version('0.1.0')
  .option('-a, --all', 'delete all branch exclude master')
  .option('-e, --exclude', 'delete exclude branch')
  .option('-i, --include', 'delete include branch')
  .description('批量操作git')
  .parse(args)

if(cmd.all) {
  console.log(chalk.red('开始删除除master以外所有分支'))
  shell.exec(`git branch -a | grep -vE master} | xArgs git branch -D`)
}
if(cmd.include) {
  console.log(chalk.blue('开始批量删除分支'))
  shell.exec(`git branch -a | grep -E ${args[2]} | xArgs git branch -D`)
}
if(cmd.exclude) {
  console.log(chalk.blue('开始批量删除其他分支'))
  shell.exec(`git branch -a | grep -vE ${args[2]} | xArgs git branch -D`)
}
