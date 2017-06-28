import 'dart:math' as math;
import 'package:cellular_automaton/cellular_automaton.dart';
import 'package:cellular_automaton/src/util/array_2d.dart';

// Numerous of these generators were ported, original Author: @protolambda
// https://github.com/protolambda/automata/blob/master/src/lib.js

enum MathematicalGenerators { RANDOM, CELLS }

//TODO: this is a mess
class MathematicalGenerator<T> extends CAGenerator {
  static Map<dynamic, Function> generators = {
    MathematicalGenerators.RANDOM: (x, y) =>
        (new math.Random().nextInt(2)) == 0,
    MathematicalGenerators.CELLS: (x, y) =>
        math.cos(x * 10.0) > math.sin(y * 10.0),

//    'XmodY': (x, y) => (y > 0) && x % y == 0 ? 1 : 0,
//    'arcs': (x, y) => (y > 0) && (x % y) & (x ^ y) > 2 ? 1 : 0,
//    'stable': (x, y) => (x ^ y) % 8 == 0 ? 1 : 0,
//    'chess': (x, y) => (x ^ y).abs() % 8 < 4 ? 1 : 0,
//    'blocks': (x, y) => (((x ^ y) > ~x) && y <= 0) ? 1 : 0,
//
////    Not working:
////    'stable2': (x, y) => (x ^ y / 3) % 2 ? 1 : 0,
////    'blocks2': (x, y) => (x ^ y)+x >= 0?1:0,
//
////    'prime': (x, y) => Automaton.isPrime(x)?1:0,
//    'xormod3': (x, y) => (x ^ y) % 3 == 0 ? 1 : 0,
////    'ulam': (x, y) => Automaton.isPrime(Automaton.ulam(x, y))?1:0,
////    'XORprime': (x, y) => Automaton.isPrime((x).abs() ^ (y).abs())?1:0,
////    'SierpinskiCarpet': (x, y) => Automaton.sierpinskiCarpet(x, y)?1:0,
//    'endlessSierpinski': (x, y) => (x ^ y) + x - y == 0 ? 1 : 0,
//    'sierpinskiLevel10': (x, y) => ((x ^ y) + x - y) % 1024 == 0 ? 1 : 0,
//    'sierpinskiMountains': (x, y) => y > 0 && ((x ^ y) + y - x) % y == 0 ? 1 : 0
  };

  /// generate the grid
  Array2d<T> generate(width, height) {
    final out = new Array2d<T>(width, height);

    for (int x = 0; x < width; x++)
      for (int y = 0; y < height; y++)
        out.set(x, y, generators[type](x, y) ? valueTrue : valueFalse);

//    print (out);
    return out;
  }

  final MathematicalGenerators type;
  final T valueTrue;
  final T valueFalse;

  MathematicalGenerator(
      {MathematicalGenerators type, T valueTrue, T valueFalse})
      : type = type,
        valueTrue = valueTrue,
        valueFalse = valueFalse {}
}
