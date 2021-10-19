// Color Presets
let whiteGridColor = "#a0a0a0";
let blackGridColor = "#454545";
let validMovementColor = "#228422";
let killMovementColor = "#842222";

// Class Declaration for Cell
class Cell {
  // Position in Grid,  {0,0} corresponding to top left corner
  position = { x: -1, y: -1 };
  // 0 - unoccupied, 1 - occupied by Player 1, 2 - occupied by Player 2
  isOccupied = 0;
  // Index into the Pieces array of GameBoard
  occupiedBy;

  constructor(x, y) {
    this.position.x = x;
    this.position.y = y;
    if (x % 2 == 0) {
      if (y % 2 == 0) {
        this.backColor = whiteGridColor;
      } else {
        this.backColor = blackGridColor;
      }
    } else {
      if (y % 2 == 0) {
        this.backColor = blackGridColor;
      } else {
        this.backColor = whiteGridColor;
      }
    }
    this.div = document.createElement("div");
    this.div.className = "cell";
    this.div.setAttribute("row", this.position.x);
    this.div.setAttribute("column", this.position.y);
    this.div.addEventListener("click", selectCell);
    this.div.style.backgroundColor = this.backColor;
  } // constructor()
} // class Cell

// Class Declaration for Row
// Used for easier styling and indexing
class Row {
  constructor(i) {
    this.cells = [];
    for (let j = 0; j < 8; j++) {
      this.cells.push(new Cell(j, i));
    }
    this.div = document.createElement("div");
    this.div.className = "gridRow";
    for (let j = 0; j < this.cells.length; j++) {
      this.div.appendChild(this.cells[j].div);
    }
  } // constructor()
} // class Row

// Class Declaration for Piece
class Piece {
  pieceType = "";
  owner = 0;
  position = { x: -1, y: -1 };
  onBoard = false;
  possibleMoves = [];
} // class Piece

// Class Declaration for Piece Types
// KING
class King extends Piece {
  constructor(x, y, playerID, elementID) {
    super();
    this.pieceType = "King";
    this.owner = playerID;
    this.position.x = x;
    this.position.y = y;
    this.onBoard = true;
    this.token = document.querySelector(elementID);
  } // constructor()

  // generates an array of positions in the grid that the piece could move to if no other pieces were present.
  generatePossibleMoves() {
    this.possibleMoves.splice(0, this.possibleMoves.length);

    if (this.position.x > 0) {
      this.possibleMoves.push({
        x: this.position.x - 1,
        y: this.position.y,
      });
      if (this.position.y > 0) {
        this.possibleMoves.push({
          x: this.position.x - 1,
          y: this.position.y - 1,
        });
        this.possibleMoves.push({
          x: this.position.x,
          y: this.position.y - 1,
        });
      }
      if (this.position.y < 7) {
        this.possibleMoves.push({
          x: this.position.x - 1,
          y: this.position.y + 1,
        });
        this.possibleMoves.push({
          x: this.position.x,
          y: this.position.y + 1,
        });
      }
    }
    if (this.position.x < 7) {
      this.possibleMoves.push({
        x: this.position.x + 1,
        y: this.position.y,
      });
      if (this.position.y > 0) {
        this.possibleMoves.push({
          x: this.position.x + 1,
          y: this.position.y - 1,
        });
      }
      if (this.position.y < 7) {
        this.possibleMoves.push({
          x: this.position.x + 1,
          y: this.position.y + 1,
        });
      }
    }
  } // generatePossibleMoves()
} // class King

// QUEEN
class Queen extends Piece {
  constructor(x, y, playerID, elementID) {
    super();
    this.pieceType = "Queen";
    this.owner = playerID;
    this.position.x = x;
    this.position.y = y;
    this.onBoard = true;
    this.token = document.querySelector(elementID);
  } // constructor()

  // generates an array of positions in the grid that the piece could move to if no other pieces were present.
  generatePossibleMoves() {
    this.possibleMoves.splice(0, this.possibleMoves.length);

    for (let i = this.position.x; i >= 0; i--) {
      this.possibleMoves.push({
        x: i,
        y: this.position.y,
      });
    }
    for (let i = this.position.x; i <= 7; i++) {
      this.possibleMoves.push({
        x: i,
        y: this.position.y,
      });
    }
    for (let i = this.position.y; i >= 0; i--) {
      this.possibleMoves.push({
        x: this.position.x,
        y: i,
      });
    }
    for (let i = this.position.y; i <= 7; i++) {
      this.possibleMoves.push({
        x: this.position.x,
        y: i,
      });
    }
    for (let i = 1; i <= 7; i++) {
      if (this.position.x - i > -1 && this.position.y - i > -1) {
        this.possibleMoves.push({
          x: this.position.x - i,
          y: this.position.y - i,
        });
      }
      if (this.position.x + i < 8 && this.position.y - i > -1) {
        this.possibleMoves.push({
          x: this.position.x + i,
          y: this.position.y - i,
        });
      }
      if (this.position.x + i < 8 && this.position.y + i < 8) {
        this.possibleMoves.push({
          x: this.position.x + i,
          y: this.position.y + i,
        });
      }
      if (this.position.x - i > -1 && this.position.y + i < 8) {
        this.possibleMoves.push({
          x: this.position.x - i,
          y: this.position.y + i,
        });
      }
    }
  } // generatePossibleMove()
} // class Queen

// BISHOP
class Bishop extends Piece {
  constructor(x, y, playerID, elementID) {
    super();
    this.pieceType = "Bishop";
    this.owner = playerID;
    this.position.x = x;
    this.position.y = y;
    this.onBoard = true;
    this.token = document.querySelector(elementID);
  } // constructor()

