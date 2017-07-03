import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

/// Simple implementation of Conway's Game of Life (binary state)
class GameOfLifeSimple extends CARules {
  @override
  Array2d<bool> whatToProcess(Array2d grid, CellWorld world) =>
      world.activateStatesMooresNeighbors([true], grid);

  @override
  bool calculateState(int x, int y, CellWorld world) {
    final bool state = world.getState(x, y);
    final List<bool> neighborhood = world.getNeighborhood(x, y);
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
