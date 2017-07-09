import 'package:cellular_automata/src/cell_grid.dart';

abstract class CAGenerator {
  CellGrid generate(int width, int height);
}
