import { Maze } from '../maze/maze';
import { end, front, ordered } from './queuing-funcs';
import { genPokeProblem } from '../pokemon/poke-problem';
import { GeneralSearch } from './general-search';
import { SearchProblem } from '../datastructures/search-problem';
import { DepthLimitedSearch } from './depth-limited-search';
import { BestFirstSearch } from './best-first-search';
import { Manhattan, MST, FD } from '../pokemon/heuristic-funcs';
declare var Handlebars:any;
declare var $:any;

export const Search = (maze:Maze, strategy:string, visualise:boolean) => {
    let result;
    let problem:SearchProblem = genPokeProblem(maze);
    // Called by BF, UC and DF.
    let doGeneralSearch = (problem:SearchProblem, queuingFunc:any):void => {
        let searchInstance = new GeneralSearch(queuingFunc);
        result = searchInstance.search(problem);
        // console.log(result);
        console.log(`No. of nodes: ${searchInstance.expandedNodes}`);
        console.log(`No. of repeated states: ${searchInstance.repeatedStates}`);
    }
    // Called by ID.
    let doIterativeDeepening = (problem:SearchProblem) => {
        let searchInstance:DepthLimitedSearch = new DepthLimitedSearch();
        for( let depth = 0 ; depth < Infinity ; ++depth) {
          result = searchInstance.search(problem, depth);
          if(result) {
            // printing success
            console.log(`No. of nodes: ${searchInstance.expandedNodes}`);
            console.log(`No. of repeated states: ${searchInstance.repeatedStates}`);
            return result;
          }
        }
        console.log( "Could not find soultion using Itertive Deepining");
    }
    //Called by GRi and ASi
    let doBestFirstSearch = (problem:SearchProblem, information:any, evalFunc:any):void => {
        let searchInstance = BestFirstSearch(problem, information, evalFunc);
        result = searchInstance.search(problem);
        console.log(`No. of nodes: ${searchInstance.expandedNodes}`);
        console.log(`No. of repeated states: ${searchInstance.repeatedStates}`);
    }

    let renderMazeView = () => {
        Handlebars.registerHelper( 'concat', (a, b) => {
            return a + '_' + b;
        });
        let template:(param?:any) => any = Handlebars.templates['maze'];
        let host:HTMLElement = document.getElementById('maze');
        let data = {
            row: [],
            start: maze.start,
            end: maze.end
        };

        for(let i = 0; i < maze.maze.length; i++){
          let col = { col: maze.maze[i] };
          data.row.push(col);
        }

        host.innerHTML = template(data);

        let resultNodes = [];
        while(result != null) {
            resultNodes.push(result)
            result = result.parent;
        }

        let playerOffsetTop = 115;
        let playerOffsetLeft = 30;
        let step = 75;

        let moveCharacter = () => {
            let node = resultNodes.pop();
            let row = node.state.val['cell']['position'].row;
            let col = node.state.val['cell']['position'].col;
            if(node.operator) {
                let src = 'app/assets/img/'
                switch(node.operator.func.name) {
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
                    default: {}
                }
                $('#player img').attr('src', src);
            }
            setTimeout(() => {
                $('#player').animate({
                    top: playerOffsetTop + step * row,
                    left: playerOffsetLeft + step * col
                }, 300);
                setTimeout(() => {
                    $('#' + row + '_' + col + ' img').remove();
                }, 300);
            }, 300);

            if(resultNodes.length > 0)
                setTimeout(moveCharacter, 800);
            else
                setTimeout(() => {
                    $('#player img').attr('src', 'app/assets/img/down.png');
                }, 700);

        }
        moveCharacter();
    }

    console.log('Search Started');
    switch(strategy) {
        case 'BF': {
            doGeneralSearch(problem, end);
            break;
        }
        case 'UC': {
            doGeneralSearch(problem, ordered);
            break;
        }
        case 'DF': {
            doGeneralSearch(problem, front);
            break;
        }
        case 'ID': {
            doIterativeDeepening(problem);
            break;
        }
        case 'GR1': {
            let info = {
                endPoint: problem.stateSpace.end.position,
                type: 'GR'
            }
            doBestFirstSearch(problem, info, Manhattan);
            break;
        }
        case 'AS1': {
            let info = {
                endPoint: problem.stateSpace.end.position,
                type: 'AS'
            }
            doBestFirstSearch(problem, info, Manhattan);
            break;
        }
        case 'GR2': {
            let info = {
                endPoint: problem.stateSpace.end.position,
                type: 'GR'
            }
            doBestFirstSearch(problem, info, MST);
            break;
        }
        case 'AS2': {
            let info = {
                endPoint: problem.stateSpace.end.position,
                type: 'AS'
            }
            doBestFirstSearch(problem, info, MST);
            break;
        }
        case 'GR3': {
            let info = {
                endPoint: problem.stateSpace.end.position,
                type: 'GR'
            }
            doBestFirstSearch(problem, info, FD);
            break;
        }
        case 'AS3': {
            let info = {
                endPoint: problem.stateSpace.end.position,
                type: 'AS'
            }
            doBestFirstSearch(problem, info, FD);
            break;
        }
        default: {}
    }
    if(visualise) {
        renderMazeView();
    }
}
