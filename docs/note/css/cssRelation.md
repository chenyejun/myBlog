# css相关
### 清除浮动
```css
.fix{zoom:1;}
.fix::after{clear:both;display:block;height:0;content:"";}
```
### 超出n行...省略
```css
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: n;
  -webkit-box-orient: vertical;
 ```
### 移动端兼容性样式
 ```css
 html,body {
	cursor: pointer; // 解决ios下无法点击问题
	-webkit-overflow-scrolling : touch; // 解决ios滚动卡慢
	-webkit-tap-highlight-color:rgba(0,0,0,0); // 解决部分安卓手机点击有闪亮

	/*优化显示文本*/
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	text-rendering: optimizeLegibility;
 }
 ```
### margin对元素的影响
#### 1.首先是嵌套元素: margin-top会合并，而margin-left不会合并
```html
<style>
	.outer{
        width: 200px;
        height: 200px;
        background: #CCC;

    }
    .inner{
        height: 100px;
        width: 100px;
        background: orange;
        margin-top:50px;
        margin-left: 50px;
    }
</style>

<div class="outer">
	<div class="inner"></div>
</div>
```
运行结果:

![这里写图片描述](https://note.youdao.com/yws/api/personal/file/CE2A37BA5804468A87F0AE612AFAB5DB?method=download&shareKey=3f333b6660d00e17dd87486d3892d25b&inline=true)

如果解决margin-top合并问题呢？
1.父元素或子元素使用浮动或者绝对定位absolute

2.父元素overflow:hidden;

3.父元素设置padding

4.父元素设置border

#### 2.相邻元素，margin-top和margin-bottom会合并，而且会取较大的值作为他们之前的间距
```
<style>
	.rect {
    	height: 100px;
    	width: 100px;
    	background: orange;
    	margin-top: 20px;
    	margin-bottom: 50px;
    }
</style>

<div class="rect"></div>
<div class="rect"></div>

```
运行结果:

![这里写图片描述](https://note.youdao.com/yws/api/personal/file/780C379E247240DA99B7C58B4B78701E?method=download&shareKey=a4126ef102c51f2a326604e75a57ccf1)

#### 3.相邻元素，margin-left和margin-right不会合并
```html
<style>
	.rect {
    	float: left;
    	height: 100px;
    	width: 100px;
    	background: orange;
    	margin-left: 50px;
    	margin-right: 50px;
    }
</style>

<div class="rect"></div>
<div class="rect"></div>
```
运行结果:

![这里写图片描述](https://note.youdao.com/yws/api/personal/file/89440B7290BD457DA7C5D3024152E14A?method=download&shareKey=5d225fb21b875aa88d00f63184b9c73a)

### 弄一个满屏的块级元素
比如一个div
```css
<style>
	div {
		height:100%;
		width:100%;
		background:orange;
	}
</style>
```
然后查看结果：发现什么都没有。
这时需要添加:
```css
<style>
	html,body {
		height:100%;
	}
</style>
```
因为html和body的高度是根据内部元素的高度决定的。如果没有内部元素撑开，需要手动设置html和body高度

### display:inline-block之间的空白间距
如下:
```html
<style>
	 .span1 {
        display: inline-block;
        height: 30px;
        width: 100px;
        background: orange;
    }
</style>

<span class="span1"></span>
<span class="span1"></span>
<span class="span1"></span>
<span class="span1"></span>

```
运行结果:

![这里写图片描述](https://note.youdao.com/yws/api/personal/file/3AF9F10012BA415DBF78181B0B76A90D?method=download&shareKey=24d300bb2735585fbb9cb562009fccbb)

不同浏览器的间距有点不一样，但是一般都是4px，像火狐和谷歌浏览器，但360浏览器是8px。

解决方法:
借鉴张大大的方法:---[去除inline-block元素间间距的N种方法](http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-去除间距/)

### 使用css3动画时，如果用到需要浏览器前缀的属性，不仅@keyframes前需要加前缀，内部的转变属性也需要加前缀，才能保证浏览器的兼容性。说得可能不太清楚，下面看例子吧。（<font color=red>注意下面/**/注释</font>）
```html
<style>

	.ani_div {
		height:100px;
		width:100px;
		background:orange;
		animation: myAnimate 3s;
		-moz-animation: myAnimate 3s; 
		-webkit-animation: myAnimate 3s; 
		-o-animation: myAnimate 3s; 
	}
	

	@keyframes myAnimate {
		from {transform:rotate(0deg);}
		to {transform:rotate(360deg);}
	}
	
	/*不仅keyframes要加前缀，里面的transform也需要加前缀*/
	@-moz-keyframes myAnimate/* Firefox */ {
		from {-moz-transform:rotate(0deg);}
		to {-moz-transform:rotate(360deg);}
	}
	
	/*不仅keyframes要加前缀，里面的transform也需要加前缀*/
	@-webkit-keyframes myAnimate/* Safari and Chrome */ {
		from {-webkit-transform:rotate(0deg);}
		to {-webkit-transform:rotate(360deg);}
	}
	
	/*不仅keyframes要加前缀，里面的transform也需要加前缀*/
	@-o-keyframes myAnimate/* Opera */ {
		from {-o-transform:rotate(0deg);}
		to {-o-transform:rotate(360deg);}
	}
</style>

<div class="ani_div"></div>
```
