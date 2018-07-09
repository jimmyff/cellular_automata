/// This manages the running and timing of Cellular Automata rules
library cellular_automata.scene;

import 'dart:async';
import 'dart:core';

import 'package:cellular_automata/cellular_automata.dart';
import 'package:logging/logging.dart';

export 'package:cellular_automata/src/util/timer.dart';

final _log = new Logger('cellular_automata.player');

enum SimulationCompleteReason { stable, duration }

class Scene<PaletteType> {
  final Map<String, Automaton> _automata = {};
  Stream<int> _timer;
  StreamSubscription<int> _timerSubscription;
  Duration _timerDuration;
  final Duration _frameDuration;

  int get generationCounter => _automata.values.first.generationCounter;
  int get fps => _fps.round();
  num _fps = 0;
  int width = 32;
  int height = 32;

  int _lastGenerationTime;
  int _stableCounter = 0; // counts the number of reported stable worlds
  final int _maxAge; // onComplete called if this age is set and reached

  // render loop
  final StreamController<CellGrid<PaletteType>> _onPaint =
      new StreamController<CellGrid<PaletteType>>();
  Stream<CellGrid<PaletteType>> get onPaint => _onPaint.stream;

  final StreamController<CellGrid<PaletteType>> _onFullPaint =
      new StreamController<CellGrid<PaletteType>>();
  Stream<CellGrid<PaletteType>> get onFullPaint => _onFullPaint.stream;

  // complete stream
  final StreamController<SimulationCompleteReason> _onComplete =
      new StreamController<SimulationCompleteReason>();
  Stream<SimulationCompleteReason> get onComplete => _onComplete.stream;

  int _automataCount = 0; // number of automatas played
  // complete stream
  final StreamController<int> _onPrepare = new StreamController<int>();
  Stream<int> get onPrepare => _onPrepare.stream;

  Scene(
      {Duration frameDuration,
      CAGenerator generator,
      this.width,
      this.height,
      // Map palette,
      int fpsTarget,
      int maxAge,
      Duration maxDuration})
      :
        // _palette = palette,
        _maxAge = maxAge != null
            ? maxAge
            : (maxDuration != null
                ? (maxDuration.inMilliseconds / frameDuration.inMilliseconds)
                    .floor()
                : null),
        _frameDuration = fpsTarget != null
            ? new Duration(milliseconds: ((1 / fpsTarget) * 1000).round())
            : frameDuration {
    _log.fine('Max Age: $_maxAge');

    // apply a generator if specified
    // if (generator != null) {
    //   simulator.applyGenerator(generator);
    //   _callRender();
    // }
  }

  void clearAutomata() => _automata.clear();

  void addAutomaton({Automaton automaton, String reference}) {
    _automata[reference ?? "automaton:${_automata.length}"] = automaton;
  }

  Future start({Duration delay}) async {
    _onPrepare.add(++_automataCount);
    await new Future.delayed(const Duration(milliseconds: 10));
    await initTimer(_frameDuration, delay);
    _paintScene();
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

  bool get isRunning =>
      _timerSubscription != null && !_timerSubscription.isPaused;

  void paint() {
    _paintScene();
  }

  void stepForward({bool changesOnly}) {
    if (_timerSubscription != null && !_timerSubscription.isPaused)
      _timerSubscription.pause();
    return _tick();
  }

  void stepBack() {
    if (!_timerSubscription.isPaused) _timerSubscription.pause();
    _automata.forEach((ref, automaton) => automaton.rewind());
    _paintScene(fullRefresh: true);
  }

  void _paintScene({bool fullRefresh: false}) {
    // if (_onPaint.hasListener) {}
    if (_onPaint.hasListener && !fullRefresh)
      _onPaint.add(_paint());
    else if (_onFullPaint.hasListener || fullRefresh) {
      final fullPaint = _paint(fullRefresh: true);
      if (_onPaint.hasListener) _onPaint.add(fullPaint);
      if (_onFullPaint.hasListener) _onFullPaint.add(fullPaint);
    }
  }

  CellGrid<PaletteType> _paint({bool fullRefresh: false}) {
    final paintedScene = new CellGrid<PaletteType>(width, height);
    final automatas = _automata.values.toList();

    final l = automatas.length;
    for (int i = 0; i < l; i++)
      paintedScene.combine(automatas[i].paint(fullRefresh: fullRefresh));

    return paintedScene;
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

    _timerDuration = speed ?? const Duration(seconds: 1);
    _timer = timeController(_timerDuration);
    _timerSubscription = _timer.listen((int counter) => _tick());
  }

  void _tick() {
    if (_automata.isEmpty) {
      _log.info('Stopping due to zero automata.');
      stop();
      return;
    }

    // Apply the rules...
    _automata.forEach((ref, automaton) => automaton.applyRules());

    _paintScene();
    _calculateAverageFps();
    // print(generationCounter);
    // log to console statistics
    if (_frameDuration != null &&
        _timerDuration != null &&
        generationCounter % (2000 / _frameDuration.inMilliseconds).round() == 0)
      _log.info('Gen: $generationCounter | '
          // 'Activity: ${_sim.activePercent}% | '
          'FPS: $fps/${(1000/_timerDuration.inMilliseconds).round()}');

    // check if scene is complete / stable...
    if (generationCounter % 20 == 0) {
      bool automataAreStable = true;
      _automata.forEach((ref, automaton) {
        if (!automaton.isStable) automataAreStable = false;
      });

      if (_maxAge != null && _maxAge < generationCounter)
        _onComplete.add(SimulationCompleteReason.duration);
      else if (automataAreStable) {
        _stableCounter++;

        int activityPercent = 0;
        _automata.forEach((ref, automaton) {
          if (automaton.activePercent > activityPercent)
            activityPercent = automaton.activePercent;
        });

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
    // return paintedScene;
  }
}
