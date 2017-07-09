/// A generation snapshot, contains states and activity details for processing
library cellular_automata.generation;

import 'package:cellular_automata/src/cell_grid.dart';

class Generation<T> {
  final int count;
  final int width;
  final int height;
  final CellGrid<T> states;
  final CellGrid<bool> activity;
  final int activeCells;

  Generation(this.count, this.width, this.height, this.states, this.activity)
      : activeCells = activity.where((b) => b).length;
}
