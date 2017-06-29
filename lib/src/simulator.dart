import 'dart:core';
import 'dart:async';

import 'package:cellular_automaton/cellular_automaton.dart';
export 'package:cellular_automaton/src/util/timer.dart';

/// Simulation management class
class Simulator {
  final CellWorld _world;
  CARules _rules;
  Stream<int> _timer;
  final Duration _generationDuration;

  CARules get rules => _rules;

  // render loop
  final StreamController<CellWorld> _onRender =
      new StreamController<CellWorld>();
  Stream<CellWorld> get onRender => _onRender.stream;

  Simulator({
    CellWorld world,
    CARules rules,
    Duration generationDuration,
    CAGenerator generator,
  })
      : _world = world,
        _rules = rules,
        _generationDuration = generationDuration {
    // apply a generator if specified
    if (generator != null) {
      world.applyGenerator(generator);
      _onRender.add(_world);
    }
  }

  void start({Duration delay}) {
    initTimer(_generationDuration, delay);
  }

  Future<Null> initTimer(Duration speed, Duration delay) async {
    if (delay != null) await new Future.delayed(delay);

    _timer = timer(speed ?? new Duration(seconds: 1));
    _timer.listen((int counter) {
      _world.applyRules(_rules);
      _onRender.add(_world);
    });
  }
}
