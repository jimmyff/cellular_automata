/// Stores the world state
library cellular_automata.cell_world;

import 'package:logging/logging.dart';
import 'package:collection/collection.dart';

import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

final _log = new Logger('cellular_automata.cell_world');

class CellWorld<T> {
  final List<Generation<T>> _generations = [];

  bool wrap = true;

  final _generationHistoryLength = 62;

  int get activeCellCount =>
      _generations.isEmpty ? 0 : generation(0).activeCells;

  int get generationCounter => _generations.isEmpty ? 0 : generation(0).count;

  final T defaultState;
  final int width;
  final int height;
  CARules rules;

  /// Checks to see if recent generations are identical or repeating
  bool get isStable {
    final Function eq = const ListEquality().equals;

    // check if the last 3 generations were identical
    if (_generations.length > 2) if (eq(
            generation(0).activity, generation(1).activity) &&
        eq(generation(0).activity, generation(2).activity)) return true;

    // Checks for repeating patterns of activeCellCount
    if (_generations.length > 60)
      for (int i = 1; i <= 30; i++) {
        bool stable = true;
        // i = generation cycle count
        for (int g = 0; g < 2; g++)
          if (generation(g).activeCells !=
              generation(g + (i * g)).activeCells) {
            stable = false;
            break;
          }
        if (stable) {
          _log.info('Stable scene detected! Repeating pattern $i');
          return true;
        }
      }
    return false;
  }

  /// Active cell percent considering total cells
  int get activePercent {
    if (_generations.isEmpty) return 100;
    if (generation(0).activeCells == 0) return 0;
    return ((generation(0).activeCells / (width * height)) * 100).round();
  }

  /// returns the state of the world a number of generations ago
  Generation<T> generation([int ago = 0]) {
    if (_generations.length - 1 < ago) return null;
    return _generations[_generations.length - 1 - ago];
  }

  int _wrap(int v, int min, int max) =>
      min != null && v < min ? v + max : (v >= max ? v - max : v);

  int wrapX(int x) => _wrap(x, 0, width);
  int wrapY(int y) => _wrap(y, 0, height);

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
    return generation(generationsAgo)?.states.get(_x, _y) ?? defaultState;
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

  CellWorld({this.width, this.height, this.defaultState, this.rules});

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

  void stepBack() {
    if (_generations.length > 1) _generations.removeLast();
  }

  void newGeneration(Array2d<T> newStateArray) =>
      saveGeneration(new Generation<T>((generation()?.count ?? 0) + 1, width,
          height, newStateArray, rules.whatToProcess(newStateArray, this)));

  /// Saves the generation
  void saveGeneration(Generation<T> generation) {
    _generations.add(generation);
    if (_generations.length > _generationHistoryLength)
      _generations.removeRange(0, 1);
  }

  /// Apply CA Rules on a new generation
  void applyRules([CARules alternativeRules]) {
    final newStateArray = new Array2d<T>(width, height);

//    final whatToProcess = rules.whatToProcess(generation(), this);

    for (var x = 0; x < width; x++)
      for (var y = 0; y < height; y++)
        if (generation().activity.get(x, y)) {
          newStateArray.set(
              x, y, (alternativeRules ?? rules).calculateState(x, y, this));
        } else
          newStateArray.set(x, y, getState(x, y));

    newGeneration(newStateArray);
//    print (generation().states);
  }

  /// Apply a generator on a new generation
  void applyGenerator(CAGenerator generator) {
    newGeneration(generator.generate(width, height));
  }

// If a rule wants to process active cells and moores neighbors they can use this
  Array2d<bool> activateStatesMooresNeighbors<T>(
      List<T> activeStates, Array2d grid,
      [List<T> processStates]) {
//    final List<T> l = grid.toList(growable: false);
    final o = new Array2d<bool>(grid.width, grid.height, false);

    for (int y = 0; y < height; y++)
      for (int x = 0; x < width; x++)
        if (activeStates.contains(grid.get(x, y))) {
          for (int y2 = y - 1; y2 <= y + 1; y2++) {
            for (int x2 = x - 1; x2 <= x + 1; x2++) {
              o.set(_wrap(x2, 0, width), _wrap(y2, 0, height), true);
            }
          }
        }
        // if we just want to process the cells not neighbors
        else if (processStates != null &&
            processStates.contains(grid.get(x, y)))
          o.set(_wrap(x, 0, width), _wrap(y, 0, height), true);

    return o;
  }
}
