library cellular_automata.simulator;

import 'dart:core';
import 'dart:async';

import 'package:cellular_automata/cellular_automata.dart';
export 'package:cellular_automata/src/util/timer.dart';

/// Simulation management class
class Simulator {
  final CellWorld _world;
  Stream<int> _timer;
  StreamSubscription<int> _timerSubscription;
  Duration _timerDuration;
  final Duration _generationDuration;

  int get generationCounter => _world.generationCounter;
  get fps => _fps.round();
  num _fps = 0;

  int _lastGenerationTime;
  int _stableCounter = 0; // counts the number of reported stable worlds

  final Map _palette;

  // render loop
  final StreamController<Array2d> _onRender = new StreamController<Array2d>();
  Stream<Array2d> get onRender => _onRender.stream;

  // stable stream
  final StreamController<bool> _onStable = new StreamController<bool>();
  Stream<bool> get onStable => _onStable.stream;

  Simulator(
      {CellWorld world,
      Duration generationDuration,
      CAGenerator generator,
      Map palette})
      : _world = world,
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

  void resume() =>
      _timerSubscription.isPaused ? _timerSubscription.resume() : null;

  void pause() =>
      !_timerSubscription.isPaused ? _timerSubscription.pause() : null;

  void stop() =>
      _timerSubscription != null ? _timerSubscription.cancel() : null;

  void stepForward() {
    if (!_timerSubscription.isPaused) _timerSubscription.pause();
    _tick();
  }

  void stepBack() {
    if (!_timerSubscription.isPaused) _timerSubscription.pause();
    _world.stepBack();
    _callRender(changesOnly: false);
  }

  void _callRender({bool changesOnly: true}) {
    _onRender
        .add(_world.applyPalette(palette: _palette, changesOnly: changesOnly));
  }

  void _calculateAverageFps() {
    // calculate FPS
    final now = new DateTime.now().millisecondsSinceEpoch;
    if (_lastGenerationTime != null) {
      final delta = (now - _lastGenerationTime);
      if (delta > 0) _fps = (_fps + (1 / (delta / 1000))) / 2;
    }
    _lastGenerationTime = now;
  }

  Future<Null> initTimer(Duration speed, Duration delay) async {
    if (delay != null) await new Future.delayed(delay);

    _timerDuration = speed ?? new Duration(seconds: 1);
    _timer = timeController(_timerDuration);
    _timerSubscription = _timer.listen((int counter) => _tick());
  }

  void _tick() {
    _world.applyRules();
    _callRender();
    _calculateAverageFps();

    // log to console statistics
    if (generationCounter %
            (2000 / _generationDuration.inMilliseconds).round() ==
        0)
      print('Gen: $generationCounter | '
          'Activity: ${_world.activePercent}% | '
          'FPS: $fps/${(1000/_timerDuration.inMilliseconds).round()}');

    // check if stable...
    if (generationCounter % 20 == 0) {
      if (_world.isStable) {
        _stableCounter++;

        final int activityPercent = _world.activePercent;
        // based on percentage broadcast as stable
        if ((activityPercent < 5) ||
            (activityPercent < 10 && _stableCounter > 3) ||
            (_stableCounter > 5)) _onStable.add(true);

        print(
            'Stable scene counter: x$_stableCounter World activity: $activityPercent%');
      } else
        _stableCounter = 0;
    }
  }
}
