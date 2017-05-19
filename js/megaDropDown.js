$(document).ready(function() {
	var sub = $('#sub');//子菜单
	var activeRow;//当前激活的一级菜单中的行
	var activeMenu;//当前激活的菜单
	var timer;//用来保存setTimeout返回的计时器ID
	var mouseInSub = false;//用来标识当前鼠标在不在子菜单里
	
	sub.on('mouseenter', function(e) {
		mouseInSub = true;
	}).on('mouseleave', function(e) {
		mouseInSub = false;
	})
	
	var mouseTrack = [];//记录鼠标的位置 	
	
	var moveHandler = function(e) {//获取当前鼠标相对于页面的坐标
		mouseTrack.push({
			x: e.pageX,
			y: e.pageY
		})
		
		if(mouseTrack.length > 3) {//由于我们只需要知道当前及上一次的鼠标坐标，所以我们不用保存太多坐标，把多余的弹出
			mouseTrack.shift();
		}
	}
	
	$('#test')//一级菜单
	 .on('mouseenter', function(e) {//鼠标移动到一级菜单时显示二级菜单
		sub.removeClass('none');
		
		$(document).bind('mousemove',moveHandler);//在document上绑定mousemove事件
	})
	 .on('mouseleave', function(e) {//鼠标离开一级菜单时隐藏二级菜单
	 	sub.addClass('none');

	 	if(activeRow) {
	 		activeRow.removeClass('active');
	 		activeRow = null;
	 	}

	 	if(activeMenu) {
	 		activeMenu.addClass('none');
	 		activeMenu = null;
	 	}
	 	
	 	$(document).unbind('mousemove',moveHandler);//解除绑定
	 })
	 .on('mouseenter','li',function(e) {
	 	if(!activeRow) {	//如果当前没有激活的列表项
	 		activeRow = $(e.target).addClass('active');//把激活的列表项指向事件目标
	 		activeMenu = $('#' + activeRow.data('id')); //选中对应的二级菜单
	 		activeMenu.removeClass('none');
	 		return;
	 	}
	 	
	 	if(timer) {//实现去抖
	 		clearTimeout(timer);
	 	}
	 	
	 	var currMousePos = mouseTrack[mouseTrack.length - 1];//当前鼠标的位置
	 	var leftCorner = mouseTrack[mouseTrack.length - 2];//鼠标上一次的坐标，也就是三角形中A点的坐标
	 	
	 	var delay = needDelay(sub, leftCorner, currMousePos);
	 	
	 	if(delay) {//如果需要延迟
	 		timer = setTimeout(function() {
	 		 if(mouseInSub) {
	 			return;
	 		 }
	 		 activeRow.removeClass('active');
	 		 activeMenu.addClass('none');
	 		 activeRow = $(e.target);
	 		 activeRow.addClass('active');
	 		 activeMenu = $('#' + activeRow.data('id'));
	 		 activeMenu.removeClass('none');
	 		 timer = null;
	 	    },300);
	 	}else {//若不需要延迟则直接展示
	 		var prevActiveRow = activeRow;
	 		var prevActiveMenu = activeMenu;
	 		
	 		activeRow = $(e.target);
	 		activeMenu = $('#' + activeRow.data('id'));
	 		
	 		prevActiveRow.removeClass('active');
	 		prevActiveMenu.addClass('none');
	 		
	 		activeRow.addClass('active');
	 		activeMenu.removeClass('none');
	 	}
	 	
	 	
	 	
	 });
});
