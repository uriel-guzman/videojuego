function Piece() {
  this.position = { col: 4, row: 0 };
  this.shape = [[]];
  this.rotationPosition = 0;
  this.isEraser = false;
}

Piece.prototype.resetPosition = function() {
  this.position = { col: 4, row: 0 };
  this.shape = this.rotations[0]
}

Piece.prototype.down = function() {
  this.position.row++;
}

Piece.prototype.move = function(right) {
  right ? this.position.col++ : this.position.col--;
}

Piece.prototype.rotate = function() {
  this.rotationPosition === 3 ? this.rotationPosition = 0 : this.rotationPosition++;
  this.shape = this.rotations[this.rotationPosition];
}

Piece.prototype.getPossiblePieceState = function(state) {
  var potentialPieceState = {
    shape: this.shape,
    isEraser: this.isEraser,
    position: {
      col: this.position.col,
      row: this.position.row
    }
  };

  switch (state) {
    case "down":
    potentialPieceState.position.row = this.position.row + 1;
    break;
    case "right":
    potentialPieceState.position.col = this.position.col + 1;
    break;
    case "left":
    potentialPieceState.position.col = this.position.col - 1;
    break;
    case "rotation":
    var possibleRotation = this.rotationPosition === 3 ? 0 : this.rotationPosition + 1;
    potentialPieceState.shape = this.rotations[possibleRotation];
    break;
  }

  return potentialPieceState;
}

Piece.prototype.clone = function() {
  var pieceClone = JSON.parse(JSON.stringify(this));
  pieceClone.__proto__ = this.__proto__;
  return pieceClone;
}

function TPiece() {
  Piece.call(this)

  this.rotations = [
    [[0,1,0,0],
     [1,1,1,0],
     [0,0,0,0],
     [0,0,0,0]],

    [[0,1,0,0],
     [0,1,1,0],
     [0,1,0,0],
     [0,0,0,0]],

    [[0,0,0,0],
     [1,1,1,0],
     [0,1,0,0],
     [0,0,0,0]],

    [[0,1,0,0],
     [1,1,0,0],
     [0,1,0,0],
     [0,0,0,0]],
  ];

  this.shape = this.rotations[0];
}

TPiece.prototype = Object.create(Piece.prototype);
TPiece.prototype.constructor = Piece;

function IPiece() {
  Piece.call(this)

  this.rotations = [
    [[0,1,0,0],
     [0,1,0,0],
     [0,1,0,0],
     [0,1,0,0]],

    [[0,0,0,0],
     [1,1,1,1],
     [0,0,0,0],
     [0,0,0,0]],

    [[0,1,0,0],
     [0,1,0,0],
     [0,1,0,0],
     [0,1,0,0]],

    [[0,0,0,0],
     [1,1,1,1],
     [0,0,0,0],
     [0,0,0,0]]
  ];

  this.shape = this.rotations[0];
}

IPiece.prototype = Object.create(Piece.prototype);
IPiece.prototype.constructor = Piece;

function OPiece() {
  Piece.call(this)

  this.rotations = [
    [[1,1,0,0],
     [1,1,0,0],
     [0,0,0,0],
     [0,0,0,0]],

    [[1,1,0,0],
     [1,1,0,0],
     [0,0,0,0],
     [0,0,0,0]],

    [[1,1,0,0],
     [1,1,0,0],
     [0,0,0,0],
     [0,0,0,0]],

    [[1,1,0,0],
     [1,1,0,0],
     [0,0,0,0],
     [0,0,0,0]],
  ];

  this.shape = this.rotations[0];
}

OPiece.prototype = Object.create(Piece.prototype);
OPiece.prototype.constructor = Piece;

function EraserPiece() {
  Piece.call(this)

  this.rotations = [
    [[1,1,1,0],
     [1,1,1,0],
     [0,0,0,0],
     [0,0,0,0]],

    [[0,1,1,0],
     [0,1,1,0],
     [0,1,1,0],
     [0,0,0,0]],

    [[0,0,0,0],
     [1,1,1,0],
     [1,1,1,0],
     [0,0,0,0]],

    [[1,1,0,0],
     [1,1,0,0],
     [1,1,0,0],
     [0,0,0,0]],
  ];

  this.shape = this.rotations[0];
  this.isEraser = true;
}

EraserPiece.prototype = Object.create(Piece.prototype);
EraserPiece.prototype.constructor = Piece;
