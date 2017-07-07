/// A generation snapshot, contains states and activity details for processing
library cellular_automata.generation;

import 'package:cellular_automata/src/util/array_2d.dart';

class Generation<T> {
  final int count;
  final int width;
  final int height;
  final Array2d<T> states;
  final Array2d<bool> activity;
  final int activeCells;

  Generation(this.count, this.width, this.height, this.states, this.activity)
      : activeCells = activity.where((b) => b).length;
}
