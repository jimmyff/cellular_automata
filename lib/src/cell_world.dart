import 'package:cellular_automaton/cellular_automaton.dart';
import 'package:cellular_automaton/src/util/array_2d.dart';

/// Stores the world state
class CellWorld {
  Array2d<int> _grid;
  List<Array2d<int>> _history = [];

  bool wrap = true;
  final int defaultValue = 0;

  int get width => _grid.width;
  int get height => _grid.height;

  int history(int generations, int x, int y, [Array2d<int> grid]) {
    if (_history.length < generations) return defaultValue;
    return state(x, y, _history[_history.length - generations]);
  }

  int state(int x, int y, [Array2d<int> grid]) {
    int _x, _y;

    if (wrap) {
      _x = x < 0 ? x + width : (x >= width ? x - width : x);
      _y = y < 0 ? y + height : (y >= height ? y - height : y);
    } else {
      _x = x < 0 || x > (width - 1) ? defaultValue : x;
      _y = y < 0 || y > (height - 1) ? defaultValue : y;
    }
    return (grid ?? _grid).get(_x, _y);
  }

  void test() {}

  List<int> getNeighborhood(int x, int y, {String system: 'moore'}) {
    return [
      state(x - 1, y - 1),
      state(x, y - 1),
      state(x + 1, y - 1),
      state(x - 1, y),
      state(x + 1, y),
      state(x - 1, y + 1),
      state(x, y + 1),
      state(x + 1, y + 1)
    ];
  }

  CellWorld({int width, int height}) {
    _grid = new Array2d<int>(width ?? 128, height ?? 128);
  }

  applyRules(CARules rules) {
    final newGrid = new Array2d(_grid.width, _grid.height);

    _history.add(_grid);
    if (_history.length > 10) _history.removeRange(0, 1);

    for (int x = 0; x < width; x++)
      for (int y = 0; y < height; y++)
        setState(x, y, rules.calculateState(x, y, this), newGrid);

    _grid = newGrid;
  }

  applyFunction(Function func) {
    for (int x = 0; x < width; x++)
      for (int y = 0; y < height; y++) setState(x, y, func(x, y));
  }

  setState(int x, int y, int value, [Array2d<int> grid]) {
    (grid ?? _grid).set(x, y, value);
  }
}
