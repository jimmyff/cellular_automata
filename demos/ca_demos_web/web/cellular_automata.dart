// Copyright (c) 2017, jimmyff. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:async';

import 'package:logging/logging.dart';
import 'package:params/client.dart';

import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/renderer_canvas.dart';
import 'package:cellular_automata/rules.dart';
import 'package:cellular_automata/rules_mcell.dart';

// Fully featured example of using cellular_automata
Player createSimulation({
  num worldWidth,
  num worldHeight,
  num stageWidth,
  num stageHeight,
  num speedMs,
  CanvasDisplayMode displayMode,
  CanvasElement canvas,
  Simulator sim,
  Map palette,
  CAGenerator generator,
}) {
  print('Cellular Automata Demo');

  final player = new Player(
      simulator: sim,
      frameDuration: new Duration(milliseconds: speedMs),
      palette: palette,
      generator: generator,
      maxDuration: new Duration(seconds: 60));

  final renderer = new CanvasRenderer(width: worldWidth, height: worldHeight)
    ..initCanvas(
      canvas: canvas,
      displayMode: displayMode,
      canvasWidth: stageWidth,
      canvasHeight: stageHeight,
    );

  // render loop (wire the simulation & renderer together)
  player.onRender.listen((CellGrid renderData) {
    // render the cell world state
    renderer.render(renderData);
  });

  return player;
}

// Process the input parameteres
Player _initSimulation([dynamic _]) {
  num worldWidth = params['width'] != null ? int.parse(params['width']) : null;
  num worldHeight =
      params['height'] != null ? int.parse(params['height']) : null;
  num speedMs = params['speed_ms'] != null ? int.parse(params['speed_ms']) : 50;
  num stageWidth;
  num stageHeight;

  CARules rules;
  Simulator world;
  Map palette;
  CAGenerator generator;

  final num renderSize = int.parse(params['render_size'] ?? '8');

  MathematicalGenerators generatorType;
  if (params['generator'] != null) {
    final gen = params['generator'].toString().toUpperCase();

    // create a List<String> of the generators
    List<String> gens = [];
    MathematicalGenerators.values.forEach((E) =>
        gens.add(E.toString().substring(E.toString().indexOf('\.') + 1)));

    if (gens.contains(gen))
      generatorType = MathematicalGenerators.values[gens.indexOf(gen)];
  }

  CanvasDisplayMode displayMode;

  String bodyClass;

  switch (params['display']) {
    case 'fullscreen':
      displayMode = CanvasDisplayMode.FULLSCREEN;
      stageWidth = window.innerWidth;
      stageHeight = window.innerHeight;
      worldWidth = (stageWidth / renderSize).round();
      worldHeight = (stageHeight / renderSize).round();
      bodyClass = 'stage-full-window';

      // TODO: this should stop current simulation
      window.onResize.listen(_initSimulation);

      break;
    case 'fixed':
    default:
      displayMode = CanvasDisplayMode.FIXED;
      stageWidth = worldWidth * renderSize;
      stageHeight = worldHeight * renderSize;
      bodyClass = 'stage-fixed-size';
  }

  querySelector('body').classes.add(bodyClass);

  switch (params['rules' ?? 'game_of_life']) {
    case 'game_of_life':
      world = new Simulator<GameOfLifeStates>(
          rules: new GameOfLife(),
          width: worldWidth,
          height: worldHeight,
          defaultState: GameOfLifeStates.DEAD,
          wrap: true);

      palette = new Map<GameOfLifeStates, String>.from({
        GameOfLifeStates.DEAD: '#0000FF',
        GameOfLifeStates.DEAD_UNDER_POPULATED: '#00008B',
        GameOfLifeStates.DEAD_OVER_POPULATED: '#8A2BE2',
        GameOfLifeStates.ALIVE: '#FFFE01',
        GameOfLifeStates.ALIVE_BORN: '#FEFEE0',
      });

      generator = new MathematicalGenerator<GameOfLifeStates>(
          type: generatorType,
          valueTrue: GameOfLifeStates.ALIVE_BORN,
          valueFalse: GameOfLifeStates.DEAD);
      break;

    case 'game_of_life_simple':
      world = new Simulator<bool>(
          rules: new GameOfLifeSimple(),
          width: worldWidth,
          height: worldHeight,
          defaultState: false,
          wrap: true);

      palette = new Map<bool, String>.from({
        false: '#8B0000',
        true: '#ADFE2F',
      });

      generator = new MathematicalGenerator<bool>(
          type: generatorType, valueTrue: true, valueFalse: false);
      break;

    case 'brians_brain':
      world = new Simulator<BriansBrainStates>(
          rules: new BriansBrain(),
          width: worldWidth,
          height: worldHeight,
          defaultState: BriansBrainStates.OFF,
          wrap: true);

      palette = new Map<BriansBrainStates, String>.from({
        BriansBrainStates.OFF: '#556B2F',
        BriansBrainStates.DYING: '#FF4500',
        BriansBrainStates.ON: '#FFA500',
      });

      generator = new MathematicalGenerator<BriansBrainStates>(
          type: generatorType,
          valueTrue: BriansBrainStates.ON,
          valueFalse: BriansBrainStates.OFF);
      break;

    case 'mcell_generations':
      String rules_config = params['rules_config'];
      world = new Simulator<int>(
          rules: new MCellGenerations.fromConfigString(rules_config),
          width: worldWidth,
          height: worldHeight,
          defaultState: 0,
          wrap: true);

      palette = new Map<int, String>.from({
        0: '#000000',
        1: '#A2EAF9',
        2: '#F5A2F9',
        3: '#D0DE34',
        4: '#C35E00',
        5: '#C3005F',
      });

      generator = new MathematicalGenerator<int>(
          type: generatorType, valueTrue: 1, valueFalse: 0);
      break;

    case 'majority_vote':
      world = new Simulator<int>(
          rules: new MajorityVote(),
          width: worldWidth,
          height: worldHeight,
          defaultState: false,
          wrap: true);

      palette = new Map<bool, String>.from({
        false: '#000000',
        true: '#FFFE01'
      });

      generator = new MathematicalGenerator<bool>(
          type: generatorType, valueTrue: true, valueFalse: false);
      break;
  }

  return createSimulation(
      worldWidth: worldWidth,
      worldHeight: worldHeight,
      stageHeight: stageHeight,
      stageWidth: stageWidth,
      generator: generator,
      sim: world,
      palette: palette,
      displayMode: displayMode,
      speedMs: speedMs,
      canvas: querySelector('#canvas')
        ..style.width = '${stageWidth}px'
        ..style.height = '${stageHeight}px');
}

Future<Null> main() async {
  // configure the logger
  Logger.root.level = Level.ALL;
  Logger.root.onRecord.listen((LogRecord rec) {
    print('${rec.level.name}: ${rec.time}: ${rec.message}');
  });

  // load the request parameters
  await initParams();
  Player ca;

  void startNewSim() {
    ca = _initSimulation();

    // render loop (wire the simulation & renderer together)
    ca.onComplete.listen((SimulationCompleteReason c) {
      print('Sim complete: $c');
      ca.stop();
      startNewSim();
    });
    ca.start(delay: new Duration(milliseconds: 100));
  }

  startNewSim();
}
