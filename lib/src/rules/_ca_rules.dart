import 'package:cellular_automaton/cellular_automaton.dart';

/// Abstract rules class, all rules need to extend this
abstract class CARules {
  calculateState(int x, int y, CellWorld world);
}
