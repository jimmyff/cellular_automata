import 'package:cellular_automata/cellular_automata.dart';

// TODO: unused
enum CARulesOptions { GAME_OF_LIFE, BRIANS_BRAIN, LANGTONS_ANT, WIREWORLD }

/// Abstract rules class, all rules need to extend this
abstract class CARules {
  Map<int, int> defaultPalette;
  calculateState(int x, int y, CellWorld world);
}
