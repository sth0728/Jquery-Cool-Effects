// User settings
var data = [[7,7.8,7.5],
			[10.7,9.3,10.0],
			[7.9,8.2,8.0],
			[11.3,8.6,9.9],
			[6.6,7.2,6.9],
			[11.0,11.1,11.1]
			];
var attr = ['Male','Female','Both sexes'];
var names = ['Afghanistan','Albania','Algeria','Andorra','Angola','Argentina'];

var width = 600;
var height = 400;
var columnExlain_width = 200;
var x_title = 'x';
var y_title = 'y';	
var x_title_space = 0.1; // in percentage
var y_title_space = 0.2; // in percentage

// static settings
var max_value = 0;
var color = [];

$( document ).ready(function() {
	$('.graph').width(width);
	$('.graph').height(height);
	$('.colExplain').width(columnExlain_width);
	$('.colExplain').height(height);
	findMax(data);
	drawTemplate(data);
	generateScale();
	findColors(data);
	generateGraph(data);
	generateNames();
	generateColExplain();
})

function generateColExplain(){
	for (var i=0;i<attr.length;i++){
		var name = attr[i];
		$('.colExplain').append("<div class='explain'>" +name + '</div>');
		$('.colExplain').append("<div class='explainColor' id='color"+i+"'>&nbsp;</div>");
		$('#color'+i).css('background-color',color[i]);
	}
}


function generateNames(){
	var names_len = names.length;
	if (data.length < names.length){
		names_len = data.length;
	}
	var width_percentage = (1 - x_title_space) / names_len;
	for (var i=names_len-1;i>=0;i--){
		$('.graph').append("<div class='name' id='name" + i + "'>" + names[i] + "</div>");
		$('#name'+i).width(width_percentage*100+"%");
		$('#name'+i).height(20);
	}
}

function drawTemplate(data_in){
	var len = data_in.length;
	var width_percentage = (1 - x_title_space) / len;
	for (var i=0; i<len;i++) {
		$('.graph').append("<div class='template' id='col" + i + "'></div>");
		$('#col'+i).width(width_percentage*100+"%");
		$('#col'+i).height(height * (1-y_title_space));
	}
}

function generateScale(){
	$('.graph').append("<div class='scale'></div>");
	for (var i=1;i<=4;i++){
		$('.scale').append("<div class='innerscale' id='innerscale"+i+"'></div>");
	}
	$('.scale').width(x_title_space*width-10);
	$('.innerscale').width((x_title_space*width-10)*0.3);
	$('.innerscale').height(height * (1 - y_title_space) / 4);
	for (var i=1;i<=5;i++){
		var rounded = Math.round(max_value*(1.25-(0.25*i)) * 10) / 10;
		$('.scale').append("<div class='scaletext' id='scaletext"+i+"'>"+rounded+"</div>");
		$('#scaletext'+i).css("top",$('.scale').offset().top + (height * (1 - y_title_space) / 4 + 2) * (i-1) - 10);
	}
}

function findColors(data_in){
	var len = attr.length;
	for (var i=0; i<len;i++) {
		var ran_red = Math.floor(Math.random() * 256);
		var ran_blue = Math.floor(Math.random() * 256);
		var ran_green = Math.floor(Math.random() * 156)+100;
		color.push('rgb('+ran_red+','+ran_blue+','+ran_green+')');
	}

}

function findMax(data_in){
	var len = data_in.length;
	for (var i=0; i<len;i++) {
		var len2 = data_in[i].length;
		var sum = 0;
		for (var j=0;j<len2;j++){
			sum += data_in[i][j];
		}
		if (sum > max_value){
			max_value = sum;
		}
	}
}

function generateGraph(data_in){
	var len = data_in.length;
	var len2, value, inner_width, sum, portion, container_height;
	for (var i=len-1; i>=0;i--) {
		len2 = data_in[i].length;
		inner_width = 100 / 3;
		addSingleDataContainer(0, len-i-1, 0, inner_width);
		sum = 0;
		for (var j=0;j<len2;j++){
			sum += data_in[i][j];
		}
		value = sum / max_value;
		addSingleDataContainer(value, len-i-1, 1, inner_width);
		for (var j=0;j<len2;j++){
			sum = 0;
			for (var k=0;k<len2;k++){
				sum += data_in[i][k];
			}
			container_height = sum / max_value * (1-y_title_space) * height;
			portion = data_in[i][j] / sum;
			addSingleDataTo(portion, len-i-1, j,inner_width,container_height);
		}
		addSingleDataContainer(0, len-i-1, 2, inner_width);
	}
}

function addSingleDataContainer(value, col_index, data_index,inner_width){
	var current_height = height * (1-y_title_space) * value;
	var current_remainder = height * (1-y_title_space) * (1-value);
	$('#col'+col_index).append("<div class='dataContainer' id='container" + col_index + 'data' + data_index + "'></div>");
	$('#container'+col_index+'data'+data_index).css('background-color', color[data_index]);
	$('#container'+col_index+'data'+data_index).css('width', inner_width+'%');
	$('#container'+col_index+'data'+data_index).css('margin-top', current_remainder);
	$('#container'+col_index+'data'+data_index).animate({'height': current_height});
}

function addSingleDataTo(value, col_index, data_index,inner_width,container_height){
	var current_height = container_height * value;
	$('#container'+col_index+'data1').append("<div class='data' id='col" + col_index + 'data' + data_index + "'></div>");
	$('#col'+col_index+'data'+data_index).css('background-color', color[data_index]);
	$('#col'+col_index+'data'+data_index).animate({'height': current_height});
}




