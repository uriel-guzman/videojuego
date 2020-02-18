//"use strict";

function onloader1() {
  if (localStorage.getItem("authentication")) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "get",
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${localStorage.getItem(
        "authentication"
      )}`,
      false
    );
    xhr.send();
    if (xhr.status == 200) {
      var data = xhr.responseText;
      var jsonResponse = JSON.parse(data);
      console.log(jsonResponse["email"]);
      document.getElementById(
        "email"
      ).innerHTML = `Bienvenido ${jsonResponse["email"]}`;
    } else {
      window.location.href = "/";
    }
  } else {
    window.location.href = "/";
  }
}

window.onload = function() {
  if (localStorage.getItem("authentication")) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "get",
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${localStorage.getItem(
        "authentication"
      )}`,
      false
    );
    xhr.send();
    if (xhr.status == 200) {
      var data = xhr.responseText;
      var jsonResponse = JSON.parse(data);
      console.log(jsonResponse["email"]);
      document.getElementById(
        "email"
      ).innerHTML = `Bienvenido ${jsonResponse["email"]}`;
    } else {
      return (window.location.href = "/");
    }
  } else {
    return (window.location.href = "/");
  }

  var canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 800;
  canvas.id = "canvas";

  document.body.prepend(canvas);
  Painter.setCanvas(canvas);

  var game = new Game(canvas);
  game.start();
  window.addEventListener(
    "keydown",
    function(e) {
      // space and arrow keys
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    },
    false
  );
  document.onkeydown = function(e) {
    game.onkeydown(e.keyCode);
  };
};
