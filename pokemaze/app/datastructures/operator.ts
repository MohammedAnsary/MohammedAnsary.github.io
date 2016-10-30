import { State } from './state';

export class Operator {
    func:((oldState:State) => State);
    cost:number;

    constructor(func:(oldState:State) => State, cost:number) {
        this.func = func;
        this.cost = cost;
    }

    apply(state:State):State {
        return this.func(state);
    }
}
