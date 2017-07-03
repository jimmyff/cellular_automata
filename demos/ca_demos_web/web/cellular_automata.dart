// Copyright (c) 2017, jimmyff. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:async';

import 'package:params/client.dart';

import 'package:cellular_automata/cellular_automata.dart';
import 'package:cellular_automata/renderer_stagexl.dart';
import 'package:cellular_automata/rules.dart';
import 'package:stagexl/src/ui/color.dart';

// Fully featured example of using cellular_automata
void startSimulation({
  CARules rules,
  num worldWidth,
  num worldHeight,
  num stageWidth,
  num stageHeight,
  num speedMs,
  StageXLDisplayMode displayMode,
  CanvasElement canvas,
  CellWorld world,
  Map palette,
  CAGenerator generator,
}) {
  print('Cellular Automata Demo');
  print('World: ${worldWidth}x$worldHeight');
  print('Stage: ${stageWidth}x$stageHeight');
  print('Speed: $speedMs');

  final sim = new Simulator(
      world: world,
      rules: rules,
      generationDuration: new Duration(milliseconds: speedMs),
      palette: palette,
      generator: generator);

  final renderer = new StageXLRenderer(width: worldWidth, height: worldHeight)
    ..initStageXL(
      canvas: canvas,
      displayMode: displayMode,
      stageWidth: stageWidth,
      stageHeight: stageHeight,
      palette: palette.values.toList(growable: false),
    );

  // render loop (wire the simulation & renderer together)
  sim.onRender.listen((Array2d renderData) {
    // render the cell world state
    renderer.render(renderData);
  });

  sim.start(delay: new Duration(milliseconds: 100));
}

// Process the input parameteres
void _initSimulation([dynamic _]) {
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

  StageXLDisplayMode displayMode;

  String bodyClass;

  switch (params['stage']) {
    case 'fullscreen':
      displayMode = StageXLDisplayMode.FULLSCREEN;
      stageWidth = window.innerWidth;
      stageHeight = window.innerHeight;
      worldWidth = (stageWidth / renderSize).round();
      worldHeight = (stageHeight / renderSize).round();
      bodyClass = 'stage-full-window';
      break;
    case 'fixed':
    default:
      displayMode = StageXLDisplayMode.FIXED;
      stageWidth = worldWidth * renderSize;
      stageHeight = worldHeight * renderSize;
      bodyClass = 'stage-fixed-size';
  }

  querySelector('body').classes.add(bodyClass);

  switch (params['rules' ?? 'game_of_life']) {
    case 'game_of_life':
      rules = new GameOfLife();
      world = new CellWorld<GameOfLifeStates>(
          width: worldWidth,
          height: worldHeight,
          defaultState: GameOfLifeStates.DEAD);

      palette = new Map<GameOfLifeStates, int>.from({
        GameOfLifeStates.DEAD: Color.Blue,
        GameOfLifeStates.DEAD_UNDER_POPULATED: Color.DarkBlue,
        GameOfLifeStates.DEAD_OVER_POPULATED: Color.BlueViolet,
        GameOfLifeStates.ALIVE: Color.Yellow,
        GameOfLifeStates.ALIVE_BORN: Color.LightYellow,
      });

      generator = new MathematicalGenerator<GameOfLifeStates>(
          type: generatorType,
          valueTrue: GameOfLifeStates.ALIVE_BORN,
          valueFalse: GameOfLifeStates.DEAD);
      break;

    case 'game_of_life_simple':
      rules = new GameOfLifeSimple();
      world = new CellWorld<bool>(
          width: worldWidth, height: worldHeight, defaultState: false);

      palette = new Map<bool, int>.from({
        false: Color.DarkRed,
        true: Color.GreenYellow,
      });

      generator = new MathematicalGenerator<bool>(
          type: generatorType, valueTrue: true, valueFalse: false);
      break;

    case 'brians_brain':
      rules = new BriansBrain();
      world = new CellWorld<BriansBrainStates>(
          width: worldWidth,
          height: worldHeight,
          defaultState: BriansBrainStates.OFF);

      palette = new Map<BriansBrainStates, int>.from({
        BriansBrainStates.OFF: Color.DarkOliveGreen,
        BriansBrainStates.DYING: Color.LawnGreen,
        BriansBrainStates.ON: Color.OrangeRed,
      });

      generator = new MathematicalGenerator<BriansBrainStates>(
          type: generatorType,
          valueTrue: BriansBrainStates.ON,
          valueFalse: BriansBrainStates.OFF);
      break;
  }

  startSimulation(
      rules: rules,
      worldWidth: worldWidth,
      worldHeight: worldHeight,
      stageHeight: stageHeight,
      stageWidth: stageWidth,
      generator: generator,
      world: world,
      palette: palette,
      displayMode: displayMode,
      speedMs: speedMs,
      canvas: querySelector('#stage')
        ..style.width = '${stageWidth}px'
        ..style.height = '${stageHeight}px');
}

Future<Null> main() async {
  // load the request parameters
  await initParams();
  _initSimulation();
  window.onResize.listen(_initSimulation);
}
