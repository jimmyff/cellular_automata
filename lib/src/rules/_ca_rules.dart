import 'package:cellular_automata/cellular_automata.dart';

/// Abstract rules class, all rules need to extend this
abstract class CARules<T> {
  bool wrap;
  T defaultState;

  Map<int, int> defaultPalette;
  T calculateState(int x, int y, CellGrid grid);

  CellGrid<bool> gridActivity(CellGrid grid) =>
      new CellGrid<bool>(grid.width, grid.height, true);

  void setup({bool wrap: true, T defaultState}) {
    this.wrap = wrap;
    this.defaultState = defaultState;
  }
}
