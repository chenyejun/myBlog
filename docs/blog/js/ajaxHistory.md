### ajax
我们都知道，ajax可以实现无刷新页面获取数据，这无疑能极大地提高用户体验，但是它有一个弊端，就是通过ajax获取的内容，在页面刷新或者点击浏览器的前进和后退按钮，重新回到当前页面的时候，之前获取的内容索引丢失了，页面变回了初始状态。
### ajax的弊端事例
就例如下图的分页器，点击下一页通过ajax获取内容然后改变页面的内容，当我们按了很多次下一页按钮，定位到了某一个页面，但是只要页面一刷新，页面的内容又重新定位到第一页。

![image](http://note.youdao.com/yws/api/personal/file/4577909FE1C24D80B2C5FAD6ABD2F786?method=download&shareKey=8aab9f4fb9bd4678a6d3cd16b8ec280b)

### 我们想
如果我们想要在当页面刷新后，页面定位还是在当前页，或者点击浏览器的前进或者后退按钮的 时候，前进到前一页或者后退到后一页。


### 主角登场
#### 这时候，html5的新增的history API主角《history.pushState》和《history.replaceState》就应该登场了：

1. history.pushState(state,title,url)：无刷新改变当前页面的url，并创建新的历史条目推入history堆栈中。


2. history.replaceState(state,title,url)：操作类似于history.pushState()，不同之处在于replaceState()方法会修改当前历史记录条目而并非创建新的条目

    - state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。

    - title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。

    - url：新的网址，必须与当前页面处在同一个域，否则会因跨域弹出错误，浏览器的地址栏将显示这个网址。


3. popstate事件：当点击浏览器的前进或者后退按钮的时候触发。

### 为了更好地理解pushState和前进后退按钮对历史条目的影响，下面用数组模拟历史条目栈：

1. 当页面刚进入的时候，历史条目为空：

```js
var historyStack=[];
```

2. 当点击触发history.pushState(),向历史条目压入一个记录：

```js

historyStack.push('条目1');

```

3. 当我们多次触发history.pushState()后：

```js
historyState =>
[条目1，条目2，条目3，条目4]

```

4. 最后一次触发后，url指针指向条目4，


5. 当我们点击后退按钮时，指针变为指向条目3，当我们再次点击前进按钮时，指针指向变回指向条目4。


这就是pushState、浏览器按钮与历史条目之间的联系，而且每次改变条目指针后，都会触发popstate事件。



### demo代码：(**下面demo因为没有使用ajax与服务器交互，而是通过分页器的点击切换内容来模拟ajax的改变，这样可以直接使用这些代码进行本地测试**)

#### html：
```html
<body>
	<ul>
		<li class="active_li">0</li>
		<li>1</li>
		<li>2</li>
	</ul>

	<div class="active_div">
		0000000
	</div>
	<div>
		1111111
	</div>
	<div>
		2222222
	</div>
</body>
```
#### css：
```css
*{margin: 0;padding: 0;}
li{list-style: none;display: inline-block;border: 1px solid #ccc;padding: 5px 10px;}
div{height: 200px;width: 150px;border: 1px solid #ccc;display: none;}

.active_li{background-color: #aaa;}
.active_div{display: block;}
```

#### js：
```js
var $li=$('li');
	var $div=$('div');

	$li.on('click',function(event) {
		var his=window.history;
		var that=$(this);
		var index=that.index();
		
		$li.removeClass('active_li');
		that.addClass('active_li');

		$div.removeClass('active_div').eq(index).addClass('active_div');


		/*
			这里可以添加ajax();
		*/

		//检测是不是因为鼠标点击li触发
		if(event && /\d/.test(event.button)) {
			his.pushState(null, '', '?index='+index);
		}	

	});

	//点击返回或者前进按钮触发
	function setHistoryState() {
		
		var locaHref=location.href;
		var his=window.history;

		//初始时url没有参数，就默认为index=0;
		if(locaHref.indexOf('?')==-1) {
			his.replaceState(null, '', '?index=0');
		} else {	
			//找到当前url中index的值
			var index=returnIndex(locaHref);

			//触发指定li的点击事件
			$li.eq(index).trigger('click');
		}
		
	}

	//这个函数过滤url，返回index
	function returnIndex(str) {
		return parseInt( str.split('?')[1].split('=')[1] );
	}

	//初始化触发
	setHistoryState();

	//前进后退按钮事件
	window.addEventListener("popstate", function() {
        setHistoryState();                          
    });
    
```


[参考文章](http://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/)
