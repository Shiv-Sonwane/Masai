"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Player = /** @class */ (function () {
    function Player(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
    return Player;
}());
var TicTacToe = /** @class */ (function () {
    function TicTacToe() {
        this.board = [];
        this.players = [];
        this.currentPlayerIndex = 0;
        this.centerLockedBy = null;
        this.movesCount = 0;
        this.initBoard();
    }
    TicTacToe.prototype.initBoard = function () {
        this.board = [
            ["_", "_", "_"],
            ["_", "_", "_"],
            ["_", "_", "_"],
        ];
    };
    TicTacToe.prototype.printBoard = function () {
        console.log("   1 2 3");
        var rows = ["A", "B", "C"];
        for (var i = 0; i < 3; i++) {
            console.log("".concat(rows[i], "  ").concat(this.board[i].join(" ")));
        }
        console.log("");
    };
    TicTacToe.prototype.registerPlayers = function (rl, callback) {
        var _this = this;
        rl.question("Player 1 Name: ", function (p1Name) {
            rl.question("Player 1 Symbol: ", function (p1Symbol) {
                if (p1Symbol === "_") {
                    console.log("Symbol _ is reserved. Choose another symbol.");
                    return _this.registerPlayers(rl, callback);
                }
                rl.question("Player 2 Name: ", function (p2Name) {
                    rl.question("Player 2 Symbol: ", function (p2Symbol) {
                        if (p2Symbol === "_" || p2Symbol === p1Symbol) {
                            console.log("Symbol invalid or already taken. Choose a different symbol.");
                            return _this.registerPlayers(rl, callback);
                        }
                        _this.players.push(new Player(p1Name, p1Symbol));
                        _this.players.push(new Player(p2Name, p2Symbol));
                        console.log("\n".concat(p1Name, " is ").concat(p1Symbol, ", ").concat(p2Name, " is ").concat(p2Symbol, "\n"));
                        callback();
                    });
                });
            });
        });
    };
    TicTacToe.prototype.parseMove = function (move) {
        var _a;
        var rowMap = { A: 0, B: 1, C: 2 };
        var row = (_a = move[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase();
        var col = parseInt(move[1]) - 1;
        if (!(row in rowMap) || col < 0 || col > 2)
            return null;
        return [rowMap[row], col];
    };
    TicTacToe.prototype.isCellAvailable = function (row, col, player) {
        var cell = this.board[row][col];
        if (cell === "_")
            return true;
        if (row === 1 && col === 1 && this.centerLockedBy === player)
            return true;
        return false;
    };
    TicTacToe.prototype.applyMove = function (row, col, player) {
        this.board[row][col] = player.symbol;
        this.movesCount++;
        var topLeft = this.board[0][0] === player.symbol;
        var bottomRight = this.board[2][2] === player.symbol;
        var topRight = this.board[0][2] === player.symbol;
        var bottomLeft = this.board[2][0] === player.symbol;
        if ((topLeft && bottomRight) || (topRight && bottomLeft)) {
            if (this.board[1][1] === "_") {
                this.centerLockedBy = player;
                console.log("Center cell B2 is now locked for ".concat(player.name, " only!\n"));
            }
        }
    };
    TicTacToe.prototype.checkWin = function (player) {
        var s = player.symbol;
        var b = this.board;
        for (var i = 0; i < 3; i++) {
            if (b[i][0] === s && b[i][1] === s && b[i][2] === s)
                return true;
            if (b[0][i] === s && b[1][i] === s && b[2][i] === s)
                return true;
        }
        if (b[0][0] === s && b[1][1] === s && b[2][2] === s)
            return true;
        if (b[0][2] === s && b[1][1] === s && b[2][0] === s)
            return true;
        return false;
    };
    TicTacToe.prototype.isDraw = function () {
        return this.movesCount >= 9;
    };
    TicTacToe.prototype.playTurn = function (rl) {
        var _this = this;
        var player = this.players[this.currentPlayerIndex];
        this.printBoard();
        rl.question("".concat(player.name, " (").concat(player.symbol, ") move (e.g., A1): "), function (move) {
            var parsed = _this.parseMove(move);
            if (!parsed) {
                console.log("Invalid move. Try again.");
                return _this.playTurn(rl);
            }
            var row = parsed[0], col = parsed[1];
            if (!_this.isCellAvailable(row, col, player)) {
                console.log("Cell is already taken or locked. Try again.");
                return _this.playTurn(rl);
            }
            _this.applyMove(row, col, player);
            if (_this.checkWin(player)) {
                _this.printBoard();
                console.log("".concat(player.name, " wins!"));
                rl.close();
                return;
            }
            if (_this.isDraw()) {
                _this.printBoard();
                console.log("Game ended in a draw.");
                rl.close();
                return;
            }
            _this.currentPlayerIndex = 1 - _this.currentPlayerIndex;
            _this.playTurn(rl);
        });
    };
    TicTacToe.prototype.startGame = function () {
        var _this = this;
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        this.registerPlayers(rl, function () {
            _this.playTurn(rl);
        });
    };
    return TicTacToe;
}());
var game = new TicTacToe();
game.startGame();