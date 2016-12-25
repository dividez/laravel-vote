$(function () {
	$('#birth').validate({
		rules :{
			date : {
				required : true,
				date: true,
			},
			},
		messages : {
				date : {
					required:"请填写出生日期",
				},
			},
	});
	$('#mydes').validate({
		rules :{
			user : {
				required : true,
				maxlength: 36 ,
				},
			},
		messages : {
				user : {
					required:'个人简介不得为空',
					maxlength: jQuery.format('个人简介不得超过{0}个字符'),
				},
				
			},
	});
	$('#my-sec').validate({
		rules :{
			user : {
				required : true,
				maxlength: 20 ,
				},
			},
		messages : {
				user : {
					required:'请填写地区',
					maxlength: jQuery.format('地区不得超过{0}个字符'),
				},
				
			},
	});

});


























