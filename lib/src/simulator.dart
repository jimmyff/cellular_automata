/// Simulation management class
library cellular_automata.simulator;

import 'dart:core';
import 'dart:async';
import 'package:logging/logging.dart';

import 'package:cellular_automata/cellular_automata.dart';
export 'package:cellular_automata/src/util/timer.dart';

final _log = new Logger('cellular_automata.simulator');

enum SimulatorCompleteReason { stable, duration }

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
  final int _maxAge; // onComplete called if this age is set and reached

  final Map _palette;

  // render loop
  final StreamController<Array2d> _onRender = new StreamController<Array2d>();
  Stream<Array2d> get onRender => _onRender.stream;

  // complete stream
  final StreamController<SimulatorCompleteReason> _onComplete =
      new StreamController<SimulatorCompleteReason>();
  Stream<SimulatorCompleteReason> get onComplete => _onComplete.stream;

  Simulator(
      {CellWorld world,
      Duration generationDuration,
      CAGenerator generator,
      Map palette,
      int maxAge,
      Duration maxDuration})
      : _world = world,
        _palette = palette,
        _maxAge = maxAge != null
            ? maxAge
            : (maxDuration != null
                ? (maxDuration.inMilliseconds /
                        generationDuration.inMilliseconds)
                    .floor()
                : null),
        _generationDuration = generationDuration {
    _log.fine('Max Age: $_maxAge');

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
      _log.info('Gen: $generationCounter | '
          'Activity: ${_world.activePercent}% | '
          'FPS: $fps/${(1000/_timerDuration.inMilliseconds).round()}');

    // check if scene is complete / stable...
    if (generationCounter % 20 == 0) {
      if (_maxAge != null && _maxAge < _world.generation().count)
        return _onComplete.add(SimulatorCompleteReason.duration);

      if (_world.isStable) {
        _stableCounter++;

        final int activityPercent = _world.activePercent;
        // based on percentage broadcast as stable
        if ((activityPercent < 5) ||
            (activityPercent < 10 && _stableCounter > 5) ||
            (_stableCounter > 8))
          _onComplete.add(SimulatorCompleteReason.stable);

        _log.info(
            'Stable scene counter: x$_stableCounter World activity: $activityPercent%');
      } else
        _stableCounter = 0;
    }
  }
}
