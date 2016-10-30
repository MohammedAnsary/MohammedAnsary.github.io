import { GenMaze } from './maze/gen-maze';
import { Search } from "./search/search";

const pokeMaze = GenMaze(5, 5);
console.log(pokeMaze);

// console.log('Strategy: BF');
// Search(pokeMaze, 'BF', false);
//
// console.log('Strategy: UC');
// Search(pokeMaze, 'UC', false);
//
// console.log('Strategy: DF');
// Search(pokeMaze, 'DF', false);
//
// console.log('Strategy: ID');
// Search(pokeMaze, 'ID', false);
//
// console.log('Strategy: GR1');
// Search(pokeMaze, 'GR1', false);
//
// console.log('Strategy: AS1');
// Search(pokeMaze, 'AS1', false);
//
// console.log('Strategy: GR2');
// Search(pokeMaze, 'GR2', false);
//
// console.log('Strategy: AS2');
// Search(pokeMaze, 'AS2', false);
//
// console.log('Strategy: GR3');
// Search(pokeMaze, 'GR3', false);

console.log('Strategy: AS3');
Search(pokeMaze, 'AS3', true);
