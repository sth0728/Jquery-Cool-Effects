var x_cord;
var y_cord;
var count = 0;
var squre_size = 50;

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
  move_square('#square'+count);
  count += 1;
}

function move_square(square_name){

}