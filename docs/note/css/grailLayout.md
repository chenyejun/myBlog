# 圣杯布局
### 可拉动屏幕进行调试
### 三栏布局，中间自适应
<note-css-sb-center />
代码：
```css
<style>
	.main{padding: 0 150px;}
	.center{width: 100%;background: #eee;float: left;}
	.left{width: 150px;float: left;margin-left: -100%;position: relative;left:-150px;background: #3eaf7c;}
	.right{width: 150px;float: left;margin-left: -150px;position: relative;right: -150px;background:#3eaf7c;}
	// 清除浮动
	.fix{zoom:1;}
	.fix::after{clear:both;display:block;height:0;content:"";}
</style>
```
```html
<div class="main fix">
    <div class="center">center自适应</div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
```

### 三栏布局，左边自适应

<note-css-sb-left />

代码：
```css
<style>
	.main{margin-right: 300px;}
	.left{width: 100%;float: left;background: #eee;}
	.center{width: 150px;margin-left: -300px;background: #3eaf7c;float: left;position: relative;right: -300px;}
	.right{width: 150px;margin-left: -150px;background: #3eafcd;float: left;position: relative;right: -300px;}
	// 清除浮动
	.fix{zoom:1;}
	.fix::after{clear:both;display:block;height:0;content:"";}
</style>
```
```html
<div class="main fix">
  <div class="left">left自适应</div>
  <div class="center">center</div>
  <div class="right">right</div>
</div>
```

### 三栏布局，右边自适应

<note-css-sb-right />

代码：
```css
<style>
	.main{margin-left:300px;}
	.right{width: 100%;background: #ccc;float: left;}
	.left{width: 150px;float: left;margin-left: -100%;position: relative;left:-300px;background:  #3eaf7c;}
	.center{width: 150px;float: left;margin-left: -100%;position: relative;left:-150px;background: #3eafcd;}
	// 清除浮动
	.fix{zoom:1;}
	.fix::after{clear:both;display:block;height:0;content:"";}
</style>
```
```html
<div class="main fix">
    <div class="right">right自适应</div>
    <div class="left">left</div>
    <div class="center">center</div>
</div>
```