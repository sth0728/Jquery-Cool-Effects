var x_cord;
var y_cord;
var count = 0;
var squre_size = 5;
var x_blackhole1 = 300;
var y_blackhole1 = 500;
var x_blackhole2 = 500;
var y_blackhole2 = 200;

$(document).ready(function() {
  $('div.effect_squre').css({'width': squre_size, 'height': squre_size});
});

$(document).mousemove(function(event){
  x_cord = event.clientX - squre_size/2;
  y_cord = event.clientY - squre_size/2;
  create_square_offset(x_cord, y_cord)
});

function create_square_offset(x_cord, y_cord){
  $('body').append("<div class='effect_squre' id='square"+ count + "'></div>");
  $('#square' + count).css({  'left': x_cord, 'top': y_cord, 'width': squre_size, 'height': squre_size});
  move_square('#square'+count, 0, x_cord, y_cord);
  count += 1;
}

function move_square(square_name, t, x_current, y_current){

  var d1 = get_distance(x_current,y_current,x_blackhole1,y_blackhole1);
  var d2 = get_distance(x_current,y_current,x_blackhole2,y_blackhole2);

  if (d1 < d2){
    $(square_name).animate({
      left:x_blackhole1, 
      top:y_blackhole1
      }
    ,"fast", "linear" , function(){$(square_name).remove(); }
    );
  } else {
    $(square_name).animate({
      left:x_blackhole2, 
      top:y_blackhole2
      }
    ,"fast", "linear" , function(){$(square_name).remove();}
    );
  }


}

function get_distance(x_one,y_one,x_two,y_two){
  var x_diff = x_one - x_two;
  var y_diff = y_one - y_two;
  return Math.sqrt(x_diff * x_diff + y_diff * y_diff);
}



