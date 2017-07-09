import 'package:cellular_automata/cellular_automata.dart';

/// Abstract renderer class, all renderers should extend this
abstract class CARenderer {
  // TODO: this should be dynamic but causes problems with stagexl implementation
  void render(CellGrid<int> renderData);
}
