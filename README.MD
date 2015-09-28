## 仅仅只有150行代码的手势库

具备功能 tap手势，实时监控滑动距离，支持链式的上下左右滑回调
(从forchangejs里提取的手势模块)

#### 举个粒子

```javascript
//事件代理例子 !!!!!第一个参数仅支持id!!!!!!
etouch('#box','li',function(e,touchObj) {
  // 以下数据是实时监听的，tap的回调可写在这。
 	console.log(this.innerHTML); //this为dom对象
  	console.log(touchObj);//滑动返回对象
 	console.log(touchObj.status);//滑动状态，tap，left top等等
 	console.log(touchObj.pageX); //当前屏幕X
 	console.log(touchObj.pageY); //当前屏幕Y
 	console.log(touchObj.clientX); //页面距离X
 	console.log(touchObj.clientY); //页面距离Y
 	console.log(touchObj.distanceX); //X轴位移
 	console.log(touchObj.distanceY); //Y轴位移
  	return false; 即可阻止事件冒泡
}).on('left',function() { //左滑的回调
 
}).on('right',function() { //右滑的回调
 
}).on('up',function() { //上滑的回调
 
}).on('down',function() { //下滑的回调
 
});
   
//直接事件绑定
 etouch('li',function(e,touchObj) {
 	console.log(this,e,touchObj);
 }).on('left',function() {
 
})
 //  e为事件对象，touchObj为触摸返回对象
```