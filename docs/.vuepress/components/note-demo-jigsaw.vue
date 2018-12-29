<template>
	<div id="jigsaw">
		<input type="file" class="hide" id="file">
		<button class="btn" id="uploadFile">上传图片</button>
		<button class="btn" id="disrupt">打乱顺序</button>
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
			<img id="img" src="https://note.youdao.com/yws/api/personal/file/C69044B50F4F4B61B3B0851C7A0ECEE6?method=download&shareKey=6ef39c4f8117acac1b389fd17eeae3fc" alt="图片">
		</section>
	</div>
</template>
<script>
export default {
  name: 'Jigsaw',
  data () {
    return {
      
    }
  },
  mounted () {
  	this.init();
  },
  methods: {
  	init () {
  	 	class Jigsaw {
		    constructor(){
		      this.oFile = document.getElementById('file');
		      this.oUl = document.getElementsByClassName('ul');
		      this.oChild = document.getElementsByClassName('child');
		      this.oImg = document.getElementById('img');
		      this.ulWidth = window.getComputedStyle(this.oUl[0], false).width; // 作为每个格子的背景图片大小
		      this.childWidth; // 格子的宽度

		      // 按钮组
		      this.oUploadFile = document.getElementById('uploadFile');
		      this.oDisrupt = document.getElementById('disrupt');
		    }

		    // 初始化
		    init() {
		      this.imgEvent();
		      this.childEvent();
		      this.disruptEvent();
		      this.uploadFileEvent();
		      this.setChildStyle();
		      this.setBgImg('https://note.youdao.com/yws/api/personal/file/C69044B50F4F4B61B3B0851C7A0ECEE6?method=download&shareKey=6ef39c4f8117acac1b389fd17eeae3fc'); // 设置格子默认背景图片
		    }

		    // input file 事件初始化
		    imgEvent() {
		      let that = this;
		      this.oFile.addEventListener('change', function(){
		        let imgUrl = window.URL.createObjectURL(this.files[0]);
		        that.oImg.setAttribute('src', imgUrl);
		        that.oImg.onload = function() {
		          that.setBgImg(imgUrl);
		        }
		      }, false);
		    }

		    // 初始化打乱顺序事件
		    disruptEvent() {
		      var that = this;
		      this.oDisrupt.addEventListener('click', function() {
		        that.setChildRandomOrder();
		      }, false)
		    }

		    // 上传图片按钮
		    uploadFileEvent() {
		      var that = this;
		      this.oUploadFile.addEventListener('click', function() {
		        that.oFile.click();
		      }, false)
		    }

		    // 初始化点击格子事件
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

		    // 设置格子的高度、背景图片的尺寸
		    setChildStyle() {
		      this.childWidth = window.getComputedStyle(this.oChild[0], false).width;
		      console.log(this.childWidth);
		      for (let i = 0; i < this.oChild.length; i++) {
		        this.oChild[i].style.height = `${this.childWidth}`;
		        this.oChild[i].style.backgroundSize = `${this.ulWidth} auto`;
		        this.setBgpositon(this.oChild[i]);
		      }
		    }

		    // 设置背景图在格子的位置
		    setBgpositon(chiObj) {
		      let x = chiObj.getAttribute('data-x') - 1;
		      let y = chiObj.getAttribute('data-y') - 1;
		      chiObj.style.backgroundPosition = `${-x * parseInt(this.childWidth)}px ${-y * parseInt(this.childWidth)}px`;
		    }

		    // 设置格子的背景图片
		    setBgImg(imgUrl) {
		      for (let i = 0; i < this.oChild.length - 1; i++) {
		        this.oChild[i].style.backgroundImage = `url(${imgUrl})`;
		      }
		    }

		    // 随机打乱格子顺序
		    setChildRandomOrder() {
		      let arr = [1,2,3,4,5,6,7,8,9];
		      let dataXY = [
		        {x: 1, y: 1},
		        {x: 2, y: 1},
		        {x: 3, y: 1},
		        {x: 1, y: 2},
		        {x: 2, y: 2},
		        {x: 3, y: 2},
		        {x: 1, y: 3},
		        {x: 2, y: 3},
		        {x: 3, y: 3},
		      ];
		      // 数组乱序
		      arr.sort(function(){
		        return Math.random()>.5 ? -1 : 1;
		      });
		      for(let i = 0; i < this.oChild.length; i++) {
		        this.oChild[i].style.order = arr[i];
		        this.oChild[i].setAttribute('data-x', dataXY[arr[i] - 1].x);
		        this.oChild[i].setAttribute('data-y', dataXY[arr[i] - 1].y);
		      }
		    }
		}
	    var oJigsaw = new Jigsaw();
	    oJigsaw.init();
  	}

  }
};
</script>
<style lang="css">
#jigsaw {
	padding: 15px;
    box-sizing: border-box;
}

#jigsaw #img {
    margin: 15px 0 0 1%;
    width: 49%;
 }
#jigsaw li {
	list-style: none;
}
#jigsaw .hide {
	display: none;
}
/**
* 按钮
*/
#jigsaw .btn {
	border: none;
	border-radius: 5px;
	padding: 5px 10px;
	background: #4F94CD;
	color: white;
}

/**
* 拼图区域
*/
#jigsaw .jigsaw {
	margin-top: 15px;
}
#jigsaw .jigsaw .ul{
	display: flex;
	flex-wrap: wrap;
	width: 49%;
	padding-left: 0;
	float: left;
}

#jigsaw .ul .child {
	width: 33.3%;
	color: rgba(255, 255, 255, 0.5);
	background-repeat: no-repeat;
}
</style>
