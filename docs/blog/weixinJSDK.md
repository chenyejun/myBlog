# 微信本地调试js-sdk
本地调试js-sdk，因为初始化js-sdk的时还需要通过域名url才能生成签名，所以需要在本地模拟一个域名进行调试。下面是详细的操作步骤：

---

### 1. 首先需要让手机与调试的电脑位于同一个局域网
### 2. 让电脑能够通过自己设置的域名访问调试本地页面，例如我的页面index是http://127.0.0.1/basic.html，我想要通过电脑浏览器访问http://baidu.com/basic.html得到我的页面index 

#### （1） 修改hosts ，windows路径（C:\Windows\System32\drivers\etc），先用#把 127.0.0.1 localhost 注释掉，新建 127.0.0.1 baidu.com 

![image](https://note.youdao.com/yws/api/personal/file/6F1C8686755A46C696AF09A6B50D61AB?method=download&shareKey=d5670ace2577b0d00eb149ef6dffa31a)

#### （2）. 访问http://baidu.com/basic.html：

![image](https://note.youdao.com/yws/api/personal/file/4BA25B98493F4D94A97DD16D53168FC1?method=download&shareKey=e712796f91c827e95a0c261bcee932c4)

### 3. 下载安装charles，将手机的ip访问代理到电脑端： 

#### （1）. 查看电脑ip：192.168.6.162

#### （2）. 打开charles，它默认通过8888端口代理，打开Proxy->Proxy Settings查看：
![image](https://note.youdao.com/yws/api/personal/file/02FEB81C46114D3E9AB662B4532558BF?method=download&shareKey=a73722a5112d2de4c502b2ae40b555da)

#### （3）. 打开手机的wifi设置代理ip和端口：

![image](https://note.youdao.com/yws/api/personal/file/6AB7D03FD406456888DFC05ACC69F842?method=download&shareKey=83716a316e989531d42eb5da817ecd97)

#### （4）. 手机访问：'http://baidu.com/basic.html'，如果手机能通过你的电脑的自定义域名进行访问，就证明代理成，。向成功又迈进了一大步。

![image](https://note.youdao.com/yws/api/personal/file/26C8DF9926EF45C0AC0C006537AB708F?method=download&shareKey=45e2d4e0688270fae9b6252974cac5e5)


#### 4. 引入微信js-sdk，生成token等信息进行初始化：

#### （1）. 进入个人的测试公众号（[微信公众平台：](https://mp.weixin.qq.com/)，没有就用个人邮箱注册一个）
![image](https://note.youdao.com/yws/api/personal/file/6D26EF9788CB4B8A900E72DC4DD1C6E4?method=download&shareKey=ffe7c25b32acc84e8027367be5702bb5)
![image](https://note.youdao.com/yws/api/personal/file/5A9D9E0EB69E4F7C98A97136D6F4F6A4?method=download&shareKey=bff2134dfcc76f6da79fe440e1bab6cd)
#### （2）切记，这里的域名绑定，是没有http://的

![image](https://note.youdao.com/yws/api/personal/file/CA24AD6EB2834D14A66803563679A88E?method=download&shareKey=a1af7878e798950ee25d8b381a6d6232)

#### (3). 记录下上图的appID和appsecret，用于获取token

#### (4). 启动node.js，写一个获取noncestr（随机数）、timestamp（时间戳）和signature（签名）的服务端请求，用于页面初始化jsdk，附上[官方文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)
#### （4.1）access_token和ticket有效期7200秒，而且这个接口每天都有调用次数限制，所以需要缓存起来，等过期了再重新调用获取，这里只是演示本地开发，没有做缓存。生产环境切记缓存。
#### （4.2）接口代码：（请注意代码注释）

```js
const request = require('request');
const sha1 = require('js-sha1'); // 引入sha1加密算法，需要使用sha1算法生成签名

app.post('/getWX', function (req, res) {
    const appId = '....';   // 测试公众号的addId   
    const appSecret = '.....'  // 测试公众号的appSecret
    const url = req.body.url; // 初始化jsdk的页面url，如果是单页应用记得截掉url的#部分

    let promise = new Promise((resolve, reject) => {
            // 第一步，通过appId和appSecret 获取access_token
            request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`, function (error, response, body) {
                if (!error && response.statusCode == 200) { 
                    let access_token = JSON.parse(body).access_token;
                    console.log('第一步获取access_token：', access_token);
                    resolve(access_token);
                } else {
                    reject(error);
                }
                });
        });
    
        promise.then(access_token => {
            // 第二步，通过第一步的access_token获取票据ticket
            return new Promise((resolve, reject) => {
                request(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`, function (error, response, body) {
                    if (!error && response.statusCode == 200) { 
                        let ticket = JSON.parse(body).ticket;
                        console.log('第二步获取ticket：',ticket);
                        resolve(ticket);
                    } else {
                        reject(error);
                    }
                });
            });
            
        }).then(ticket => {
            const createNonceStr = () => Math.random().toString(36).substr(2, 15);
            const createTimeStamp = () => parseInt(new Date().getTime() / 1000) + '';
            const calcSignature = function (ticket, noncestr, ts, url) {
                var str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${ts}&url=${url}`;
                shaObj = sha1(str); //使用sha1加密算法
                return shaObj;
            }
            const noncestr = createNonceStr(); // 随机字符串
            const timestamp = createTimeStamp(); // 时间戳
            const signature = calcSignature(ticket, noncestr, timestamp, url);  // 通过sha1算法得到签名
            res.send({
                noncestr: noncestr,
                timestamp: timestamp,
                signature: signature,
            })
        }).catch(error =>{
            console.log(error);
        });
});

```

#### (5). 页面记得引用wx-jsdk，进行页面初始化，点击login调起选择图片的js接口（单页应用的hash模式有个好处就是，你只需要在首页初始化一次js-sdk，就可以任意切换页面调用，因为初始化的时候是把#号及其后面的部分截取掉，而单页面的hash模式，页面切换只会改变#后面部分。）
```js
<template>
  <div @click="func">login</div>
</template>
<script>
import wx from 'wx' // 引用wx-jsdk
export default {
  name: 'Login',
  data () {
    return {}
  },
  mounted () {
    // 获取服务器生成的相关参数
    this.axios({
      url: '/api/getWX',
      method: 'post',
      data: {
        url: location.href.split('#')[0] // 把url的#及其后面的部分截取掉
      }
    }).then(res => {
      console.log('------');
      console.log(res.data);
      wx.config({
        debug: true, // 开发模式开启，便于调试是否成功初始化js-sdk
        appId: '.....', // appId
        timestamp: res.data.timestamp, // 时间戳
        nonceStr: res.data.noncestr, // 随机数 （注意，前面的nonceStr的S是大写的）
        signature: res.data.signature, // 签名
        jsApiList: ['checkJsApi', // 需要调用的js-sdk功能接口列表
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'scanQRCode'
        ]
      });
    });
  },
  methods: {
    func () {
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds;
          alert(localIds);
        }
      });
    }
  }
}
</script>

```
#### (6). 关注调试公众号：

![image](https://note.youdao.com/yws/api/personal/file/7B230F4C0BF34006A393F74E33F71DD5?method=download&shareKey=4b6eb7c0e4e1df2842c486375093bd75)

#### (7). 手机微信端调试（通过微信访问我们的项目）：

##### (7.1) 初始化成功提示：

![image](https://note.youdao.com/yws/api/personal/file/F19606F611FA4DDDAF0F59A0B04DBE7A?method=download&shareKey=c2cb71437ff5eec5cf593c9c1afea1c0)

##### (7.2) 点击login，调用chooseImg接口：

![image](https://note.youdao.com/yws/api/personal/file/211F78C72F2F47A18FE1E4136C1781AE?method=download&shareKey=186ba7f952b3f67ba37303a833a05a40)

##### (7.3) 成功调用页面alert：

![image](https://note.youdao.com/yws/api/personal/file/A50507ECF3DD41E99C084E50C3813043?method=download&shareKey=912da786806096c36646ad2afea95384)

### 5. 如果初始化失败，查看官网文档 [附录5-常见错误及解决方法](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)

### 6. 博客参考
[参考1](https://blog.csdn.net/yq_oxygen/article/details/78603917?locationNum=3&fps=1)

[参考2](https://blog.csdn.net/u011225099/article/details/76460197)