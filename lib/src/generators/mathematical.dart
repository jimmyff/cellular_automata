library cellular_automata.generators.mathematical;

import 'dart:math' as math;
import 'package:logging/logging.dart';

import 'package:cellular_automata/cellular_automata.dart';

final _log = new Logger('cellular_automata.generators.mathematical');

// Numerous of these generators were ported, original Author: @protolambda
// https://github.com/protolambda/automata/blob/master/src/lib.js

enum MathematicalGenerators {
  RANDOM,
  CELLS,
  X_MOD_Y,
  ARCS,
  DIAGONAL_STRIPES,
  BLOCKS,
  BLOCKS2,
  CHESS,
  ENDLESS_SIERPINSKI,
  SIERPINSKI_LEVEL10,
  SIERPINSKI_MOUNTAINS

  // Not working:
  //STABLE,
}

//TODO: this is a mess
class MathematicalGenerator<T> extends CAGenerator {
  static Map<dynamic, Function> generators = {
    MathematicalGenerators.RANDOM: (int x, int y) =>
        (new math.Random().nextInt(2)) == 0,
    MathematicalGenerators.CELLS: (int x, int y) =>
        math.cos(x * 10.0) > math.sin(y * 10.0),
    MathematicalGenerators.X_MOD_Y: (int x, int y) => y == 0 || x % y == 0,

    // TODO: not working correctly
    MathematicalGenerators.ARCS: (int x, int y) =>
        (y > 0) && (x % y) & (x ^ y).toSigned(32) > 2,

    MathematicalGenerators.DIAGONAL_STRIPES: (int x, int y) =>
        (x ^ y).toSigned(32) % 8 == 0,
    MathematicalGenerators.CHESS: (int x, int y) =>
        (x ^ y).toSigned(32).abs() % 8 < 4,
    MathematicalGenerators.BLOCKS: (int x, int y) =>
        (((x ^ y).toSigned(32) > ~x) && y <= 0),
    MathematicalGenerators.BLOCKS2: (int x, int y) =>
        (x ^ y).toSigned(32) + x >= 0,
    MathematicalGenerators.ENDLESS_SIERPINSKI: (int x, int y) {
      final num val = (x ^ y).toSigned(32) + x - y;
      return val == 0;
    },
    MathematicalGenerators.SIERPINSKI_LEVEL10: (int x, int y) =>
        ((x ^ y).toSigned(32) + x - y) % 1024 == 0,
    MathematicalGenerators.SIERPINSKI_MOUNTAINS: (int x, int y) {
      final num val = ((x ^ y).toSigned(32) + y - x);
      if (val == 0) return true;
      final num valR = ((x ^ y) + y - x).remainder(y);
      return val == 0 || valR == 0;
    },
//    MathematicalGenerators.STABLE: (int x, int y) =>
//      (x ^ y / 3) % 2,

////    TODO: Add functionality for these
////    MathematicalGenerators.prime': (int x, int y) => Automaton.isPrime(x)?1:0,
//    'MathematicalGenerators.ormod3': (int x, int y) => (x ^ y) % 3 == 0 ? 1 : 0,
////    MathematicalGenerators.ulam': (int x, int y) => Automaton.isPrime(Automaton.ulam(int x, int y))?1:0,
////    MathematicalGenerators.XORprime': (int x, int y) => Automaton.isPrime((x).abs() ^ (y).abs())?1:0,
////    MathematicalGenerators.SierpinskiCarpet': (int x, int y) => Automaton.sierpinskiCarpet(int x, int y)?1:0,
  };

  /// generate the grid
  @override
  CellGrid<T> generate(int width, int height) {
    final out = new CellGrid<T>(width, height);

    // position 0,0 in the centre
    final offsetX = -(width / 2).round();
    final offsetY = -(height / 2).round();

    for (var x = 0; x < width; x++)
      for (var y = 0; y < height; y++)
        out.set(
            x,
            y,
            generators[_type](x + offsetX, (y + offsetY) * -1)
                ? valueTrue
                : valueFalse,
            true);

    return out;
  }

  MathematicalGenerators _type;
  final T valueTrue;
  final T valueFalse;

  MathematicalGenerator(
      {MathematicalGenerators type, this.valueTrue, this.valueFalse})
      : _type = type {
    // pick a random generator if not set
    _type ??= MathematicalGenerators.values[
        new math.Random().nextInt(MathematicalGenerators.values.length)];

    _log.fine('Generator: ${_type.toString()}');
  }
}
