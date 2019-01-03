# 操作mongodb相关命令
## 一、基本命令
### 显示所有数据库

```
show dbs
```

### 切换数据库，数据库不存在则创建

```
use xiaojun
```

### 创建一个集合

```
db.createCollection("xiaojunjihe")
```

### 显示所有集合集合

```
show collections
```

### 删除集合

```
db.xiaojunjihe.drop()
```

### 往集合插入文档数据，如果集合不存在则创建该集合

```
db.xiaojunjihe.insert({id:1,name:"xiaojun"})
```

### 显示集合的所有文档数据

```
db.xiaojunjihe.find()
```

### 删除某一条文档数据

```
db.xiaojunjihe.remove({id:1})
```

### 删除所有文档数据

```
db.xiaojunjihe.remove({})
```

### 删除文档中的某一个字段
```
使用update命令

update命令格式：

db.collection.update(criteria,objNew,upsert,multi)

参数说明：

criteria：查询条件

objNew：update对象和一些更新操作符

upsert：如果不存在update的记录，是否插入objNew这个新的文档，true为插入，默认为false，不插入。

multi：默认是false，只更新找到的第一条记录。如果为true，把按条件查询出来的记录全部更新。

//例如要把User表中address字段删除
db.User.update({},{$unset:{'address':''}},false, true)

```


### 统计所有文档数据条数

```
db.xiaojunjihe.count()
```

## 二、操作数据库命令
### 显示所有数据库
```
show dbs
```

### 切换数据库，没有则创建
```
use xiaojun
```

### 删除数据库
```
use xiaojun //切换到数据库
db.dropDatabase()
```

## 三、操纵集合命令
在这里需要注意的是，创建的集合名应该以s结尾，因为当使用mongoose等框架操作数据库时，会自动给集合名结尾添加s

### 创建集合
```
db.createCollection('xiaojunjihes')
```

### 删除集合
```
db.xiaojunjihes.drop()
```

## 四、操纵文档命令

### 集合插入文档数据，如果集合不存在则创建并插入数据
```
db.xiaojunjihes.insert({name:'xiaojun'})

```

### 删除指定集合中的所有文档数据
```
db.xiaojunjihes.remove({})

```

### 删除某一条文档数据
```
db.xiaojunjihes.remove({name:'xiaojun'})
```

### 删除文档中的某一个字段
```
update命令

update命令格式：

db.collections.update(criteria,objNew,upsert,multi)

参数说明：

criteria：查询条件

objNew：update对象和一些更新操作符

upsert：如果不存在update的记录，是否插入objNew这个新的文档，true为插入，默认为false，不插入。

multi：默认是false，只更新找到的第一条记录。如果为true，把按条件查询出来的记录全部更新。

//例如要把User表中address字段删除
db.Users.update({},{$unset:{'address':''}},false, true)
```

### 修改集文档中的某一个字段，与上面的unset不同，这里是set，第一个参数是查询条件
例如要把User表_id为ObjectId("587e5e0e09a4670334208e88")的文档中的name:的字段改成name:'dajun'
```
db.Users.update({"_id":ObjectId("587e5e0e09a4670334208e88")},{$set:{'name':'dajun'}},false, true)
```

### 向某一个文档添加一个字段：
例如下面向User中_id为ObjectId("587e5e0e09a4670334208e88")的文档添加一个u:1字段
```
db.Users.update({"_id" : ObjectId("587e5e0e09a4670334208e88")},{"$set" : {"u" : "1"}});

```

### 统计集合中数据的条数
```
db.xiaojunjihes.count()
```

