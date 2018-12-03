import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("floor.png");

class Marker extends Sprite {
    constructor(board, image, name) {
        super();
        this.board = board;
        this.setImage(image);
        this.name = name;
        this.squareSymbol = this.name.substring(0, 1);
        this.x = this.startX = 150;
        this.y = this.startY = 275;
        this.inBoard = false;
    }
    playInSquare(row, col) {
        if (0 < row < 3 && 0 < col < 3) {
            this.y = game.y = ((row * 150) + 130) + (5 * row);
            this.x = game.x = ((col * 150) + 345) + (6 * col);
        }
        this.board.dataModel[row][col] = this.squareSymbol;
        this.board.debugBoard();
        this.board.takeTurns();
        this.inBoard = true;
    }
}
class PrincessMarker extends Marker {
    constructor(board) {
        super(board, "annFace.png", "Princess Ann");
        this.dragging = false;
    }
    handleMouseLeftButtonDown() {
        if (this.inBoard) {
            return;
        }
        this.dragging = true;
    }
    handleMouseLeftButtonUp() {
        if (this.inBoard) {
            return;
        }
        this.dragging = false;
        let row = Math.floor((this.y - 85) / 150);
        let col = Math.floor((this.x - 300) / 150);
        // window.alert("Row " + row + ", Col " + col);
        if (((row < 0 || row > 2) || (col < 0 || col > 2))) {
            this.x = this.startX;
            this.y = this.startY;
            return true;
        }
        if (!this.board.squareSymbol == "-") {
            this.x = this.startX;
            this.y = this.startY;
            return true;
        }
        this.playInSquare(row, col); //FIX

    }
    handleGameLoop() {
        if (this.dragging === true) {
            this.x = game.getMouseX() - this.width / 2;
            this.y = game.getMouseY() - this.height / 2;
        }
    }
}
class StrangerMarker extends Marker {
    constructor(board) {
        super(board, "strangerFace.png", "Stranger");

    }
    handleGameLoop() {
        // Mark a random empty square.
        let row, col;
        do {
            row = Math.round(Math.random() * (this.board.size - 1));
            col = Math.round(Math.random() * (this.board.size - 1));
        }
        while (this.board.dataModel[row][col] !== this.board.emptySquareSymbol);
        let foundMove = this.findWinningMove();
        
        if (!foundMove) {
            foundMove = this.findWinningMove(true);
        }
        
        if (!foundMove) {
            foundMove = this.findForkingMove();
        }
        
        if (!foundMove) {
            foundMove = this.findForkingMove(true);
        }
        
        if (!foundMove) {
            foundMove = this.findCenterMove();
        }
        
        if (!foundMove) {
            foundMove = this.findOppositeCornerMove();
        }
        
        if (!foundMove) {
            foundMove = this.findAnyCornerMove();
        }
        
        if (!foundMove) {
            foundMove = this.findAnySideMove();
        }
        
        if (!foundMove) {
            if (this.inBoard) {
                return;
            }
            // Mark a random empty square.
        }
        // if (!foundMove) throw new Error('Failed to find a move.');
        // this.board.takeTurns();
        
        this.board.dataModel[row][col] = this.squareSymbol;
        this.playInSquare(row, col);
        //this.board.takeTurns();
    }
    findWinningMove(forOpponent) {
        return false;
    }
    findForkingMove(forOpponent) {
        return false;
    }
    findCenterMove(forOpponent) {
        return false;
    }
    findOppositeCornerMove(forOpponent) {
        return false;
    }
    findAnyCornerMove(forOpponent) {
        return false;
    }
    findAnySideMove(forOpponent) {
        return false;
    }
}
class TicTacToe extends Sprite {
    constructor() {
        super();
        this.name = "board";
        this.setImage("board.png");
        this.x = 300;
        this.y = 85;
        this.squareSize = 150;
        this.size = 3;
        this.activeMarker;
        this.activeSprite = true;
        this.dataModel = [];
        this.emptySquareSymbol = '-';
        for (let row = 0; row < this.size; row = row + 1) {
            this.dataModel[row] = [];
            for (let col = 0; col < this.size; col = col + 1) {
                this.dataModel[row][col] = this.emptySquareSymbol;
            }
        }
    }
    takeTurns() {
        if (this.gameIsWon()) {
            let message = '        Game Over.\n        ';
            if (this.activeMarker instanceof PrincessMarker) {
                message = message + 'The Princess wins.';
            }
            else if (this.activeMarker instanceof StrangerMarker) {
                message = message + 'The Stranger wins.';
            }
            game.end(message);
            return;
        }

        if (this.gameIsDrawn()) {
            game.end('        Game Over.\n        The game ends in a draw.');
            return;
        }
        if (!this.activeMarker) {
            if (Math.random() < 0.5) {
                this.activeMarker = new PrincessMarker(this);
            }
            else {
                this.activeMarker = new StrangerMarker(this);
            }
        }
        else if (this.activeMarker instanceof PrincessMarker) {
            // princess has moved; now it's stranger's turn
            this.activeMarker = new StrangerMarker(this);
        }
        else if (this.activeMarker instanceof StrangerMarker) {
            // stranger has moved; now it's princess's turn
            this.activeMarker = new PrincessMarker(this);
        }
    }
    markSquare(row, col, forOpponent) {
        let squareSymbol = this.activeMarker.squareSymbol;
        if (this.getSquareSymbol(row, col) === this.emptySquareSymbol) {
            this.dataModel[row][col] = squareSymbol;
            return true;
        }
        return false;
    }
    unmarkSquare(row, col) {
        this.dataModel[row][col] = this.emptySquareSymbol;
    }
    getSquareSymbol(row, col) {
        return this.dataModel[row][col];
    }
    gameIsWon() {
        // Are there three of the same markers diagonally from upper left?
        if (this.dataModel[0][0] === this.dataModel[1][1] &&
            this.dataModel[1][1] === this.dataModel[2][2] &&
            this.dataModel[2][2] !== this.emptySquareSymbol) {
            return true;
        }
        if (this.dataModel[0][2] === this.dataModel[1][1] &&
            this.dataModel[1][1] === this.dataModel[2][0] &&
            this.dataModel[2][0] !== this.emptySquareSymbol) {
            return true;
        }
        if (this.dataModel[0][0] === this.dataModel[0][1] &&
            this.dataModel[0][1] === this.dataModel[0][2] &&
            this.dataModel[0][2] !== this.emptySquareSymbol) {
            return true;
        }
        if (this.dataModel[1][0] === this.dataModel[1][1] &&
            this.dataModel[1][1] === this.dataModel[1][2] &&
            this.dataModel[1][2] !== this.emptySquareSymbol) {
            return true;
        }
        if (this.dataModel[2][0] === this.dataModel[2][1] &&
            this.dataModel[2][1] === this.dataModel[2][2] &&
            this.dataModel[2][2] !== this.emptySquareSymbol) {
            return true;
        }
        if (this.dataModel[0][0] === this.dataModel[1][0] &&
            this.dataModel[1][0] === this.dataModel[2][0] &&
            this.dataModel[2][0] !== this.emptySquareSymbol) {
            return true;
        }
        if (this.dataModel[0][1] === this.dataModel[1][1] &&
            this.dataModel[1][1] === this.dataModel[2][1] &&
            this.dataModel[2][1] !== this.emptySquareSymbol) {
            return true;
        }
        if (this.dataModel[0][2] === this.dataModel[1][2] &&
            this.dataModel[1][2] === this.dataModel[2][2] &&
            this.dataModel[2][2] !== this.emptySquareSymbol) {
            return true;
        }
        return false;
    }
    gameIsDrawn() {
        for (let row = 0; row < 3; row = row + 1) {
            for (let col = 0; col < 3; col = col + 1) {
                if (this.dataModel[row][col] === this.emptySquareSymbol) {
                    return false;
                }
            }
        }
        return true;
    }
    countWinningMoves(forOpponent) {

    }
    debugBoard() {
        let boardString = '\n';
        let moveCount = 0;
        for (let row = 0; row < this.size; row = row + 1) {
            for (let col = 0; col < this.size; col = col + 1) {
                boardString = boardString + this.dataModel[row][col] + ' ';
                if (this.dataModel[row][col] !== this.emptySquareSymbol) {
                    moveCount++;
                }
            }
            boardString = boardString + '\n';
        }
        console.log('The data model after ' + moveCount + ' move(s):' + boardString);
    }
}

let theBoard = new TicTacToe();
theBoard.takeTurns();
