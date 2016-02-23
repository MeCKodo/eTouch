## 你不得不具备的手势库

具备功能 tap手势，实时监控滑动距离，支持链式的上下左右滑回调

> * 2016/2/22  重大更新, 为了精确预判用户行为,通过手指划过的曲线面积,使用微积分算法,极大提高精确度

 [普通示例地址!戳我戳我戳我](http://meckodo.github.io/eTouch/index.html) 15-10-27

 [仿聊天列表,item可左右滑动示例](http://meckodo.github.io/eTouch/list.html) 16/2/22

 [高级事件,给div加锁](http://meckodo.github.io/eTouch/clock.html) 16/2/22
 
 [移动端日历实战]( http://meckodoo.sinaapp.com/demo/17/index.html) 16/2/22

 新增没有支持CMD和AMD版本,在使用avalon自带加载器过程中,有支持的版本无法使用
 

#### 举个粒子

```javascript
//事件代理例子 !!!!!第一个参数仅支持id!!!!!!
支持复杂选择器代理
etouch('#pox','.ul li span',function(e,touch) {
	e.clock = true;  //给div加锁,完全阻止默认事件
	console.log('我仅仅只是一个tap啊！');
	console.log(touch);
}).on('swiper',function(e,touch) {
	console.log('实时获取');
}).on('up',function(e,touch) {
	console.log('上滑回调');
}).on('down',function(e,touch) {
	console.log('下滑回调');
}).on('left',function(e,touch) {
	console.log('左滑回调');
}).on('right',function(e,touch) {
	console.log('右滑回调');
});
//直接事件批量绑定
 etouch('li',function(e,touch) {
 	console.log(this,e,touch);
 }).on('left',function() {
 
})
 //  e为事件对象，touch为触摸返回对象
```

还支持 CMD 和 AMD 
```javascript

require(['etouch'],function(etouch) {
	
	new etouch('#box',function(e) {
		console.log('box');
	});
	
})

```
