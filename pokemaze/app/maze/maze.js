"use strict";
var cell_1 = require("./cell");
var position_1 = require("./position");
var direction_1 = require("../datastructures/direction");
// M rows and N cols
var Maze = (function () {
    function Maze() {
    }
    Maze.prototype.genMaze = function (M, N) {
        console.log(M + " " + N);
        this.pokePositions = [];
        this.maze = [];
        // make max pokemon number 1/4 maze;
        var maxPokemon = Math.floor(M * N * 0.25);
        for (var i = 0; i < M; ++i) {
            this.maze[i] = [];
            for (var j = 0; j < N; ++j) {
                this.maze[i][j] = new cell_1.Cell(new position_1.Position(i, j));
                if (this.maze[i][j].isPokemons)
                    if (this.pokePositions.length < maxPokemon) {
                        this.pokePositions.push(this.maze[i][j].position);
                    }
                    else {
                        this.maze[i][j].isPokemons = false;
                    }
            }
        }
        var position = new position_1.Position(0, 0);
        var history = [position];
        while (history.length != 0) {
            var c = position.col;
            var r = position.row;
            var cell = this.maze[r][c];
            cell.isVisted = true;
            var check = [];
            if (c > 0 && !this.maze[r][c - 1].isVisted) {
                check.push(direction_1.Direction.Left);
            }
            if (r > 0 && !this.maze[r - 1][c].isVisted) {
                check.push(direction_1.Direction.Up);
            }
            if (c < N - 1 && !this.maze[r][c + 1].isVisted) {
                check.push(direction_1.Direction.Right);
            }
            if (r < M - 1 && !this.maze[r + 1][c].isVisted) {
                check.push(direction_1.Direction.Down);
            }
            if (check.length != 0) {
                var moveDirection = check[Math.floor(Math.random() * check.length)];
                if (moveDirection == direction_1.Direction.Left) {
                    this.maze[r][c].isLeft = false;
                    c -= 1;
                    this.maze[r][c].isRight = false;
                }
                if (moveDirection == direction_1.Direction.Up) {
                    this.maze[r][c].isUp = false;
                    r -= 1;
                    this.maze[r][c].isDown = false;
                }
                if (moveDirection == direction_1.Direction.Right) {
                    this.maze[r][c].isRight = false;
                    c += 1;
                    this.maze[r][c].isLeft = false;
                }
                if (moveDirection == direction_1.Direction.Down) {
                    this.maze[r][c].isDown = false;
                    r += 1;
                    this.maze[r][c].isUp = false;
                }
                position = new position_1.Position(r, c);
                history.push(position);
            }
            else {
                position = history.shift();
            }
        }
        var startI = Math.floor(Math.random() * (M));
        var startJ = Math.floor(Math.random() * (N));
        var endI = Math.floor(Math.random() * (M));
        var endJ = Math.floor(Math.random() * (N));
        while (startI == endI && startJ == endJ) {
            endI = Math.floor(Math.random() * (M));
            endJ = Math.floor(Math.random() * (N));
        }
        this.start = this.maze[startI][startJ];
        this.end = this.maze[endI][endJ];
        this.start.isStart = true;
        this.end.isEnd = true;
        this.steps = Math.floor(Math.random() * (M * N * 0.2)) + 1;
        if (this.start.isPokemons) {
            var index = this.pokePositions.indexOf(this.start.position);
            this.pokePositions.splice(index, 1);
            this.start.isPokemons = false;
        }
    };
    return Maze;
}());
exports.Maze = Maze;
//# sourceMappingURL=maze.js.map