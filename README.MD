## 仅仅只有150行不到的手势库(压缩后2.2K，gzip没测)

具备功能 tap手势，实时监控滑动距离，支持链式的上下左右滑回调

从[forchange.js](https://github.com/MeCKodo/forchange)（我的移动端轮子） 里提取的手势模块

 [事例链接地址!戳我戳我戳我](http://meckodo.github.io/eTouch/index.html)
 15-10-27

 新增没有支持CMD和AMD版本,在使用avalon自带加载器过程中,有支持的版本无法使用
#### 举个粒子

```javascript
//事件代理例子 !!!!!第一个参数仅支持id!!!!!!
支持复杂选择器代理
etouch('#pox','.ul li span',function(e,touch) {
	console.log('我仅仅至少一个tap啊！');
	console.log(touch);
}).on('swiper',function(e,touch) {
	e.preventDefault(); 
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
 	e.preventDefault();
 	console.log(this,e,touch);
 }).on('left',function() {
 
})
 //  e为事件对象，touch为触摸返回对象
```

还支持 CMD 和 AMD 
```javascript

require(['etouch'],function(etouch) {
	
	new etouch('#box',function(e) {
		e.preventDefault();
		console.log('box');
	});
	
})

```