[百度地图js - api 2.0](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html?ADUIN=1094074761&ADSESSION=1546400331&ADTAG=CLIENT.QQ.5543_.0&ADPUBNO=26767)

[百度地图api](http://lbsyun.baidu.com/index.php?title=jspopular)

[百度地图坐标抓取](http://api.map.baidu.com/lbsapi/getpoint/index.html)

示例代码：
```js
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=8EtyQI5971Ray2lL3kczuXDrwuW6ChUB"></script>
</head>
<style>
</style>
<body>
<script>
var map = new BMap.Map("allmap");
var nowPotin;
var desPoint = new BMap.Point('113.355914', '23.184202');
var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
    console.dir(this.getStatus());
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
        alert('您的位置：'+r.point.lng+','+r.point.lat);
        console.dir(r.point);
        nowPotin = new BMap.Point(r.point.lng, r.point.lat);
        alert('距离是：'+map.getDistance(nowPotin, desPoint).toFixed(2)+' 米。');  //获取两点距离,保留小数点后两位
    }
    else {
        alert('failed'+this.getStatus());
    } 
},{enableHighAccuracy: true, timeout: 1000});
</script> 
</body>
</html>
```