 1. zepto库无法使用某些css选择器；
---

 2. jquery封装的ajax请求无法进行发送类似于xml结构的字符串字段，会报错，如果需要发送这种格式的字符串，可以把该字符串先转换成base64编码格式再发送，到了后台以后再解码。

---
 3. application/x-www-form-urlencoded方式是Jquery的Ajax请求默认方式，这种方式的好处就是浏览器都支持，在请求发送过程中会对数据进行序列化处理，以键值对形式？key1=value1&key2=value2的方式发送到服务器，如果用Jquery，它内部已经进行了处理，如果自己写原生的Ajax请求或者使用axios，就需要自己对数据进行序列化。（可以通过qs库序列化） application/json，随着json规范的越来越流行，并且浏览器支持程度原来越好，许多开发人员易application/json作为请求content-type，告诉服务器请求的主题内容是json格式的字符串，服务器端会对json字符串进行解析，这种方式的好处就是前端人员不需要关心数据结构的复杂度，只要是标准的json格式就能提交成功，application/json数据格式越来越得到开发人员的青睐
 ```js
 // 使用axios发起post请求：
 import Qs from 'qs'
 this.axios({
    url: '/MobileScanning/ApprLicenseInterface/api/stufftree/mobile/batchScan/upload.v',
    method: 'post',
    transformRequest: [(data) => {
      // 对 data 进行任意转换处理
      return Qs.stringify(data)
    }],
    timeout: 100000,
    data: {
      dataSrc: 1,
    }
  }).then(res => {
  }).catch(err => {
  });
 ```
---

4. nodejs 处理包含xml数据的json字符串: 需要把单引号和换行符去掉，才能把json字符串转换成json，不然会报错：
```js
var result = `'{"result":"<?xml version=\\"1.0\\" encoding=\\"UTF-8\\" standalone=\\"yes\\"?>\n<externalInterfaceEntity xmlns:ns2=\\"http://service.wbxt.gzsyjxxh.gov/\\">\n    <code>1</code>\n    <output>\n        <data>\n            <aac001>3502740549</aac001>\n            <aac147>441226199511130914</aac147>\n            <aac003>陈烨君</aac003>\n            <aac004>1</aac004>\n            <aac031>1</aac031>\n            <aab001>80030246</aab001>\n            <aab004>广州明动软件股份有限公司</aab004>\n        </data>\n    </output>\n</externalInterfaceEntity>\n","error":"","code":"200"}'`;

result = result.replace(/\'|\n/g, ''); // 去掉单引号、和换行符
result = JSON.parse(result);
console.log(result);
console.log(result.code);
console.log(result.result);
```

---

5. axios和jquery的ajax请求formData

axios：
```js
const formData = new FormData();
formData.append('file', this.$refs.inputFile.files[0]);
formData.append('creator', this.userInfo.userCode);
const url = '/MobileApprweb/ApprLicenseInterface/api/stufftree/form/upload.v';
const config = {
headers: {
  'Content-Type': 'application/x-www-form-urlencoded'
},
onUploadProgress: (progressEvent) => {
  // 使用本地 progress 事件
  if (progressEvent.lengthComputable) {
    this.progressValue = Math.round((progressEvent.loaded / progressEvent.total) * 100)
  }
}
};
this.axios.post(url, formData, config)
.then(res => {
  let data = res.data;
  this.uploadLoading = false;
  this.$refs.form.reset();
  if (parseInt(data.status) === 200) {
    this.saveFileMess(data.data.fileId, data.data.attachSeq);
  } else {
    Toast(data.desc)
  }
})
.catch(res => {
  this.$refs.form.reset();
  console.log(res);
  Toast('上传失败')
});

```
ajax: 
```js
var formData = new FormData();
formData.append('file', self.files[0]);
formData.append('creator', that.userCode);

$.ajax({
    url: '/ApprLicenseInterface/api/stufftree/form/upload.v',
    type: 'post',
    dataType: 'json',
    data: formData,
    contentType:false,
    processData:false,
    success  : function(innerData){
        var data = innerData.data;
        if (innerData.status == '200') {
            resolve({
                attachSeq: data.attachSeq,
                fileId: data.fileId,
                filePath: data.filePath
            });
        } else {
            console.log('上传材料接口：', innerData.desc);
            reject(innerData.desc);
        }
    },
    error : function(innerData){
        console.error('上传材料接口报错：', innerData);
        reject(innerData);
    }
});
```

---
6. 迭代器配合ajax异步开发
```js
<html>
<head>
    <meta charset="utf-8">
    <script src="//cdn.bootcss.com/jquery/3.0.0-beta1/jquery.min.js"></script>
</head>
<body>
    <script>
        "use strict";
        function* main() {
            var result = yield request("http://www.filltext.com?rows=10&f={firstName}");
            console.log(result);
            //do 别的ajax请求;
        }

        function request(url) {
            var r = new XMLHttpRequest();
            r.open("GET", url, true);
            r.onreadystatechange = function () {
                if (r.readyState != 4 || r.status != 200) return;
                var data = JSON.parse(r.responseText);
                //数据成功返回以后， 代码就能够继续往下走了;
                it.next(data);
            };
            r.send();
        }

        var it = main();
        it.next();
        console.log("执行到这儿啦");
    </script>
</body>
</html>

```
---
7. 忘了是哪个版本的微信浏览器，后来好像修复了。会出现下面这种情况，所以以后获取日期都需要调整成2的写法：
```js
1. new Date('2018-12-5'); // 结果是null
需要改成：
2. new Date('2018-12-05');
```