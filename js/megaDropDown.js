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
	$('#test')//一级菜单
	 .on('mouseenter', function(e) {//鼠标移动到一级菜单时显示二级菜单
		sub.removeClass('none');
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
	 	
	 	
	 });
});
