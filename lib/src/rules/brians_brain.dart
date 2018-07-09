/// Implementation of *Brians's Brain*
library cellular_automata.rules.brains_brain;

import 'package:cellular_automata/src/rules/_ca_rules.dart';
import 'package:cellular_automata/cellular_automata.dart';

enum BriansBrainStates { dead, living, dying }

class BriansBrain extends CARules<BriansBrainStates> {
  // transforms the complex state in to simple alive/dead for computation
  final Map<BriansBrainStates, int> stateValue = {
    BriansBrainStates.living: 1,
    BriansBrainStates.dead: 0,
    BriansBrainStates.dying: 0,
  };

  @override
  CellGrid<bool> gridActivity(CellGrid grid) =>
      grid.activateStatesMooresNeighbors(
          [BriansBrainStates.living], wrap, [BriansBrainStates.dying]);

  @override
  BriansBrainStates calculateState(int x, int y, CellGrid grid) {
    final BriansBrainStates currentState = grid.get(x, y);
    final List<BriansBrainStates> neighborhood =
        grid.getNeighborhood(x, y, wrap, defaultState);

    switch (currentState) {
      case BriansBrainStates.living:
        return BriansBrainStates.dying;
      case BriansBrainStates.dead:
        // calculate the sum of alive neighbors
        final sum =
            neighborhood.fold(0, (a, BriansBrainStates b) => a + stateValue[b]);
        if (sum == 2) return BriansBrainStates.living;
        break;
      case BriansBrainStates.dying:
        return BriansBrainStates.dead;
    }
    return currentState;
  }
}
