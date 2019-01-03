# windows安装mongodb
### mongodb简介：
MongoDB是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。他支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型

### mongodb下载链接：

[mongodb下载](https://www.mongodb.com/)

### mongodb安装过程：

#### 1. 下载完，自定义安装，选择一个安装位置，我的安装位置：
```css
D:\mongoDB
```
#### 2. 安装完后，如下图：

![image](http://note.youdao.com/yws/api/personal/file/20C976E27C3E408F8FE499C910194760?method=download&shareKey=ec07a757a5a8fcf1a583fcf6263be09f)

#### 3.接下来，我们需要在bin目录下建立一些文件夹

3.1 建立一个data和一个logs文件夹：

![image](http://note.youdao.com/yws/api/personal/file/FDC9CAC5C78C45BFAC119E735E0EC69B?method=download&shareKey=a214171a8dd59b0d694f65d11ed2a940)


3.2 在logs里面新建一个文件：mongo.log

![image](http://note.youdao.com/yws/api/personal/file/8C581019C7CC40B1B08FA9D1D9212C97?method=download&shareKey=9b2d8a040299a02b57fe9266c7fed2fe)


#### 4. 在mongo根目录创建配置文件:mongo.conf

![image](http://note.youdao.com/yws/api/personal/file/71101EDFDE0D4AD99880153F58DFEDA8?method=download&shareKey=837df9318027fd37243de25681187088)

4.1 mongo.conf需要配置一些内容：
```css
#数据库路径  
dbpath=D:\Mongo\data  

#日志输出文件路径  
logpath=D:\Mongo\logs\mongo.log  

#错误日志采用追加模式  
logappend=true  

#启用日志文件，默认启用  
journal=true  

#这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false  
quiet=true  

#端口号 默认为27017  
port=27017 

#是否开启数据库用户权限认证
auth=true

```

#### 5. 配置环境变量，以免运行bin目录下的命令总是需要进入bin目录下才能使用：

5.1 在我的电脑--右键--属性：

![image](http://note.youdao.com/yws/api/personal/file/ADEE90DE3930430D8911285D373C3581?method=download&shareKey=c6361ce4c99cbeb2bfda9e2203de0036)

5.2 高级系统设置--环境变量：

![image](http://note.youdao.com/yws/api/personal/file/AB028391932644FAA84836720C04E760?method=download&shareKey=bc1d0eb721fc7ded392d31f2e6410d54)

5.3 在用户变量下的path路径--编辑--新建添加mongodb中bin目录的路径（我这里为：D:\mongoDB\bin）：

![image](http://note.youdao.com/yws/api/personal/file/C5EDDE415E1E42D8AAD4E94208ACCEE4?method=download&shareKey=90a39e5f04643568f794647837f60c7e)


5.4 这样子我们就可以win+R，输入cmd进入命令提示符直接就可以运行一些命令，而不用每次都进入mongodb安装目录下的bin目录去运行。


#### 6. 创建和启动mongodb服务

6.1 在命令提示符中输入一下命令：（注意：下面的路径是你配置mongo.conf的路径，我的是D:\mongoDB\mongo.conf。）
```css
mongod --config "D:\mongoDB\mongo.conf"  --install --serviceName "MongoDB"
```

6.2 运行上面的命令，发现没有发生什么惊天提示，嗯，没有提示消息就是好消息，我们打开window服务看看MongoDB服务是否已经被创建：

```css
win+R，输入services.msc：
```

![image](http://note.youdao.com/yws/api/personal/file/20CDD8B58FF54EB39BB7AD63E057E207?method=download&shareKey=980aa512ba18cc13fd7bcf3450e8c3a0)

运行，查看，发现mongodb服务已经被创建：

![image](http://note.youdao.com/yws/api/personal/file/422C5D66CC684E4595169DFB81ADAE9F?method=download&shareKey=c5c585c95c573a40f9e0227473cccd15)


6.3 (启动mongodb服务需要进入管理员命令提示符)我们进入管理员命令提示符：先按win+x，然后a，输入一下命令启动服务：
```css
net start mongodb
```

![image](http://note.youdao.com/yws/api/personal/file/DF00545877DF433E8EAE387038335533?method=download&shareKey=9247137d4a5f07b8e0b1999069e6fb0b)

6.4 然后我们在浏览器输入http://127.0.0.1:27017/，出现一下界面，你就success了:

![image](http://note.youdao.com/yws/api/personal/file/A8F462FD68B54EC0A4585BB7FB71B246?method=download&shareKey=373eca3918c10be450b3ee9fa4d7e664)


6.5 进入命令提示符，输入：
```css
mongo
```

进入mongodb的shell界面，exit命令推出mongodb代表的shell界面：

![image](http://note.youdao.com/yws/api/personal/file/C72FA623C88E4AEA9D810BBA28FB9B87?method=download&shareKey=b10a0c585cba1667cf15e0f92c20440a)

6.6 停止mongodb服务（管理员命令提示符）：
```css
net stop mongodb
```

6.7 卸载mongodb服务：

```css
mongod.exe --remove --serviceName "MongoDB"
```

至此，mongodb安装过程结束。











