//"use strict";

window.onload = function () {
  var canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 800;
  canvas.id = "canvas";

  document.body.prepend(canvas);
  Painter.setCanvas(canvas);

  var game = new Game(canvas);
  game.start();
  window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);
  document.onkeydown = function (e) {
    game.onkeydown(e.keyCode);
  };
};