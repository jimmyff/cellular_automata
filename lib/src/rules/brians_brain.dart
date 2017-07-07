/// Implementation of *Brians's Brain*
library cellular_automata.rules.brains_brain;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

enum BriansBrainStates { OFF, ON, DYING }

class BriansBrain extends CARules {
  // transforms the complex state in to simple alive/dead for computation
  final Map<BriansBrainStates, int> stateValue = {
    BriansBrainStates.ON: 1,
    BriansBrainStates.OFF: 0,
    BriansBrainStates.DYING: 0,
  };

  @override
  Array2d<bool> whatToProcess(Array2d grid, CellWorld world) =>
      world.activateStatesMooresNeighbors(
          [BriansBrainStates.ON], grid, [BriansBrainStates.DYING]);

  @override
  BriansBrainStates calculateState(int x, int y, CellWorld world) {
    final BriansBrainStates currentState = world.getState(x, y);
    final List<BriansBrainStates> neighborhood = world.getNeighborhood(x, y);

    switch (currentState) {
      case BriansBrainStates.ON:
        return BriansBrainStates.DYING;
      case BriansBrainStates.OFF:
        // calculate the sum of alive neighbors
        final sum =
            neighborhood.fold(0, (a, BriansBrainStates b) => a + stateValue[b]);
        if (sum == 2) return BriansBrainStates.ON;
        break;
      case BriansBrainStates.DYING:
        return BriansBrainStates.OFF;
    }
    return currentState;
  }
}
