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
