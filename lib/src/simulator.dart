import 'dart:core';
import 'dart:async';

import 'package:cellular_automata/cellular_automata.dart';
export 'package:cellular_automata/src/util/timer.dart';

/// Simulation management class
class Simulator {
  final CellWorld _world;
  CARules _rules;
  Stream<int> _timer;
  final Duration _generationDuration;

  CARules get rules => _rules;

  int _generationCounter = 0;
  get fps => _fps.round();
  num _fps = 0;
  int _lastGeneration;

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

    _timer = timer(speed ?? new Duration(seconds: 1))
      ..listen((int counter) {
        _generationCounter++;

        final now = new DateTime.now().millisecondsSinceEpoch;

        if (_lastGeneration != null)
          _fps = (_fps + (1 / ((now - _lastGeneration) / 1000))) / 2;
        _lastGeneration = now;
        _world.applyRules(_rules);
        _onRender.add(_world);
        if (_generationCounter % 20 == 0)
          print(
              'Generation $_generationCounter (fps: $fps/${(1000/speed.inMilliseconds).round()})');
      });
  }
}
