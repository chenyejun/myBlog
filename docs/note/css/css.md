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
