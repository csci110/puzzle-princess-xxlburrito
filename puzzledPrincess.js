import {game, Sprite} from "./sgc/sgc.js";
game.setBackground("floor.png");

class Marker extends Sprite {
    constructor(game, imageFile, name) {
        super();
        this.game = game;
        this.setImage(imageFile);
        this.name = name;
        this.x = 150;
        this.y = 275;
    }
}
class PrincessMarker extends Marker {
    constructor(board) {
        super(board);
        this.board = board;
        this.
    }
}
class StrangerMarker extends Marker {
    
}
class TicTacToe  extends Sprite {
    constructor() {
        super();
        this.name = "board";
        this.setImage("board.png");
        this.x = 300;
        this.y = 85;
        this.squareSize = 150;
        this.boardSize = 3;
        this.activeMarker;
        this.activeSprite = true;
    }
    takeTurns() {
        this.activeMarker = new PrincessMarker(this);
    }
    markSquare(row, col, forOpponent) {
        
    }
    unmarkSquare(row, col) {
        
    }
    getSquareSymbol(row, col) {
        
    }
    gameIsWon() {
        
    }
    gameIsDrawn() {
        
    }
    countWinningMoves(forOpponent) {
        
    }
    debugBoard() {
        
    }
}

let theBoard = new TicTacToe();
theBoard.takeTurns();