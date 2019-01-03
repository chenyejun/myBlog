服务端
```javascript
var socketUser = {};
function wsfn (server) {
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        socket.on('join', function(data) {
            console.log(`--------${data.user}上线了-----------`);
            socketUser[data.user] = socket;
        });
        // 接口客户端的消息
        socket.on('clientSend', function(data) {
            console.log(`---发送给${data.friend}--message: ${data.message}---`);
            if (socketUser[data.friend]) {
                // 发送给指定客户端
                socketUser[data.friend].emit('clientGet',{
                    message:data.message
                });
            }
        });

        // 客户端断开连接
        socket.on('offOnline', function (data) 
        {
            delete socketUser[data.user];
            console.log(`--------${data.user}断开连接了-----------`);
        });
    });
}

const httpServer = http.createServer(app);
wsfn(httpServer);
httpServer.listen(3001, function () {
    console.log('Server is listening:  http://192.168.9.84:3001');
});

```

网页端1
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>
</head>
<body>
	<button id="btn">发送信息</button>
</body>
<script>
 	var oBtn = document.getElementById('btn');
	var socket = io.connect('http://192.168.9.84:3001');

	socket.emit('join', {user: 'mobileUser'});
	
	oBtn.addEventListener('click', function(){
		socket.emit('clientSend',{
			friend: 'pcUser',
			message: '发送给pc端'
		});
	}, false);

	/*在浏览器刷新或者关闭的时候，让用户断线*/
	window.onbeforeunload=function()
	{
		socket.emit('offOnline',{user: 'mobileUser'});
	}

</script>
</html>
```

网页端2：
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>
</head>
<body>
	
</body>
<script>
	var socket = io.connect('http://192.168.9.84:3001');
	var userCode = 'sdfsdf333';
	socket.emit('join', {user: 'pcUser'});
	
	socket.on('clientGet', function(data) {
        console.log('接收到移动端的信号');
        console.log(data);
    });
	
	/*在浏览器刷新或者关闭的时候，让用户断线*/
	window.onbeforeunload=function()
	{
		socket.emit('offOnline', {user: 'pcUser'});
	}
</script>
</html>

```

如果客户端网页是通过域名进行nginx代理访问的，需要配置nginx将socket.io的服务器端口暴露出去：
```js
server {
    listen       80;
    server_name baidu.com;

    location /socket.io/ {        
        # 此处改为 socket.io 后端的 ip 和端口即可（即是本服务器）
        proxy_pass http://127.0.0.1:3001;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}

客户端访问：
var socket = io.connect('http://baidu.com/');
```


