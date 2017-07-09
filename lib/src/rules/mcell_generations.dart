/// Generations MCell parser.
library cellular_automata.rules.mcell.generations;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';

class MCellGenerations extends CARules {
  /// survival requirement
  List<int> neighborsToSurvive;

  /// neighbors that will spawn birth
  List<int> neighborsForBirth;

  // number of states (including off)
  int stateCount;

  /// Create a Generations simulation.
  MCellGenerations(
      {this.neighborsToSurvive, this.neighborsForBirth, this.stateCount});

  factory MCellGenerations.fromConfigString(String config) {
    final RegExp exp = new RegExp(r"([0-9]*)\/([0-9]*)\/([0-9]*)");
    final match = exp.firstMatch(config);

    return new MCellGenerations(
      neighborsToSurvive: match
          .group(1)
          .split('')
          .map((s) => int.parse(s))
          .toList(growable: false),
      neighborsForBirth: match
          .group(2)
          .split('')
          .map((s) => int.parse(s))
          .toList(growable: false),
      stateCount: int.parse(match.group(3)),
    );
  }

  @override
  CellGrid<bool> gridActivity(CellGrid grid) =>
      grid.activateStatesMooresNeighbors(
          new List.generate(stateCount, (int idx) => idx + 1, growable: false),
          wrap);

  @override
  int calculateState(int x, int y, CellGrid grid) {
    final int currentState = grid.get(x, y);

    // TODO: specify somewhere
    final wrap = true;

    final List<int> neighborhood = grid.getNeighborhood(x, y, wrap, null);

    // calculate the sum of alive neighbors (0 = off)
    final sum = neighborhood.fold(0, (a, b) => a + (b == 1 ? 1 : 0));

    switch (currentState) {
      case 0: // off - does meet criteria for birth?
        if (neighborsForBirth.contains(sum)) return 1;
        return 0;

      default:
        // on - does it survive due to sustainable neighbor count?
        if (currentState == 1 && neighborsToSurvive.contains(sum)) return 1;

        // aged - does it die of old age?
        if (currentState + 1 >= stateCount) return 0;

        return currentState + 1;
    }
  }
}
