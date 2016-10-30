import { Node } from '../datastructures/node';

export const end = (nodes:Node[], node:Node):void => {
    nodes.push(node);
}

export const ordered = (nodes:Node[], node:Node):void => {
    for(let i = 0; i < nodes.length; i++) {
        if(nodes[i].pathCost > node.pathCost) {
                nodes.splice(i, 0, node);
                return;
        }
    }
    nodes.push(node);
}


export const front = (nodes:Node[], node:Node):void => {
    nodes.unshift(node);
}
