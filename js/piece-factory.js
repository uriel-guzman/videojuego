var PieceFactory = function() {
  return {
    getNewPiece: function() {
      switch (Math.floor(Math.random() * 5)) {
        case 0:
          return new TPiece();
          break;
        case 1:
          return new IPiece();
          break;
        case 2:
          return new OPiece();
          break;
        case 3:
          return new LPiece();
          break;
        case 4:
          return new JPiece();
          break;
      }
    }
  }
}();
