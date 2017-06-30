import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

// TODO: unused
enum CARulesOptions { GAME_OF_LIFE, BRIANS_BRAIN, LANGTONS_ANT, WIREWORLD }

/// Abstract rules class, all rules need to extend this
abstract class CARules {
  Map<int, int> defaultPalette;
  calculateState(int x, int y, CellWorld world);

  Array2d<bool> whatToProcess(Array2d grid) =>
      new Array2d<bool>(grid.width, grid.height, true);

  // If a rule wants to process active cells and moores neighbors they can use this
//  Array2d<bool> whatToProcessMooresLaw<T> (List<T> activeStates, Array2d grid) {
//
//    final List<T> l = grid.toList(growable: false);
//    final s = new List<bool>.filled(l.length, false, growable: false);
//    for (var i = 0; i < l.length; i++) {
//      if (stateValue[l[i]]==1) {
//        s[i] = stateValue[l[i]]==1?true:false;
//      }
//
//    }
//    return new Array2d<bool>.readonlyFrom(grid.width, s);
//  }

}
