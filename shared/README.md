# shared
该目录都为git的submodule，维护命令

```shell
# 1. add submodule
#    添加
git submodule add <url> <path>
#    查看修改内容可以看到增加了子模块
git diff --cached
#    commit
git commit

# 2. 下载
git submodule init && git submodule update
#    或
git submodule update --init --recursive

# 3. 清理子模块

rm -rf # 子模块目录 删除子模块目录及源码
vi .gitmodules # 删除项目目录下.gitmodules文件中子模块相关条目
vi .git/config # 删除配置项中子模块相关条目
rm .git/module/* # 删除模块下的子模块目录，每个子模块对应一个目录，注意只删除对应的子模块目录即可
git rm --cached 子模块名称 # 执行完成后，再执行添加子模块命令即可，如果仍然报错，执行如下：

```