  // generates an array of positions in the grid that the piece could move to if no other pieces were present.
  generatePossibleMoves() {
    this.possibleMoves.splice(0, this.possibleMoves.length);

    for (let i = 1; i <= 7; i++) {
      if (this.position.x - i > -1 && this.position.y - i > -1) {
        this.possibleMoves.push({
          x: this.position.x - i,
          y: this.position.y - i,
        });
      }
      if (this.position.x + i < 8 && this.position.y - i > -1) {
        this.possibleMoves.push({
          x: this.position.x + i,
          y: this.position.y - i,
        });
      }
      if (this.position.x + i < 8 && this.position.y + i < 8) {
        this.possibleMoves.push({
          x: this.position.x + i,
          y: this.position.y + i,
        });
      }
      if (this.position.x - i > -1 && this.position.y + i < 8) {
        this.possibleMoves.push({
          x: this.position.x - i,
          y: this.position.y + i,
        });
      }
    }
  } // generatePossibleMove()
} // class Bishop

// KNIGHT
class Knight extends Piece {
  constructor(x, y, playerID, elementID) {
    super();
    this.pieceType = "Knight";
    this.owner = playerID;
    this.position.x = x;
    this.position.y = y;
    this.onBoard = true;
    this.token = document.querySelector(elementID);
  } // constructor()

  // generates an array of positions in the grid that the piece could move to if no other pieces were present.
  generatePossibleMoves() {
    this.possibleMoves.splice(0, this.possibleMoves.length);

    if (this.position.x > 1) {
      if (this.position.y > 0) {
        this.possibleMoves.push({
          x: this.position.x - 2,
          y: this.position.y - 1,
        });
      }
      if (this.position.y < 7) {
        this.possibleMoves.push({
          x: this.position.x - 2,
          y: this.position.y + 1,
        });
      }
    }
    if (this.position.x < 6) {
      if (this.position.y > 0) {
        this.possibleMoves.push({
          x: this.position.x + 2,
          y: this.position.y - 1,
        });
      }
      if (this.position.y < 7) {
        this.possibleMoves.push({
          x: this.position.x + 2,
          y: this.position.y + 1,
        });
      }
    }
    if (this.position.y > 1) {
      if (this.position.x > 0) {
        this.possibleMoves.push({
          x: this.position.x - 1,
          y: this.position.y - 2,
        });
      }
      if (this.position.x < 7) {
        this.possibleMoves.push({
          x: this.position.x + 1,
          y: this.position.y - 2,
        });
      }
    }
    if (this.position.y < 6) {
      if (this.position.x > 0) {
        this.possibleMoves.push({
          x: this.position.x - 1,
          y: this.position.y + 2,
        });
      }
      if (this.position.x < 7) {
        this.possibleMoves.push({
          x: this.position.x + 1,
          y: this.position.y + 2,
        });
      }
    }
  } // generatePossibleMove()
} // class Knight

// ROOK
class Rook extends Piece {
  constructor(x, y, playerID, elementID) {
    super();
    this.pieceType = "Rook";
    this.owner = playerID;
    this.position.x = x;
    this.position.y = y;
    this.onBoard = true;
    this.token = document.querySelector(elementID);
  } // constructor()

  // generates an array of positions in the grid that the piece could move to if no other pieces were present.
  generatePossibleMoves() {
    this.possibleMoves.splice(0, this.possibleMoves.length);

    for (let i = this.position.x; i >= 0; i--) {
      this.possibleMoves.push({
        x: i,
        y: this.position.y,
      });
    }
    for (let i = this.position.x; i <= 7; i++) {
      this.possibleMoves.push({
        x: i,
        y: this.position.y,
      });
    }
    for (let i = this.position.y; i >= 0; i--) {
      this.possibleMoves.push({
        x: this.position.x,
        y: i,
      });
    }
    for (let i = this.position.y; i <= 7; i++) {
      this.possibleMoves.push({
        x: this.position.x,
        y: i,
      });
    }
  } // generatePossibleMove()
} // class Rook

// PAWN
class Pawn extends Piece {
  constructor(x, y, playerID, elementID) {
    super();
    this.pieceType = "Pawn";
    this.owner = playerID;
    this.position.x = x;
    this.position.y = y;
    this.onBoard = true;
    this.hasMoved = false;
    this.token = document.querySelector(elementID);
  } // constructor()

  // generates an array of positions in the grid that the piece could move to if no other pieces were present.
  generatePossibleMoves() {
    this.possibleMoves.splice(0, this.possibleMoves.length);

    if (this.owner == 1) {
      if (this.hasMoved == false) {
        this.possibleMoves.push({
          x: this.position.x,
          y: this.position.y - 2,
        });
      }
      this.possibleMoves.push({
        x: this.position.x,
        y: this.position.y - 1,
      });
    } else if (this.owner == 2) {
      if (this.hasMoved == false) {
        this.possibleMoves.push({
          x: this.position.x,
          y: this.position.y + 2,
        });
      }
      this.possibleMoves.push({
        x: this.position.x,
        y: this.position.y + 1,
      });
    }
  } // generatePossibleMove()
} // class Pawn

// Class Declaration for Board
class GameBoard {
  gridRows = [];
  p1Pieces = [];
  p2Pieces = [];

