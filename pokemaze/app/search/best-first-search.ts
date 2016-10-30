import { SearchProblem } from '../datastructures/search-problem';
import { Node } from '../datastructures/node';
import { State } from '../datastructures/state';
import { Operator } from '../datastructures/operator';
import { Position } from '../maze/position';
import { GeneralSearch } from './general-search';

export const BestFirstSearch = (problem:SearchProblem,
                                evalInfo:any,
                                evalFunc:(node:Node, information:any) => void):GeneralSearch => {
    let queuingFunc = (nodes:Node[], node:Node):void => {
        evalFunc(node, evalInfo);
        for(let i = 0; i < nodes.length; i++) {
            if(nodes[i].estimateCost > node.estimateCost) {
                    nodes.splice(i, 0, node);
                    return;
            }
        }
        nodes.push(node);
    }
    return new GeneralSearch(queuingFunc);

}
