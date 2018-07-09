/// Implementation of *Conway's Game of Life*
library cellular_automata.rules.game_of_life;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';

enum GameOfLifeStates {
  alive,
  aliveBorn,
  dead,
  deadUnderPopulated,
  deadOverPopulated,
}

class GameOfLife extends CARules<GameOfLifeStates> {
  // transforms the complex state in to simple alive/dead for computation
  final Map<GameOfLifeStates, int> stateValue = {
    GameOfLifeStates.alive: 1,
    GameOfLifeStates.aliveBorn: 1,
    GameOfLifeStates.dead: 0,
    GameOfLifeStates.deadUnderPopulated: 0,
    GameOfLifeStates.deadOverPopulated: 0,
  };

  @override
  CellGrid<bool> gridActivity(CellGrid grid) =>
      grid.activateStatesMooresNeighbors(
          [GameOfLifeStates.aliveBorn, GameOfLifeStates.alive], wrap);

  @override
  GameOfLifeStates calculateState(int x, int y, CellGrid grid) {
    final GameOfLifeStates currentState = grid.get(x, y);
    final List<GameOfLifeStates> neighborhood =
        grid.getNeighborhood(x, y, wrap, defaultState);

    // calculate the sum of alive neighbors
    final sum =
        neighborhood.fold(0, (a, GameOfLifeStates b) => a + stateValue[b]);

    switch (currentState) {
      case GameOfLifeStates.alive:
      case GameOfLifeStates.aliveBorn:
        if (sum < 2) return GameOfLifeStates.deadUnderPopulated;
        if ([2, 3].contains(sum)) return GameOfLifeStates.alive;
        if (sum > 3) return GameOfLifeStates.deadOverPopulated;
        break;

      case GameOfLifeStates.dead:
      case GameOfLifeStates.deadUnderPopulated:
      case GameOfLifeStates.deadOverPopulated:
        if (sum == 3) return GameOfLifeStates.aliveBorn;
    }
    return currentState;
  }
}
