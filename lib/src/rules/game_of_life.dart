import 'package:cellular_automaton/src/rules/_ca_rules.dart';
import 'package:cellular_automaton/cellular_automaton.dart';

// TODO: currently unused
enum GameOfLifeCellState {
  DEAD,
  ALIVE,
  DEAD_UNDER_POPULATED,
  DEAD_OVER_POPULATED,
  ALIVE_BORN
}

/// Implementation of Conway's Game of Life CA rules
class GameOfLife extends CARules {
  // TODO: currently unused
  int reduceState(GameOfLifeCellState state) {
    switch (state) {
      case GameOfLifeCellState.DEAD:
      case GameOfLifeCellState.DEAD_UNDER_POPULATED:
      case GameOfLifeCellState.DEAD_OVER_POPULATED:
        return 0;
      case GameOfLifeCellState.ALIVE:
      case GameOfLifeCellState.ALIVE_BORN:
        return 1;
      default:
        throw 'Unknown state: $state';
    }
  }

  int calculateState(int x, int y, CellWorld world) {
    List<int> neighborhood = world.getNeighborhood(x, y);
    var sum = neighborhood.reduce((a, b) => a + b);
//    print ('$x $y : state: ${world.state(x, y)} sum: $sum : $neighborhood');

    if (world.state(x, y) == 1) {
      // if we are alive

      // under population
      if (sum < 2)
        return 0;

      // live on
      else if ([2, 3].contains(sum))
        return 1;

      // overpopulation
      else if (sum > 3) return 0;
    } else // dead cells
    if (sum == 3) return 1; // born!

    return 0; // still dead
  }
}
