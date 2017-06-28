import 'package:cellular_automaton/src/rules/_ca_rules.dart';
import 'package:cellular_automaton/cellular_automaton.dart';
import 'package:stagexl/src/ui/color.dart';

enum GameOfLifeStates {
  DEAD,
  ALIVE,
  DEAD_UNDER_POPULATED,
  DEAD_OVER_POPULATED,
  ALIVE_BORN
}

/// Implementation of Conway's Game of Life CA rules
class GameOfLife extends CARules {
  final Map<int, int> defaultPalette = {
    GameOfLifeStates.DEAD.index: Color.Blue,
    GameOfLifeStates.DEAD_UNDER_POPULATED.index: Color.DarkBlue,
    GameOfLifeStates.DEAD_OVER_POPULATED.index: Color.BlueViolet,
    GameOfLifeStates.ALIVE.index: Color.Yellow,
    GameOfLifeStates.ALIVE_BORN.index: Color.LightYellow,
  };

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

  int calculateState(int x, int y, CellWorld world) {
    GameOfLifeStates currentState = GameOfLifeStates.values[world.state(x, y)];
    List<int> neighborhood = world.getNeighborhood(x, y);

    // calculate the sum of alive neighbors
    int sum = neighborhood.fold(
        0, (a, b) => a + reduceState(GameOfLifeStates.values[b]));

//    print('$x $y : state: ${GameOfLifeStates.values[world.state(x, y)].toString()} sum: $sum : $neighborhood');

    switch (currentState) {
      case GameOfLifeStates.ALIVE:
      case GameOfLifeStates.ALIVE_BORN:
        if (sum < 2) return GameOfLifeStates.DEAD_UNDER_POPULATED.index;
        if ([2, 3].contains(sum)) return GameOfLifeStates.ALIVE.index;
        if (sum > 3) return GameOfLifeStates.DEAD_OVER_POPULATED.index;
        break;

      case GameOfLifeStates.DEAD:
      case GameOfLifeStates.DEAD_UNDER_POPULATED:
      case GameOfLifeStates.DEAD_OVER_POPULATED:
        if (sum == 3) return GameOfLifeStates.ALIVE_BORN.index;

        return currentState.index;
        return GameOfLifeStates.DEAD.index;
        break;
    }
  }
}
