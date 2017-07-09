import 'package:cellular_automata/cellular_automata.dart';

/// Abstract rules class, all rules need to extend this
abstract class CARules {
  bool wrap;
  dynamic defaultState;

  Map<int, int> defaultPalette;
  calculateState(int x, int y, CellGrid grid);

  CellGrid<bool> gridActivity(CellGrid grid) =>
      new CellGrid<bool>(grid.width, grid.height, true);

  void setup({bool wrap: true, dynamic defaultState: null}) {
    this.wrap = wrap;
    this.defaultState = defaultState;
  }
}
