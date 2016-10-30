import { SearchProblem } from '../datastructures/search-problem';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Operator } from '../datastructures/operator';
import { Position } from '../maze/position';

export class GeneralSearch {
    private nodes:Node[];
    private queuingFunc:(nodes:Node[], node:Node) => void;
    expandedNodes:number;
    repeatedStates:number;

    constructor(queuingFunc:(nodes:Node[], node:Node) => void) {
        this.nodes = [];
        this.queuingFunc = queuingFunc;
        this.expandedNodes = 0;
        this.repeatedStates = 0;
    }

    objEqual(obj1:any, obj2:any):boolean {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    search(problem:SearchProblem):any {
        this.nodes.push(new Node(problem.initState, null, null, 0, 0));
        let min  = Infinity;
        while(this.nodes.length > 0) {
            let node:Node = this.nodes.shift();
            this.expandedNodes++;
            if(problem.goalTest(node.state)) {
                for(let i = 0; i < this.nodes.length; i++) {
                    min = Math.min(this.nodes[i].estimateCost, min);
                }
                console.log(`Passed goalTest and node depth is ${node.depth}`);
                return node;
            }
            for(let i = 0; i < problem.operators.length; i++) {
                let newState:State = problem.operators[i].apply(node.state);
                let parent:Node = node;
                let nonRepeated:boolean = true;
                if(newState) {
                    while(parent != null) {
                        let oldState:State = parent.state;
                        nonRepeated = nonRepeated && !this.objEqual(newState, oldState);
                        if(!nonRepeated){
                          //console.log(" *********************Found repeated state *****************");
                          this.repeatedStates = this.repeatedStates + 1;
                          break;
                        }
                        parent = parent.parent;
                    }
                    if(!nonRepeated) continue;
                    let newNode = new Node(newState, node, problem.operators[i],
                    node.depth + 1,
                    problem.pathCostFunc(node.pathCost, problem.operators[i]));
                    this.queuingFunc(this.nodes, newNode);
                }
            }
        }
        console.log('No solution')
        console.log(`Nodes expanded: ${this.expandedNodes}`)
        return false;
    }
}
