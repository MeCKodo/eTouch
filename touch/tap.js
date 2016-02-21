/*	
 * 	直接
 * 	 touchModule(dom,function(target,touchPlace) {
 * 			
 * 	  })
 *  即可调用
 *  传入 dom和回调函数即可
 *  fn返二个参数 指向被触发的dom，和触摸位置的一些参数
 */

(function(window) {
	function Touchevent(dom, fn) {
		if (!(this instanceof Touchevent)) {
			return new Touchevent(dom, fn);
		}
		this.dom = dom; //当前的dom
		this.touchObj = {
			pageX: 0,
			pageY: 0,
			clientX: 0,
			clientY: 0,
			distanceX: 0,
			distanceY: 0,
		};
		this.isTap = false; //用来判断是否为tap
		this.time = 0; //记录点击的时间间隔 
		this.operate(fn);
	}
	Touchevent.prototype.operate = function(fn) {
		var touchObj = this.touchObj, //缓存touchObj
			isTap = this.isTap,
			_this = this;
		this.dom.addEventListener('touchstart', function(e) {
			var touches = e.touches[0];
			console.log(isTap);
			//赋值手指初始位置
			touchObj.pageX = touches.pageX;
			touchObj.pageY = touches.pageY;
			touchObj.clientX = touches.clientX;
			touchObj.clientY = touches.clientY;
			_this.time = +new Date();
		}, false);
		this.dom.addEventListener('touchmove', function(e) {
			var touches = e.touches[0];
			//计算手指移动位置
			touchObj.distanceX = touches.pageX - touchObj.pageX;
			touchObj.distanceY = touches.pageY - touchObj.pageY;
		}, false);
		this.dom.addEventListener('touchend', function(e) {
			var touches = e.touches[0];
			var time = +new Date() - _this.time;
			//当手指触摸时间＜150和位移小于2px则为tap事件
			if (time < 150 && Math.abs(touchObj.distanceX) < 2 && Math.abs(touchObj.distanceY) < 2) {
				isTap = true;
				if (isTap) {
					console.log('tap啦啦啦啦啦～～～');
					touchObj.distanceX = 0;
					touchObj.distanceY = 0;
					//返二个参数 指向被触发的dom，和当前构造函数
					setTimeout(function() {
						isTap = false;
						fn.call(null, _this.dom, touchObj);
					}, 50);
				}
			} else { //否则为滑动或者双击
				console.log('我被移动了，不是tap了');
				touchObj.distanceX = 0;
				touchObj.distanceY = 0;
			}
		}, false);
	}

	window.touchModule = function(dom, fn) {
		return Touchevent(dom, fn);
	};

})(window);