import * as readline from "readline";


class Player {
    name: string;
    symbol: string;

    constructor(name: string, symbol: string) {
        this.name = name;
        this.symbol = symbol;
    }
}

class TicTacToe {
    board: string[][] = [];
    players: Player[] = [];
    currentPlayerIndex: number = 0;
    centerLockedBy: Player | null = null;
    movesCount: number = 0;

    constructor() {
        this.initBoard();
    }

    initBoard() {
        this.board = [
            ["_", "_", "_"],
            ["_", "_", "_"],
            ["_", "_", "_"],
        ];
    }

    printBoard() {
        console.log("   1 2 3");
        const rows = ["A", "B", "C"];
        for (let i = 0; i < 3; i++) {
            console.log(`${rows[i]}  ${this.board[i].join(" ")}`);
        }
        console.log("");
    }

    registerPlayers(rl: readline.Interface, callback: () => void) {
        rl.question("Player 1 Name: ", (p1Name) => {
            rl.question("Player 1 Symbol: ", (p1Symbol) => {
                if (p1Symbol === "_") {
                    console.log("Symbol _ is reserved. Choose another symbol.");
                    return this.registerPlayers(rl, callback);
                }

                rl.question("Player 2 Name: ", (p2Name) => {
                    rl.question("Player 2 Symbol: ", (p2Symbol) => {
                        if (p2Symbol === "_" || p2Symbol === p1Symbol) {
                            console.log(
                                "Symbol invalid or already taken. Choose a different symbol."
                            );
                            return this.registerPlayers(rl, callback);
                        }

                        this.players.push(new Player(p1Name, p1Symbol));
                        this.players.push(new Player(p2Name, p2Symbol));

                        console.log(`\n${p1Name} is ${p1Symbol}, ${p2Name} is ${p2Symbol}\n`);
                        callback();
                    });
                });
            });
        });
    }
    parseMove(move: string): [number, number] | null {
        if (move.length !== 2) return null;
        const rowMap: Record<string, number> = { A: 0, B: 1, C: 2 };
        const row = move[0].toUpperCase();
        const col = parseInt(move[1]) - 1;
        if (!(row in rowMap) || col < 0 || col > 2) return null;
        return [rowMap[row], col];
    }


    isCellAvailable(row: number, col: number, player: Player): boolean {
        const cell = this.board[row][col];
        if (cell === "_") return true;
        if (row === 1 && col === 1 && this.centerLockedBy === player) return true;
        return false;
    }

    applyMove(row: number, col: number, player: Player) {

        this.board[row][col] = player.symbol;
        this.movesCount++;
        const topLeft = this.board[0][0] === player.symbol;
        const bottomRight = this.board[2][2] === player.symbol;
        const topRight = this.board[0][2] === player.symbol;
        const bottomLeft = this.board[2][0] === player.symbol;

        if ((topLeft && bottomRight) || (topRight && bottomLeft)) {
            if (this.board[1][1] === "_") {
                this.centerLockedBy = player;
                console.log(`Center cell B2 is now locked for ${player.name} only!\n`);
            }
        }
    }

    checkWin(player: Player): boolean {
        const s = player.symbol;
        const b = this.board;

        for (let i = 0; i < 3; i++) {
            if (b[i][0] === s && b[i][1] === s && b[i][2] === s) return true;
            if (b[0][i] === s && b[1][i] === s && b[2][i] === s) return true;
        }


        if (b[0][0] === s && b[1][1] === s && b[2][2] === s) return true;
        if (b[0][2] === s && b[1][1] === s && b[2][0] === s) return true;

        return false;
    }

    isDraw(): boolean {
        return this.movesCount >= 9;
    }

    playTurn(rl: readline.Interface) {
        const player = this.players[this.currentPlayerIndex];
        this.printBoard();
        rl.question(`${player.name} (${player.symbol}) move (e.g., A1): `, (move) => {
            const parsed = this.parseMove(move);
            if (!parsed) {
                console.log("Invalid move. Try again.");
                return this.playTurn(rl);
            }
            const [row, col] = parsed;
            if (!this.isCellAvailable(row, col, player)) {
                console.log("Cell is already taken or locked. Try again.");
                return this.playTurn(rl);
            }

            this.applyMove(row, col, player);

            if (this.checkWin(player)) {
                this.printBoard();
                console.log(`${player.name} wins!`);
                rl.close();
                return;
            }

            if (this.isDraw()) {
                this.printBoard();
                console.log("Game ended in a draw.");
                rl.close();
                return;
            }

            this.currentPlayerIndex = 1 - this.currentPlayerIndex;
            this.playTurn(rl);
        });
    }

    startGame() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.registerPlayers(rl, () => {
            this.playTurn(rl);
        });
    }
}


const game = new TicTacToe();
game.startGame();