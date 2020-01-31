function Board() {
  this.boardMatrix = [
    [9,0,0,0,0,0,0,0,0,0,0,9], // This row won't be painted. It's just to spawn pieces in range.
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,0,0,0,0,0,0,0,0,0,0,9],
    [9,9,9,9,9,9,9,9,9,9,9,9],
  ];
}

Board.prototype.setPieceInBoard = function(piece) {
  for (var row = 0; row < piece.shape.length; row++) {
    for (var col = 0; col < piece.shape[0].length; col++) {
      if (piece.shape[row][col] === 1) {
        this.boardMatrix[piece.position.row + row][piece.position.col + col] = piece.shape[row][col];
      }
    }
  }
}

Board.prototype.setEraserInBoard = function(piece) {
  for (var row = 0; row < piece.shape.length; row++) {
    for (var col = 0; col < piece.shape[0].length; col++) {
      if (piece.shape[row][col] === 1) {
        this.boardMatrix[piece.position.row + row][piece.position.col + col] = 0;
      }
    }
  }
}

Board.prototype.isInside = function(piece) {
  for (var row = 0; row < piece.shape.length; row++) {
    for (var col = 0; col < piece.shape[0].length; col++) {
      if (piece.shape[row][col] === 1 && this.boardMatrix[(row + piece.position.row)][(col + piece.position.col)] === 9) {
        return false;
      }
    }
  }
  return true;
};

Board.prototype.checkCollision = function(piece) {
  for (var row = 0; row < piece.shape.length; row++) {
    for (var col = 0; col < piece.shape[0].length; col++) {
      if (piece.shape[row][col] !== 0 && this.boardMatrix[(row + piece.position.row)][(col + piece.position.col)] !== 0) {
        return true;
      }
    }
  }
  return false;
};

Board.prototype.checkLost = function() {
  return this.boardMatrix[0].includes(1);
}

Board.prototype.checkLines = function() {
  var rowsWithLine = [];
  for (var row = 0; row < this.boardMatrix.length - 1; row++) {
    if(!this.boardMatrix[row].includes(0)) {
      rowsWithLine.push(row);
    }
  }
  return rowsWithLine;
}

Board.prototype.clearLines = function(rows) {
  for (var i = 0; i < rows.length; i++) {
    this.boardMatrix.splice(rows[i], 1);
    this.boardMatrix.unshift([9,0,0,0,0,0,0,0,0,0,0,9]);
  }
}

Board.prototype.getGhost = function(piece) {
  if (this.checkCollision(piece)) {
    piece.position.row--;
    return piece;
  } else {
    piece.position.row++;
    return this.getGhost(piece);
  }
}
