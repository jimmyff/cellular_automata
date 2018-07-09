/// Simple implementation of *Conway's Game of Life* (binary state)
library cellular_automata.rules.game_of_life_simple;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';

class GameOfLifeSimple extends CARules<bool> {
  @override
  CellGrid<bool> gridActivity(CellGrid grid) =>
      grid.activateStatesMooresNeighbors([true], wrap);

  @override
  bool calculateState(int x, int y, CellGrid grid) {
    final bool state = grid.get(x, y);
    final List<bool> neighborhood =
        grid.getNeighborhood(x, y, wrap, defaultState);

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
