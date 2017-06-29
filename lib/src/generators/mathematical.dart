import 'dart:math' as math;
import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/src/util/array_2d.dart';

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
    MathematicalGenerators.RANDOM: (x, y) =>
        (new math.Random().nextInt(2)) == 0,
    MathematicalGenerators.CELLS: (x, y) =>
        math.cos(x * 10.0) > math.sin(y * 10.0),
    MathematicalGenerators.X_MOD_Y: (x, y) => y == 0 || x % y == 0,

    // TODO: not working correctly
    MathematicalGenerators.ARCS: (x, y) => (y > 0) && (x % y) & (x ^ y) > 2,

    MathematicalGenerators.DIAGONAL_STRIPES: (x, y) => (x ^ y) % 8 == 0,
    MathematicalGenerators.CHESS: (x, y) => (x ^ y).abs() % 8 < 4,
    MathematicalGenerators.BLOCKS: (x, y) => (((x ^ y) > ~x) && y <= 0),
    MathematicalGenerators.BLOCKS2: (x, y) => (x ^ y) + x >= 0,
    MathematicalGenerators.ENDLESS_SIERPINSKI: (x, y) => (x ^ y) + x - y == 0,
    MathematicalGenerators.SIERPINSKI_LEVEL10: (x, y) =>
        ((x ^ y) + x - y) % 1024 == 0,
    MathematicalGenerators.SIERPINSKI_MOUNTAINS: (x, y) =>
        ((x ^ y) + y - x) == 0 || ((x ^ y) + y - x) % y == 0,
//    MathematicalGenerators.STABLE: (x, y) =>
//      (x ^ y / 3) % 2,

////    TODO: Add functionality for these
////    MathematicalGenerators.prime': (x, y) => Automaton.isPrime(x)?1:0,
//    'MathematicalGenerators.ormod3': (x, y) => (x ^ y) % 3 == 0 ? 1 : 0,
////    MathematicalGenerators.ulam': (x, y) => Automaton.isPrime(Automaton.ulam(x, y))?1:0,
////    MathematicalGenerators.XORprime': (x, y) => Automaton.isPrime((x).abs() ^ (y).abs())?1:0,
////    MathematicalGenerators.SierpinskiCarpet': (x, y) => Automaton.sierpinskiCarpet(x, y)?1:0,
  };

  /// generate the grid
  Array2d<T> generate(width, height) {
    final out = new Array2d<T>(width, height);

    // position 0,0 in the centre
    final offsetX = -(width / 2).round();
    final offsetY = -(height / 2).round();

    for (int x = 0; x < width; x++)
      for (int y = 0; y < height; y++)
        out.set(
            x,
            y,
            generators[_type](x + offsetX, (y + offsetY) * -1)
                ? valueTrue
                : valueFalse);

    return out;
  }

  MathematicalGenerators _type;
  final T valueTrue;
  final T valueFalse;

  MathematicalGenerator(
      {MathematicalGenerators type, T valueTrue, T valueFalse})
      : _type = type,
        valueTrue = valueTrue,
        valueFalse = valueFalse {
    // pick a random generator if not set
    _type ??= MathematicalGenerators.values[
        new math.Random().nextInt(MathematicalGenerators.values.length)];
  }
}
