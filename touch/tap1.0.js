/**
 *  @description 手势构造函数，暂支持tap事件，支持事件代理
 *  @param {String} id
 *  @param {String} selector(可选)  支持复杂选择器
 *  @param {function} fn
 *  @example  事件代理例子 !!!!!第一个参数仅支持id!!!!!!
 *
 *  touchModule('#box','li',function(e,touchObj) {
 *		console.log(this,e,touchObj);
 *	})
 *
 * @example  直接事件绑定
 *
 *  touchModule('#box',function(e,touchObj) {
 *		console.log(this,e,touchObj);
 *	})
 *
 *  e为事件对象，touchObj为触摸返回对象
 */
(function(window, undefined) {
	//把3个状态提取出来
	function touchStart(e, touchObj, module) {
		var touches = e.touches[0];
		//赋值手指初始位置
		touchObj.pageX = touches.pageX;
		touchObj.pageY = touches.pageY;
		touchObj.clientX = touches.clientX;
		touchObj.clientY = touches.clientY;
		module.time = +new Date();
	}

	function touchMove(e, touchObj, module) {
		var touches = e.touches[0];
		//计算手指移动位置
		touchObj.distanceX = touches.pageX - touchObj.pageX;
		touchObj.distanceY = touches.pageY - touchObj.pageY;
	}

	function touchEnd(e, target, touchObj, module, fn) {
			var touches = e.touches[0];
			var time = +new Date() - module.time;
			//当手指触摸时间＜150和位移小于2px则为tap事件
			if (time < 150 && Math.abs(touchObj.distanceX) < 2 && Math.abs(touchObj.distanceY) < 2) {
				isTap = true;
				if (isTap) {
					touchObj.distanceX = 0;
					touchObj.distanceY = 0;
					//返二个参数 指向被触发的dom，和当前构造函数
					setTimeout(function() {
						isTap = false;
						fn.call(target, e, touchObj);
					}, 30);
				}
			} else { //否则为滑动或者双击
				touchObj.distanceX = 0;
				touchObj.distanceY = 0;
			}
		}
		//把3个状态提取出来

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
				do {
					if (filiter(agent, selector, target, e)) {
						fn.call(target, e); //要吧事件e返回出去调用
					};
					target = target.parentNode;
				} while (target != ctarget)
			}, false);

			function filiter(agent, selector, target, e) {
				var nodes = agent[0].querySelectorAll(selector);
				for (var i = 0; i < nodes.length; i++) {
					if (nodes[i] == target) {
						return true;
					}
				}
			}
		}
		//事件代理用的函数结束

	function Touchevent(root, selector, fn) {
		this.root = document.querySelectorAll(root); //当前的dom

		if (!this.root) {
			console.log('root不存在');
			return;
		}
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
		this.selector = selector;
		if (arguments[2] == undefined) {
			this.operate(arguments[1]);
		} else {
			this.operate(arguments[2]);
		}
	}
	Touchevent.prototype.operate = function(fn) {
		var touchObj = this.touchObj, //缓存touchObj
			isTap = this.isTap,
			_this = this;
		delegate(this.root, 'touchstart', this.selector, function(e) {
			touchStart(e, touchObj, _this)
		});
		delegate(this.root, 'touchmove', this.selector, function(e) {
			touchMove(e, touchObj);
		});
		delegate(this.root, 'touchend', this.selector, function(e) {
			touchEnd(e, this, touchObj, _this, fn);
		});
	}
	window.touchModule = function(root, selector, fn) {
		return new Touchevent(root, selector, fn);
	};
})(window, undefined);