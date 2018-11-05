# gitBranchBatch
## 目的
    批量删除git分支
## 开始
    npm install git-branch-batch -g

## 选项
     -a,--all 删除除了master之外其他分支
     -e,--exclude 删除除指定分支外的其他分支
     -i,--include 删除指定分支
## 例子
```
当前分支
     branch-a
     branch-b
     master
     current

执行
     git-branch -e 'master|current'

执行后分支
     master
     current

支持正则表达式：
     git-branch -i 'branch*|cu*'  删除branch开头和cu开头的分支
     git-branch -i '\d' 删除纯数字的分支
```


