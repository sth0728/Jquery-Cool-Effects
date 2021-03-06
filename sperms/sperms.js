var canvas_width = $(document).width() * 0.8;
var canvas_height = $(document).height() * 0.8;
var sperm_count = 20;
var sperm_size = 30;
var sperm_tail_length = 50;
var sperm_color = 'white';
var sperm_move_speed = 30;


$(document).ready(function() {
	$("body").append("<canvas width='" + canvas_width + "' height='" + canvas_height + "'></canvas>");
	for ( var i = 0; i < sperm_count; i++ ) {
      		var pos_x = canvas_width * 0.01 * Math.floor((Math.random() * 98));
		var pos_y = Math.floor((Math.random() * (canvas_height - 20)));
		var angle = Math.floor((Math.random() * 360));
		$('canvas').drawEllipse({
			layer: true,
  			name: 'head' + i,
  			fillStyle: sperm_color,
  			x: pos_x, 
  			y: pos_y,
  			width: sperm_size, 
  			height: sperm_size * 0.3,
  			rotate: angle
		});		
    		var radians = angle * Math.PI / 180;
		$('canvas').drawPath({
			layer: true,
  			name: 'tail' + i,
  			strokeStyle: sperm_color,
  			strokeWidth: 2,
  			x: pos_x, 
  			y: pos_y,
  			p1: {
    				type: 'line',
    				x1: 15, 
    				y1: 0
  			},
  			p2: {
    				type: 'quadratic',
    				cx1: sperm_tail_length*0.5, 
    				cy1: -30,
    				cx2: sperm_tail_length*1.5, 
    				cy2: 30,
    				x2: sperm_tail_length, 
    				y2: 0,
    				x3: sperm_tail_length * 2, 
    				y3: 1
  			},
  			rotate: angle
		});
    MoveSpermOne(i,pos_x,pos_y,angle);
	}

});

function MoveSpermOne(index,pos_x,pos_y,angle){
	var duration = Math.floor((Math.random() * 400))+800;
	$('canvas').animateLayer('tail'+index, {
  		p2: {
    		cx1: sperm_tail_length*0.5, 
    		cy1: 30,
    		cx2: sperm_tail_length*1.5, 
    		cy2: -30,
    		y3: -10
  		}
	}, duration, function(layer) {
  		MoveSpermTwo(index,pos_x,pos_y,angle);

	});
}

function MoveSpermTwo(index,pos_x,pos_y,angle){
	var duration = Math.floor((Math.random() * 400))+800;
  var radians = angle * Math.PI / 180;
	var moveto_x = pos_x - (sperm_move_speed * Math.cos(radians));
	var moveto_y = pos_y - (sperm_move_speed * Math.sin(radians));
	var ran_angle = Math.floor(Math.random() * 20 - 40) + 180;
  var new_angle = 0;
  if (moveto_x<0){
    moveto_x = 1;
    new_angle = ran_angle;
  }
  if (moveto_x>canvas_width){
    moveto_x = canvas_width-1;
    new_angle = ran_angle;
  }
  if (moveto_y<0){
    moveto_y = 1;
    new_angle = ran_angle;
  }
  if (moveto_y>canvas_height){
    moveto_y = canvas_height-1;
    new_angle = ran_angle;
  }
	$('canvas').animateLayer('tail'+index, {
  		p2: {
    			cx1: sperm_tail_length*0.5, 
    			cy1: -30,
    			cx2: sperm_tail_length*1.5, 
    			cy2: 30,
    			y3: 10
  		},
  		x: moveto_x,
  		y: moveto_y,
  		rotate: '+='+new_angle
	}, duration, function(layer) {
  		MoveSpermOne(index,moveto_x,moveto_y,angle+new_angle);
	});
	$('canvas').animateLayer('head'+index, {
  		x: moveto_x,
  		y: moveto_y,
  		rotate: '+='+new_angle
	}, duration, function(layer) {
	});
}
