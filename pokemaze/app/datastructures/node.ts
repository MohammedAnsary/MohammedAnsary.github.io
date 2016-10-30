import { State } from './state';
import { Operator } from './operator';
export class Node {
    state:State;
    parent:Node;
    operator:Operator;
    depth:number;
    pathCost:number;
    estimateCost:number;

    constructor(state:State,
    parent:Node,
    operator:Operator,
    depth:number,
    pathCost:number) {
        this.state = state;
        this.parent = parent;
        this.operator = operator;
        this.depth = depth;
        this.pathCost = pathCost;
        this.estimateCost = 0;
    }
}
