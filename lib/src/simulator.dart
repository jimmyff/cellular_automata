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
  get cp => _cp.round();
  num _cp = 0;
  int _lastGeneration;

  final Map _palette;

  // render loop
  final StreamController<Array2d> _onRender = new StreamController<Array2d>();
  Stream<Array2d> get onRender => _onRender.stream;

  Simulator(
      {CellWorld world,
      CARules rules,
      Duration generationDuration,
      CAGenerator generator,
      Map palette})
      : _world = world,
        _rules = rules,
        _palette = palette,
        _generationDuration = generationDuration {
    // apply a generator if specified
    if (generator != null) {
      world.applyGenerator(generator);
      _callRender();
    }
  }

  void start({Duration delay}) {
    initTimer(_generationDuration, delay);
  }

  void _callRender() {
    _onRender.add(_world.applyPalette(palette: _palette, changesOnly: true));
  }

  Future<Null> initTimer(Duration speed, Duration delay) async {
    if (delay != null) await new Future.delayed(delay);

    _timer = timer(speed ?? new Duration(seconds: 1))
      ..listen((int counter) {
        // calculate FPS
        _generationCounter++;
        final now = new DateTime.now().millisecondsSinceEpoch;
        if (_lastGeneration != null)
          _fps = (_fps + (1 / ((now - _lastGeneration) / 1000))) / 2;
        _lastGeneration = now;

        // apply rules
        _world.applyRules(_rules);
        _cp = (_cp + _world.cellsProcessedCounter) / 2;
        _callRender();
        if (_generationCounter % 20 == 0)
          print('Generation $_generationCounter. '
              'fps: $fps/${(1000/speed.inMilliseconds).round()} '
              'processed: ${(1/((_world.width*_world.height)/cp)*100).round()}%'
              ' $cp/${_world.width*_world.height}');
      });
  }
}
