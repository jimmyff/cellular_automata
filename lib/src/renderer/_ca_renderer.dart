import 'package:cellular_automaton/cellular_automaton.dart';

/// Abstract renderer class, all renderers should extend this
abstract class CARenderer {
  void render(CellWorld world);
}
