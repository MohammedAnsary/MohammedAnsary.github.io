import { SearchProblem } from '../datastructures/search-problem';
import { Operator } from '../datastructures/operator';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { GenMaze } from '../maze/gen-maze';
import { Cell } from '../maze/cell';
import { Maze } from '../maze/maze';
import { Position } from '../maze/position';

export const  genPokeProblem = (grid:Maze):SearchProblem => {
    const maze:Cell[][] = grid.maze;
    const iState:State = new State({
        cell: grid.start,
        hatch: grid.steps,
        pokePositions: grid.pokePositions
    });
    const clone = (arr:any[]):any[] => {
        let newArr = [];
        for(let i = 0; i < arr.length; i++) {
            newArr[i] = arr[i];
        }
        return newArr;
    }
    const moveUp = (state:State):State => {
        let cell:Cell = state.val['cell'];
        let hatch:number = state.val['hatch'];
        let pokePositions:Position[] = clone(state.val['pokePositions']);
        let newRow:number = cell.position.row;
        let newColumn:number = cell.position.col;
        let newHatch = hatch > 0 ? hatch - 1 :  hatch;
        if(!cell.isUp) {
            newRow = cell.position.row - 1;

        } else {
            return null;
        }
        let newCell = maze[newRow][newColumn];
        if(newCell.isPokemons){
            let index:number = pokePositions.indexOf(newCell.position);
            if(index >= 0) {
                pokePositions.splice(index, 1);
            }
        }
        return new State({cell: newCell,
            hatch: newHatch, pokePositions: pokePositions});
    };
    const moveDown = (state:State):State => {
        let cell:Cell = state.val['cell'];
        let hatch:number = state.val['hatch'];
        let pokePositions:Position[] = clone(state.val['pokePositions']);
        let newRow:number = cell.position.row;
        let newColumn:number = cell.position.col;
        let newHatch = hatch > 0 ? hatch - 1 :  hatch;
        if(!cell.isDown) {
            newRow = cell.position.row + 1;
        } else {
            return null;
        }
        let newCell = maze[newRow][newColumn];
        if(newCell.isPokemons){
            let index:number = pokePositions.indexOf(newCell.position);
            if(index >= 0) {
                pokePositions.splice(index, 1);
            }
        }
        return new State({cell: maze[newRow][newColumn],
            hatch: newHatch, pokePositions: pokePositions});
    };

    const moveRight = (state:State):State => {
        let cell:Cell = state.val['cell'];
        let hatch:number = state.val['hatch'];
        let pokePositions:Position[] = clone(state.val['pokePositions']);
        let newRow:number = cell.position.row;
        let newColumn:number = cell.position.col;
        let newHatch = hatch > 0 ? hatch - 1 :  hatch;
        if(!cell.isRight) {
            newColumn = cell.position.col + 1;
        } else {
            return null;
        }
        let newCell = maze[newRow][newColumn];
        if(newCell.isPokemons){
            let index:number = pokePositions.indexOf(newCell.position);
            if(index >= 0) {
                pokePositions.splice(index, 1);
            }
        }
        return new State({cell: maze[newRow][newColumn],
            hatch: newHatch, pokePositions: pokePositions});
    };
    const moveLeft = (state:State):State => {
        let cell:Cell = state.val['cell'];
        let hatch:number = state.val['hatch'];
        let pokePositions:Position[] = clone(state.val['pokePositions']);
        let newRow:number = cell.position.row;
        let newColumn:number = cell.position.col;
        let newHatch = hatch > 0 ? hatch - 1 :  hatch;
        if(!cell.isLeft) {
            newColumn = cell.position.col - 1;

        } else {
            return null;
        }
        let newCell = maze[newRow][newColumn];
        if(newCell.isPokemons){
            let index:number = pokePositions.indexOf(newCell.position);
            if(index >= 0) {
                pokePositions.splice(index, 1);
            }
        }
        return new State({cell: maze[newRow][newColumn],
            hatch: newHatch, pokePositions: pokePositions});
    };

    const operators:Operator[] = [new Operator(moveUp, 1), new Operator(moveDown, 1),
        new Operator(moveRight, 1), new Operator(moveLeft, 1)];
    const goalTest = (state:State):boolean => {
        let cell:Cell = state.val['cell'];
        let hatch:number = state.val['hatch'];
        let pokePositions:Position[] = state.val['pokePositions'];
        return cell == grid.end && pokePositions.length == 0 && hatch <= 0;
    }
    const pathCost = (oldCost:number, operator:Operator) => {
        return oldCost + operator.cost;
    }
    return new SearchProblem(operators, iState, grid, goalTest, pathCost);
 }
