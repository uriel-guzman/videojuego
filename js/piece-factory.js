var PieceFactory = function() {
  return {
    getNewPiece: function() {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          return new TPiece();
          break;
        case 1:
          return new IPiece();
          break;
        case 2:
          return new OPiece();
          break;
      }
    }
  }
}();
