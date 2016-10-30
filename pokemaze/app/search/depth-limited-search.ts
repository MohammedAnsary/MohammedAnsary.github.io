import { SearchProblem } from '../datastructures/search-problem';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Operator } from '../datastructures/operator';
import { front } from './queuing-funcs';

export class DepthLimitedSearch {
    private nodes:Node[];
    expandedNodes:number;
    repeatedStates:number;

    constructor() {
        this.nodes = [];
        this.expandedNodes = 0;
        this.repeatedStates = 0;
    }

    private objEqual(obj1:any, obj2:any):boolean {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    search(problem:SearchProblem, depth:number):any {
        this.expandedNodes = 0;
        this.repeatedStates = 0; 
        this.nodes.push(new Node(problem.initState, null, null, 0, 0));
        while(this.nodes.length > 0) {
            let node:Node = this.nodes.shift();
            let newDepth:number = node.depth + 1;
            if(newDepth > depth) {
                continue;
            }
            this.expandedNodes++;
            if(problem.goalTest(node.state)) {
                console.log(`Passed goalTest for depth: ${depth}`);
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
                          this.repeatedStates = this.repeatedStates + 1;
                          break;
                        }
                        parent = parent.parent;
                    }
                    if(!nonRepeated) continue;
                    let newNode = new Node(newState, node, problem.operators[i],
                    newDepth,
                    problem.pathCostFunc(node.pathCost, problem.operators[i]));
                    front(this.nodes, newNode);
                }
            }
        }
        console.log(`No solution for depth: ${depth}`)
        console.log(`Nodes expanded: ${this.expandedNodes}`)
        return false;
    }
}
