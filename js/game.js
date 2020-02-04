function Game() {
  this.frameCounter = 0;
  this.framesTick = 40;
  this.pieceQueueLength = 3;
  this.board = undefined;
  this.fallingPiece = undefined;
  this.retainedPiece = undefined;
  this.nextPieces = [];
  this.intervalId = undefined;
  this.linesCleared = 0;
  this.levels = [
    { tick: 20, lvlUpLines: 5 },
    { tick: 15, lvlUpLines: 10 },
    { tick: 15, lvlUpLines: 20 },
    { tick: 10, lvlUpLines: 40 },
    { tick: 10, lvlUpLines: 60 }
  ];
  this.currentLevel = 0;
  this.erasers = 1;
  this.init();
}

Game.prototype.init = function() {
  this.board = new Board();
  this.fallingPiece = undefined;
  this.retainedPiece = undefined;
  this.nextPieces = [];
  this.linesCleared = 0;
  this.currentLevel = 0;
  this.erasers = 1;

  for (var i = 0; i < this.pieceQueueLength; i++) {
    this.nextPieces.push(PieceFactory.getNewPiece());
  }
}

Game.prototype.start = function() {
  this.createNewPiece();

  if (!this.intervalId) {
    this.intervalId = setInterval(function() {

      this.tickUpdate();

      Painter.clearCanvas();
      Painter.drawBackground();
      Painter.drawBoard(this.board);
      Painter.drawPiece(this.board.getGhost(this.fallingPiece.clone()), true);
      if (this.fallingPiece.isEraser) {
        Painter.drawEraser(this.fallingPiece);
      } else {
        Painter.drawPiece(this.fallingPiece, false);
      }
      Painter.drawNextPieces(this.nextPieces, this.pieceQueueLength);
      Painter.drawTitle("Tetris");
      Painter.drawLineCounter("Puntos: " + this.linesCleared);
      Painter.drawLevel("Nivel: " + this.currentLevel);
      Painter.drawRetainerText("");
      Painter.drawNextPiecesText("Siguientes piezas");

    }.bind(this), 32);
  }
}

Game.prototype.stop =  function() {
  clearInterval(this.intervalId);
  this.intervalId = undefined;
}

Game.prototype.restart = function() {
  this.stop();
  this.init();
  this.start();
}

Game.prototype.tickUpdate = function () {
  this.frameCounter++;

  if (this.frameCounter >= this.levels[this.currentLevel].tick) {
    this.frameCounter = 0;

    if (this.fallingPiece.isEraser) {
      this.board.setEraserInBoard(this.fallingPiece);
    }

    if (this.checkCondition("down")) {
      // Puedo ir para abajo, ¿ahora qué?
      this.fallingPiece.down();
    } else {
      // No puedo ir para abajo y no soy borrador
      if (!this.fallingPiece.isEraser) {
        this.board.setPieceInBoard(this.fallingPiece);
        this.checkLost();
      }
      this.createNewPiece();
    }

    // Check lines and clear them
    this.clearLines();
  }
}

Game.prototype.clearLines = function() {
  var lines = this.board.checkLines();
  if (lines.length > 0) {
    this.linesCleared += lines.length;
    this.board.clearLines(lines);
    this.checkLevel()
  }
};

Game.prototype.checkLevel = function() {
  if (this.linesCleared >= this.levels[this.currentLevel].lvlUpLines) {
    if (this.currentLevel < this.levels.length - 1) {
      this.currentLevel++;
      this.erasers = 1;
    }
  }
}

Game.prototype.checkLost = function() {
  if (this.board.checkLost()) {
    this.lose();
  }
}

Game.prototype.lose = function () {
  alert("Perdiste");
  this.restart();
}

Game.prototype.createNewPiece = function() {
  this.fallingPiece = this.nextPieces.shift();
  if (this.nextPieces.length < this.pieceQueueLength) {
    this.nextPieces.push(PieceFactory.getNewPiece());
  }
};

Game.prototype.checkCondition = function(direction) {
  var movedPiece = this.fallingPiece.getPossiblePieceState(direction)
  if (movedPiece.isEraser) {
    return this.board.isInside(movedPiece);
  } else {
    return !this.board.checkCollision(movedPiece);
  }
}

Game.prototype.movePieceDown = function() {
  if (this.checkCondition("down")) {
    this.fallingPiece.down();
  }
};

Game.prototype.movePiece = function(right) {
  if (this.checkCondition(right ? "right": "left")) {
    this.fallingPiece.move(right);
  }
};

Game.prototype.rotatePiece = function() {
  if (this.checkCondition("rotation")) {
    this.fallingPiece.rotate();
  }
}

Game.prototype.dropPiece = function() {
  this.checkLost();

  if (this.fallingPiece.isEraser) {
    while (this.checkCondition("down")) {
      this.board.setEraserInBoard(this.fallingPiece);
      this.fallingPiece.down();
    }
    this.board.setEraserInBoard(this.fallingPiece);
  } else {
    var ghost = this.board.getGhost(this.fallingPiece);
    if (ghost.posicion.row >= 0) {
      this.board.setPieceInBoard(ghost);
    } else {
      this.lose();
    }
  }
  this.clearLines();
  this.createNewPiece();
}

Game.prototype.setEraser = function() {
  if (this.erasers > 0) {
    this.erasers--;
    var eraser = new EraserPiece();
    this.nextPieces.unshift(eraser); // añadir el borrador
  }
}

Game.prototype.onkeydown = function(key) {
  switch(key) {
    case TOP:
      this.rotatePiece();
      break;
    case DOWN:
      this.movePieceDown();
      break;
    case RIGHT:
      this.movePiece(true);
      break;
    case LEFT:
      this.movePiece(false);
      break;
    case SPACE:
      this.dropPiece();
      break;
    case SHIFT:
      this.setEraser();
      break;
  }
}
