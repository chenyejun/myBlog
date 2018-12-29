<template>
	<div id="myCanvas">
        <div id="canvas" class="border"></div>
        <button id="clearCanvas" class="button">清除</button>
        <button id="saveCanvas" class="button">保存</button>
        <button id="previous" class="button">上一步</button>
        <button id="eraser" class="button" value="0">橡皮檫</button>
        <div class="colum">
            修改笔触大小：<input id="lineWidthInput" type="text" value="3"><button id="modifyLineWidth" class="button">确定</button>
        </div>
        <div class="colum">
            修改笔触颜色：<input id="colorInput" type="text" value="#ff0000" placeholder="请输入十六进制颜色"><button id="modifyColor" class="button">确定</button>
        </div>
        <div class="imgOut">
        	<p>保存生成的图片：</p>
            <img id="img" class="border" src="" alt="" srcset="">
        </div>
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
  	 	window.onload = function() {
            var signature = new Signature({
                el: document.getElementById('canvas'), //绘制canvas的父级div
                color: 'red',
                lineWidth: 3
            });

            var oClearCanvas = document.getElementById('clearCanvas');
            var oSaveCanvas = document.getElementById('saveCanvas');
            var oPrevious = document.getElementById('previous');
            var oEraser = document.getElementById('eraser');
            var oLineWidthInput = document.getElementById('lineWidthInput');
            var oModifyLineWidth = document.getElementById('modifyLineWidth');
            var oColorInput = document.getElementById('colorInput');
            var oModifyColor = document.getElementById('modifyColor');

            // 清除画布
            oClearCanvas.onclick = function () {
                signature.clear();
            }
            oSaveCanvas.onclick = function () {
                var base64 = signature.save();
                document.getElementById('img').setAttribute('src', base64);
            }
            // 返回上一步
            oPrevious.onclick = function () {
                signature.previous();
            }
            // 橡皮檫切换
            oEraser.onclick = function () {
                var value=this.getAttribute('value');
                if(value=='0'){
                    this.setAttribute('value', '1');
                    this.style.backgroundColor='yellow';
                }else{
                    this.setAttribute('value', '0');
                    this.style.backgroundColor='#4F94CD';
                }
                // value为0: 橡皮檫
                // value为1: 画笔
                signature.eraser(value);
            }
            // 修改笔触大小：
            oModifyLineWidth.addEventListener('click', function(){
                var val = Number(oLineWidthInput.value);
                 if (val) {
                    signature.modifyLineWidth(val);
                 }
            }, false);
            // 修改笔触颜色：
            oModifyColor.addEventListener('click', function(){
                signature.modifyColor(oColorInput.value);
            }, false);
        };

        function Signature(obj) {
		    if (!obj || !obj.el) {
		        console.log('请传入必要的参数');
		        return;
		    }
		    this.el = obj.el;
		    this.lineWidth = obj.lineWidth || 1;
		    this.color = obj.color || '#000000';
		    this.background = obj.background || '#ffffff';

		    this.canvas = document.createElement('canvas');
		    this.el.appendChild(this.canvas);
		    this.cxt = this.canvas.getContext('2d');
		    this.canvas.width = this.el.clientWidth;
		    this.canvas.height = this.el.clientHeight;
		    this.offsetLeft = this.el.offsetLeft;
		    this.offsetTop = this.el.offsetTop;
		    this.cxt.fillStyle = this.background;
		    this.cxt.fillRect(0, 0, this.canvas.width, this.canvas.height);
		    this.cxt.strokeStyle = this.color;
		    this.cxt.lineWidth = this.lineWidth;
		    this.cxt.lineCap = 'round';

		    this.recordList = []; // 记录绘制记录
		    this.previousPoint = []; // 记录上一步绘制的点集合
		    this.state = 1;//画笔的状态,1为画，0为擦

		    //开始绘制
		    this.canvas.addEventListener('touchstart', function(e) {
		        this.previousPoint = [];
		        this.previousPoint.push({'event':e,'state':this.state});
		        this.cxt.beginPath();
		        e.preventDefault();
		        // 减去canvas外层的offsetLeft，因为pageX是相对与屏幕边界的距离，如果外层包裹元素有padding，会导致画笔中心偏移
		        this.cxt.moveTo(e.changedTouches[0].pageX - this.offsetLeft, e.changedTouches[0].pageY - this.offsetTop);
		    }.bind(this), false);
		    //绘制中
		    this.canvas.addEventListener('touchmove', function(e) {
		        this.previousPoint.push({'event':e,'state':this.state});
		        this.cxt.lineTo(e.changedTouches[0].pageX - this.offsetLeft, e.changedTouches[0].pageY - this.offsetTop);
		        this.cxt.stroke();
		    }.bind(this), false);
		    //结束绘制
		    this.canvas.addEventListener('touchend', function() {
		        this.cxt.closePath();
		        this.recordList.push(this.previousPoint);
		    }.bind(this), false);

		    //清除画布
		    this.clear = function () {
		        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
		    }
		    //保存图片，直接转base64
		    this.save = function () {
		        var imgBase64 = this.canvas.toDataURL();
		        console.log(imgBase64);
		        return imgBase64
		    }
		    // 上一步
		    this.previous = function () {
		        this.clear();
		        this.recordList.pop();
		        console.log(this.recordList);
		        this.resetCanvas();
		    }

		};

		// 利用坐标点重新绘制
		Signature.prototype.resetCanvas=function(){
		     for (var i = 0; i < this.recordList.length; i++) {
		            this.draw(this.recordList[i]);
		        }
		}

		Signature.prototype.draw=function(pointArr){

		    this.cxt.beginPath();
		    this.cxt.moveTo(pointArr[0].event.changedTouches[0].pageX - this.offsetLeft, pointArr[0].event.changedTouches[0].pageY - this.offsetTop);
		    for(var i = 1; i < pointArr.length; i++) { 
		        this.isState(pointArr[i].state);
		        this.cxt.lineTo(pointArr[i].event.changedTouches[0].pageX - this.offsetLeft, pointArr[i].event.changedTouches[0].pageY - this.offsetTop);
		        this.cxt.stroke();
		    }
		    this.cxt.closePath();
		}

		//橡皮擦，state为0是橡皮檫，state为1是画笔
		Signature.prototype.eraser=function(state){
		     this.state=state;
		     this.isState(state);
		}

		//判断state的状态，进行画笔和橡皮檫的切换
		Signature.prototype.isState=function(state){
		     if(state == '0'){  
		         //把笔画的颜色设置成背景颜色，模拟成橡皮檫
		         this.cxt.strokeStyle=this.background; 
		     }else{
		         this.cxt.strokeStyle=this.color;
		     }
		}

		// 修改笔触大小
		Signature.prototype.modifyLineWidth=function(lineWidth){
		    if (/^[0-9]+$/.test(lineWidth)) {
		        this.lineWidth = lineWidth;
		        this.cxt.lineWidth = lineWidth;
		    } else {
		        console.warn('modifyLineWidth方法参数请传入数字');
		    }
		}

		// 修改笔触颜色
		Signature.prototype.modifyColor=function(color){
		    this.color = color;
		    this.cxt.strokeStyle = color;
		}

  	}

  }
};
</script>
<style lang="css">
#myCanvas {
    padding: 10px;
    font-size: 14px;
}
#myCanvas #canvas {
    width: 100%;
    height: 300px;
    margin-bottom: 10px;
}

#myCanvas .button {
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    background: #4F94CD;
    color: white;
}
#myCanvas .imgOut {
    margin-top: 10px;
}

#myCanvas .border {
    border: 1px solid #eee;
}
#myCanvas .colum {
    padding: 5px 0;
}
#myCanvas .colum input{
    border: 1px solid #ccc;
    height: 23px;
    line-height: 23px;
    margin: 0 5px;
    width: 69px;
}
</style>
