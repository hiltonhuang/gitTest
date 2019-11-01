var wrap = document.querySelector('.wrap');
		wrap.onclick = function(e) {
			var clients = {
				left: e.clientX,
				top: e.clientY
			}
			new Fireworks(wrap, clients);
		}
		//页面加载后,自动执行
		setInterval(function() {
			var clients = {
				left: randomInt(100, this.wrap.clientWidth - 150),
				top: randomInt(50, this.wrap.offsetHeight - 100)
			}
			new Fireworks(this.wrap, clients)
		}, 2000)
		function Fireworks(wrap, clients) { //clients为一个对象
			this.wrap = wrap;
			this.clients = clients;
			this.init();
		}
		Fireworks.prototype.init = function() {
			//创建键一个火花
			this.fire = document.createElement('div');
			this.fire.className = 'fire';
			this.fire.style.backgroundColor = randomColor();
			this.fire.style.left = this.clients.left + 'px';
			this.fire.style.bottom = '0px';
			this.wrap.appendChild(this.fire);
			this.send(); //发射烟花
		}
		Fireworks.prototype.send = function() {
			// 发射烟花 需要一个坐标,烟花,缓冲运动
			// bufferMove(dom,clients,callback)
			bufferMove(this.fire, this.clients, function() {
				//不同函数应当注意this指向问题
				//回调函数--执行运动到达目的后,该烟花消失,同时执行烟花爆开效果的函数
				this.wrap.removeChild(this.fire); //移除
				this.boom();
			}.bind(this))
		}

		Fireworks.prototype.boom = function() {
			var self = this;
			for (var i = 0, len = randomInt(30, 50); i < len; i++) {
				//创建随机个fire 并添加到wrap
				var fire = document.createElement('div');
				fire.className = 'fire';
				fire.style.backgroundColor = randomColor();
				fire.style.left = this.clients.left + 'px';
				fire.style.top = this.clients.top + 'px';
				this.wrap.appendChild(fire);
				// 运动 获取坐标
				var clients = {
					left: randomInt(100, this.wrap.clientWidth - 100),
					top: randomInt(50, this.wrap.clientHeight - 100)
				}
				//运动,缓冲运动
				// bufferMove(dom,clients,callback)
				bufferMove(fire, clients, function() {
					// 到达终点后执行消除
					self.wrap.removeChild(this); //this指代fire 这里如果直接写fire,只会生效最后一个fire;
					//所以必须将fire传进来,这里改为this指代;
				}.bind(fire))
			}
		}
//生成范围随机整数
function randomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}
//随机生成16进制颜色值#e3e3e3
function randomColor() {
	var str = '0123456789abcdef';
	var col = '#';
	for (var i = 0; i < 6; i++) {
		var num = Math.floor(Math.random() * 16);
		col += str[num];
	}
	return col;
}
//缓冲运动
function bufferMove(dom, target, callback) {
	clearInterval(dom.timer)
	dom.timer = setInterval(function() {
		// x轴运动
		// 缓冲运动
		var speedx = (target.left - dom.offsetLeft) / 10;
		speedx = speedx > 0 ? Math.ceil(speedx) : Math.floor(speedx);
		//剩余运动量跟下一次运动量比较
		if (Math.abs(target.left - dom.offsetLeft) <= Math.abs(speedx)) {
			dom.style.left = target.left + 'px';
		} else {
			dom.style.left = dom.offsetLeft + speedx + 'px';
		}
		// y轴运动
		var speedy = (target.top - dom.offsetTop) / 10;
		speedy = speedy > 0 ? Math.ceil(speedy) : Math.floor(speedy);
		
		if (Math.abs(speedy) >= Math.abs(target.top - dom.offsetTop)) {
			dom.style.top = target.top + 'px';
			clearInterval(dom.timer);
			callback();
		} else {
			dom.style.top = dom.offsetTop + speedy + 'px';
		}
	}, 20);
}
