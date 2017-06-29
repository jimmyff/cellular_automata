// Copyright (c) 2017, jimmyff. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:async';

import 'package:params/client.dart';

import 'package:cellular_automaton/cellular_automaton.dart';
import 'package:cellular_automaton/renderer_stagexl.dart';
import 'package:cellular_automaton/rules.dart';
import 'package:stagexl/src/ui/color.dart';

// Fully featured example of using cellular_automaton
void startSimulation(
    {CARules rules,
    num worldWidth,
    num worldHeight,
    num stageWidth,
    num stageHeight,
    num speed_ms,
    MathematicalGenerators mathematicalGenerator,
    StageXLDisplayMode displayMode,
    CanvasElement canvas}) {
  final world = new CellWorld<GameOfLifeStates>(
      width: worldWidth,
      height: worldHeight,
      defaultState: GameOfLifeStates.DEAD);

  final sim = new Simulator(
      world: world,
      rules: rules,
      generationDuration: new Duration(milliseconds: speed_ms),
      generator: new MathematicalGenerator<GameOfLifeStates>(
          type: mathematicalGenerator,
          valueTrue: GameOfLifeStates.ALIVE_BORN,
          valueFalse: GameOfLifeStates.DEAD));

  final renderer = new StageXLRenderer(
      canvas: canvas,
      displayMode: displayMode,
      stageWidth: stageWidth,
      stageHeight: stageHeight);

  // render loop (wire the simulation & renderer together)
  sim.onRender.listen((CellWorld world) {
    // render the cell world state
    renderer.render(world.applyPalette<int>(
        changesOnly: true,
        palette: new Map<GameOfLifeStates, int>.from({
          GameOfLifeStates.DEAD: Color.Blue,
          GameOfLifeStates.DEAD_UNDER_POPULATED: Color.DarkBlue,
          GameOfLifeStates.DEAD_OVER_POPULATED: Color.BlueViolet,
          GameOfLifeStates.ALIVE: Color.Yellow,
          GameOfLifeStates.ALIVE_BORN: Color.LightYellow,
        })));
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
  switch (params['rules']) {
    case 'game_of_life':
    default:
      rules = new GameOfLife();

      break;
  }

  final num renderSize = int.parse(params['render_size'] ?? '8');

  MathematicalGenerators generator;
  if (params['generator'] != null) {
    final gen = params['generator'].toString().toUpperCase();

    // create a List<String> of the generators
    List<String> gens = [];
    MathematicalGenerators.values.forEach((E) =>
        gens.add(E.toString().substring(E.toString().indexOf('\.') + 1)));

    if (gens.contains(gen))
      generator = MathematicalGenerators.values[gens.indexOf(gen)];
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

  startSimulation(
      rules: rules,
      worldWidth: worldWidth,
      worldHeight: worldHeight,
      stageHeight: stageHeight,
      stageWidth: stageWidth,
      mathematicalGenerator: generator,
      displayMode: displayMode,
      speed_ms: speedMs,
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
