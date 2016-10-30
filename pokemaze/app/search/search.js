"use strict";
var queuing_funcs_1 = require('./queuing-funcs');
var poke_problem_1 = require('../pokemon/poke-problem');
var general_search_1 = require('./general-search');
var depth_limited_search_1 = require('./depth-limited-search');
var best_first_search_1 = require('./best-first-search');
var heuristic_funcs_1 = require('../pokemon/heuristic-funcs');
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