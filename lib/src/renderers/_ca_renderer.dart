import 'package:cellular_automata/src/util/array_2d.dart';

/// Abstract renderer class, all renderers should extend this
abstract class CARenderer {
  // TODO: this should be dynamic but causes problems with stagexl implementation
  void render(Array2d<int> renderData);
}
