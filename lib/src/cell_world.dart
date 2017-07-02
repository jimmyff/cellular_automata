import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

/// Stores the world state
class CellWorld<T> {
  final List<Array2d<T>> _generations = [];

  bool wrap = true;

  int cellsProcessedCounter;

  final T defaultState;
  final int width;
  final int height;

  /// returns the state of the world a number of generations ago
  Array2d<T> generation([int ago = 0]) {
    if (_generations.length - 1 < ago) return null;
    return _generations[_generations.length - 1 - ago];
  }

  /// sets the state of a cell
  void setState(int x, int y, T newState, [Array2d<T> array2d]) {
    (array2d ?? generation()).set(x, y, newState);
  }

  int _wrap(int v, int min, int max) =>
      min != null && v < min ? v + max : (v >= max ? v - max : v);

  /// returns the state of a cell
  T getState(int x, int y, [int generationsAgo = 0]) {
    int _x, _y;

    if (wrap) {
      _x = _wrap(x, 0, width);
      _y = _wrap(y, 0, height);
    } else {
      _x = x < 0 || x > (width - 1) ? defaultState : x;
      _y = y < 0 || y > (height - 1) ? defaultState : y;
    }
    return generation(generationsAgo)?.get(_x, _y) ?? defaultState;
  }

  // TODO: need to move to array_2d
  int _getIndex(int x, int y) {
    assert(x >= 0 && x < width);
    assert(y >= 0 && y < height);
    return x + (y * width);
  }

  _neighborsIndices(int x, int y) {
    final List<int> adj = new List<int>();
    // moores
    for (int k = y - 1; k <= y + 1; k++) {
      for (int j = x - 1; j <= y + 1; j++) {
        if (j != x || k != y) {
          adj.add(_getIndex(_wrap(j, 0, width), _wrap(k, 0, height)));
        }
      }
    }
    return adj;
  }

  /// returns neighboring cells
  List<T> getNeighborhood(int x, int y, {String system: 'moore'}) {
    switch (system) {

      // TODO: make an enum
      case 'moore':
      default:
        return [
          getState(x - 1, y - 1),
          getState(x, y - 1),
          getState(x + 1, y - 1),
          getState(x - 1, y),
          getState(x + 1, y),
          getState(x - 1, y + 1),
          getState(x, y + 1),
          getState(x + 1, y + 1)
        ];
    }
  }

  CellWorld({this.width, this.height, this.defaultState});

  /// apply a palette to the world state
  Array2d<T> applyPalette<T>({
    Map palette,
    bool changesOnly,
  }) {
    final output = new Array2d<T>(width, height);

    // TODO: could optimise by transforming to list?
//    final output = new Array2d<T>.readonlyFrom(
//        world.width,
//        world.generation().toList());

    for (num x = 0; x < width; x++) {
      for (num y = 0; y < height; y++) {
        final state = getState(x, y);

        // only send changes (if generation not the first generation)
        if (_generations.length > 1 &&
            changesOnly &&
            state == getState(x, y, 1)) continue;

        output.set(x, y, palette[getState(x, y)]);
      }
    }
    return output;
  }

  /// Saves the genreation
  void saveGeneration(Array2d<T> array2d) {
    _generations.add(array2d);
    if (_generations.length > 10) _generations.removeRange(0, 1);
  }

  /// Apply CA Rules on a new generation
  void applyRules(CARules rules) {
    final newGen = new Array2d<T>(width, height);
    final whatToProcess = rules.whatToProcess(generation(), this);

    cellsProcessedCounter = 0;

    for (var x = 0; x < width; x++)
      for (var y = 0; y < height; y++)
        if (whatToProcess.get(x, y)) {
          cellsProcessedCounter++;
          setState(x, y, rules.calculateState(x, y, this), newGen);
        } else
          setState(x, y, getState(x, y), newGen);

    saveGeneration(newGen);
  }

  /// Apply a generator on a new generation
  void applyGenerator(CAGenerator generator) {
    saveGeneration(generator.generate(width, height));
  }

// If a rule wants to process active cells and moores neighbors they can use this
  Array2d<bool> activateStatesMooresNeighbors<T>(
      List<T> activeStates, Array2d grid) {
//    final List<T> l = grid.toList(growable: false);
    final s = new List<bool>.filled(grid.length, false, growable: false);
    final o = new Array2d<bool>(grid.width, grid.height, false);

    for (int y = 0; y < height; y++)
      for (int x = 0; x < width; x++)
        if (activeStates.contains(grid.get(x, y))) {
          for (int y2 = y - 1; y2 <= y + 1; y2++) {
            for (int x2 = x - 1; x2 <= x + 1; x2++) {
              o.set(_wrap(x2, 0, width), _wrap(y2, 0, height), true);
            }
          }

          s[_getIndex(x, y)] = true;
          _neighborsIndices(x, y)..forEach((int i) => s[i] = true);
        }

    return o;
    //print (grid);
    //print (new Array2d<bool>.readonlyFrom(grid.width, s));
//    throw 'fail';
    return new Array2d<bool>.readonlyFrom(grid.width, s);
  }
}
