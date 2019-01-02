```js
关闭nginx服务：
方法一：运行命令： sudo brew services stop nginx
方法二：运行命令： nginx -s stop
方法三：
运行命令：ps -ef | grep nginx，找到master对应的进程号。
快速停止：kill -TERM nginx进程号或kill -INT nginx进程号
从容停止： kill -QUIT nginx进程号
强制停止所有nginx进程：pkill -9 nginx

重启nginx服务：
方法一：nginx -s reload
方法二： 平滑重启命令： kill -HUP nginx进程号

```