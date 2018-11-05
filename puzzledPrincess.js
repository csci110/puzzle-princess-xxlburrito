import {game, Sprite} from "./sgc/sgc.js";
game.setBackground("floor.png");

class Marker extends Sprite {
    constructor(board, image, name) {
        super();
        this.board = board;
        this.setImage(image);
        this.name = name;
        this.x = this.startX = 150;
        this.y = this.startY = 275;
    }
}
class PrincessMarker extends Marker {
    constructor(board) {
        super(board, "annFace.png", "Princess Ann");
        this.dragging = false;
    }
    handleMouseLeftButtonDown() {
        this.dragging = true;
    }
    handleMouseLeftButtonUp() {
        this.dragging = false;
        let row = Math.floor((this.y - 85) / 150);
        let col = Math.floor((this.x - 300) / 150);
        // window.alert("Row " + row + ", Col " + col);
        if (row < 0 || row > 2) {
            this.x = this.startX;
            this.y = this.startY;
            return true;
        }
        if (col < 0 || col > 2) {
            this.x = this.startX;
            this.y = this.startY;
            return true;
        }
    }
    handleGameLoop() {
        if(this.dragging ===true) {
            this.x = game.getMouseX() - this.width / 2;
            this.y = game.getMouseY() - this.height / 2;
        }
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