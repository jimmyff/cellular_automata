import 'package:cellular_automaton/src/rules/_ca_rules.dart';
import 'package:cellular_automaton/cellular_automaton.dart';

enum GameOfLifeStates {
  DEAD,
  ALIVE,
  DEAD_UNDER_POPULATED,
  DEAD_OVER_POPULATED,
  ALIVE_BORN
}

/// Implementation of Conway's Game of Life CA rules
class GameOfLife extends CARules {
  int reduceState(GameOfLifeStates state) {
    switch (state) {
      case GameOfLifeStates.DEAD:
      case GameOfLifeStates.DEAD_UNDER_POPULATED:
      case GameOfLifeStates.DEAD_OVER_POPULATED:
        return 0;
      case GameOfLifeStates.ALIVE:
      case GameOfLifeStates.ALIVE_BORN:
        return 1;
      default:
        throw 'Unknown state: $state';
    }
  }

  GameOfLifeStates calculateState(int x, int y, CellWorld world) {
    GameOfLifeStates currentState = world.getState(x, y);
    List<GameOfLifeStates> neighborhood = world.getNeighborhood(x, y);

    // calculate the sum of alive neighbors
    int sum =
        neighborhood.fold(0, (a, GameOfLifeStates b) => a + reduceState(b));

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
