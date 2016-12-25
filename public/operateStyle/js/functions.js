/*--------------------------------------------------------------------------------
functions.js 公共函数库
--------------------------------------------------------------------------------*/

// 将PHP时间戳转换成日期格式
function timeConvert(time){
	var date = new Date(parseInt(time)*1000);
	var year = date.getFullYear();
	var month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1);
	var today = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();
	var hour = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
	var time = year+'-'+month+'-'+today+' '+hour+':'+minutes;
	return time;
}