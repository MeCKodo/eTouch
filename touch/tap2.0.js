/**
 *  @description 手势构造函数，暂支持tap和上下左右滑动，支持事件代理
 *  @param {String} id
 *  @param {String} selector(可选)  支持复杂选择器
 *  @param {function} fn
 *
 *  @example  事件代理例子 !!!!!第一个参数仅支持id!!!!!!
 *  touchModule('#box','li',function(e,touchObj) {
 *		console.log(this.innerHTML); //this为dom对象
 * 		console.log(touchObj);//滑动返回对象
 *		console.log(touchObj.status);//滑动状态，tap，left top等等
 *		console.log(touchObj.pageX); //当前屏幕X
 *		console.log(touchObj.pageY); //当前屏幕Y
 *		console.log(touchObj.clientX); //页面距离X
 *		console.log(touchObj.clientY); //页面距离Y
 *		console.log(touchObj.distanceX); //X轴位移
 *		console.log(touchObj.distanceY); //Y轴位移
 * 		return false; 即可阻止事件冒泡
 *	})
 *
 * @example  直接事件绑定
 *  touchModule('li',function(e,touchObj) {
 *		console.log(this,e,touchObj);
 *	})
 *  e为事件对象，touchObj为触摸返回对象
 */
(function(window, undefined) {
	function swipeDirection(x1, x2, y1, y2) {
			return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');
		}
		//事件代理用的函数

	function delegate(agent, type, selector, fn) {
			//为了复杂的选择器实现
			if (typeof selector != "string") {
				for (var i = 0; i < agent.length; i++) {
					agent[i].addEventListener(type, fn, false);
				}
				return;
			}
			agent[0].addEventListener(type, function(e) {
				var target = e.target;
				var ctarget = e.currentTarget;
				var bubble = true;
				while (bubble && target != ctarget) {
					if (filiter(agent, selector, target)) {
						bubble = fn.call(target, e); //要吧事件e返回出去调用
					};
					target = target.parentNode;
				}
				return bubble;
			}, false);

			function filiter(agent, selector, target) {
				var nodes = agent[0].querySelectorAll(selector);
				for (var i = 0; i < nodes.length; i++) {
					if (nodes[i] == target) {
						return true;
					}
				}
			}
		}
		//事件代理用的函数结束

	function Touchmodule(root, selector, fn) {
		this.root = document.querySelectorAll(root); //当前的dom
		if (!this.root) {
			console.log('root不存在');
			return;
		}
		this.touchObj = {
			status: '',
			pageX: 0,
			pageY: 0,
			clientX: 0,
			clientY: 0,
			distanceX: 0,
			distanceY: 0,
		}
		this.isTap = false; //用来判断是否为tap
		this.time = 0; //记录点击的时间间隔 
		this.selector = selector;
		if (arguments[2] == undefined) {
			this.operate(arguments[1]);
		} else {
			this.operate(arguments[2]);
		}
	}
	Touchmodule.prototype.init = function() {
		this.touchObj.distanceX = 0;
		this.touchObj.distanceY = 0;
	}
	Touchmodule.prototype.operate = function(fn) {
			var touchObj = this.touchObj, //缓存touchObj
				isTap = this.isTap,
				_this = this;
			delegate(this.root, 'touchstart', this.selector, function(e) {
				touchStart(e, touchObj, _this)
			});
			delegate(this.root, 'touchmove', this.selector, function(e) {
				touchMove(e, this, touchObj, fn);
			});
			delegate(this.root, 'touchend', this.selector, function(e) {
				touchEnd(e, this, touchObj, _this, fn);
			});
		}
		//把3个状态提取出来

	function touchStart(e, touchObj, module) {
		module.init(); //滑动或者点击结束要初始化
		var touches = e.touches[0];
		//赋值手指初始位置
		touchObj.pageX = touches.pageX;
		touchObj.pageY = touches.pageY;
		touchObj.clientX = touches.clientX;
		touchObj.clientY = touches.clientY;
		module.time = +new Date();
	}

	function touchMove(e, target, touchObj, fn) {
		var touches = e.touches[0];
		//计算手指移动位置
		touchObj.distanceX = touches.pageX - touchObj.pageX;
		touchObj.distanceY = touches.pageY - touchObj.pageY;
		//计算手指滑动方向
		var x1 = touchObj.pageX;
		var x2 = touchObj.pageX + touchObj.distanceX;
		var y1 = touchObj.pageY;
		var y2 = touchObj.pageY + touchObj.distanceY;
		touchObj.status = swipeDirection(x1, x2, y1, y2);

		fn.call(target, e, touchObj);
	}

	function touchEnd(e, target, touchObj, module, fn) {
			var touches = e.touches[0];
			var time = +new Date() - module.time;
			//当手指触摸时间＜150和位移小于2px则为tap事件
			if (time < 150 && Math.abs(touchObj.distanceX) < 2 && Math.abs(touchObj.distanceY) < 2) {
				isTap = true;
				if (isTap) {
					touchObj.status = 'tap';
					//返二个参数 指向被触发的dom，和当前构造函数
					setTimeout(function() {
						isTap = false;
						fn.call(target, e, touchObj);
					}, 30);
				}
			} else { //否则为滑动或者双击，双击暂不想做

			}
		}
		//把3个状态提取出来
	window.touchModule = function(root, selector, fn) {
		return new Touchmodule(root, selector, fn);
	};
})(window, undefined);