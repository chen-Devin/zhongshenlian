var input = '1111011110101000000101010101010101111';
var length = 0;
var count = 1;
var countArr = [];

var compute = function(str) {
	var strArr = str.split('');
	if (strArr.length === 1) {
		countArr.push(count);
	} else if (strArr.length >= 2) {
		for (var i = 0; i < strArr.length -1; i++) {
			if (strArr[i] === strArr[i+1]) {
				countArr.push(count);
				count = 1;
				continue;
			} else {
				count++;
			}
		}
		countArr.push(count);
	}
	countMax(countArr);
};

var countMax = function(countArr) {
	if (countArr.length === 1) {
		length = countArr[0];
	} else {
		length = Math.max.apply(null, countArr);
	}
	console.log(length);
};

compute(input);

var input = readline();
var inputs = input.split(' ');
var x = parseInt(inputs[0]);
var f = parseInt(inputs[1]);
var d = parseInt(inputs[2]);
var p = parseInt(inputs[3]);

var num = Math.floor(d/x);
if (num <= f) {
	print(num);
} else {
	num = (d + f * p) / (p + x);
	print(num);
}