  constructor() {
    // Generate Grid
    for (let i = 0; i < 8; i++) {
      this.gridRows.push(new Row(i));
    }

    this.div = document.createElement("div");
    this.div.className = "grid";

    for (let i = 0; i < this.gridRows.length; i++) {
      this.div.appendChild(this.gridRows[i].div);
    }
    // Generate Piece Lists and Feed Data to Cells
    // Kings
    this.p1Pieces.push(new King(4, 7, 1, "#p1King"));
    this.gridRows[4].cells[7].isOccupied = 1;
    this.gridRows[4].cells[7].occupiedBy = 0;
    this.p2Pieces.push(new King(4, 0, 2, "#p2King"));
    this.gridRows[4].cells[0].isOccupied = 2;
    this.gridRows[4].cells[0].occupiedBy = 0;
    // Queens
    this.p1Pieces.push(new Queen(3, 7, 1, "#p1Queen"));
    this.gridRows[3].cells[7].isOccupied = 1;
    this.gridRows[3].cells[7].occupiedBy = 1;
    this.p2Pieces.push(new Queen(3, 0, 2, "#p2Queen"));
    this.gridRows[3].cells[0].isOccupied = 2;
    this.gridRows[3].cells[0].occupiedBy = 1;
    // Bishops
    this.p1Pieces.push(new Bishop(2, 7, 1, "#p1Bishop1"));
    this.gridRows[2].cells[7].isOccupied = 1;
    this.gridRows[2].cells[7].occupiedBy = 2;
    this.p1Pieces.push(new Bishop(5, 7, 1, "#p1Bishop2"));
    this.gridRows[5].cells[7].isOccupied = 1;
    this.gridRows[5].cells[7].occupiedBy = 3;
    this.p2Pieces.push(new Bishop(2, 0, 2, "#p2Bishop1"));
    this.gridRows[2].cells[0].isOccupied = 2;
    this.gridRows[2].cells[0].occupiedBy = 2;
    this.p2Pieces.push(new Bishop(5, 0, 2, "#p2Bishop2"));
    this.gridRows[5].cells[0].isOccupied = 2;
    this.gridRows[5].cells[0].occupiedBy = 3;
    // Knights
    this.p1Pieces.push(new Knight(1, 7, 1, "#p1Knight1"));
    this.gridRows[1].cells[7].isOccupied = 1;
    this.gridRows[1].cells[7].occupiedBy = 4;
    this.p1Pieces.push(new Knight(6, 7, 1, "#p1Knight2"));
    this.gridRows[6].cells[7].isOccupied = 1;
    this.gridRows[6].cells[7].occupiedBy = 5;
    this.p2Pieces.push(new Knight(1, 0, 2, "#p2Knight1"));
    this.gridRows[1].cells[0].isOccupied = 2;
    this.gridRows[1].cells[0].occupiedBy = 4;
    this.p2Pieces.push(new Knight(6, 0, 2, "#p2Knight2"));
    this.gridRows[6].cells[0].isOccupied = 2;
    this.gridRows[6].cells[0].occupiedBy = 5;
    // Rooks
    this.p1Pieces.push(new Rook(0, 7, 1, "#p1Rook1"));
    this.gridRows[0].cells[7].isOccupied = 1;
    this.gridRows[0].cells[7].occupiedBy = 6;
    this.p1Pieces.push(new Rook(7, 7, 1, "#p1Rook2"));
    this.gridRows[7].cells[7].isOccupied = 1;
    this.gridRows[7].cells[7].occupiedBy = 7;
    this.p2Pieces.push(new Rook(0, 0, 2, "#p2Rook1"));
    this.gridRows[0].cells[0].isOccupied = 2;
    this.gridRows[0].cells[0].occupiedBy = 6;
    this.p2Pieces.push(new Rook(7, 0, 2, "#p2Rook2"));
    this.gridRows[7].cells[0].isOccupied = 2;
    this.gridRows[7].cells[0].occupiedBy = 7;
    // Pawns
    for (let i = 0; i < 8; i++) {
      this.p1Pieces.push(new Pawn(i, 6, 1, "#p1Pawn" + (i + 1)));
      this.gridRows[i].cells[6].isOccupied = 1;
      this.gridRows[i].cells[6].occupiedBy = 8 + i;
      this.p2Pieces.push(new Pawn(i, 1, 2, "#p2Pawn" + (i + 1)));
      this.gridRows[i].cells[1].isOccupied = 2;
      this.gridRows[i].cells[1].occupiedBy = 8 + i;
    }
  } // constructor()

