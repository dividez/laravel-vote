
window.onload = function(){
	var vfSurplusE = thisDom('vfSurplus'),
		vfSurplus = 60,//获取倒计时时间
		timeout;
	
	vfSurplusE.onclick = function(){
		if(vfSurplusE.innerHTML === '重新发送'){
			vfSurplus = 60;//重新设置倒计时时间
			timeout = setTimeout(surplus,1000);
		}
		
	}
	function surplus(){
		if(vfSurplus > 0){
			vfSurplus--;
			timeout = setTimeout(surplus,1000);
			vfSurplusE.innerHTML = vfSurplus + 's';
		}
		else{
			vfSurplusE.innerHTML = '重新发送';
		}
	}
	function thisDom(elementId){
		return document.getElementById(elementId);
	}

	thisDom('forgetPwd').onclick = function(){
		timeout = setTimeout(surplus,100);
		thisDom('form1').style.display = 'none';
		thisDom('form2').style.display = 'block';
	}

	thisDom('success').onclick = function(){
		
		thisDom('form2').style.display = 'none';
		thisDom('form3').style.display = 'block';
	}

	thisDom('next').onclick = function(){
		
		thisDom('form3').style.display = 'none';
		thisDom('form4').style.display = 'block';
		var autoLoginT = 3;
		setInterval(function(){
			
			thisDom('autoLogin').innerHTML = --autoLoginT;
			if(autoLoginT === 0){
				window.location.href = '';//跳转地址
			}
		},1000)

	}


}