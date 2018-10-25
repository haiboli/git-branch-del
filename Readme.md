# gitBranchBatch
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
     
执行
     git-branch -e 'master'
     
执行后分支
     master
```


