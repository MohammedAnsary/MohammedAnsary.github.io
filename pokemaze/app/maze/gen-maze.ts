import { Maze } from './maze'
export const GenMaze = (M, N) => {
  let maze:Maze = new Maze();
  maze.genMaze(M, N);
  return maze;
}
