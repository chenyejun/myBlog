### 什么是BFC？
BFC全称为块级格式化上下文，它实际上就是一种css布局规则，它规定了元素内部如何布局，而且内部布局不会对外部产生任何影响，即当一个块级元素触发了BFC，那么这个块级元素就会有相应的规则。

#### 那么，触发了BFC后，会发生什么big news呢？
big news：
1. BFC内部的块盒和行盒（行盒就是接连排列的内联元素）元素会在垂直方向接连排列

2. 同一个BFC内部的两个相邻元素的上下margin会发生重叠

3. 每个元素的最左边，与包含块border的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此

4. BFC的区域不会与float 元素重叠

5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素

6. 计算BFC的高度时，浮动元素也参与计算

#### 我们知道了触发BFC后会产生的规则，那么又如何区触发BFC呢？
方法如下：
1. float的值不是none

2. position的值不是static或者relative

3. display的值是inline-block、table-cell、flex、table-caption或者inline-flex
 
4. overflow的值不是visible,

#### 我们知道了BFC的规则和触发它的条件，下面举几个代码例子证明（下面的例子都使用overflow:hidden触发BFC）：
一、我们都知道，当两个相邻块级元素都拥有margin-top和margin-bottom，他们的上下margin会发生重叠。
```html
<style>
#BFC {
    overflow:hidden;
}

#up,#down {
  height: 50px;
  width: 300px;
  background: #666;
  margin:15px;
}
</style>
<body>
  <div id='BFC'>
    <div id="up"></div>
    <div id="down"></div>
  </div>
</body>

```
效果如下：

![image](http://note.youdao.com/yws/api/personal/file/DA1CF48FA8F9437BB000E99C3B627D5D?method=download&shareKey=6e12e28b05d613aea2eb83e4301bf692)

如果我们想让它们的margin不产生重叠呢？
解决方法：我们可以通过把其中的一个div处在另外一个BFC下就可以了。

```html
<style>
#BFC, #otherBFC {
    overflow:hidden;
}


#up, #down {
  height: 50px;
  width: 300px;
  background: #666;
  margin:15px;
}
</style>
<body>
  <div id='BFC'>
    <div id="up"></div>
    <div id="otherBFC">
      <div id="down"></div>
    </div>
  </div>
</body>

```
效果如下：

![image](http://note.youdao.com/yws/api/personal/file/C3799553ED9B419FB8BEB138E4C7362F?method=download&shareKey=b565564edca9c72d396a99dda97c51b5)


二、BFC的区域不会与float box重叠
当没有触发BFC时：
```html
<style>
#float {
  float: left;
  height: 100px;
  width: 100px;
  background: #666;
  opacity: 0.5;/*用于查看元素叠加部分*/
}
#cont {
  height: 50px;
  width: 300px;
  background: orange;
}
</style>

<body>
  <div id="float"></div>
  <div id="cont"></div>
</body>

```
效果如下：

![image](http://note.youdao.com/yws/api/personal/file/552A2092BE78445FBA82F0DB10914F3D?method=download&shareKey=83f1ceccf5074cf31326d3022673a436)

触发BFC后（在原有代码基础上添加overflow）：

```css
#cont {
  height: 50px;
  width: 300px;
  background: orange;
  
  overflow:hidden;/*触发BFC*/
}

```
效果如下：

![image](http://note.youdao.com/yws/api/personal/file/85C8249079794C82A64AF9E8E2B403A4?method=download&shareKey=0ebeb54ce2656003dba1a7558480fc01)


三、计算BFC的高度时，浮动元素也参与计算，这是解决浮动塌陷的一种方法
当没有触发BFC的情况下，内部元素浮动会引起外部元素塌陷：
```html
<style>
#outer {
  border: 5px solid orange;
}

#inner {
  float: left;
  
  height: 50px;
  width: 300px;
  background: #666;
}
</style>

<body>
  <div id="outer">
    <div id="inner"></div>
  </div>
</body>

```
效果如下：

![image](http://note.youdao.com/yws/api/personal/file/B197291B73E1485B818760AF9D768C3D?method=download&shareKey=785e6eb1167833386c9d72359a927b25)

触发BFC，解决塌陷问题：

```css
#outer {
  border: 5px solid orange;
  overflow:hidden;
}
```

效果如下：

![image](http://note.youdao.com/yws/api/personal/file/D64FD89658A24E519BB8ABB7F1930FCB?method=download&shareKey=20073d054792e1539fa49808c169f6d1)


#### 参考了各位大神的资料，终于对BFC有了一点理解，也明白了网上的clearfix浮动清除法为何需要添加一些额外的css属性，以前只会copy，现在也明白了一些原理。写下这些笔记，是为了能够牢记，也为了能够分享自己的收获，如果有错误，请多多指教。


学习借鉴的大神文章：

[http://www.cnblogs.com/chencyl/p/3948331.html](http://www.cnblogs.com/chencyl/p/3948331.html)

[http://www.cnblogs.com/libin-1/p/7098468.html](http://www.cnblogs.com/libin-1/p/7098468.html)