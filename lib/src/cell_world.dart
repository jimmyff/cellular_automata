import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

/// Stores the world state
class CellWorld<T> {
  List<Array2d<T>> _generations = [];

  bool wrap = true;

  final T defaultState;
  final int width;
  final int height;

  /// returns the state of the world a number of generations ago
  Array2d<T> generation([int ago = 0]) {
    if (_generations.length - 1 < ago) return null;
    return _generations[_generations.length - 1 - ago];
  }

  /// sets the state of a cell
  setState(int x, int y, T newState, [Array2d<T> array2d]) {
    (array2d ?? generation()).set(x, y, newState);
  }

  /// returns the state of a cell
  T getState(int x, int y, [int generationsAgo = 0]) {
    int _x, _y;

    if (wrap) {
      _x = x < 0 ? x + width : (x >= width ? x - width : x);
      _y = y < 0 ? y + height : (y >= height ? y - height : y);
    } else {
      _x = x < 0 || x > (width - 1) ? defaultState : x;
      _y = y < 0 || y > (height - 1) ? defaultState : y;
    }
    return generation(generationsAgo)?.get(_x, _y) ?? defaultState;
  }

  /// returns neighboring cells
  List<T> getNeighborhood(int x, int y, {String system: 'moore'}) {
    // TODO: implement neighboring systems..
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

  CellWorld({int this.width, int this.height, this.defaultState}) {}

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
  applyRules(CARules rules) {
    final generation = new Array2d<T>(width, height);
    for (int x = 0; x < width; x++)
      for (int y = 0; y < height; y++)
        setState(x, y, rules.calculateState(x, y, this), generation);

    saveGeneration(generation);
  }

  /// Apply a generator on a new generation
  applyGenerator(CAGenerator generator) {
    saveGeneration(generator.generate(width, height));
  }
}
