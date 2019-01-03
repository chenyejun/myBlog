有时候我们需要把canvas画布的图画转换成图片输出页面，而用canvas生成的图片就是base64编码的，它是由数字、字母等一大串的字符组成的，但是我们需要获取它的文件流大小该怎么办呢？

### Base64图片编码原理：
Base64编码要求把3个8位字节（3*8=24）转化为4个6位的字节（4*6=24），之后在6位的前面补两个0，形成8位一个字节的形式。 如果剩下的字符不足3个字节，则用0填充，输出字符使用'='，因此编码后输出的文本末尾可能会出现1或2个'='

详情请阅读- [base64原理](http://gj.3gwen.com/tpbase64.html?kbl=)


### 当我们知道base64编码的图片的字符大小，怎么计算图片的文件流大小呢？？
通过base64编码原理我们知道，base64的图片字符流中的每8个字符就有两个是用0补充，而且字符流的末尾还可能存在‘=’号，我们可以通过这个原理计算图片的文件流大小。


### 下面举例：
#### 这是一张图片的base64编码：
```
data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAB9SR//fUkf/31JH/99SR//fUkf/31JH/99SR//fUkf/31JH/99SR//fUkf/6mHbP+LXDf/fUkf/31JH/99SR//fUkf/31JH/99SR//fUkf/31JH/99SR//i104/5lwT/+RZkP/fksh/6eFaP/8/Pv/mG9N/31JH/99SR//fUkf/31JH/99SR//fUkf/31JH/+tjHL/6uHb//7+/v////////////Xx7v/8+/r//////6N/Yv99SR//fUkf/31JH/99SR//fUkf/35LIf/PvK3///////////////////////////////////////////+vj3b/fUkf/31JH/99SR//fUkf/31JH/++pI/////////////08Oz/vqSQ/8y3p///////////////////////u6CK/31JH/99SR//fUkf/31JH/+IWDL/+vn3///////s5d//iVo1/6B7XP/6+ff/8Orl/9TDtv+5nYb/nXZX/4NRKf9+SyL/fUkf/31JH/99SR//sJF3////////////onxe/35LIv+ge1z/ils1/31JH/99SR//fUkf/6qIbf/dz8T/1MK0/31JH/99SR//fUkf/8WunP///////Pv7/39MIv99SR//fUkf/31JH/99SR//fUkf/31JH//ay7///////+ri2/99SR//fUkf/31JH//Frpv///////38+/9/TCP/fUkf/31JH/99SR//fUkf/31JH/99SR//2szA///////q4dv/fUkf/31JH/99SR//r491////////////pIBi/31JH/99SR//fUkf/31JH/99SR//hVUt//j29P//////1MK1/31JH/99SR//fUkf/4dXMP/59/b//////+7o4/+MXjn/fUkf/31JH/99SR//gE0k/9XFuP///////////6aDZ/99SR//fUkf/31JH/99SR//up+I////////////9vPw/8OrmP+si3D/uZ2G/+ri2////////////97Rx/99SiD/fUkf/31JH/99SR//fUkf/31KIP/KtqX//v7+/////////////////////////////////+Xb0/+HWDH/fUkf/31JH/99SR//fUkf/31JH/99SR//fUkf/6eFaP/l2tL//v7+////////////8evn/7yhi/+BTyb/fUkf/31JH/99SR//fUkf/31JH/99SR//fUkf/31JH/99SR//fUkf/4dXMP+Uakf/jV86/31JH/99SR//fUkf/31JH/99SR//fUkf/31JH/9/SyH/f0sh/39LIf9/SyH/f0sh/39LIf9/SyH/f0sh/39LIf9/SyH/f0sh/39LIf9/SyH/f0sh/39LIf9/SyH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==
```

为了方便，我们用str代替上面编码。

1.需要计算文件流大小，首先把头部的 data:image/png;base64,（注意有逗号）去掉。
```js
str = str.substring(22);
```

2.找到等号，把等号也去掉
```js
var equalIndex = str.indexOf('=');
if (str.indexOf('=')>0) {
    str = str.substring(0, equalIndex);
}
```

3.原来的字符流大小，单位为字节
```js
var strLength = str.length;
```

4.计算后得到的文件流大小，单位为字节
```js
var fileLength = parseInt(strLength - (strLength/8)*2);
或
var fileLength = parseInt(strLength*3/4);
```

5.输出文件流大小
```js
alert(fileLength);
```

以上是文章的主要内容，有问题请多多交流

推荐一个文件流图片转base64编码流图片的在线工具- [base64转换](http://tool.css-js.com/base64.html)