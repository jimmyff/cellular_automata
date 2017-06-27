import 'dart:core';
import 'dart:async';
import 'dart:math' as math;

import 'package:cellular_automaton/cellular_automaton.dart';
export 'package:cellular_automaton/src/util/timer.dart';

/// Simulation management class
class Simulator {
  // world state
  final CellWorld _world;
  CARules _rules;
  Stream<int> _timer;

  // generation/tick stream
  final StreamController<CellWorld> _onTick = new StreamController<CellWorld>();
  Stream<CellWorld> get onTick => _onTick.stream;

  Simulator({
    CellWorld world,
    CARules rules,
    Duration speed,
    String generator,
  })
      : _world = world {
    final String _seedGenerator = generator ??
        generators.keys.toList(
            growable: false)[new math.Random().nextInt(generators.length)];

//    _seedGenerator = 'sierpinskiMountains';

    print('Simulator construct, Seed generator: $_seedGenerator');

    // apply a random generator
    world.applyFunction(generators[_seedGenerator]);

    _onTick.add(world);

    _rules = rules;
    initTimer(speed, new Duration(seconds: 0));
  }

  Future<Null> initTimer(Duration speed, Duration delay) async {
    if (delay != null) await new Future.delayed(delay);

    _timer = timer(speed ?? new Duration(seconds: 1));
    _timer.listen((int counter) {
      _world.applyRules(_rules);
      _onTick.add(_world);
    });
  }

  // Generators ported, original Author: @protolambda
  // https://github.com/protolambda/automata/blob/master/src/lib.js
  Map<String, Function> generators = {
    'random': (x, y) => (new math.Random().nextInt(2)),
    'cells': (x, y) => math.cos(x * 10.0) > math.sin(y * 10.0) ? 1 : 0,
    'XmodY': (x, y) => (y > 0) && x % y == 0 ? 1 : 0,
    'arcs': (x, y) => (y > 0) && (x % y) & (x ^ y) > 2 ? 1 : 0,
    'stable': (x, y) => (x ^ y) % 8 == 0 ? 1 : 0,
    'chess': (x, y) => (x ^ y).abs() % 8 < 4 ? 1 : 0,
    'blocks': (x, y) => (((x ^ y) > ~x) && y <= 0) ? 1 : 0,

//    Not working:
//    'stable2': (x, y) => (x ^ y / 3) % 2 ? 1 : 0,
//    'blocks2': (x, y) => (x ^ y)+x >= 0?1:0,

//    'prime': (x, y) => Automaton.isPrime(x)?1:0,
    'xormod3': (x, y) => (x ^ y) % 3 == 0 ? 1 : 0,
//    'ulam': (x, y) => Automaton.isPrime(Automaton.ulam(x, y))?1:0,
//    'XORprime': (x, y) => Automaton.isPrime((x).abs() ^ (y).abs())?1:0,
//    'SierpinskiCarpet': (x, y) => Automaton.sierpinskiCarpet(x, y)?1:0,
    'endlessSierpinski': (x, y) => (x ^ y) + x - y == 0 ? 1 : 0,
    'sierpinskiLevel10': (x, y) => ((x ^ y) + x - y) % 1024 == 0 ? 1 : 0,
    'sierpinskiMountains': (x, y) => y > 0 && ((x ^ y) + y - x) % y == 0 ? 1 : 0
  };
}
