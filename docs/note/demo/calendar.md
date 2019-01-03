# 日历：
<note-demo-calendar />
### 源码：
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<meta charset="utf-8">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
</head>
<style>
	.header,.day_cont,.week_cont{
		display:flex;
		flex-wrap: wrap;
	}

	.week_cont{
		padding: 15px 0;
	}
	.day_cont>div,.week_cont>div{
		text-align: center;
		width: 14%;
	}

	.header{
		justify-content: space-around;
	}

	.header span {
		position:relative;
		display:inline-block;
		vertical-align:middle;
	}

	.header .pre_btn{
		cursor: pointer;
		width: 0;
		height: 0;
		border-top: 7px solid transparent;
	    border-right: 10px solid #ccc;
	    border-bottom: 7px solid transparent;
	    border-left: 10px solid transparent;
	}

	.header .next_btn{
		cursor: pointer;
		width: 0;
		height: 0;
		border-top: 7px solid transparent;
	    border-right: 10px solid transparent;
	    border-bottom: 7px solid transparent;
	    border-left: 10px solid #ccc;
	}

	.day_cont>div{
		padding: 4px 0;
	}

	.day_cont .day_class {
		display:inline-block;
		height:30px;
		width:30px;
		line-height:30px;
		border-radius:100%;
	}

	.day_cont .day_select {
		background: pink;
	}

	.color_c {
		color: #ccc;
	}
</style>
<body>
	<div id="calendar">
		<header class="header">
			<div class="year_cont">
				<span class="pre_btn"></span>
				<span class="show_time">2018</span>
				<span class="next_btn"></span>
			</div>
			<div class="month_cont">
				<span class="pre_btn"></span>
				<span class="show_time">2</span>
				<span class="next_btn"></span>
			</div>
		</header>
		<section class="week_cont">
			<div>日</div>
			<div>一</div>
			<div>二</div>
			<div>三</div>
			<div>四</div>
			<div>五</div>
			<div>六</div>
		</section>
		<section class='day_cont'>
			<div>
				<span class="day_class">
					1
				</span>
			</div>
			<div>
				<span class="day_class">
					2
				</span>
			</div>
		</section>
	</div>
