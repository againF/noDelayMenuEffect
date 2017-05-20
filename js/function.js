function sameSign(a, b) {//用异或判断a,b符号是否相同，用到了位运算的技巧
	return (a ^ b) >= 0;
}
function vector(a, b) {//向量的运算
	return {
		x: b.x - a.x,
		y: b.y - a.y
	}
}

function vectorProduct(v1, v2) {//向量叉乘
	return v1.x * v2.y - v2.x * v1.y;
}

function isPointInTrangle(p, a, b, c) {//鼠标当前点是否在三角形ABC内
	var pa = vector(p, a);//向量pa
	var pb = vector(p, b);//向量pb
	var pc = vector(p, c);//向量pc
	
	var t1 = vectorProduct(pa, pb);//pa,pb的叉乘结果
	var t2 = vectorProduct(pb, pc);//pb,pc的叉乘结果
	var t3 = vectorProduct(pc, pa);//pc,pa的叉乘结果
	
	return sameSign(t1, t2) && sameSign(t2, t3);//如果t1,t2符号相同，且t2,t3符号相同，那t1,t3符号肯定相同
}

function needDelay(elem, leftCorner, currMousePos) {//是否需要延迟
	var offset = elem.offset();
	
	var topLeft = {//子菜单上边缘
		x: offset.left,
		y: offset.top
	}
	
	var bottomLeft = {//子菜单下边缘
		x: offset.left,
		y:offset.top + elem.height()
	}
	
	return isPointInTrangle(currMousePos, leftCorner, topLeft ,bottomLeft);
}
