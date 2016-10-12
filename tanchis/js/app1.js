$(function(){
	var canvas=document.getElementById("mycanvas");
	var c=canvas.getContext("2d");
	var arr=[
		[2,0],
		[1,0],
		[0,0]
	];
	var dur=300;
	var count=0;
	var blue=[];
	var direction=39;
	var equal=false;
	//生成一个随机的小格
	function num(){
		blue[0]=Math.floor(40*Math.random());
		blue[1]=Math.floor(40*Math.random());
		for(var num=0; num<arr.length; num++){
			if(blue[0]==arr[num][0]){
				if(blue[1]==arr[num][1]){
					blue[1]=Math.floor(40*Math.random());
					num();
				}
			}
		}
	}
	num();
	//判断结束条件
	function end(){
		for(var m=0; m<arr.length; m++){
			for(var e=m+1; e<arr.length; e++){
				if(arr[m][0]==arr[e][0]){
					if(arr[m][1]==arr[e][1]){
						clearInterval(h);
						alert("游戏结束");
						return true;
					}
				}
			}
		}
		if((arr[0][0]==39&&direction==39)||(arr[0][0]==0&&direction==37)||(arr[0][1]==39&&direction==40)||(arr[0][1]==0&&direction==38)){
				clearInterval(h);
				alert("游戏结束");
				return true;
			}
	}
	//绘制画布
	function hua(){
		if(end()){return;};
		c.clearRect(0,0,600,600);
		// rect(c,blue[0],blue[1]);
		// c.fill();
		if(direction==40){
			arr.unshift([arr[0][0],arr[0][1]+1])
		}
		if(direction==38){
			arr.unshift([arr[0][0],arr[0][1]-1])
		}
		if(direction==37){
			arr.unshift([arr[0][0]-1,arr[0][1]])
		}
		if(direction==39){
			arr.unshift([arr[0][0]+1,arr[0][1]])
		}
		
		for(var s=0; s<arr.length; s++){
			if(arr[s][0]==blue[0]&&arr[s][1]==blue[1]){
				if(direction==40){
					arr.unshift([arr[0][0],arr[0][1]+1])
				}
				if(direction==38){
					arr.unshift([arr[0][0],arr[0][1]-1])
				}
				if(direction==37){
					arr.unshift([arr[0][0]-1,arr[0][1]])
				}
				if(direction==39){
					arr.unshift([arr[0][0]+1,arr[0][1]])
				}
				$(".count span").html(parseInt($(".count span").html())+1);
				num();
			}
		}
		arr.pop();
		rect(c,blue[0],blue[1]);
		c.fill();
		for(var i=0; i<40; i++){
			for(var j=0; j<40; j++){
				rect(c,i,j)
				for(var z=0; z<arr.length; z++){
					if(i==arr[z][0]&&j==arr[z][1]){
						c.fill();
					}
				}
			}
		}
	}
	var h=setInterval(hua,dur);
	//当按住键的时候加速
	document.onkeydown=function(e){
		if(event.keyCode==37||event.keyCode==38||event.keyCode==39||event.keyCode==40){
			if((event.keyCode!=direction)&&(Math.abs(event.keyCode-direction)!=2)){
				direction=event.keyCode;
			}
			dur=150;
			if(count==0){
				clearInterval(h);
				h=setInterval(hua,dur);
			}
			count++;
		}
	}
	//37左,39右,38上,40下
	document.onkeyup=function(event){
		if(event.keyCode==37||event.keyCode==38||event.keyCode==39||event.keyCode==40){
			clearInterval(h);
			dur=300;
			h=setInterval(hua,dur);
			count=0;
		}
	}
})
function rect(c,i,j){
	c.beginPath();
	c.rect(15*i,15*j,15,15);
	c.closePath();
	c.fillStyle="blue";
	c.stroke();
}