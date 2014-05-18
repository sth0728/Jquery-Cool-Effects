var canvas_width = $(document).width();
var canvas_height = $(document).height();
var sperm_count = 30;
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
	var moveto_x = pos_x + Math.floor((Math.random() * sperm_move_speed * 2 + 1)) - sperm_move_speed;
	var moveto_y = pos_y + Math.floor((Math.random() * sperm_move_speed * 2 + 1)) - sperm_move_speed;
	var ran_angle = Math.floor((Math.random() * 40 + 1)) - 20;
  var new_angle = 0;
  if (moveto_x<0){
    moveto_x = 0;
    new_angle = ran_angle;
  }
  if (moveto_x>canvas_width){
    moveto_x = canvas_width;
    new_angle = ran_angle;
  }
  if (moveto_y<0){
    moveto_y = 0;
    new_angle = ran_angle;
  }
  if (moveto_y>canvas_width){
    moveto_y = canvas_width;
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
  		MoveSpermOne(index,pos_x,pos_y,angle);
	});
	$('canvas').animateLayer('head'+index, {
  		x: moveto_x,
  		y: moveto_y,
  		rotate: '+='+new_angle
	}, duration, function(layer) {
	});
}
