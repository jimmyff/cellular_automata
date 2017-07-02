import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

// TODO: unused
enum CARulesOptions { GAME_OF_LIFE, BRIANS_BRAIN, LANGTONS_ANT, WIREWORLD }

/// Abstract rules class, all rules need to extend this
abstract class CARules {
  Map<int, int> defaultPalette;
  calculateState(int x, int y, CellWorld world);

  Array2d<bool> whatToProcess(Array2d grid, CellWorld world) =>
      new Array2d<bool>(grid.width, grid.height, true);
}
