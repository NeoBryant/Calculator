/*
计算状态：
    1   ->  加
    2   ->  减
    3   ->  乘
    4   ->  除
    5   ->  左括号
    6   ->  右括号
*/

var num = 0, result = 0, numshow = "0"; 
var operate = 0; //判断输入状态的标志 
var calcul = 0; //判断计算状态的标志 
var quit = 0; //防止重复按键的标志 
var tempResult = 0; //加括号时，保留之前的结果数
var tempCalcul = 0;  //加括号时，判断之前计算状态的标志
var ifInBracket = 0; //是否在括号里的状态判断 0->没在括号里，1->在括号里
var tempCalcluOfRbracket = 0; //右括号之前的运算符号

var mark = 0;

function command(num){ 
	var str = String(document.calculator.numScreen.value); //获得当前显示数据 
	str = (str != "0") ? ((operate == 0) ? str : "") : ""; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回空值; 
	str = str + String(num); //给当前值追加字符 
	document.calculator.numScreen.value = str; //刷新显示 
	operate = 0; //重置输入状态 
	quit = 0; //重置防止重复按键的标志 
} 

function dot(){ 
	var str = String(document.calculator.numScreen.value); 
	str = (str != "0") ? ((operate == 0) ? str : "0") : "0"; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回"0"; 
	for(i = 0; i <= str.length; i++) { //判断是否已经有一个点号 
		if(str.substr(i,1) == ".") {
			return false; //如果有则不再插入 
		}
	} 
	str = str + "."; 
	document.calculator.numScreen.value = str; 
	operate = 0; 
} 

function del(){ //退格 
	var str = String(document.calculator.numScreen.value); 
	str = (str != "0") ? str : ""; 
	str = str.substr(0, str.length-1); 
	str = (str != "") ? str : "0"; 
	document.calculator.numScreen.value = str; 
} 

function clearscreen(){ //清除数据 
	num = 0; 
	result = 0; 
	numshow = "0"; 
	document.calculator.numScreen.value = "0"; 
} 

function plus(){ //加法 
	calculate(); //调用计算函数 
	operate = 1; //更改输入状态 
	calcul = 1; //更改计算状态为加 
} 

function minus(){ //减法 
	calculate(); 
	operate = 1; 
	calcul = 2; 
} 

function times(){ //乘法 
	calculate(); 
	operate = 1; 
	calcul = 3; 
} 

function divide(){ //除法 
	calculate(); 
	operate = 1; 
	calcul = 4; 
} 

function lbracket() {//加左括号
	tempResult = 0;
	tempCalcul = 0;
	tempCalcluOfRbracket = 0;

	tempCalcul = calcul; //括号前的运算符

	calcul = 5;

	calculate();
	operate = 1;
}

function rbracket() {//加右括号
	tempCalcluOfRbracket = calcul;

	calcul = 6;	

	calculate();

	calcul = 0;
	operate = 1;
}

/*
function persent(){ //求余 
	calculate(); 
	operate = 1; 
	calcul = 5; 
} */

function equal(){ 
	calculate(); //等于 
	operate = 1; 
	num = 0; 
	result = 0; 
	tempResult = 0;
	numshow = "0"; 
} 

// 计算
function calculate(){ 
	numshow = Number(document.calculator.numScreen.value); 

	if (calcul == 5) { //左括号
		numshow = String(result); 
		document.calculator.numScreen.value = numshow; 
		num = result; //存储当前值 

		tempResult = num; //括号前的数值

		ifInBracket == 1;
	} else if (calcul == 6){
		ifInBracket == 0; //右括号

		switch(tempCalcluOfRbracket){ //判断要输入状态 
			case 1: 
				result = result + numshow;
				break; //计算"+" 
			case 2: 
				result = result - numshow;
				break; //计算"-" 
			case 3: 
				result = result * numshow;
				break; //计算"*"
			case 4: 
				if(numshow != 0){ 
					result = result / numshow;
				} else {
					document.getElementById("note").innerHTML="被除数不能为零！"; 
					setTimeout(clearnote,4000)
				} 
				break; //计算"/"
		} 
		result = Math.round(result * 10000000) / 10000000;

		if (tempResult != 0) {
			switch(tempCalcul){ //判断要输入状态 
				case 1: 
					result = tempResult + result;
					break; //计算"+" 
				case 2: 
					result = tempResult - result;
					break; //计算"-" 
				case 3: 
					result = tempResult * result;				
					break; //计算"*"
				case 4: 
					if(numshow != 0){ 
						result = tempResult / result;					
					} else {
						document.getElementById("note").innerHTML="被除数不能为零！"; 
						setTimeout(clearnote,4000)
					} 
					break; //计算"/"
			} 
			result = Math.round(result * 10000000) / 10000000;

		} 
	}

	if(num != 0 && quit != 1) { //判断前一个运算数是否为零以及防重复按键的状态 
		switch(calcul){ //判断要输入状态 
			case 1: 
				result = num + numshow;
				break; //计算"+" 
			case 2: 
				result = num - numshow;
				break; //计算"-" 
			case 3: 
				result = num * numshow;
				break; //计算"*"
			case 4: 
				if(numshow != 0){ 
					result = num / numshow;
				} else {
					document.getElementById("note").innerHTML="被除数不能为零！"; 
					setTimeout(clearnote,4000)
				} 
				break; //计算"/"
		} 
		result = Math.round(result * 10000000) / 10000000;
		quit = 1; //避免重复按键 
	} else { 
		result = numshow; 
	} 
	
	if (calcul != 5) { //当运算符不为左括号"（"时
		if (result > 99999) {
			result = result.toPrecision(6);
		}
		numshow = String(result); 
		document.calculator.numScreen.value = numshow; 
		num = result; //存储当前值 
	}

	if (calcul == 5) {
		num = 0;
		result = 0;
		calcul = 0;
	}
}

function clearnote(){ //清空提示 
	document.getElementById("note").innerHTML=""; 
} 



