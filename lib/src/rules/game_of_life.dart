/// Implementation of *Conway's Game of Life*
library cellular_automata.rules.game_of_life;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

enum GameOfLifeStates {
  DEAD,
  ALIVE,
  DEAD_UNDER_POPULATED,
  DEAD_OVER_POPULATED,
  ALIVE_BORN
}

class GameOfLife extends CARules {
  // transforms the complex state in to simple alive/dead for computation
  final Map<GameOfLifeStates, int> stateValue = {
    GameOfLifeStates.ALIVE: 1,
    GameOfLifeStates.ALIVE_BORN: 1,
    GameOfLifeStates.DEAD: 0,
    GameOfLifeStates.DEAD_UNDER_POPULATED: 0,
    GameOfLifeStates.DEAD_OVER_POPULATED: 0,
  };

  @override
  Array2d<bool> whatToProcess(Array2d grid, CellWorld world) =>
      world.activateStatesMooresNeighbors(
          [GameOfLifeStates.ALIVE_BORN, GameOfLifeStates.ALIVE], grid);

  @override
  GameOfLifeStates calculateState(int x, int y, CellWorld world) {
    final GameOfLifeStates currentState = world.getState(x, y);
    final List<GameOfLifeStates> neighborhood = world.getNeighborhood(x, y);

    // calculate the sum of alive neighbors
    final sum =
        neighborhood.fold(0, (a, GameOfLifeStates b) => a + stateValue[b]);

    switch (currentState) {
      case GameOfLifeStates.ALIVE:
      case GameOfLifeStates.ALIVE_BORN:
        if (sum < 2) return GameOfLifeStates.DEAD_UNDER_POPULATED;
        if ([2, 3].contains(sum)) return GameOfLifeStates.ALIVE;
        if (sum > 3) return GameOfLifeStates.DEAD_OVER_POPULATED;
        break;

      case GameOfLifeStates.DEAD:
      case GameOfLifeStates.DEAD_UNDER_POPULATED:
      case GameOfLifeStates.DEAD_OVER_POPULATED:
        if (sum == 3) return GameOfLifeStates.ALIVE_BORN;
    }
    return currentState;
  }
}
