### 用户知识

a.MongoDB是没有默认管理员账号的，所以要先添加管理员账号，在开启权限认证。

b.切换到admin数据库，添加的账号才是管理员的账号。

c.用户只能在用户所在的数据库登录，包括管理员账号。


d.管理员可以管理所有的数据库，但是不能直接管理其它数据库，要先在admin数据库中认证才可以，也是为了 安全性考虑。


### 添加管理员
```
show dbs
```

查看数据库列表：
发现有admin和local两个数据库

进入admin 数据库：
```
use admin
```
然后查看admin下面有什么集合：
```
show collections
```

我们可以看到有两个表：


system.users（这张表是用来存放超级管理员的）

system.version

接下来：创建管理员账户：
```js
> db.createUser(
    {user:'admin',
    pwd:'xiaojun',
    roles:
    [
        {role:'userAdminAnyDatabase',db:'admin'}
    ]
})
```


当添加完用户信息之后，我们的想法就是马上重新连接验证是否权限已经控制，这里就打击你了，当然还没有控制，这里我们还需要开启用户权限验证，因为MongoDB默认是不开启权限验证的，下面我们简单说一下如何开启权限验证：

```js
在mongo.conf添加auth=true
```

重启服务：
```js
退出mongo shell ：
exit

停止mongodb服务：
net stop mongodb

启动mongodb服务：
net start mongodb


```

然后mongo进入shell：
进入admin
```
use admin
```

然后查看users表，发现没有权限访问：

![image](http://note.youdao.com/yws/api/personal/file/072CA2E68FAA4100AD9B36EE0D659387?method=download&shareKey=01fe18f0f4b959f602f0ce3d6b26102e)


当我们用admin登录认证后，就可以访问了：
```
db.auth('admin','xiaojun')
```

![image](http://note.youdao.com/yws/api/personal/file/1155C698BB83475080270F34E4299D94?method=download&shareKey=2c84c0dbfbea2c12f12a5e2656f54f2d)

在这里我们创建一个集合:
```
use xiaojun

```
然后插入数据：
```js
db.xiaojun.insert({name:'xiaojun'});
```
发现错误：

![image](http://note.youdao.com/yws/api/personal/file/0355CC3333B24B0B97F89853665BF3CF?method=download&shareKey=a7c12ddff5eb3f1b997f3ba02dc854ee)

**这是因为给admin授权的userAdminAnyDatabase权限只是针对用户管理的，对其它的表示没有操作权限的**



#### b 关于MongoDB的内置角色，我们大概可以分为以下几种来简单说一下
b.1 DatabaseUserRoles(数据库用户角色)：read、readWrite


b.2 Database Administration Roles(数据库管理角色)：dbAdmin、dbOwner、userAdmin

　
　　　　
b.3 Culster AdministrationRoles(管理员组，针对整个系统进行管理)：clusterAdmin、clusterManager、clusterMonitor、hostManager
　　　　

b.4 Backup and Restoration Roles(备份还原角色组)：backup、restore
　　　　

b.5 All-Database Roles(所有数据库角色)：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
　　　　

b.6 Superuser Roles(超级管理员)：root、(dbOwner、userAdmin、userAdminAnyDatabase这几个角色角色提供了任何数据任何用户的任何权限的能力，拥有这个角色的用户可以在任何数据库上定义它们自己的权限)
　　　　

b.7  Internal Role(内部角色，一般情况下不建议设置)：__system



### 下面我们创建一个超级管理员(超级管理员可以对任意数据库做任意操作，有最高权限)：
```js
use admin
db.createUser({user:'root',pwd:'root',roles:[{role:'root',db:'admin'}]})

授权给超级管理员：
db.auth('root','root');
```
然后我们创建一个数据库xiaojun和集合child，并插入数据：

```js
use xiaojun

db.child.insert({name:'xiaojun'})

```
我们发现上面的操作都可以进行，这就是超级管理员的作用，拥有一切权限。

### 注意注意：在哪个数据库创建的角色就需要在哪个数据库下授权，才能成功：
比如：我们有两个数据库：xiao和da

我们在da下，创建指向数据库xiao的角色用户（user:'xiao'）：
```js
use da

db.createUser({user:'xiao',pwd:'xiao',roles:[{role:'read',db:'xiao'}]})

```
好了，我们创建成功了，当我们切换到xiao，然后授权给用户角色（user:'xiao'）：

```js
use xiao

db.auth('xiao','xiao')
```
然后发现失败了，不能授权

![image](http://note.youdao.com/yws/api/personal/file/5C0F61E33ABC4CFAA1A99AE1B66B9740?method=download&shareKey=764525a634678047bf4d22bb26597333)

**这是因为，user：xiao角色是在da数据库下创建的，所以必须在da数据库下才能授权成功**

我们切换到da用户，然后授权给user：xiao：
```js
use da
db.auth('xiao','xiao')
```
![image](http://note.youdao.com/yws/api/personal/file/58F3FD40956A4F339617F85462B67165?method=download&shareKey=86f81545302d78304cbef624cf8aafcc)


其实我们查看用户是在那个数据库下创建的，也可以查看该用户是授权给哪个数据库（即是它的权限是操作哪个数据库的）：
```js
use admin
db.system.users.find()
```

![image](http://note.youdao.com/yws/api/personal/file/C22E3B84D5A34BDF91DF6306FC04FAA5?method=download&shareKey=4204de5c6b8c550a4192491ea3993455)