</body>
<script>
	function Calendar(){
		this.year = null;
		this.month = null;
		this.day = null;
		this.oYearCont = document.querySelector('.year_cont');
		this.oYearShow = this.oYearCont.querySelector('.show_time');
		this.oMonthCont = document.querySelector('.month_cont');
		this.oMonthShow = this.oMonthCont.querySelector('.show_time');
		this.oDayCont = document.querySelector('.day_cont');
		this.oHeader = document.querySelector('.header');
	}

	Calendar.prototype.init = function(year, month){
		let oDate = new Date();
		this.year = oDate.getFullYear();
		this.month = oDate.getMonth() + 1;
		this.day = oDate.getDate();

		// 获取当前时间年与月份，显示到页面
		this.oYearShow.innerText = this.year;
		this.oMonthShow.innerText = this.month;

		this.initBindEvent();
		this.render();
	}

	// 获取当前月份的天数
	Calendar.prototype.getDayMount = function () {
		return new Date(this.year, this.month, 0).getDate();
	}
	// 获取上个月的天数
	Calendar.prototype.getPreDayMount = function() {
		return new Date(this.year, this.month - 1, 0).getDate();
	}

	// 获取每个月的1号是星期几
	Calendar.prototype.getOneDayWeek = function () {
		return new Date(this.year, this.month - 1 , 1).getDay();
	}

	// 页面渲染
	Calendar.prototype.render = function () {

		let iNowDayMonut = this.getDayMount(), // 当前月份的天数
			iNowOneWeek = this.getOneDayWeek(), // 当前月1号星期*
			iPreDayMount = this.getPreDayMount(), // 前一个月份的天数
			caHtml = '';// 重置html

		let j = iPreDayMount - iNowOneWeek + 1;
		for (let i = 1; i <= iNowOneWeek; i++) {
			caHtml += `
				<div>
					<span class="day_class pre_month color_c">
						${j}
					</span>
				</div>
			`;
			j++;
		}

		for (let k = 1; k <= iNowDayMonut; k++) {
			if (k == this.day) {
				caHtml += `
					<div>
						<span class="day_class day_select">
							${k}
						</span>
					</div>
				`;
			} else {
				caHtml += `
					<div>
						<span class="day_class">
							${k}
						</span>
					</div>
				`;
			}
		}

		for (let m = 1; m <= 42 - (iNowOneWeek + iNowDayMonut); m++) {
			caHtml += `
				<div>
					<span class="day_class next_month color_c">
						${m}
					</span>
				</div>
			`;
		}
		this.oDayCont.innerHTML = caHtml;
	}

	// 初始化点击事件
	Calendar.prototype.initBindEvent = function () {
		let _this = this,
		 	iYearShowText,
		 	iMonthShowText;

		// 点击切换年或者月份
		this.oHeader.addEventListener('click', function(ev) {
			let clickTarget = ev.target,
				showTime = _this.getClassSibling(clickTarget, 'show_time'),
				showTimeVal;

			if (clickTarget.classList.contains('pre_btn') || clickTarget.classList.contains('next_btn')){
				showTimeVal = showTime.innerText;
				if (clickTarget.classList.contains('pre_btn')) {
					showTimeVal = parseInt(showTimeVal) - 1;
				} else if (clickTarget.classList.contains('next_btn')) {
					showTimeVal = parseInt(showTimeVal) + 1;
				}
				showTime.innerText = showTimeVal;

				iYearShowText = parseInt(_this.oYearShow.innerText);
				iMonthShowText = parseInt(_this.oMonthShow.innerText);
				if (iMonthShowText < 1) {
					iMonthShowText = 12;
					iYearShowText--;
				} else if (iMonthShowText > 12) {
					iMonthShowText = 1;
					iYearShowText++;
				}
				_this.oMonthShow.innerText = iMonthShowText;
				_this.oYearShow.innerText = iYearShowText;
				_this.year = iYearShowText;
				_this.month = iMonthShowText;
				_this.render();
			}
		}, false);

		
		this.oDayCont.addEventListener('click', function(ev){
			let clickTarget = ev.target,
				allDayClass = _this.oDayCont.querySelectorAll('.day_class');

			// 点击切换选中日期
			if (clickTarget.classList.contains('day_class')) {
				allDayClass.forEach(function(value, index) {
					value.classList.remove("day_select");
				});
				clickTarget.classList.add("day_select");
				_this.day = clickTarget.innerText;
			}

			iYearShowText = parseInt(_this.oYearShow.innerText);
			iMonthShowText = parseInt(_this.oMonthShow.innerText);
			function changeTime(){
				_this.oMonthShow.innerText = iMonthShowText;
				_this.oYearShow.innerText = iYearShowText;
				_this.year = iYearShowText;
				_this.month = iMonthShowText;
				_this.day = clickTarget.innerText;
				_this.render();
			}
			// 点击灰色日期，跳转到上一个月或者下一个月
			if (clickTarget.classList.contains('pre_month')) {
				iMonthShowText--;
				if (iMonthShowText < 1) {
					iMonthShowText = 12;
					iYearShowText--;
				}
				changeTime();
			} else if (clickTarget.classList.contains('next_month')) {
				iMonthShowText++;
				if (iMonthShowText > 12) {
					iMonthShowText = 1;
					iYearShowText++;
				}
				changeTime();
			}
		}, false);
	}

	// 获取当前选中日期
	Calendar.prototype.getSelecetVal = function () {
		return {
			'year': this.year,
			'month': this.month,
			'day': this.day
		}
	}

	// 通过class 获取兄弟节点 node: 当前节点；className：需要获取兄弟元素的类名
	Calendar.prototype.getClassSibling = function (node, className) {
		let children = node.parentNode.children;
		for (let i = 0; i < children.length; i++ ) {
			if (children[i].className == className) {
				return children[i];
			}
		}
	}

	let oCalendar = new Calendar();
	oCalendar.init();
	console.log(oCalendar.getSelecetVal());

</script>
</html>
```