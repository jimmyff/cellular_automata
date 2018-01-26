/// This manages the running and timing of Cellular Automata rules
library cellular_automata.player;

import 'dart:core';
import 'dart:async';
import 'package:logging/logging.dart';

import 'package:cellular_automata/cellular_automata.dart';
export 'package:cellular_automata/src/util/timer.dart';

final _log = new Logger('cellular_automata.player');

enum SimulationCompleteReason { stable, duration }

class Player {
  final Simulator _sim;
  Stream<int> _timer;
  StreamSubscription<int> _timerSubscription;
  Duration _timerDuration;
  final Duration _frameDuration;

  int get generationCounter => _sim.generationCounter;
  get fps => _fps.round();
  num _fps = 0;

  int _lastGenerationTime;
  int _stableCounter = 0; // counts the number of reported stable worlds
  final int _maxAge; // onComplete called if this age is set and reached

  final Map _palette;

  // render loop
  final StreamController<CellGrid> _onRender = new StreamController<CellGrid>();
  Stream<CellGrid> get onRender => _onRender.stream;

  // complete stream
  final StreamController<SimulationCompleteReason> _onComplete =
      new StreamController<SimulationCompleteReason>();
  Stream<SimulationCompleteReason> get onComplete => _onComplete.stream;

  Player(
      {Simulator simulator,
      Duration frameDuration,
      CAGenerator generator,
      Map palette,
      int maxAge,
      Duration maxDuration})
      : _sim = simulator,
        _palette = palette,
        _maxAge = maxAge != null
            ? maxAge
            : (maxDuration != null
                ? (maxDuration.inMilliseconds / frameDuration.inMilliseconds)
                    .floor()
                : null),
        _frameDuration = frameDuration {
    _log.fine('Max Age: $_maxAge');

    // apply a generator if specified
    if (generator != null) {
      simulator.applyGenerator(generator);
      _callRender();
    }
  }

  void start({Duration delay}) {
    initTimer(_frameDuration, delay);
  }

  void resume() =>
      _timerSubscription.isPaused ? _timerSubscription.resume() : null;

  void pause() =>
      !_timerSubscription.isPaused ? _timerSubscription.pause() : null;

  Future<Null> stop() async {
      if (_timerSubscription != null) {
        await _timerSubscription.cancel(); 
        _timerSubscription = null;
    }
  }

  bool get isRunning => _timerSubscription != null && !_timerSubscription.isPaused;

  Future<CellGrid<dynamic>> render() async {
    return await _callRender();
  }

  Future<CellGrid<dynamic>> stepForward({bool changesOnly}) async {
    if (_timerSubscription != null && !_timerSubscription.isPaused)
      _timerSubscription.pause();
    return await _tick(changesOnly: changesOnly);
  }

  void stepBack() {
    if (!_timerSubscription.isPaused) _timerSubscription.pause();
    _sim.rewind();
    _callRender(changesOnly: false);
  }

  Future<CellGrid<dynamic>> _callRender({bool changesOnly: true}) async {
    final renderData =
        await _sim.applyPalette(palette: _palette, changesOnly: changesOnly);
    _onRender.add(renderData);
    return renderData;
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

  Future<CellGrid<dynamic>> _tick({bool changesOnly}) async {
    _sim.applyRules();
    final renderData = await _callRender(changesOnly: changesOnly);
    _calculateAverageFps();

    // log to console statistics
    if (_frameDuration != null &&
        _timerDuration != null &&
        generationCounter % (2000 / _frameDuration.inMilliseconds).round() == 0)
      _log.info('Gen: $generationCounter | '
          'Activity: ${_sim.activePercent}% | '
          'FPS: $fps/${(1000/_timerDuration.inMilliseconds).round()}');

    // check if scene is complete / stable...
    if (generationCounter % 20 == 0) {
      if (_maxAge != null && _maxAge < _sim.generation().count)
        _onComplete.add(SimulationCompleteReason.duration);
      else if (_sim.isStable) {
        _stableCounter++;

        final int activityPercent = _sim.activePercent;
        // based on percentage broadcast as stable
        if ((activityPercent < 5) ||
            (activityPercent < 10 && _stableCounter > 5) ||
            (_stableCounter > 8))
          _onComplete.add(SimulationCompleteReason.stable);

        _log.info(
            'Stable scene counter: x$_stableCounter World activity: $activityPercent%');
      } else
        _stableCounter = 0;
    }
    return renderData;
  }
}