  // Generates an Array of Possible Moves of format {x:,y:}
  // for selected piece
  generatePossibleMoves(pieceOwner, pieceIndex) {
    let currentPiece;

    if (pieceOwner == 1) {
      currentPiece = this.p1Pieces[pieceIndex];
    } else if (pieceOwner == 2) {
      currentPiece = this.p2Pieces[pieceIndex];
    }

    // generate array of movement options
    // King
    if (currentPiece.pieceType == "King") {
      // generate array of board positions piece can move to
      currentPiece.generatePossibleMoves();
      console.log(currentPiece.possibleMoves);

      // iterate through array
      for (let i = currentPiece.possibleMoves.length - 1; i > -1; i--) {
        let targetX = currentPiece.possibleMoves[i].x;
        let targetY = currentPiece.possibleMoves[i].y;
        // if position is empty, valid move
        if (this.gridRows[targetX].cells[targetY].isOccupied == 0) {
          console.log("Found Valid Move");
        } // if position contains ally, invalid move
        else if (
          this.gridRows[targetX].cells[targetY].isOccupied == pieceOwner
        ) {
          console.log("Found Ally Piece");
          currentPiece.possibleMoves.splice(i, 1);
          console.log(currentPiece.possibleMoves);
        } // if position contains enemy, kill move
        else {
          console.log("Found Enemy Piece");
          currentPiece.possibleMoves[i].killMove = true;
        }
      }
      console.log(currentPiece.possibleMoves);
    } // Knight
    else if (currentPiece.pieceType == "Knight") {
      // generate array of board positions piece can move to
      currentPiece.generatePossibleMoves();
      console.log(currentPiece.possibleMoves);

      // iterate through array
      for (let i = currentPiece.possibleMoves.length - 1; i > -1; i--) {
        let targetX = currentPiece.possibleMoves[i].x;
        let targetY = currentPiece.possibleMoves[i].y;
        // if position is empty, valid move
        if (this.gridRows[targetX].cells[targetY].isOccupied == 0) {
          console.log("Found Valid Move");
        } // if position contains ally, invalid move
        else if (
          this.gridRows[targetX].cells[targetY].isOccupied == pieceOwner
        ) {
          console.log("Found Ally Piece");
          currentPiece.possibleMoves.splice(i, 1);
          console.log(currentPiece.possibleMoves);
        } // if position contains enemy, kill move
        else {
          console.log("Found Enemy Piece");
          currentPiece.possibleMoves[i].killMove = true;
        }
      }
    } // Pawn
    else if (currentPiece.pieceType == "Pawn") {
      // empty possibleMoves array of currentPiece
      currentPiece.possibleMoves.splice(0, currentPiece.possibleMoves.length);
      console.log("Empty Pawn Move Array");
      // populate possibleMoves with basic pawn moves
      console.log(currentPiece.owner);
      console.log(
        this.gridRows[currentPiece.position.x].cells[
          currentPiece.position.y - 1
        ].isOccupied
      );
      if (
        currentPiece.owner == 1 &&
        this.gridRows[currentPiece.position.x].cells[
          currentPiece.position.y - 1
        ].isOccupied == 0
      ) {
        if (
          currentPiece.hasMoved == false &&
          this.gridRows[currentPiece.position.x].cells[
            currentPiece.position.y - 2
          ].isOccupied == 0
        ) {
          currentPiece.possibleMoves.push({
            x: currentPiece.position.x,
            y: currentPiece.position.y - 2,
          });
        }
        currentPiece.possibleMoves.push({
          x: currentPiece.position.x,
          y: currentPiece.position.y - 1,
        });
      } else if (
        currentPiece.owner == 2 &&
        this.gridRows[currentPiece.position.x].cells[
          currentPiece.position.y + 1
        ].isOccupied == 0
      ) {
        if (
          currentPiece.hasMoved == false &&
          this.gridRows[currentPiece.position.x].cells[
            currentPiece.position.y + 2
          ].isOccupied == 0
        ) {
          currentPiece.possibleMoves.push({
            x: currentPiece.position.x,
            y: currentPiece.position.y + 2,
          });
        }
        currentPiece.possibleMoves.push({
          x: currentPiece.position.x,
          y: currentPiece.position.y + 1,
        });
      }
      // populate possibleMoves with pawn kill moves
      if (currentPiece.owner == 1) {
        if (
          currentPiece.position.x - 1 > -1 &&
          this.gridRows[currentPiece.position.x - 1].cells[
            currentPiece.position.y - 1
          ].isOccupied == 2
        ) {
          currentPiece.possibleMoves.push({
            x: currentPiece.position.x - 1,
            y: currentPiece.position.y - 1,
            killMove: true,
          });
        }
        if (
          currentPiece.position.x + 1 < 8 &&
          this.gridRows[currentPiece.position.x + 1].cells[
            currentPiece.position.y - 1
          ].isOccupied == 2
        ) {
          currentPiece.possibleMoves.push({
            x: currentPiece.position.x + 1,
            y: currentPiece.position.y - 1,
            killMove: true,
          });
        }
      } else if (currentPiece.owner == 2) {
        if (
          currentPiece.position.x - 1 > -1 &&
          this.gridRows[currentPiece.position.x - 1].cells[
            currentPiece.position.y + 1
          ].isOccupied == 1
        ) {
          currentPiece.possibleMoves.push({
            x: currentPiece.position.x - 1,
            y: currentPiece.position.y + 1,
            killMove: true,
          });
        }
        if (
          currentPiece.position.x + 1 < 8 &&
          this.gridRows[currentPiece.position.x + 1].cells[
            currentPiece.position.y + 1
          ].isOccupied == 1
        ) {
          currentPiece.possibleMoves.push({
            x: currentPiece.position.x + 1,
            y: currentPiece.position.y + 1,
            killMove: true,
          });
        }
      }
    } // Rook
    else if (currentPiece.pieceType == "Rook") {
      // empty possibleMoves array of current piece
      currentPiece.possibleMoves.splice(0, currentPiece.possibleMoves.length);
      console.log("Empty Rook Move Array");
      // generate possible moves in each direction until occupied cell found
      for (let i = currentPiece.position.x - 1; i > -1; i--) {
        // if empty cell, is valid move
        console.log("Check West");
        if (this.gridRows[i].cells[currentPiece.position.y].isOccupied == 0) {
          console.log("Found Valid Move");
          currentPiece.possibleMoves.push({ x: i, y: currentPiece.position.y });
        } // if occupied by ally, is not valid move
        // path blocked, exit for loop
        else if (
          this.gridRows[i].cells[currentPiece.position.y].isOccupied ==
          currentPlayer
        ) {
          console.log("Found Ally Piece");
          break;
        } // if occupied by enemy, is kill move
        // path blocked, exit for loop
        else {
          console.log("Found Enemy Piece");
          currentPiece.possibleMoves.push({
            x: i,
            y: currentPiece.position.y,
            killMove: true,
          });
          break;
        }
      }
      for (let i = currentPiece.position.x + 1; i < 8; i++) {
        console.log("Check East");
        // if empty cell, is valid move
        if (this.gridRows[i].cells[currentPiece.position.y].isOccupied == 0) {
          console.log("Found Valid Move");
          currentPiece.possibleMoves.push({ x: i, y: currentPiece.position.y });
        } // if occupied by ally, is not valid move
        // exit for loop
        else if (
          this.gridRows[i].cells[currentPiece.position.y].isOccupied ==
          currentPlayer
        ) {
          console.log("Found Ally Piece");
          break;
        } // if occupied by enemy, is kill move
        // exit for loop
        else {
          console.log("Found Enemy Piece");
          currentPiece.possibleMoves.push({
            x: i,
            y: currentPiece.position.y,
            killMove: true,
          });
          break;
        }
      }
      for (let i = currentPiece.position.y - 1; i > -1; i--) {
        console.log("Check North");
        // if empty cell, is valid move
        if (this.gridRows[currentPiece.position.x].cells[i].isOccupied == 0) {
          console.log("Found Valid Move");
          currentPiece.possibleMoves.push({ x: currentPiece.position.x, y: i });
        } // if occupied by ally, is not valid move
        // exit for loop
        else if (
          this.gridRows[currentPiece.position.x].cells[i].isOccupied ==
          currentPlayer
        ) {
          console.log("Found Ally Piece");
          break;
        } // if occupied by enemy, is kill move
        // exit for loop
        else {
          console.log("Found Enemy Piece");
          currentPiece.possibleMoves.push({
            x: currentPiece.position.x,
            y: i,
            killMove: true,
          });
          break;
        }
      }
      for (let i = currentPiece.position.y + 1; i < 8; i++) {
        console.log("Check South");
        // if empty cell, is valid move
        if (this.gridRows[currentPiece.position.x].cells[i].isOccupied == 0) {
          console.log("Found Valid Move");
          currentPiece.possibleMoves.push({ x: currentPiece.position.x, y: i });
        } // if occupied by ally, is not valid move
        // exit for loop
        else if (
          this.gridRows[currentPiece.position.x].cells[i].isOccupied ==
          currentPlayer
        ) {
          console.log("Found Ally Piece");
          break;
        } // if occupied by enemy, is kill move
        // exit for loop
        else {
          console.log("Found Enemy Piece");
          currentPiece.possibleMoves.push({
            x: currentPiece.position.x,
            y: i,
            killMove: true,
          });
          break;
        }
      }
    } // Bishop
    else if (currentPiece.pieceType == "Bishop") {
      // empty array
      currentPiece.possibleMoves.splice(0, currentPiece.possibleMoves.length);
      console.log("Empty Bishop Move Array");
      // generate moves along each diagonal until occupied cell found
      for (let i = 1; i < 8; i++) {
        // target cell is in grid
        console.log("Check NW");
        if (
          currentPiece.position.x - i > -1 &&
          currentPiece.position.y - i > -1
        ) {
          // target cell is empty, valid move
          if (
            this.gridRows[currentPiece.position.x - i].cells[
              currentPiece.position.y - i
            ].isOccupied == 0
          ) {
            console.log("Found Valid Move");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x - i,
              y: currentPiece.position.y - i,
            });
          } // target cell contains ally, invalid move
          // path blocked, exit for loop
          else if (
            this.gridRows[currentPiece.position.x - i].cells[
              currentPiece.position.y - i
            ].isOccupied == currentPlayer
          ) {
            console.log("Found Ally Piece");
            break;
          } // target cell contains enemy, kill move
          // path blocked, exit for loop
          else {
            console.log("Found Enemy Piece");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x - i,
              y: currentPiece.position.y - i,
              killMove: true,
            });
            break;
          }
        } // reached end of board, exit for loop
        else {
          break;
        }
      }
      for (let i = 1; i < 8; i++) {
        console.log("Check NE");
        // target cell is in grid
        if (
          currentPiece.position.x + i < 8 &&
          currentPiece.position.y - i > -1
        ) {
          // target cell is empty, valid move
          if (
            this.gridRows[currentPiece.position.x + i].cells[
              currentPiece.position.y - i
            ].isOccupied == 0
          ) {
            console.log("Found Valid Move");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x + i,
              y: currentPiece.position.y - i,
            });
          } // target cell contains ally, invalid move
          // path blocked, exit for loop
          else if (
            this.gridRows[currentPiece.position.x + i].cells[
              currentPiece.position.y - i
            ].isOccupied == currentPlayer
          ) {
            console.log("Found Ally Piece");
            break;
          } // target cell contains enemy, kill move
          // path blocked, exit for loop
          else {
            console.log("Found Enemy Piece");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x + i,
              y: currentPiece.position.y - i,
              killMove: true,
            });
            break;
          }
        } // reached end of board, exit for loop
        else {
          break;
        }
      }
      for (let i = 1; i < 8; i++) {
        console.log("Check SE");
        // target cell is in grid
        if (
          currentPiece.position.x + i < 8 &&
          currentPiece.position.y + i < 8
        ) {
          // target cell is empty, valid move
          if (
            this.gridRows[currentPiece.position.x + i].cells[
              currentPiece.position.y + i
            ].isOccupied == 0
          ) {
            console.log("Found Valid Move");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x + i,
              y: currentPiece.position.y + i,
            });
          } // target cell contains ally, invalid move
          // path blocked, exit for loop
          else if (
            this.gridRows[currentPiece.position.x + i].cells[
              currentPiece.position.y + i
            ].isOccupied == currentPlayer
          ) {
            console.log("Found Ally Piece");
            break;
          } // target cell contains enemy, kill move
          // path blocked, exit for loop
          else {
            console.log("Found Enemy Piece");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x + i,
              y: currentPiece.position.y + i,
              killMove: true,
            });
            break;
          }
        } // reached end of board, exit for loop
        else {
          break;
        }
      }
      for (let i = 1; i < 8; i++) {
        console.log("Check SW");
        // target cell is in grid
        if (
          currentPiece.position.x - i > -1 &&
          currentPiece.position.y + i < 8
        ) {
          // target cell is empty, valid move
          if (
            this.gridRows[currentPiece.position.x - i].cells[
              currentPiece.position.y + i
            ].isOccupied == 0
          ) {
            console.log("Found Valid Move");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x - i,
              y: currentPiece.position.y + i,
            });
          } // target cell contains ally, invalid move
          // path blocked, exit for loop
          else if (
            this.gridRows[currentPiece.position.x - i].cells[
              currentPiece.position.y + i
            ].isOccupied == currentPlayer
          ) {
            console.log("Found Ally Piece");
            break;
          } // target cell contains enemy, kill move
          // path blocked, exit for loop
          else {
            console.log("Found Enemy Piece");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x - i,
              y: currentPiece.position.y + i,
              killMove: true,
            });
            break;
          }
        } // reached end of board, exit for loop
        else {
          break;
        }
      }
    } // Queen
    else if (currentPiece.pieceType == "Queen") {
      // empty possibleMoves array of current piece
      currentPiece.possibleMoves.splice(0, currentPiece.possibleMoves.length);
      console.log("Empty Queen Move Array");
      // generate possible moves in each direction until occupied cell found
      for (let i = currentPiece.position.x - 1; i > -1; i--) {
        // if empty cell, is valid move
        console.log("Check West");
        if (this.gridRows[i].cells[currentPiece.position.y].isOccupied == 0) {
          console.log("Found Valid Move");
          currentPiece.possibleMoves.push({ x: i, y: currentPiece.position.y });
        } // if occupied by ally, is not valid move
        // path blocked, exit for loop
        else if (
          this.gridRows[i].cells[currentPiece.position.y].isOccupied ==
          currentPlayer
        ) {
          console.log("Found Ally Piece");
          break;
        } // if occupied by enemy, is kill move
        // path blocked, exit for loop
        else {
          console.log("Found Enemy Piece");
          currentPiece.possibleMoves.push({
            x: i,
            y: currentPiece.position.y,
            killMove: true,
          });
          break;
        }
      }
      for (let i = currentPiece.position.x + 1; i < 8; i++) {
        console.log("Check East");
        // if empty cell, is valid move
        if (this.gridRows[i].cells[currentPiece.position.y].isOccupied == 0) {
          console.log("Found Valid Move");
          currentPiece.possibleMoves.push({ x: i, y: currentPiece.position.y });
        } // if occupied by ally, is not valid move
        // exit for loop
        else if (
          this.gridRows[i].cells[currentPiece.position.y].isOccupied ==
          currentPlayer
        ) {
          console.log("Found Ally Piece");
          break;
        } // if occupied by enemy, is kill move
        // exit for loop
        else {
          console.log("Found Enemy Piece");
          currentPiece.possibleMoves.push({
            x: i,
            y: currentPiece.position.y,
            killMove: true,
          });
          break;
        }
      }
      for (let i = currentPiece.position.y - 1; i > -1; i--) {
        console.log("Check North");
        // if empty cell, is valid move
        if (this.gridRows[currentPiece.position.x].cells[i].isOccupied == 0) {
          console.log("Found Valid Move");
          currentPiece.possibleMoves.push({ x: currentPiece.position.x, y: i });
        } // if occupied by ally, is not valid move
        // exit for loop
        else if (
          this.gridRows[currentPiece.position.x].cells[i].isOccupied ==
          currentPlayer
        ) {
          console.log("Found Ally Piece");
          break;
        } // if occupied by enemy, is kill move
        // exit for loop
        else {
          console.log("Found Enemy Piece");
          currentPiece.possibleMoves.push({
            x: currentPiece.position.x,
            y: i,
            killMove: true,
          });
          break;
        }
      }
      for (let i = currentPiece.position.y + 1; i < 8; i++) {
        console.log("Check South");
        // if empty cell, is valid move
        if (this.gridRows[currentPiece.position.x].cells[i].isOccupied == 0) {
          console.log("Found Valid Move");
          currentPiece.possibleMoves.push({ x: currentPiece.position.x, y: i });
        } // if occupied by ally, is not valid move
        // exit for loop
        else if (
          this.gridRows[currentPiece.position.x].cells[i].isOccupied ==
          currentPlayer
        ) {
          console.log("Found Ally Piece");
          break;
        } // if occupied by enemy, is kill move
        // exit for loop
        else {
          console.log("Found Enemy Piece");
          currentPiece.possibleMoves.push({
            x: currentPiece.position.x,
            y: i,
            killMove: true,
          });
          break;
        }
      }
      // generate moves along each diagonal until occupied cell found
      for (let i = 1; i < 8; i++) {
        // target cell is in grid
        if (
          currentPiece.position.x - i > -1 &&
          currentPiece.position.y - i > -1
        ) {
          console.log("Check NW");
          // target cell is empty, valid move
          if (
            this.gridRows[currentPiece.position.x - i].cells[
              currentPiece.position.y - i
            ].isOccupied == 0
          ) {
            console.log("Found Valid Move");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x - i,
              y: currentPiece.position.y - i,
            });
          } // target cell contains ally, invalid move
          // path blocked, exit for loop
          else if (
            this.gridRows[currentPiece.position.x - i].cells[
              currentPiece.position.y - i
            ].isOccupied == currentPlayer
          ) {
            console.log("Found Ally Piece");
            break;
          } // target cell contains enemy, kill move
          // path blocked, exit for loop
          else {
            console.log("Found Enemy Piece");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x - i,
              y: currentPiece.position.y - i,
              killMove: true,
            });
            break;
          }
        } // reached end of board, exit for loop
        else {
          break;
        }
      }
      for (let i = 1; i < 8; i++) {
        console.log("Check NE");
        // target cell is in grid
        if (
          currentPiece.position.x + i < 8 &&
          currentPiece.position.y - i > -1
        ) {
          // target cell is empty, valid move
          if (
            this.gridRows[currentPiece.position.x + i].cells[
              currentPiece.position.y - i
            ].isOccupied == 0
          ) {
            console.log("Found Valid Move");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x + i,
              y: currentPiece.position.y - i,
            });
          } // target cell contains ally, invalid move
          // path blocked, exit for loop
          else if (
            this.gridRows[currentPiece.position.x + i].cells[
              currentPiece.position.y - i
            ].isOccupied == currentPlayer
          ) {
            console.log("Found Ally Piece");
            break;
          } // target cell contains enemy, kill move
          // path blocked, exit for loop
          else {
            console.log("Found Enemy Piece");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x + i,
              y: currentPiece.position.y - i,
              killMove: true,
            });
            break;
          }
        } // reached end of board, exit for loop
        else {
          break;
        }
      }
      for (let i = 1; i < 8; i++) {
        console.log("Check SE");
        // target cell is in grid
        if (
          currentPiece.position.x + i < 8 &&
          currentPiece.position.y + i < 8
        ) {
          // target cell is empty, valid move
          if (
            this.gridRows[currentPiece.position.x + i].cells[
              currentPiece.position.y + i
            ].isOccupied == 0
          ) {
            console.log("Found Valid Move");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x + i,
              y: currentPiece.position.y + i,
            });
          } // target cell contains ally, invalid move
          // path blocked, exit for loop
          else if (
            this.gridRows[currentPiece.position.x + i].cells[
              currentPiece.position.y + i
            ].isOccupied == currentPlayer
          ) {
            console.log("Found Ally Piece");
            break;
          } // target cell contains enemy, kill move
          // path blocked, exit for loop
          else {
            console.log("Found Enemy Piece");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x + i,
              y: currentPiece.position.y + i,
              killMove: true,
            });
            break;
          }
        } // reached end of board, exit for loop
        else {
          break;
        }
      }
      for (let i = 1; i < 8; i++) {
        console.log("Check SW");
        // target cell is in grid
        if (
          currentPiece.position.x - i > -1 &&
          currentPiece.position.y + i < 8
        ) {
          // target cell is empty, valid move
          if (
            this.gridRows[currentPiece.position.x - i].cells[
              currentPiece.position.y + i
            ].isOccupied == 0
          ) {
            console.log("Found Valid Move");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x - i,
              y: currentPiece.position.y + i,
            });
          } // target cell contains ally, invalid move
          // path blocked, exit for loop
          else if (
            this.gridRows[currentPiece.position.x - i].cells[
              currentPiece.position.y + i
            ].isOccupied == currentPlayer
          ) {
            console.log("Found Ally Piece");
            break;
          } // target cell contains enemy, kill move
          // path blocked, exit for loop
          else {
            console.log("Found Enemy Piece");
            currentPiece.possibleMoves.push({
              x: currentPiece.position.x - i,
              y: currentPiece.position.y + i,
              killMove: true,
            });
            break;
          }
        } // reached end of board, exit for loop
        else {
          break;
        }
      }
    }

    // Reset Board Colors
    for (let j = 0; j < this.gridRows.length; j++) {
      for (let k = 0; k < this.gridRows[j].cells.length; k++) {
        this.gridRows[j].cells[k].div.style.backgroundColor =
          this.gridRows[j].cells[k].backColor;
      }
    }

    // color possible moves
    for (let i = 0; i < currentPiece.possibleMoves.length; i++) {
      if (currentPiece.possibleMoves[i].killMove) {
        this.gridRows[currentPiece.possibleMoves[i].y].cells[
          currentPiece.possibleMoves[i].x
        ].div.style.backgroundColor = killMovementColor;
      } else {
        this.gridRows[currentPiece.possibleMoves[i].y].cells[
          currentPiece.possibleMoves[i].x
        ].div.style.backgroundColor = validMovementColor;
      }
    }

    if (currentPiece.possibleMoves.length > 0) {
      return currentPiece;
    } else {
      return null;
    }
  } // generatePossibleMoves ()

  // Runs through Computer Turn
  runComputerTurn() {
    // Select Random Piece from p2Pieces
    let selectedPiece = this.selectRandomPiece();
    // Choose Random Move from Possible Moves Array
    let randomMove = this.selectRandomMove(selectedPiece);

    console.log(randomMove);

    // Reset Board Colors
    for (let j = 0; j < this.gridRows.length; j++) {
      for (let k = 0; k < this.gridRows[j].cells.length; k++) {
        this.gridRows[j].cells[k].div.style.backgroundColor =
          this.gridRows[j].cells[k].backColor;
      }
    }

    // Animation
    if (this.gridRows[randomMove.x].cells[randomMove.y].isOccupied == 1) {
      this.p1Pieces[
        this.gridRows[randomMove.x].cells[randomMove.y].occupiedBy
      ].token.remove();
    }

    TweenMax.to(selectedPiece.token, {
      duration: 1,
      cx: randomMove.x * 50 + 25,
      cy: randomMove.y * 50 + 25,
    });

    // Modify Cell Values
    if (this.gridRows[randomMove.x].cells[randomMove.y].isOccupied == 1) {
      this.p1Pieces[
        this.gridRows[randomMove.x].cells[randomMove.y].occupiedBy
      ].onBoard = false;
    }

    this.gridRows[randomMove.x].cells[randomMove.y].isOccupied =
      this.gridRows[selectedPiece.position.x].cells[
        selectedPiece.position.y
      ].isOccupied;
    this.gridRows[randomMove.x].cells[randomMove.y].occupiedBy =
      this.gridRows[selectedPiece.position.x].cells[
        selectedPiece.position.y
      ].occupiedBy;

    this.gridRows[selectedPiece.position.x].cells[
      selectedPiece.position.y
    ].isOccupied = 0;
    this.gridRows[selectedPiece.position.x].cells[
      selectedPiece.position.y
    ].occupiedBy = null;

    // Move Piece
    selectedPiece.position.x = randomMove.x;
    selectedPiece.position.y = randomMove.y;
    if (selectedPiece.pieceType == "Pawn") {
      selectedPiece.hasMoved = true;
    }
  } // runComputerTurn()

  // Randomly Indexes into p2Pieces
  selectRandomPiece() {
    // Generate Random Index
    let randomIndex = Math.floor(Math.random() * this.p2Pieces.length);
    console.log("Random Piece Index: " + randomIndex);
    let selectedPiece = null;
    // Verify that Piece is Alive
    if (this.p2Pieces[randomIndex].onBoard) {
      // Generate Possible Moves
      selectedPiece = this.generatePossibleMoves(currentPlayer, randomIndex);
    }
    // Verify that Piece Has Moves
    if (selectedPiece == null) {
      // Recursion Loop until selectedPiece has moves
      selectedPiece = this.selectRandomPiece();
    }
    console.log(selectedPiece);
    return selectedPiece;
  } // selectRandomPiece()

  // Randomly Indexes into possibleMoves and returns move
  selectRandomMove(selectedPiece) {
    let killMoves = [];
    let randomIndex;
    // Find Possible Kill Moves
    for (let i = 0; i < selectedPiece.possibleMoves.length; i++) {
      if (selectedPiece.possibleMoves[i].killMove) {
        killMoves.push(selectedPiece.possibleMoves[i]);
      }
    }
    // If Kill Moves, Randomly Choose from Kill Moves
    if (killMoves.length > 0) {
      randomIndex = Math.floor(Math.random() * killMoves.length);
      console.log("Random Kill Move Index: " + randomIndex);
      console.log(killMoves[randomIndex]);
      return killMoves[randomIndex];
    } else {
      randomIndex = Math.floor(
        Math.random() * selectedPiece.possibleMoves.length
      );
      console.log("Random Move Index: " + randomIndex);
      console.log(selectedPiece.possibleMoves[randomIndex]);
      return selectedPiece.possibleMoves[randomIndex];
    }
  } // selectRandomMove
} // class GameBoard

