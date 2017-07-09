/// Implementation of *Brians's Brain*
library cellular_automata.rules.brains_brain;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';

enum BriansBrainStates { OFF, ON, DYING }

class BriansBrain extends CARules {
  // transforms the complex state in to simple alive/dead for computation
  final Map<BriansBrainStates, int> stateValue = {
    BriansBrainStates.ON: 1,
    BriansBrainStates.OFF: 0,
    BriansBrainStates.DYING: 0,
  };

  @override
  CellGrid<bool> gridActivity(CellGrid grid) =>
      grid.activateStatesMooresNeighbors(
          [BriansBrainStates.ON], wrap, [BriansBrainStates.DYING]);

  @override
  BriansBrainStates calculateState(int x, int y, CellGrid grid) {
    final BriansBrainStates currentState = grid.get(x, y);
    final List<BriansBrainStates> neighborhood =
        grid.getNeighborhood(x, y, wrap, defaultState);

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
