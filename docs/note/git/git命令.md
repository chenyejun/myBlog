本地git库：
```graph LR
本地目录-->暂存库
暂存库-->版本库
版本库-->远程仓库
```

本地文件--- ==git add== --->暂存库--- ==git commit -m "说明"==--->版本库---git  push--->远程仓库

---

1. 初始化git仓库
```js
git init
```
2. 查看git仓库状态
```js
git status
```
3. 查看所有产生的 commit 记录
```js
git log
```
4. 查看本地分支情况
```js
git branch
```
5. 创建分支名为a的分支
```js
git branch a
```
6. 切换分支
```js
git checkout a
```
7. 新建并切换分支
```js
git checkout -b a
```
8. 删除分支
```js
git branch -d a  （删除已合并的分支）
git branch -D a  （强制删除分支）

```
9. 合并分支 （a是master的分支，把a合并到master主分支）
```js
git checkout master
git merge a
```
10. 给代码添加版本标签 (git commit之后添加)
```js
1. 给当前代码添加 v0.1版本标签
git tag v0.1
2. 查看当前的项目的标签列表
git tag
3. 切换标签版本
git checkout v0.1(标签名)

```

11. 自定义命令别名==alias.别名==
```js
git config --global alias.co checkout
执行 :
git co

一个很吊的查看commit记录的配置：
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Crese - %C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"
执行：
git lg
```

12. git pull rebase 冲突时：
```js
1. 先解决冲突
2. git add  提交修改
3. git rebase --continue 将余下的补丁应用
```
13. 
```js
git rebase --abort 会回到rebase操作之前的状态，之前的提交的不会丢弃；
```
14. git rebase --skip
```js
则会将引起冲突的部分代码丢弃掉；
例如：
1. master 分支和a分支的a.txt内容都为：
mmmmmmm
1111
2. 现在两个分支都修改了同一个地方：
3. master的a.txt修改为:
master
1111
4. a分支的a.txt修改为：
aaaa
2222
5. 在master执行 git rebase a （将a的内容合并到master中）后提示冲突
6. 当执行git rebase --skip后：
会将master的冲突代码丢弃掉，所以master的a.txt的内容变成：
aaaa
2222
```
15. git rebase --continue
```js
用于修复冲突，提示开发者，一步一步地有没有解决冲突，fix conflicts and then run "git rebase --continue"
```

16. 查看本地与远程仓库的链接源、新增链接源
```js
查看：git remote -v
新增：git remote add 'git仓库地址'
```
17. 拉取远程指定分支到本地
```js
git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
```
18. 将本地分支的更新，推送到远程主机
```js
首次提交 加参数 -u 
git [- u] push <远程主机名> <本地分支名>:<远程分支名>
```

19. 撤销工作区的修改
```js
指定文件：git checkout -- <文件名>
全部文件：git checkout .
```
20. 撤销暂存区的修改 （git add之后的）
```js
git reset HEAD
```
21. 撤销版本库的修改 （git commit之后的）
```js
1. git log 
找到想要撤销的id 
2. git reset -–hard id 
完成撤销,同时将代码恢复到前一commit_id 对应的版本 
```
![image](https://marklodato.github.io/visual-git-guide/basic-usage.svg)

