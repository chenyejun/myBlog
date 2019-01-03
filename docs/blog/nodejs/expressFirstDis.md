### 1. 安装使用express框架： 
express是nodejs中一个比较流行的web开发框架，可以快速搭载一个web应用

#### 1.1 使用npm全局安装express命令行工具，可以让我们初始化一个express项目：

```
npm install -g express-generator
```
#### 1.2 创建一个安装express项目的文件夹，我这里为nodejs：

使用命令提示符进入这个nodejs文件夹：

![image](http://note.youdao.com/yws/api/personal/file/9DD6D118ACDD4D95A8B7C8B399036374?method=download&shareKey=d727b3420a77bfd89d32b0e26f10fb1b)

#### 1.3 使用命令初始化一个名为jun的项目：（这里的-e代表使用ejs模板引擎）
```
$ express -e jun
```
下图说明初始化成功，图中红框中还提示接下来的步骤：

![image](http://note.youdao.com/yws/api/personal/file/FA7A69A76AC94E2987671BAAAAF94203?method=download&shareKey=d7eb18336e07887bdc97bd79233812b9)

#### 1.4 然后进入这个文件夹，安装依赖模块
```
cd jun && npm install

```

#### 1.5 调试与运行：
```
SET DEBUG=jun:* & npm start

```
成功运行express基本骨架：


![image](http://note.youdao.com/yws/api/personal/file/5FEE56C4BD9D4BA7A6F010808867F783?method=download&shareKey=19f95e0ae8e7a8806ddef9f14c0a5686)


---
### 2. express框架结构：


![image](http://note.youdao.com/yws/api/personal/file/58864477BB814D7DA01E07A4094379AA?method=download&shareKey=51ca4eff3b782c4a64dfb87e0afefa1c)


app.js：启动文件，或者说入口文件

package.json：存储着工程的信息及模块依赖，当在 dependencies 中添加依赖的模块时，运行 npm install ，npm 会检查当前目录下的 package.json，并自动安装所有指定的模块。（如果我们想要安装一个package.json中不存在的模块，我们不需要在package.json中添加模块信息，然后重新运行npm install，只需要在安装某一个模块的时候，添加--save参数就可以了，添加--save参数的作用是当你安装某一个模块的时候，会把该模块依赖信息自动添加到package.json中，例如安装一个mongoose模块，运行npm install mongoose --save）

node_modules：存放 package.json 中安装的模块，当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下

public：存放 image、css、js 等文件

routes：存放路由文件

views：存放模版文件

bin：存放可执行文件，从packet.josn中可以知道


![image](http://note.youdao.com/yws/api/personal/file/F365D2E4D78647359188C17BEC55B904?method=download&shareKey=ef601ed456d26e0abd9695614d601d99)


#### 2.1 app.js代码：

导入express模块

```js

var express = require('express');

```


导入path模块，使用该模块方法，设置相对路径，[可以参考菜鸟教程的path模块解释](http://www.runoob.com/nodejs/nodejs-path-module.html)

```js
var path = require('path');

```

该模块用于设置网页的logo，就是网页标题左边的图标：

![image](http://note.youdao.com/yws/api/personal/file/B790468C2C354E4C9F7D43552B80AE4C?method=download&shareKey=9ec3198c3f38d3c0db1a727d374da475)

```js
var favicon = require('serve-favicon');
```

导入morgan日志中间件，用于把访问信息等输出到控制台或者文件中，详细使用参考 [大神文章](https://segmentfault.com/a/1190000007769095)
```js
var logger = require('morgan');
```


导入cookie-parser中间件，用于设置浏览器的cookie，详细参考 [大神文章](https://segmentfault.com/a/1190000004139342?_ea=504710)
```js
var cookieParser = require('cookie-parser');

```

body-parser中间件，对post请求进行格式化
```js
var bodyParser = require('body-parser');

```

导入路由文件
```js
var routes = require('./routes/index');
var users = require('./routes/users');

```

实例化一个express，名为app
```js
var app = express();
```

设置views文件夹下的模板文件的路径为根路径，即是可以直接使用views下面的文件，而不需要指定具体的相对路径或者绝对路径：
```js
app.set('views', path.join(__dirname, 'views'));

```

使用ejs模板引擎
```js
app.set('view engine', 'ejs');

```

设置网页logo为/public/favicon.ico的图标文件
```js
app.use(favicon(__dirname + '/public/favicon.ico'));
```

使用dev格式输出日志(express默认使用dev格式)：
而Morgan预定义了5中输出格式：
```js
combined
:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"



common
:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]



dev
:method :url :status :response-time ms - :res[content-length]



short
:remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms



tiny
:method :url :status :res[content-length] - :response-time ms


```
例如我们npm start，运行一下我们的项目，然后我们访问一下http://localhost:3000/，控制台输出：

![image](http://note.youdao.com/yws/api/personal/file/8AA93E6BBC8E45C8955327A2FC3A4EBF?method=download&shareKey=4745630dbcd269cf8d7002b40b0f6b6b)

```js
app.use(logger('dev'));
```


返回一个只解析json的中间件，可以支持任何unicode编码的消息体，同时也支持gzip和deflate编码。最后保存的数据都放在req.body对象上
```js
app.use(bodyParser.json());

```

extended为false表示使用querystring来解析数据，这是URL-encoded解析器
```js
app.use(bodyParser.urlencoded({ extended: false }));
```

使用cookieParser中间件
```js
app.use(cookieParser());
```

这里设置public文件夹为静态文件夹，参考 [文章](http://www.expressjs.com.cn/starter/static-files.html)
```js
app.use(express.static(path.join(__dirname, 'public')));
```

使用路由：
```js
app.use('/', routes);
app.use('/users', users);

```



### 3. 使用路由express.Router()：

routes文件夹是存放各种路由文件的地方：
当我们接收到对应的url路由，就会执行对应的路由函数

看routes中的index.js
```js
var express = require('express');

实例化一个router
var router = express.Router();

当访问到（根/）路径时（即访问'http://localhost:3000/'时），渲染views文件夹下的index.ejs，（因为前面已经对views文件夹下的模板文件进行了路径设置，所以只需要直接render指定的模板文件名就可以了）：
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
});


module.exports = router;

```

再看app.js下的对routes下的路由文件处理：
```js
导入routes下的index函数
var index = require('./routes/index');

实例化一个app对象
var app = express();

这个use方法，当访问根路径（'http://localhost:3000'）的时候，执行index路由
app.use('/', index);


```
这里的app.use()方法的第一个参数与index.js里面的rouer.get()方法的第一个参数的路径是相对的，下面我们改一下代码
```js
//app.js
app.use('/a',index);

//routes/index.js
router.get('/b',function(){})
```
这样，浏览器访问路径就变成http://localhost:3000/a/b了：


![image](http://note.youdao.com/yws/api/personal/file/5300FAD5DDA1478A9F32196857C935DE?method=download&shareKey=cbf466b5724e21285c86830660db13bc)


### 4. 渲染ejs模板：
什么是模板呢，作用是什么，为什么要使用模板引擎呢？其实很简单，模板引擎就是用来渲染数据的，一个模板实际上就是一个静态的html页面，通过ejs等模板语法，把nodejs后台取到的数据渲染出来，当我们访问一个路由时，nodejs通过res.render方法执行模板引擎，渲染页面，然后把渲染出来的带有数据的html页面发送到前台，就成了拥有动态数据的html页面了。


routes/index.js下：
```js
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express'});
   
});

```
res.render()方法是返回一个渲染后的模板文件，这里为index。
第一个参数是views下的一个模板引擎，第二个参数是需要传递给模板引擎的json数据。

下面我们改一下index.js和index.ejs文件，传递复杂一点的数据：
index.js
```js
var data=
[
	{
		name:'xiaojun',
		age:'22',
		color:['red','green','blue']
	},
	{
		name:'xiao',
		age:'22',
		color:['black','white','gray']
	}
];

router.get('/', function(req, res, next) {
   
   res.render('index', { title: 'Express',data:data});
   
});

```
index.ejs:

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
  
  	<ul>
		<% data.forEach(function(childData){ %>  
		     	<li><%=childData.name%></li>
		     	<li><%=childData.age%></li>
		     	<li>
		     		<ul>
		     			<% childData.color.forEach(function(color){ %>  
							<li><%=color%></li>
		     			<% })%>
		     		</ul>
		     	</li>
		<% })%>  
	</ul>
  </body>
</html>

```

npm start 运行：


![image](http://note.youdao.com/yws/api/personal/file/9C69D7819E424C4381F2602D04FBD044?method=download&shareKey=a381c3980579c6e37b7916393c353feb)


### 5. 中间件：app.js中多次提到中间件，那么中间件是什么呢，它的作用又是什么呢？而按照我的理解，中间件就是在运行router的get()或者post()方法之前先运行的函数，使用use()方法实现中间件。
下面举个例子，自定义一个中间件：
index.js:
```js
color本来是black;
var color='black';
```
这是一个没有挂载路径的中间件，所以每个请求都会执行该中间件，必须要有next参数，并且必须执行next()，next的作用是跳转到下一个相同路由的中间件，如果忽略了next参数，当项目运行到这个中间件的时候，会无法跳出这个中间件，从而无法运行之后的代码。
```js
router.use(function (req, res, next) {
  
  把color变成white
  color='white';
  next();
});

router.get('/', function(req, res, next) {

   res.render('index', {showColor:color});
   
});

```
npm start 运行：

![image](http://note.youdao.com/yws/api/personal/file/26808974549B40D880C41BEEFF8352B2?method=download&shareKey=36cf11f32e7f2471f97a1b7ea9065813)











