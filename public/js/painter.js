var Painter = function () {
  var canvas = {};
  var ctx = {};
  var cellSize = 25;
  var cellSeparation = 4;
  var pieceSeparation = 8;
  var boardPosition = { col: 0, row: 0 };
  var retainedPiecePosition = { col: 40, row:150 };
  var nextPiecesPosition = { col: 150, row: 660 };
  var lineCounterPosition = { col: 475, row: 150 };
  var retainerTextPosition = { col: 20, row: 280 };
  var nextPiecesTextPosition = { col: 240, row: 615 };
  var levelPosition = { col: 475, row: 200 };
  var textOffset = {
    col: 55,
    row: -20
  }

   var colors = {
    background: "#661039",
    cells: "#974e7a",
    fullCells: "#BD1550",
    ghost: "#4d1c39",
    pieces: "#e29f39",
    eraser: "#ffffff",
    text: "#ECD078"
  }

  function centerBoard() {
    var boardWidth = (cellSize + cellSeparation) * 12;
    boardPosition.col = canvas.width / 2 - boardWidth / 2;
    boardPosition.row = canvas.height / 8;
  }

  function drawPieceByPos(piece, position) {
    ctx.beginPath();
      for (var row = 0; row < piece.shape.length; row++) {
        for (var col = 0; col < piece.shape[0].length; col++) {
          if (piece.shape[row][col] === 1) {
            ctx.fillRect (position.col + ((cellSize + cellSeparation) * col),
                          position.row + ((cellSize + cellSeparation) * row),
                          cellSize,
                          cellSize);
          }
        }
      }
    ctx.closePath();
  }

  return {
    setCanvas: function(canvasElement) {
      canvas = canvasElement;
      ctx = canvas.getContext("2d");
      centerBoard();
    },

    getBoardPosition: function() {
      return boardPosition;
    },

    clearCanvas: function() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    drawBackground: function() {
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    drawBoard : function(board) {
      ctx.beginPath();
      for (var col = 1; col < board.boardMatrix[0].length - 1; col++) {
        for (var row = 1; row < board.boardMatrix.length - 1; row++) {
          ctx.fillStyle = board.boardMatrix[row][col] === 0 ? colors.cells : colors.fullCells;
          ctx.fillRect(boardPosition.col + (cellSize + cellSeparation) * col,
                        boardPosition.row + (cellSize + cellSeparation) * row,
                        cellSize,
                        cellSize);
        }
      }
      ctx.closePath();
    },

    drawPiece : function(piece, ghost) {
      ctx.beginPath();
      if (ghost) ctx.fillStyle = colors.ghost;
      else ctx.fillStyle = colors.pieces;

      for (var row = 0; row < piece.shape.length; row++) {
        for (var col = 0; col < piece.shape[0].length; col++) {
          if (piece.position.row + row > 0) {
            if (piece.shape[row][col] === 1) {
              ctx.fillRect (boardPosition.col + ((cellSize + cellSeparation) * piece.position.col) + ((cellSize + cellSeparation) * col),
                            boardPosition.row + ((cellSize + cellSeparation) * piece.position.row) + ((cellSize + cellSeparation) * row),
                            cellSize,
                            cellSize);
            }
          }
        }
      }
      ctx.closePath();
    },

    drawEraser: function(piece) {
      ctx.beginPath();
      ctx.fillStyle = colors.eraser;

      for (var row = 0; row < piece.shape.length; row++) {
        for (var col = 0; col < piece.shape[0].length; col++) {
          if (piece.position.row + row > 0) {
            if (piece.shape[row][col] === 1) {
              ctx.fillRect (boardPosition.col + ((cellSize + cellSeparation) * piece.position.col) + ((cellSize + cellSeparation) * col),
                            boardPosition.row + ((cellSize + cellSeparation) * piece.position.row) + ((cellSize + cellSeparation) * row),
                            cellSize,
                            cellSize);
            }
          }
        }
      }
      ctx.closePath();
    },

    drawNextPieces: function(nextPieces, pieceQueueLength) {
      ctx.beginPath();

      ctx.fillStyle = colors.text;

      for (var piece = 0; piece < pieceQueueLength; piece++) {
        drawPieceByPos(nextPieces[piece],
          { col: nextPiecesPosition.col + piece * (4 * cellSize + pieceSeparation),
            row: nextPiecesPosition.row });
      }

      ctx.closePath();
    },

    drawTitle: function(text) {
      ctx.fillStyle = colors.text;
      ctx.textBaseline = "top";
      ctx.fillText(text, boardPosition.col + textOffset.col, boardPosition.row + textOffset.row);
    },

    drawLineCounter: function(text) {
      ctx.fillStyle = colors.text;
      ctx.textBaseline = "top";
      ctx.fillText(text, lineCounterPosition.col, lineCounterPosition.row);
    },

    drawLevel: function(text) {
      ctx.fillStyle = colors.text;
      ctx.textBaseline = "top";
      ctx.fillText(text, levelPosition.col, levelPosition.row);
    },

    drawNextPiecesText: function(text) {
      ctx.fillStyle = colors.text;
      ctx.textBaseline = "top";
      ctx.fillText(text, nextPiecesTextPosition.col, nextPiecesTextPosition.row);
    }
  }
}();
