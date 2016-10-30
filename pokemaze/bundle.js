/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var gen_maze_1 = __webpack_require__(1);
	var search_1 = __webpack_require__(6);
	var pokeMaze = gen_maze_1.GenMaze(5, 5);
	console.log(pokeMaze);
	// console.log('Strategy: BF');
	// Search(pokeMaze, 'BF', false);
	//
	// console.log('Strategy: UC');
	// Search(pokeMaze, 'UC', false);
	//
	// console.log('Strategy: DF');
	// Search(pokeMaze, 'DF', false);
	//
	// console.log('Strategy: ID');
	// Search(pokeMaze, 'ID', false);
	//
	// console.log('Strategy: GR1');
	// Search(pokeMaze, 'GR1', false);
	//
	// console.log('Strategy: AS1');
	// Search(pokeMaze, 'AS1', false);
	//
	// console.log('Strategy: GR2');
	// Search(pokeMaze, 'GR2', false);
	//
	// console.log('Strategy: AS2');
	// Search(pokeMaze, 'AS2', false);
	//
	// console.log('Strategy: GR3');
	// Search(pokeMaze, 'GR3', false);
	console.log('Strategy: AS3');
	search_1.Search(pokeMaze, 'AS3', true);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var maze_1 = __webpack_require__(2);
	exports.GenMaze = function (M, N) {
	    var maze = new maze_1.Maze();
	    maze.genMaze(M, N);
	    return maze;
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cell_1 = __webpack_require__(3);
	var position_1 = __webpack_require__(4);
	var direction_1 = __webpack_require__(5);
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Cell = (function () {
	    function Cell(pos) {
	        this.isRight = true;
	        this.isLeft = true;
	        this.isUp = true;
	        this.isDown = true;
	        this.isVisted = false;
	        this.isPokemons = (Math.random() > 0.6) ? true : false;
	        this.pokemonNumber = Math.floor(Math.random() * 151) + 1;
	        this.position = pos;
	        this.isStart = false;
	        this.isEnd = false;
	    }
	    Cell.prototype.print = function () {
	        return "rightwall: " + this.isRight + ", leftwall: " + this.isLeft + ", upperwall: " + this.isUp + ", downwall: " + this.isDown + ", number: " + this.pokemonNumber;
	    };
	    return Cell;
	}());
	exports.Cell = Cell;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var Position = (function () {
	    function Position(row, col) {
	        this.row = row;
	        this.col = col;
	    }
	    return Position;
	}());
	exports.Position = Position;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	(function (Direction) {
	    Direction[Direction["Up"] = 1] = "Up";
	    Direction[Direction["Down"] = 2] = "Down";
	    Direction[Direction["Left"] = 3] = "Left";
	    Direction[Direction["Right"] = 4] = "Right";
	})(exports.Direction || (exports.Direction = {}));
	var Direction = exports.Direction;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var queuing_funcs_1 = __webpack_require__(7);
	var poke_problem_1 = __webpack_require__(8);
	var general_search_1 = __webpack_require__(12);
	var depth_limited_search_1 = __webpack_require__(14);
	var best_first_search_1 = __webpack_require__(15);
	var heuristic_funcs_1 = __webpack_require__(16);
	exports.Search = function (maze, strategy, visualise) {
	    var result;
	    var problem = poke_problem_1.genPokeProblem(maze);
	    // Called by BF, UC and DF.
	    var doGeneralSearch = function (problem, queuingFunc) {
	        var searchInstance = new general_search_1.GeneralSearch(queuingFunc);
	        result = searchInstance.search(problem);
	        // console.log(result);
	        console.log("No. of nodes: " + searchInstance.expandedNodes);
	        console.log("No. of repeated states: " + searchInstance.repeatedStates);
	    };
	    // Called by ID.
	    var doIterativeDeepening = function (problem) {
	        var searchInstance = new depth_limited_search_1.DepthLimitedSearch();
	        for (var depth = 0; depth < Infinity; ++depth) {
	            result = searchInstance.search(problem, depth);
	            if (result) {
	                // printing success
	                console.log("No. of nodes: " + searchInstance.expandedNodes);
	                console.log("No. of repeated states: " + searchInstance.repeatedStates);
	                return result;
	            }
	        }
	        console.log("Could not find soultion using Itertive Deepining");
	    };
	    //Called by GRi and ASi
	    var doBestFirstSearch = function (problem, information, evalFunc) {
	        var searchInstance = best_first_search_1.BestFirstSearch(problem, information, evalFunc);
	        result = searchInstance.search(problem);
	        console.log("No. of nodes: " + searchInstance.expandedNodes);
	        console.log("No. of repeated states: " + searchInstance.repeatedStates);
	    };
	    var renderMazeView = function () {
	        Handlebars.registerHelper('concat', function (a, b) {
	            return a + '_' + b;
	        });
	        var template = Handlebars.templates['maze'];
	        var host = document.getElementById('maze');
	        var data = {
	            row: [],
	            start: maze.start,
	            end: maze.end
	        };
	        for (var i = 0; i < maze.maze.length; i++) {
	            var col = { col: maze.maze[i] };
	            data.row.push(col);
	        }
	        host.innerHTML = template(data);
	        var resultNodes = [];
	        while (result != null) {
	            resultNodes.push(result);
	            result = result.parent;
	        }
	        var playerOffsetTop = 115;
	        var playerOffsetLeft = 30;
	        var step = 75;
	        var moveCharacter = function () {
	            var node = resultNodes.pop();
	            var row = node.state.val['cell']['position'].row;
	            var col = node.state.val['cell']['position'].col;
	            if (node.operator) {
	                var src = 'app/assets/img/';
	                switch (node.operator.func.name) {
	                    case 'moveUp': {
	                        src += 'up.png';
	                        break;
	                    }
	                    case 'moveDown': {
	                        src += 'down.png';
	                        break;
	                    }
	                    case 'moveRight': {
	                        src += 'right.png';
	                        break;
	                    }
	                    case 'moveLeft': {
	                        src += 'left.png';
	                        break;
	                    }
	                    default: { }
	                }
	                $('#player img').attr('src', src);
	            }
	            setTimeout(function () {
	                $('#player').animate({
	                    top: playerOffsetTop + step * row,
	                    left: playerOffsetLeft + step * col
	                }, 300);
	                setTimeout(function () {
	                    $('#' + row + '_' + col + ' img').remove();
	                }, 300);
	            }, 300);
	            if (resultNodes.length > 0)
	                setTimeout(moveCharacter, 800);
	            else
	                setTimeout(function () {
	                    $('#player img').attr('src', 'app/assets/img/down.png');
	                }, 700);
	        };
	        moveCharacter();
	    };
	    console.log('Search Started');
	    switch (strategy) {
	        case 'BF': {
	            doGeneralSearch(problem, queuing_funcs_1.end);
	            break;
	        }
	        case 'UC': {
	            doGeneralSearch(problem, queuing_funcs_1.ordered);
	            break;
	        }
	        case 'DF': {
	            doGeneralSearch(problem, queuing_funcs_1.front);
	            break;
	        }
	        case 'ID': {
	            doIterativeDeepening(problem);
	            break;
	        }
	        case 'GR1': {
	            var info = {
	                endPoint: problem.stateSpace.end.position,
	                type: 'GR'
	            };
	            doBestFirstSearch(problem, info, heuristic_funcs_1.Manhattan);
	            break;
	        }
	        case 'AS1': {
	            var info = {
	                endPoint: problem.stateSpace.end.position,
	                type: 'AS'
	            };
	            doBestFirstSearch(problem, info, heuristic_funcs_1.Manhattan);
	            break;
	        }
	        case 'GR2': {
	            var info = {
	                endPoint: problem.stateSpace.end.position,
	                type: 'GR'
	            };
	            doBestFirstSearch(problem, info, heuristic_funcs_1.MST);
	            break;
	        }
	        case 'AS2': {
	            var info = {
	                endPoint: problem.stateSpace.end.position,
	                type: 'AS'
	            };
	            doBestFirstSearch(problem, info, heuristic_funcs_1.MST);
	            break;
	        }
	        case 'GR3': {
	            var info = {
	                endPoint: problem.stateSpace.end.position,
	                type: 'GR'
	            };
	            doBestFirstSearch(problem, info, heuristic_funcs_1.FD);
	            break;
	        }
	        case 'AS3': {
	            var info = {
	                endPoint: problem.stateSpace.end.position,
	                type: 'AS'
	            };
	            doBestFirstSearch(problem, info, heuristic_funcs_1.FD);
	            break;
	        }
	        default: { }
	    }
	    if (visualise) {
	        renderMazeView();
	    }
	};
	//# sourceMappingURL=search.js.map

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	exports.end = function (nodes, node) {
	    nodes.push(node);
	};
	exports.ordered = function (nodes, node) {
	    for (var i = 0; i < nodes.length; i++) {
	        if (nodes[i].pathCost > node.pathCost) {
	            nodes.splice(i, 0, node);
	            return;
	        }
	    }
	    nodes.push(node);
	};
	exports.front = function (nodes, node) {
	    nodes.unshift(node);
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var search_problem_1 = __webpack_require__(9);
	var operator_1 = __webpack_require__(10);
	var state_1 = __webpack_require__(11);
	exports.genPokeProblem = function (grid) {
	    var maze = grid.maze;
	    var iState = new state_1.State({
	        cell: grid.start,
	        hatch: grid.steps,
	        pokePositions: grid.pokePositions
	    });
	    var clone = function (arr) {
	        var newArr = [];
	        for (var i = 0; i < arr.length; i++) {
	            newArr[i] = arr[i];
	        }
	        return newArr;
	    };
	    var moveUp = function (state) {
	        var cell = state.val['cell'];
	        var hatch = state.val['hatch'];
	        var pokePositions = clone(state.val['pokePositions']);
	        var newRow = cell.position.row;
	        var newColumn = cell.position.col;
	        var newHatch = hatch > 0 ? hatch - 1 : hatch;
	        if (!cell.isUp) {
	            newRow = cell.position.row - 1;
	        }
	        else {
	            return null;
	        }
	        var newCell = maze[newRow][newColumn];
	        if (newCell.isPokemons) {
	            var index = pokePositions.indexOf(newCell.position);
	            if (index >= 0) {
	                pokePositions.splice(index, 1);
	            }
	        }
	        return new state_1.State({ cell: newCell,
	            hatch: newHatch, pokePositions: pokePositions });
	    };
	    var moveDown = function (state) {
	        var cell = state.val['cell'];
	        var hatch = state.val['hatch'];
	        var pokePositions = clone(state.val['pokePositions']);
	        var newRow = cell.position.row;
	        var newColumn = cell.position.col;
	        var newHatch = hatch > 0 ? hatch - 1 : hatch;
	        if (!cell.isDown) {
	            newRow = cell.position.row + 1;
	        }
	        else {
	            return null;
	        }
	        var newCell = maze[newRow][newColumn];
	        if (newCell.isPokemons) {
	            var index = pokePositions.indexOf(newCell.position);
	            if (index >= 0) {
	                pokePositions.splice(index, 1);
	            }
	        }
	        return new state_1.State({ cell: maze[newRow][newColumn],
	            hatch: newHatch, pokePositions: pokePositions });
	    };
	    var moveRight = function (state) {
	        var cell = state.val['cell'];
	        var hatch = state.val['hatch'];
	        var pokePositions = clone(state.val['pokePositions']);
	        var newRow = cell.position.row;
	        var newColumn = cell.position.col;
	        var newHatch = hatch > 0 ? hatch - 1 : hatch;
	        if (!cell.isRight) {
	            newColumn = cell.position.col + 1;
	        }
	        else {
	            return null;
	        }
	        var newCell = maze[newRow][newColumn];
	        if (newCell.isPokemons) {
	            var index = pokePositions.indexOf(newCell.position);
	            if (index >= 0) {
	                pokePositions.splice(index, 1);
	            }
	        }
	        return new state_1.State({ cell: maze[newRow][newColumn],
	            hatch: newHatch, pokePositions: pokePositions });
	    };
	    var moveLeft = function (state) {
	        var cell = state.val['cell'];
	        var hatch = state.val['hatch'];
	        var pokePositions = clone(state.val['pokePositions']);
	        var newRow = cell.position.row;
	        var newColumn = cell.position.col;
	        var newHatch = hatch > 0 ? hatch - 1 : hatch;
	        if (!cell.isLeft) {
	            newColumn = cell.position.col - 1;
	        }
	        else {
	            return null;
	        }
	        var newCell = maze[newRow][newColumn];
	        if (newCell.isPokemons) {
	            var index = pokePositions.indexOf(newCell.position);
	            if (index >= 0) {
	                pokePositions.splice(index, 1);
	            }
	        }
	        return new state_1.State({ cell: maze[newRow][newColumn],
	            hatch: newHatch, pokePositions: pokePositions });
	    };
	    var operators = [new operator_1.Operator(moveUp, 1), new operator_1.Operator(moveDown, 1),
	        new operator_1.Operator(moveRight, 1), new operator_1.Operator(moveLeft, 1)];
	    var goalTest = function (state) {
	        var cell = state.val['cell'];
	        var hatch = state.val['hatch'];
	        var pokePositions = state.val['pokePositions'];
	        return cell == grid.end && pokePositions.length == 0 && hatch <= 0;
	    };
	    var pathCost = function (oldCost, operator) {
	        return oldCost + operator.cost;
	    };
	    return new search_problem_1.SearchProblem(operators, iState, grid, goalTest, pathCost);
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var SearchProblem = (function () {
	    function SearchProblem(operators, initState, stateSpace, goalTest, pathCostFunc) {
	        this.operators = operators;
	        this.initState = initState;
	        this.stateSpace = stateSpace;
	        this.goalTest = goalTest;
	        this.pathCostFunc = pathCostFunc;
	    }
	    return SearchProblem;
	}());
	exports.SearchProblem = SearchProblem;


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var Operator = (function () {
	    function Operator(func, cost) {
	        this.func = func;
	        this.cost = cost;
	    }
	    Operator.prototype.apply = function (state) {
	        return this.func(state);
	    };
	    return Operator;
	}());
	exports.Operator = Operator;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var State = (function () {
	    function State(val) {
	        this.val = val;
	    }
	    return State;
	}());
	exports.State = State;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var node_1 = __webpack_require__(13);
	var GeneralSearch = (function () {
	    function GeneralSearch(queuingFunc) {
	        this.nodes = [];
	        this.queuingFunc = queuingFunc;
	        this.expandedNodes = 0;
	        this.repeatedStates = 0;
	    }
	    GeneralSearch.prototype.objEqual = function (obj1, obj2) {
	        return JSON.stringify(obj1) === JSON.stringify(obj2);
	    };
	    GeneralSearch.prototype.search = function (problem) {
	        this.nodes.push(new node_1.Node(problem.initState, null, null, 0, 0));
	        var min = Infinity;
	        while (this.nodes.length > 0) {
	            var node = this.nodes.shift();
	            this.expandedNodes++;
	            if (problem.goalTest(node.state)) {
	                for (var i = 0; i < this.nodes.length; i++) {
	                    min = Math.min(this.nodes[i].estimateCost, min);
	                }
	                console.log("Passed goalTest and node depth is " + node.depth);
	                return node;
	            }
	            for (var i = 0; i < problem.operators.length; i++) {
	                var newState = problem.operators[i].apply(node.state);
	                var parent_1 = node;
	                var nonRepeated = true;
	                if (newState) {
	                    while (parent_1 != null) {
	                        var oldState = parent_1.state;
	                        nonRepeated = nonRepeated && !this.objEqual(newState, oldState);
	                        if (!nonRepeated) {
	                            //console.log(" *********************Found repeated state *****************");
	                            this.repeatedStates = this.repeatedStates + 1;
	                            break;
	                        }
	                        parent_1 = parent_1.parent;
	                    }
	                    if (!nonRepeated)
	                        continue;
	                    var newNode = new node_1.Node(newState, node, problem.operators[i], node.depth + 1, problem.pathCostFunc(node.pathCost, problem.operators[i]));
	                    this.queuingFunc(this.nodes, newNode);
	                }
	            }
	        }
	        console.log('No solution');
	        console.log("Nodes expanded: " + this.expandedNodes);
	        return false;
	    };
	    return GeneralSearch;
	}());
	exports.GeneralSearch = GeneralSearch;


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	var Node = (function () {
	    function Node(state, parent, operator, depth, pathCost) {
	        this.state = state;
	        this.parent = parent;
	        this.operator = operator;
	        this.depth = depth;
	        this.pathCost = pathCost;
	        this.estimateCost = 0;
	    }
	    return Node;
	}());
	exports.Node = Node;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var node_1 = __webpack_require__(13);
	var queuing_funcs_1 = __webpack_require__(7);
	var DepthLimitedSearch = (function () {
	    function DepthLimitedSearch() {
	        this.nodes = [];
	        this.expandedNodes = 0;
	        this.repeatedStates = 0;
	    }
	    DepthLimitedSearch.prototype.objEqual = function (obj1, obj2) {
	        return JSON.stringify(obj1) === JSON.stringify(obj2);
	    };
	    DepthLimitedSearch.prototype.search = function (problem, depth) {
	        this.expandedNodes = 0;
	        this.repeatedStates = 0;
	        this.nodes.push(new node_1.Node(problem.initState, null, null, 0, 0));
	        while (this.nodes.length > 0) {
	            var node = this.nodes.shift();
	            var newDepth = node.depth + 1;
	            if (newDepth > depth) {
	                continue;
	            }
	            this.expandedNodes++;
	            if (problem.goalTest(node.state)) {
	                console.log("Passed goalTest for depth: " + depth);
	                return node;
	            }
	            for (var i = 0; i < problem.operators.length; i++) {
	                var newState = problem.operators[i].apply(node.state);
	                var parent_1 = node;
	                var nonRepeated = true;
	                if (newState) {
	                    while (parent_1 != null) {
	                        var oldState = parent_1.state;
	                        nonRepeated = nonRepeated && !this.objEqual(newState, oldState);
	                        if (!nonRepeated) {
	                            this.repeatedStates = this.repeatedStates + 1;
	                            break;
	                        }
	                        parent_1 = parent_1.parent;
	                    }
	                    if (!nonRepeated)
	                        continue;
	                    var newNode = new node_1.Node(newState, node, problem.operators[i], newDepth, problem.pathCostFunc(node.pathCost, problem.operators[i]));
	                    queuing_funcs_1.front(this.nodes, newNode);
	                }
	            }
	        }
	        console.log("No solution for depth: " + depth);
	        console.log("Nodes expanded: " + this.expandedNodes);
	        return false;
	    };
	    return DepthLimitedSearch;
	}());
	exports.DepthLimitedSearch = DepthLimitedSearch;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var general_search_1 = __webpack_require__(12);
	exports.BestFirstSearch = function (problem, evalInfo, evalFunc) {
	    var queuingFunc = function (nodes, node) {
	        evalFunc(node, evalInfo);
	        for (var i = 0; i < nodes.length; i++) {
	            if (nodes[i].estimateCost > node.estimateCost) {
	                nodes.splice(i, 0, node);
	                return;
	            }
	        }
	        nodes.push(node);
	    };
	    return new general_search_1.GeneralSearch(queuingFunc);
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	function objEqual(obj1, obj2) {
	    return JSON.stringify(obj1) === JSON.stringify(obj2);
	}
	function union(set1, set2) {
	    return set1.concat(set2.filter(function (el) {
	        return set1.indexOf(el) === -1;
	    }));
	}
	exports.Manhattan = function (node, information) {
	    var cell = node.state.val['cell'];
	    var x = cell.position.col;
	    var y = cell.position.row;
	    var endPoint = information.endPoint;
	    var dx = Math.abs(x - endPoint.col);
	    var dy = Math.abs(y - endPoint.row);
	    node.estimateCost = dx + dy;
	    if (information.type == 'AS')
	        node.estimateCost += node.pathCost;
	};
	exports.FD = function (node, information) {
	    var pokePositions = node.state.val['pokePositions'];
	    var positionsArr = [];
	    positionsArr.push(information.endPoint);
	    for (var i = 0; i < pokePositions.length; i++) {
	        positionsArr.push(pokePositions[i]);
	    }
	    var maxCost = 0;
	    for (var i = 0; i < positionsArr.length; ++i) {
	        var x = positionsArr[i].col;
	        var y = positionsArr[i].row;
	        for (var j = i + 1; j < positionsArr.length; ++j) {
	            var dx = Math.abs(x - positionsArr[j].col);
	            var dy = Math.abs(y - positionsArr[j].row);
	            var manh = dx + dy;
	            if (manh > maxCost) {
	                maxCost = manh;
	            }
	        }
	    }
	    node.estimateCost = maxCost;
	    if (information.type == 'AS')
	        node.estimateCost += node.pathCost;
	};
	exports.MST = function (node, information) {
	    var currentPosition = node.state.val['cell'].position;
	    var pokePositions = node.state.val['pokePositions'];
	    var endPosition = information.endPoint;
	    var positionsArr = [];
	    var edges = [];
	    var vertexSets = [];
	    var totalCost = 0;
	    var A = [];
	    positionsArr.push(currentPosition);
	    positionsArr.push(endPosition);
	    for (var i = 0; i < pokePositions.length; i++) {
	        positionsArr.push(pokePositions[i]);
	    }
	    for (var i = 0; i < positionsArr.length; i++) {
	        vertexSets.push([i]);
	        for (var j = i + 1; j < positionsArr.length; j++) {
	            var x1 = positionsArr[i].col;
	            var x2 = positionsArr[j].col;
	            var y1 = positionsArr[i].row;
	            var y2 = positionsArr[j].row;
	            var cost = Math.abs(x1 - x2) + Math.abs(y1 - y2);
	            // let cost = Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	            var edge = {
	                u: i,
	                v: j,
	                cost: cost
	            };
	            edges.push(edge);
	        }
	    }
	    edges.sort(function (a, b) {
	        return a.cost - b.cost;
	    });
	    for (var i = 0; i < edges.length; i++) {
	        var u = edges[i].u;
	        var v = edges[i].v;
	        var cost = edges[i].cost;
	        vertexSets[u].sort();
	        vertexSets[v].sort();
	        if (!objEqual(vertexSets[u], vertexSets[v])) {
	            A.push(edges[i]);
	            totalCost += cost;
	            vertexSets[u] = union(vertexSets[u], vertexSets[v]);
	            for (var j = 0; j < vertexSets[u].length; j++) {
	                if (j != u) {
	                    var vertex = vertexSets[u][j];
	                    vertexSets[vertex] = vertexSets[u];
	                }
	            }
	        }
	    }
	    node.estimateCost = totalCost;
	    if (information.type == 'AS')
	        node.estimateCost += node.pathCost;
	};
	//# sourceMappingURL=heuristic-funcs.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map