// DOCUMENT ELEMENTS
let content = document.querySelector("#content");
let text = document.querySelector("#text");

// GLOBAL VARIABLES
// Variable to determine effect of clicking on cell
// 0 - Select Piece To Move
// 1 - Piece Confirmed, Select Cell to Move To
let turnState = 0;
// variable marking current player
let currentPlayer = 1;
// Game Manager - GameBoard Class Instance
let board = new GameBoard();
content.appendChild(board.div);
// variable to keep track of currently selected piece
let selectedPiece = null;

// Function called when a cell is clicked on
// Calls functions dependent on turnState
function selectCell(rowIndex, columnIndex) {
  // console.log("clicked");
  // let rowIndex = this.getAttribute("row");
  // let columnIndex = this.getAttribute("column");
  console.log({ x: Number(rowIndex), y: Number(columnIndex) });
  if (turnState == 0) {
    let pieceOwner = board.gridRows[rowIndex].cells[columnIndex].isOccupied;
    console.log(pieceOwner);
    console.log(board.gridRows[rowIndex].cells[columnIndex].occupiedBy);
    if (pieceOwner == currentPlayer) {
      selectedPiece = board.generatePossibleMoves(
        pieceOwner,
        board.gridRows[rowIndex].cells[columnIndex].occupiedBy
      );
      console.log(selectedPiece);
    }
  } else if (turnState == 1) {
    // Check if Selected Cell is a Valid Move
    for (let i = 0; i < selectedPiece.possibleMoves.length; i++) {
      console.log(selectedPiece.possibleMoves[i]);
      if (
        selectedPiece.possibleMoves[i].x == rowIndex &&
        selectedPiece.possibleMoves[i].y == columnIndex
      ) {
        console.log("Valid Move");

        // Reset Board Color
        for (let j = 0; j < board.gridRows.length; j++) {
          for (let k = 0; k < board.gridRows[j].cells.length; k++) {
            board.gridRows[j].cells[k].div.style.backgroundColor =
              board.gridRows[j].cells[k].backColor;
          }
        }
        // ANIMATION???
        if (board.gridRows[rowIndex].cells[columnIndex].isOccupied == 2) {
          console.log(
            board.p2Pieces[
              board.gridRows[rowIndex].cells[columnIndex].occupiedBy
            ]
          );
          board.p2Pieces[
            board.gridRows[rowIndex].cells[columnIndex].occupiedBy
          ].token.remove();
        }

        TweenMax.to(selectedPiece.token, {
          duration: 1,
          cx: rowIndex * 50 + 25,
          cy: columnIndex * 50 + 25,
        });

        // Modify Cell Values
        if (board.gridRows[rowIndex].cells[columnIndex].isOccupied == 2) {
          board.p2Pieces[
            board.gridRows[rowIndex].cells[columnIndex].occupiedBy
          ].onBoard = false;
        }

        board.gridRows[rowIndex].cells[columnIndex].isOccupied =
          board.gridRows[selectedPiece.position.x].cells[
            selectedPiece.position.y
          ].isOccupied;
        board.gridRows[rowIndex].cells[columnIndex].occupiedBy =
          board.gridRows[selectedPiece.position.x].cells[
            selectedPiece.position.y
          ].occupiedBy;

        board.gridRows[selectedPiece.position.x].cells[
          selectedPiece.position.y
        ].isOccupied = 0;
        board.gridRows[selectedPiece.position.x].cells[
          selectedPiece.position.y
        ].occupiedBy = null;

        // Move Piece to Selected Cell
        selectedPiece.position.x = rowIndex;
        selectedPiece.position.y = columnIndex;
        if (selectedPiece.pieceType == "Pawn") {
          selectedPiece.hasMoved = true;
        }
        text.innerHTML = "";

        checkGameEnd();

        break;
      }
    }

    console.log(board);
  }
} // selectCell()

