import { SearchProblem } from '../datastructures/search-problem';
import { Operator } from '../datastructures/operator';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Direction } from '../datastructures/direction';
import { GenMaze } from '../maze/gen-maze';
import { Cell } from '../maze/cell';
import { Maze } from '../maze/maze';
import { Position } from '../maze/position';

function objEqual(obj1:any, obj2:any):boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function union(set1:number[], set2: number[]) {
    return set1.concat(set2.filter((el) => {
        return set1.indexOf(el) === -1;
    }));
}

export const Manhattan = (node:Node, information:any):void => {
    let cell:Cell = node.state.val['cell'];
    let x = cell.position.col;
    let y = cell.position.row;
    let endPoint = information.endPoint;
    let dx = Math.abs(x - endPoint.col);
    let dy = Math.abs(y - endPoint.row);
    node.estimateCost = dx + dy;
    if(information.type == 'AS')
        node.estimateCost += node.pathCost;
}

export const FD = (node:Node, information:any):void => {
    let pokePositions:Position[] = node.state.val['pokePositions'];
    let positionsArr:Position[] = [];
    positionsArr.push(information.endPoint);
    for(let i = 0; i < pokePositions.length; i++) {
        positionsArr.push(pokePositions[i]);
    }
    let maxCost = 0;
    for(let i = 0 ; i < positionsArr.length ; ++i) {
      const x = positionsArr[i].col;
      const y = positionsArr[i].row;
      for(let j = i + 1 ; j < positionsArr.length; ++j) {
        const dx = Math.abs(x - positionsArr[j].col);
        const dy = Math.abs(y - positionsArr[j].row);
        const manh = dx + dy;
        if(manh > maxCost) {
          maxCost = manh;
        }
      }
    }
    node.estimateCost = maxCost;
    if(information.type == 'AS')
        node.estimateCost += node.pathCost;
}


export const MST = (node:Node, information:any):void => {
    let currentPosition:Position = node.state.val['cell'].position;
    let pokePositions:Position[] = node.state.val['pokePositions'];
    let endPosition:Position = information.endPoint;
    let positionsArr:Position[] = [];
    let edges = [];
    let vertexSets = [];
    let totalCost = 0;
    let A = [];

    positionsArr.push(currentPosition);
    positionsArr.push(endPosition);
    for(let i = 0; i < pokePositions.length; i++) {
        positionsArr.push(pokePositions[i]);
    }
    for(let i = 0; i < positionsArr.length; i++) {
        vertexSets.push([i]);
        for(let j = i + 1; j < positionsArr.length; j++) {
            let x1 = positionsArr[i].col;
            let x2 = positionsArr[j].col;
            let y1 = positionsArr[i].row;
            let y2 = positionsArr[j].row;
            let cost = Math.abs(x1 - x2) + Math.abs(y1 - y2);
            // let cost = Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            let edge = {
                u: i,
                v: j,
                cost: cost
            }
            edges.push(edge);
        }
    }

    edges.sort((a,b) => {
        return a.cost - b.cost;
    });

    for(let i = 0; i < edges.length; i++) {
        let u = edges[i].u;
        let v = edges[i].v;
        let cost = edges[i].cost;
        vertexSets[u].sort();
        vertexSets[v].sort();
        if(!objEqual(vertexSets[u], vertexSets[v])) {
            A.push(edges[i]);
            totalCost += cost;
            vertexSets[u] = union(vertexSets[u], vertexSets[v]);
            for(let j = 0; j < vertexSets[u].length; j++) {
                if(j != u) {
                    let vertex = vertexSets[u][j];
                     vertexSets[vertex] = vertexSets[u];
                }
            }
        }
    }

    node.estimateCost = totalCost;
    if(information.type == 'AS')
        node.estimateCost += node.pathCost;
}
