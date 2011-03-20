/* Author: Sam Breed for Quick Left 2011

*/

$(function(){

  window.my_canvas = ql_canvas({
    width: $(window).width(),
    height: $(window).height(),
    style: "float:left; position:fixed; top:0; left:0; z-index:-10;",
    init: function canvasInit(ctx, $canvas, settings) {
      var red, blue, green,

          x = $('#size').val(),
          y = $('#size').val(),

          width = settings.width / x,
          height = settings.height / y,

          x_color = 255 / width,
          y_color = 255 / height;

      for(var i = 0; i < width; i += 1 ){
        for(var j = 0; j < height; j += 1 ){

          red = ~~(255 - x_color * i);
          blue = ~~(255 - y_color * j);
          green = ~~(255 - x_color * (Math.random() * j));

          ctx.fillStyle = 'rgb('+ red +','+ blue +','+ green +')';
          ctx.fillRect( i * x, j * y, x,y);
        }
      }
    }

  });

  my_canvas.init();

  function animate() {
      my_canvas.init();
      my_canvas.timer = setTimeout( animate, $('#timeout').val());
  }

  function draw() {
      var time = new Date().getTime() * 0.002;
      var x = Math.sin( time ) * 256 + ( my_canvas.settings.width / 2) ;
      var y = Math.cos( time * 0.9 ) * 256 + 512;

      my_canvas.ctx.fillStyle = 'rgb(255,0,0)';
      my_canvas.ctx.beginPath();
      my_canvas.ctx.arc( x, y, 10, 0, Math.PI * 2, true );
      my_canvas.ctx.closePath();
      my_canvas.ctx.stroke();
  }

  my_canvas.chain(animate);

  $('#pause').click(function(e){
    e.preventDefault();
    var $this = $(this);

    clearTimeout(my_canvas.timer);

    if( $this.text() == "Stop" ){
      $this.text('Start');
    } else {
      $this.text('Stop');
      my_canvas.chain(animate);
    }
  });

});



















