/// Simple implementation of *Conway's Game of Life* (binary state)
library cellular_automata.rules.game_of_life_simple;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';

// TODO: don't hardcode wrap

class GameOfLifeSimple extends CARules {
  @override
  CellGrid<bool> gridActivity(CellGrid grid) =>
      grid.activateStatesMooresNeighbors([true], true);

  @override
  bool calculateState(int x, int y, CellWorld world) {
    final bool state = world.generation().states.get(x, y);
    final List<bool> neighborhood =
        world.generation().states.getNeighborhood(x, y, world.wrap, false);

    final sum = neighborhood.fold(0, (a, bool b) => a + (b ? 1 : 0));

    if (state && sum < 2)
      return false;
    else if (state && [2, 3].contains(sum))
      return true;
    else if (state && sum > 3)
      return false;
    else if (!state && sum == 3)
      return true;
    else
      return false;
  }
}
