/// Generations MCell parser.
library cellular_automata.rules.mcell.generations;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

//enum MCellGenerationsRuleOptions {
//  starWars,
//  briansBrain
//}
//
//Map<MCellGenerationsRuleOptions, String> MCellGenerationsRule = {
//  MCellGenerationsRuleOptions.starWars : '',
//  MCellGenerationsRuleOptions.briansBrain : ''
//}

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
    print(config);
    final match = exp.firstMatch(config);
    print(
        'config 1: ${match.group(1)} 2: ${match.group(2)} 3: ${match.group(3)} ');

    return new MCellGenerations(
      neighborsToSurvive: match.group(1).split('').map((s) => int.parse(s)),
      neighborsForBirth: match.group(2).split('').map((s) => int.parse(s)),
      stateCount: int.parse(match.group(3)),
    );
  }

  @override
  Array2d<bool> whatToProcess(Array2d grid, CellWorld world) =>
      world.activateStatesMooresNeighbors(
          new List.generate(stateCount, (int idx) => idx + 1, growable: false),
          grid);

  @override
  int calculateState(int x, int y, CellWorld world) {
    final int currentState = world.getState(x, y);

    final List<int> neighborhood = world.getNeighborhood(x, y);

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