// Copyright (c) 2017, jimmyff. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:async';

import 'package:params/client.dart';

import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/renderer_canvas.dart';
import 'package:cellular_automata/rules.dart';

// Fully featured example of using cellular_automata
Simulator createSimulation({
  num worldWidth,
  num worldHeight,
  num stageWidth,
  num stageHeight,
  num speedMs,
  CanvasDisplayMode displayMode,
  CanvasElement canvas,
  CellWorld world,
  Map palette,
  CAGenerator generator,
}) {
  print('Cellular Automata Demo');

  final sim = new Simulator(
      world: world,
      generationDuration: new Duration(milliseconds: speedMs),
      palette: palette,
      generator: generator);

  final renderer = new CanvasRenderer(width: worldWidth, height: worldHeight)
    ..initCanvas(
      canvas: canvas,
      displayMode: displayMode,
      canvasWidth: stageWidth,
      canvasHeight: stageHeight,
    );

  // render loop (wire the simulation & renderer together)
  sim.onRender.listen((Array2d renderData) {
    // render the cell world state
    renderer.render(renderData);
  });

  return sim;
}

// Process the input parameteres
Simulator _initSimulation([dynamic _]) {
  num worldWidth = params['width'] != null ? int.parse(params['width']) : null;
  num worldHeight =
      params['height'] != null ? int.parse(params['height']) : null;
  num speedMs = params['speed_ms'] != null ? int.parse(params['speed_ms']) : 50;
  num stageWidth;
  num stageHeight;

  CARules rules;
  CellWorld world;
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
      world = new CellWorld<GameOfLifeStates>(
          rules: new GameOfLife(),
          width: worldWidth,
          height: worldHeight,
          defaultState: GameOfLifeStates.DEAD);

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
      world = new CellWorld<bool>(
          rules: new GameOfLifeSimple(),
          width: worldWidth,
          height: worldHeight,
          defaultState: false);

      palette = new Map<bool, String>.from({
        false: '#8B0000',
        true: '#ADFE2F',
      });

      generator = new MathematicalGenerator<bool>(
          type: generatorType, valueTrue: true, valueFalse: false);
      break;

    case 'brians_brain':
      world = new CellWorld<BriansBrainStates>(
          rules: new BriansBrain(),
          width: worldWidth,
          height: worldHeight,
          defaultState: BriansBrainStates.OFF);

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

    case 'majority_vote':
      world = new CellWorld<int>(
          rules: new MajorityVote(),
          width: worldWidth,
          height: worldHeight,
          defaultState: 0);

      palette = new Map<int, String>.from({
        0: '#000000',
        1: '#FFFE01',
        2: '#FFFE01',
        3: '#FFFE01',
        4: '#FFFE01',
      });

      generator = new MathematicalGenerator<int>(
          type: generatorType, valueTrue: 1, valueFalse: 0);
      break;
  }

  return createSimulation(
      worldWidth: worldWidth,
      worldHeight: worldHeight,
      stageHeight: stageHeight,
      stageWidth: stageWidth,
      generator: generator,
      world: world,
      palette: palette,
      displayMode: displayMode,
      speedMs: speedMs,
      canvas: querySelector('#canvas')
        ..style.width = '${stageWidth}px'
        ..style.height = '${stageHeight}px');
}

Future<Null> main() async {
  // load the request parameters
  await initParams();
  Simulator sim;

  void startNewSim() {
    sim = _initSimulation();

    // render loop (wire the simulation & renderer together)
    sim.onStable.listen((bool stale) {
      print('Stale Scene: Resetting');
      sim.stop();
      startNewSim();
    });

    sim.start(delay: new Duration(milliseconds: 100));
  }

  startNewSim();
}
