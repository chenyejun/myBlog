#### 1. 游戏访问连接

[点击跳转](/note/demo/jigsaw.html)

#### 2. 九宫格拼图原理
1. 图例原理：

![image](https://note.youdao.com/yws/api/personal/file/A02CD4255D0D44C688AEE3A793B4FEAB?method=download&shareKey=2021a12838c8e08ba8179359679fc69f)

2. 上图的九宫格图例，每个格子都有一个(x,y)的坐标，假如格子9是空白格子，怎么知道6和8是它的直接相邻格子呢。这时候就体现出格子坐标(x,y)的作用了， 使用公式：|(x<sub>6</sub> - x<sub>9</sub>)| + |(y<sub>6</sub> - y<sub>9</sub>)| = 1，将空白格子9的坐标与格子6的坐标进行对应坐标的差值的绝对值的和等于1，就证明它们是直接相邻格子，可进行移动互换。
3. 详细原理请点击：[跳转](http://www.woshipm.com/rp/340913.html)

#### 3. 实现过程，代码分析
1. flex实现九宫格布局：
```html
<style>
  .jigsaw {
    margin-top: 15px;
  }
  .jigsaw .ul{
    display: flex;
    flex-wrap: wrap; // 换行
  }
  
  .ul .child {
    width: 33.3%;
    color: rgba(255, 255, 255, 0.5);
    background-repeat: no-repeat;
  }
</style>
<section class='jigsaw'>
    <ul class="ul">
        <li class="child" data-x='1' data-y='1' style="order:1">1</li>
        <li class="child" data-x='2' data-y='1' style="order:2">2</li>
        <li class="child" data-x='3' data-y='1' style="order:3">3</li>
        <li class="child" data-x='1' data-y='2' style="order:4">4</li>
        <li class="child" data-x='2' data-y='2' style="order:5">5</li>
        <li class="child" data-x='3' data-y='2' style="order:6">6</li>
        <li class="child" data-x='1' data-y='3' style="order:7">7</li>
        <li class="child" data-x='2' data-y='3' style="order:8">8</li>
        <li class="child" data-x='3' data-y='3' style="order:9" id='empty'>9</li>
    </ul>
</section>
```
2. 现在的布局是这样子的：

![image](https://note.youdao.com/yws/api/personal/file/E90D977A12364AD7828493130A43D0DF?method=download&shareKey=6e3fe53b7d557cf9f4f02f35dadd8fa0)
3. 分析：每个li代表一个格子，自定义属性data-x和data-y代表坐标(x, y)；而样式order用于对格子进行移动排序；格子9添加id='empty'用于标识为空白格子。
4. 因为格子的宽度是通过百分比设置的，会根据不同屏幕宽度的变化而变化；而且我们需要正方形的小格子，所以格子的高度需要js动态计算：
```javascript
// 设置格子的高度、背景图片的尺寸
setChildStyle() {
  this.childWidth = window.getComputedStyle(this.oChild[0], false).width; // 获取格子宽度
  console.log(this.childWidth);
  for (let i = 0; i < this.oChild.length; i++) {
    this.oChild[i].style.height = `${this.childWidth}`;
  }
}
```
5. 现在变成

![image](https://note.youdao.com/yws/api/personal/file/B54851A8674043FAAD84DD21A13C76B9?method=download&shareKey=17225e079853f454ae7769df2bd80765)
6. 现在给每个格子设置背景图片的尺寸（background-size），将格子的background-size的宽度设置成格子父节点ul的宽度，高度为auto，然后通过backgound-position进行定位，用格子的背景拼凑成一张完整的图片
```javascript
setChildStyle() {
  this.childWidth = window.getComputedStyle(this.oChild[0], false).width;
  console.log(this.childWidth);
  for (let i = 0; i < this.oChild.length; i++) {
     this.oChild[i].style.height = `${this.childWidth}`;
     this.oChild[i].style.backgroundSize = `${this.ulWidth} auto`;
     this.setBgpositon(this.oChild[i]);
  }
}
```

7. 其实每个格子的背景图片都是同一张，只不过是通过background-position 对背景图片进行定位，让每个格子只显示图片背景的九分之一，
```javascript
// 设置背景图在格子的位置
setBgpositon(chiObj) {
  let x = chiObj.getAttribute('data-x') - 1;
  let y = chiObj.getAttribute('data-y') - 1;
  chiObj.style.backgroundPosition = `${-x*parseInt(this.childWidth)}px ${-y*parseInt(this.childWidth)}px`;
}
```
如下图视：
![image](https://note.youdao.com/yws/api/personal/file/FD88F82036644EABBF2464869E9E4836?method=download&shareKey=e886829b55cc3883ec63d42817f1c324)

8. 设置默认背景图片后：
```javascript
// 设置格子的背景图片
setBgImg(imgUrl) {
  for (let i = 0; i < this.oChild.length - 1; i++) {
    this.oChild[i].style.backgroundImage = `url(${imgUrl})`;
  }
}
```
![image](https://note.youdao.com/yws/api/personal/file/F28AF40EDE0F400AA5460DB6DD45AD11?method=download&shareKey=07162daa6237872246dee59154f1dfb6)

9. 接下来把格子撸成可移动的，与空白格子直接相邻的格子都可以与空白格子换位，一开始的order样式就起作用了。点击格子，首先比较该格子是否与空白格子直接相邻，如果是就交换格子的data-x、data-y和order值进行换位：
```javascript
childEvent() {
  let that = this;
  let oEmptyChild = document.getElementById('empty'); // 获取空白的格子对象
  this.oUl[0].addEventListener('click', function(ev){
    let target = ev.target;
    let targetX, targetY, targetOrder;
    let iEmptyX, iEmptyY, iEmptyOrder;
    if (target.className != 'child' ) return false;
    iEmptyX = oEmptyChild.getAttribute('data-x');
    iEmptyY = oEmptyChild.getAttribute('data-y');
    iEmptyOrder = window.getComputedStyle(oEmptyChild, false).order;
    targetX = target.getAttribute('data-x');
    targetY = target.getAttribute('data-y');
    targetOrder = window.getComputedStyle(target, false).order;
    if (Math.abs(targetX - iEmptyX) + Math.abs(targetY - iEmptyY) == 1) {
      // data-x data-y order 值互换
      [iEmptyX, targetX] = [targetX, iEmptyX];
      [iEmptyY, targetY] = [targetY, iEmptyY];
      [iEmptyOrder, targetOrder] = [targetOrder, iEmptyOrder];

      oEmptyChild.setAttribute('data-x', iEmptyX);
      oEmptyChild.setAttribute('data-y', iEmptyY);
      oEmptyChild.style.order = iEmptyOrder;
      target.setAttribute('data-x', targetX);
      target.setAttribute('data-y', targetY);
      target.style.order = targetOrder;
    }
  }, false);
}
```
10. 接下来是把上传的img图片设置成格子背景，通过监听input type='file'的change事件来获取图片文件files：
```javascript
imgEvent() {
  let that = this;
  this.oFile.addEventListener('change', function(){
    let imgUrl = window.URL.createObjectURL(this.files[0]); // 该方法将files转换成img可访问的本地路径
    that.oImg.setAttribute('src', imgUrl);
    that.oImg.onload = function() {
      that.setBgImg(imgUrl); // 重新设置格子背景
    }
  }, false);
}
```
11. 源码地址 [点击访问](https://github.com/chenyejun/jigsaw_same)

12. （完）