import { State } from './state';
import { Node } from './node';
import { Operator } from './operator';
export class SearchProblem {
    operators:Operator[];
    initState:State;
    stateSpace:any;
    goalTest:(state:State) => boolean;
    pathCostFunc:(oldCost:Number, operator:Operator) => number;

    constructor(operators:Operator[],
    initState:State,
    stateSpace:any,
    goalTest:(state:State) => boolean,
    pathCostFunc:(oldCost:Number, operator:Operator) => number) {
        this.operators = operators;
        this.initState = initState;
        this.stateSpace = stateSpace;
        this.goalTest = goalTest;
        this.pathCostFunc = pathCostFunc;
    }

}
