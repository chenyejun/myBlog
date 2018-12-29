
服务端
```javascript
const WebSocket = require('ws');

let clientsObj = {};
wss.on('connection', function (ws, req) {
    ws.on('open', function () {
        console.log('connection connected');
    });
    ws.on('message', function(data) {
        // 初始化用户
        data = JSON.parse(data);
        if (data.self) {
            console.log(`用户：${data.self}上线了`)
            clientsObj[data.self] = ws;
        }
        // 发送给指定用户
        if (clientsObj[data.friend]) {
            clientsObj[data.friend].send(data.message);
        }
    });
    ws.on('close', function (e) {
        console.log('close')
    })
    ws.on('error', function (e) {
        console.log(e)
    })
})


const httpServer = http.createServer(app);
const wss = new WebSocket.Server({httpServer});
httpServer.listen(3001, function () {
    console.log('Server is listening:  http://192.168.9.84:3001');
});

```

网页端用户1：
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<button id="btn">发送信息</button>
</body>
<script>
 	var oBtn = document.getElementById('btn');
	var wsServer = new WebSocket('ws://192.168.9.84:3001');
	wsServer.onopen = function (e) {
		var self = JSON.stringify({
			'self': 'pcUser'
		});
		wsServer.send(self);
	};
	wsServer.onclose = function (e) {//当链接关闭的时候触发

	};

	oBtn.addEventListener('click', function() {
		alert('sdf');
		let friend = JSON.stringify({
			friend: 'mobileUser',
			message: '发送给移动端'
		});
		wsServer.send(friend);
	}, false);

	wsServer.onmessage = function (e) {//后台返回消息的时候触发
		
	};
	
	wsServer.onerror = function (e) {//错误情况触发

	}
</script>
</html>

```

网页端用户2：
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	
</body>
<script>
	var wsServer = new WebSocket('ws://192.168.9.84:3001');
	wsServer.onopen = function (e) {
	 	let self = JSON.stringify({
	    	self: 'mobileUser'
	    });
	    wsServer.send(self);
	};
	wsServer.onclose = function (e) {//当链接关闭的时候触发

	};
	wsServer.onmessage = function (e) {//后台返回消息的时候触发
	     console.log(e.data);
	};
	wsServer.onerror = function (e) {//错误情况触发

	}
</script>
</html>
```