// Function to check Win Condition, and enable computer turn
function checkGameEnd() {
  // Check Game End
  // If either player is missing a King, declare winner, disable onClick
  if (!board.p2Pieces[0].onBoard) {
    text.innerHTML = "Player 1 Wins!";
    currentPlayer = 0;
    turnState = 2;
  } else if (!board.p1Pieces[0].onBoard) {
    text.innerHTML = "Player 2 Wins.";
    currentPlayer = 0;
    turnState = 2;
  } else {
    // Run Computer Turn
    currentPlayer = 2;
    board.runComputerTurn();
    console.log(board);
  }

  // Check Game End
  if (!board.p2Pieces[0].onBoard) {
    text.innerHTML = "Player 1 Wins!";
    currentPlayer = 0;
    turnState = 2;
  } else if (!board.p1Pieces[0].onBoard) {
    text.innerHTML = "Player 2 Wins.";
    currentPlayer = 0;
    turnState = 2;
  } else {
    // Return to Player Turn
    currentPlayer = 1;
    turnState = 0;
    selectedPiece = null;
  }
}

// Function called on button click
// Locks in selectedPiece, increase turn state
function confirmPiece() {
  if (selectedPiece != null) {
    turnState = 1;
    text.innerHTML = "Selected Piece of Type: " + selectedPiece.pieceType;
  } else {
    text.innerHTML =
      "Selected Piece has No Valid Moves. Select a Different Piece.";
  }
} // confirmPiece()

// Function called when svg element clicked
// Determines Row and Column Index, and calls selectCell()
function findIndex(x, y) {
  //console.log(x, y);
  rowIndex = Math.floor(x / 50);
  columnIndex = Math.floor(y / 50);
  //console.log(rowIndex, columnIndex);
  selectCell(rowIndex, columnIndex);
} // findIndex()
