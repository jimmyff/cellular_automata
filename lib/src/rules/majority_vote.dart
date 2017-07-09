/// Implementation of a Majority voting CA
library cellular_automata.rules.majority_vote;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';
import 'dart:math' as math;

class MajorityVote extends CARules {
  @override
  CellGrid<bool> gridActivity(CellGrid grid) {
    final o = new CellGrid<bool>(grid.width, grid.height, false);

    // TODO: specify somewhere
    final wrap = true;

    // scan each cell in each row for a different neighbor to right
    // then mark these two cells as active and the 4 directly above and below
    for (int y = 0; y < grid.height; y++)
      for (int x = 0; x < grid.width; x++)
        if (grid.get(x, y) != grid.get(x + 1, y, wrap, null))
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
  int calculateState(int x, int y, CellWorld world) {
    // final int currentState = world.getState(x, y);

    // TODO: specify somewhere
    final wrap = true;

    // Distribution: {STATE, [COUNT, STATE]}
    final Map<int, List<int>> distribution = {};
    world.generation().states.getNeighborhood(x, y, wrap, null)
      ..forEach((int i) {
        if (distribution[i] == null)
          distribution[i] = [1, i];
        else
          distribution[i][0]++;
      });

    // Sort the Distribution
    List<int> highestStates = [];
    int highestStateCount = 0;
    distribution.values.toList(growable: false)
      ..forEach((v) {
        if (v[0] > highestStateCount) {
          highestStateCount = v[0];
          highestStates = [v[1]];
        } else if (v[0] == highestStateCount) {
          highestStates.add(v[1]);
        }
      });

    // if a majority return that state
    if (highestStates.length == 1) return highestStates[0];

    // If not a majority - random select a winning state
    return highestStates[(new math.Random().nextInt(highestStates.length))];

    // TODO: implement other drawer handlers
  }
}
