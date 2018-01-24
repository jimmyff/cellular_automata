/// Implementation of a Majority voting CA
library cellular_automata.rules.majority_vote;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';
import 'dart:math' as math;

class MajorityVote extends CARules {
  @override
  CellGrid<bool> gridActivity(CellGrid grid) {
    final o = new CellGrid<bool>(grid.width, grid.height, false);

    // scan each cell in each row for a different neighbor to right
    // then mark these two cells as active and the 4 directly above and below
    for (int y = 0; y < grid.height; y++)
      for (int x = 0; x < grid.width; x++)
        if (grid.get(x, y) != grid.get(x + 1, y, wrap, defaultState))
          o
            ..set(x, y, true, wrap)
            ..set(x + 1, y - 1, true, wrap)
            ..set(x, y, true, wrap)
            ..set(x + 1, y, true, wrap)
            ..set(x, y + 1, true, wrap)
            ..set(x + 1, y + 1, true, wrap);

    return o;
  }

  @override
  bool calculateState(int x, int y, CellGrid grid) {
    // Distribution: {STATE, COUNT}
    final Map<bool, int> distribution = {true: 0, false: 0};
    final List<bool> neighborhood =
        grid.getNeighborhood(x, y, wrap, defaultState);

    for (int i = 0, l = neighborhood.length; i < l; i++)
      distribution[neighborhood[i]]++;

    // At the moment Majority Vote is type bool so we won't itterate
    // in the future we may want to have have more than 2 states

    if (distribution[false] == distribution[true])
      return new math.Random().nextInt(2) == 1;
    else
      return (distribution[true] > distribution[false]);
  }
}
