/// Stores the world state
library cellular_automata.cell_world;

import 'package:logging/logging.dart';
import 'package:collection/collection.dart';

import 'package:cellular_automata/cellular_automata.dart';

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

  CellWorld({this.width, this.height, this.defaultState, this.rules});

  /// apply a palette to the world state
  CellGrid<T> applyPalette<T>({
    Map palette,
    bool changesOnly,
  }) {
    final output = new CellGrid<T>(width, height);

    // TODO: could optimise by transforming to list?
//    final output = new CellGrid<T>.readonlyFrom(
//        world.width,
//        world.generation().toList());

    for (num x = 0; x < width; x++) {
      for (num y = 0; y < height; y++) {
        final state = generation().states.get(x, y, wrap, defaultState);

        // only send changes (if generation not the first generation)
        if (_generations.length > 1 &&
            changesOnly &&
            state == generation(1).states.get(x, y, wrap, defaultState))
          continue;

        output.set(x, y, palette[state], wrap);
      }
    }
    return output;
  }

  void stepBack() {
    if (_generations.length > 1) _generations.removeLast();
  }

  void newGeneration(CellGrid<T> newStateArray) =>
      saveGeneration(new Generation<T>((generation()?.count ?? 0) + 1, width,
          height, newStateArray, rules.gridActivity(newStateArray)));

  /// Saves the generation
  void saveGeneration(Generation<T> generation) {
    _generations.add(generation);
    if (_generations.length > _generationHistoryLength)
      _generations.removeRange(0, 1);
  }

  /// Apply CA Rules on a new generation
  void applyRules([CARules alternativeRules]) {
    final newStateArray = new CellGrid<T>(width, height);

//    final whatToProcess = rules.whatToProcess(generation(), this);

    for (var x = 0; x < width; x++)
      for (var y = 0; y < height; y++)
        if (generation().activity.get(x, y)) {
          newStateArray.set(x, y,
              (alternativeRules ?? rules).calculateState(x, y, this), wrap);
        } else
          newStateArray.set(
              x, y, generation().states.get(x, y, wrap, null), wrap);

    newGeneration(newStateArray);
//    print (generation().states);
  }

  /// Apply a generator on a new generation
  void applyGenerator(CAGenerator generator) {
    newGeneration(generator.generate(width, height));
  }
}
